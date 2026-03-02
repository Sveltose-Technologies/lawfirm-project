
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  getAllEvents,
  getAllCapabilityCategories,
  getAllLocationCities,
  getImgUrl, // 1. Added getImgUrl to handle image paths
} from "../../services/authService";

export default function EventDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to parse IDs safely
  const parseIds = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data.map(Number);
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed.map(Number) : [Number(data)];
      } catch (e) {
        return [Number(data)];
      }
    }
    return [Number(data)];
  };

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const [eventRes, cityRes, catRes] = await Promise.allSettled([
          getAllEvents(),
          getAllLocationCities(),
          getAllCapabilityCategories(),
        ]);

        const fetchedCities =
          cityRes.status === "fulfilled"
            ? cityRes.value?.data || cityRes.value || []
            : [];
        const fetchedCats =
          catRes.status === "fulfilled"
            ? catRes.value?.data || catRes.value || []
            : [];

        setCities(fetchedCities);
        setCategories(fetchedCats);

        if (eventRes.status === "fulfilled") {
          const eventsData = eventRes.value?.data || eventRes.value || [];
          let foundEvent = eventsData.find(
            (e) => createSlug(e.title) === slug || String(e.id) === slug,
          );
          setEvent(foundEvent);
          setAllEvents(
            eventsData
              .filter((e) => e.id !== (foundEvent?.id || 0))
              .slice(0, 3),
          );
        }
      } catch (error) {
        console.error("Error fetching event details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading)
    return (
      <div className="text-center py-5 mt-5">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  if (!event)
    return (
      <div className="text-center py-5 mt-5">
        <h3>Event Not Found</h3>
      </div>
    );

  const formatDateRange = (start, end) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const s = new Date(start).toLocaleDateString("en-US", options);
    if (!end) return s;
    const e = new Date(end).toLocaleDateString("en-US", options);
    return s === e ? s : `${s} - ${e}`;
  };

  const matchedCities = cities.filter((c) =>
    parseIds(event.cityIds || event.cityId).includes(Number(c.id)),
  );
  const matchedCategories = categories.filter((cat) =>
    parseIds(event.capabilityCategoryId).includes(Number(cat.id)),
  );

  return (
    <div className="bg-white">
      <Head>
        <title>{event.title} | Lawstick</title>
      </Head>

      {/* 2. DYNAMIC BANNER IMAGE IN HEADER */}
      <header
        className="text-white pt-5 pb-5 position-relative"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${getImgUrl(event.bannerImage)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "400px",
        }}>
        <div
          className="container pt-5 mt-4 position-relative"
          style={{ zIndex: 2 }}>
          <div className="mb-2 opacity-75">
            <span className="text-uppercase fw-bold small tracking-widest">
              {formatDateRange(event.startDate, event.endDate)}
            </span>
            <span className="mx-2">|</span>
            <span className="text-uppercase fw-bold small">Event</span>
          </div>
          <h1 className="display-4 fw-bold mb-5 lh-sm font-serif">
            {event.title}
          </h1>

          <div className="row g-3 border-top border-secondary pt-4">
            <div className="col-md-2 text-uppercase small fw-bold">
              Capabilities
            </div>
            <div className="col-md-10 fw-bold">
              {matchedCategories.map((cat, index) => (
                <span key={cat.id}>
                  <Link href={`/capability/${createSlug(cat.categoryName)}`}>
                    <a className="gold-text text-decoration-none hover-white">
                      {cat.categoryName}
                    </a>
                  </Link>
                  {index < matchedCategories.length - 1 && ", "}
                </span>
              ))}
            </div>

            <div className="col-md-2 text-uppercase small fw-bold">Offices</div>
            <div className="col-md-10 fw-bold">
              {matchedCities.map((c, index) => (
                <span key={c.id}>
                  <Link href={`/location/${createSlug(c.cityName)}`}>
                    <a className="gold-text text-decoration-none hover-white">
                      {c.cityName}
                    </a>
                  </Link>
                  {index < matchedCities.length - 1 && " | "}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5 mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Displaying Banner as a regular image if needed below the title */}
            <img
              src={getImgUrl(event.bannerImage)}
              className="img-fluid w-100 rounded mb-5 shadow"
              alt={event.title}
              onError={(e) => (e.target.style.display = "none")}
            />

            <div className="row g-0 pt-4">
              <div className="col-md-1">
                <div className="sticky-top" style={{ top: "110px" }}>
                  <p className="text-uppercase fw-bold text-muted small">
                    Share
                  </p>
                  <div className="d-flex flex-column gap-4 fs-4 text-muted">
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-11 ps-md-5">
                <div className="description-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
                {event.registrationLink && (
                  <div className="mt-5">
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      className="btn btn-warning px-5 py-3 fw-bold rounded-0"
                      style={{
                        backgroundColor: "#c5a059",
                        border: "none",
                        color: "#fff",
                      }}>
                      REGISTER FOR EVENT
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. RELATED EVENTS WITH IMAGES */}
      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <h3 className="pb-4 border-bottom border-secondary mb-5 font-serif">
            You May Also Be Interested In:
          </h3>
          <div className="row g-4">
            {allEvents.map((item) => (
              <div key={item.id} className="col-md-4">
                <div className="card bg-transparent border-0 h-100 text-white">
                  <img
                    src={getImgUrl(item.bannerImage)}
                    className="card-img-top rounded-0"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body px-0">
                    <p className="small fw-bold text-uppercase text-white-50 mb-2">
                      {formatDateRange(item.startDate, item.endDate)} | Event
                    </p>
                    <Link href={`/events/${createSlug(item.title)}`}>
                      <a className="h5 gold-text text-decoration-none fw-bold d-block mb-2 font-serif">
                        {item.title}
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .font-serif {
          font-family: "Georgia", serif;
        }
        .gold-text {
          color: #c5a059 !important;
        }
        .hover-gold:hover {
          color: #c5a059 !important;
        }
        .hover-white:hover {
          color: #fff !important;
          text-decoration: underline !important;
        }
        .description-body {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #333;
        }
        .description-body p {
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}