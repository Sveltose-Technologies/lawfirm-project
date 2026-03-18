import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  getAllAttorneys,
  getImgUrl,
  getAllNews,
  getAllEvents,
  getAllCapabilityCategories,
  getAllLocationCities,
} from "../../services/authService";

export default function AttorneyProfilePage() {
  const router = useRouter();
  const { slug } = router.query;

  const [attorney, setAttorney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("News");
  const shareRef = useRef(null);

  const gtGold = "#c5a059";
  const gtBlue = "#5baed5";

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");
  const createNameSlug = (fname, lname) =>
    createSlug(`${fname} ${lname || ""}`);

  useEffect(() => {
    if (!slug) return;
    const loadPageData = async () => {
      setLoading(true);
      try {
        const [attRes, newsRes, eventRes, catRes, cityRes] = await Promise.all([
          getAllAttorneys(),
          getAllNews(),
          getAllEvents(),
          getAllCapabilityCategories(),
          getAllLocationCities(),
        ]);
        const list = attRes?.attorneys || attRes?.data || [];
        const found = list.find(
          (attr) =>
            createNameSlug(attr.firstName, attr.lastName) === slug ||
            String(attr.id) === String(slug),
        );
        if (found) setAttorney(found);
        setNews(newsRes?.data || []);
        setEvents(eventRes?.data || []);
        setCategories(catRes?.data || []);
        setCities(cityRes?.data || []);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPageData();
  }, [slug]);

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  if (!attorney)
    return <div className="text-center py-5">Attorney not found.</div>;

  const attorneyCity = cities.find(
    (c) => String(c.id) === String(attorney.city),
  );
  const attorneyCategory = categories.find(
    (cat) => String(cat.id) === String(attorney.categoryId),
  );
  const displayList =
    activeTab === "News" ? news.slice(0, 3) : events.slice(0, 3);

  return (
    <main className="bg-white">
      <Head>
        <title>
          {attorney.firstName} {attorney.lastName} | Profile
        </title>
      </Head>

      {/* --- HERO SECTION (DYNAMIC SOCIAL ICONS & LARGE IMAGE) --- */}
      <section
        className="position-relative d-flex align-items-center justify-content-center "
        style={{ backgroundColor: "#111", minHeight: "500px", color: "white" }}>
        <div className="container">
          <div className="row align-items-center justify-content-center g-3">
            {/* Left: Image (Large & Clear) */}
            <div className="col-md-5 d-flex justify-content-center">
              <img
                src={getImgUrl(attorney.profileImage)}
                alt={attorney.firstName}
                className="img-fluid shadow-lg"
                style={{
                  height: "320px",
                  width: "350px",
                  objectFit: "cover",
                  borderRadius: "2px",
                }}
              />
            </div>

            {/* Right: Details (Centered to Image) */}
            <div className="col-md-7 text-center text-md-start ps-md-5">
              <h3
                className="display-2 mb-2 fw-normal"
                style={{ fontFamily: "serif" }}>
                {attorney.firstName} {attorney.lastName}
              </h3>

              <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-4">
                <div
                  style={{
                    width: "50px",
                    height: "1.5px",
                    backgroundColor: gtGold,
                    marginRight: "15px",
                  }}></div>
                <span
                  className="text-uppercase fw-bold small text-secondary"
                  style={{ letterSpacing: "3px" }}>
                  {attorney.servicesOffered || "Counsel"}
                </span>
              </div>

              <a
                href={`mailto:${attorney.email}`}
                className="d-block mb-4 text-decoration-none h6 fw-light"
                style={{ color: gtGold }}>
                {attorney.email}
              </a>

              <div className="mt-5">
                {/* Location & Contact */}
                <div className="mt-5">
                  <div
                    className="fw-bold text-uppercase mb-2"
                    style={{ letterSpacing: "2px", fontSize: "14px" }}>
                    {attorneyCity ? (
                      <Link
                        href={`/location/${createSlug(attorneyCity.cityName)}`}>
                        <a
                          className="text-decoration-none cursor-pointer"
                          style={{ color: gtGold }}>
                          {attorneyCity.cityName}
                        </a>
                      </Link>
                    ) : (
                      <span style={{ color: gtGold }}>Global Office</span>
                    )}
                  </div>
                 
                </div>
                <div className="h6 opacity-75 fw-light">
                  T +91 {attorney.phoneOffice || attorney.phoneCell}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility Links (PDF, Print, Dynamic Share) */}
        <div
          className="position-absolute bottom-0 end-0 p-5 me-md-5 d-flex align-items-center gap-4 no-print"
          style={{ fontSize: "14px", fontWeight: "500" }}>
          <span
            className="text-info border-end pe-4 cursor-pointer"
            onClick={() => window.print()}>
            PDF
          </span>
          <span
            className="text-info border-end pe-4 cursor-pointer"
            onClick={() => window.print()}>
            Print
          </span>

          {/* Dynamic Share Section */}
          <div className="d-flex align-items-center flex-row-reverse gap-3">
            <span
              className="text-info cursor-pointer ms-2"
              onClick={() => setShowShare(!showShare)}>
              Share +
            </span>

            {showShare && (
              <div className="d-flex gap-3 animate-slide-left">
                {attorney.linkedin && (
                  <a
                    href={attorney.linkedin}
                    target="_blank"
                    className="text-white h5 mb-0">
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
                {attorney.twitter && (
                  <a
                    href={attorney.twitter}
                    target="_blank"
                    className="text-white h5 mb-0">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                )}
                {attorney.facebook && (
                  <a
                    href={attorney.facebook}
                    target="_blank"
                    className="text-white h5 mb-0">
                    <i className="bi bi-facebook"></i>
                  </a>
                )}
                {/* Gmail/Email Icon */}
                <a
                  href={`mailto:${attorney.gmail || attorney.email}`}
                  className="text-white h5 mb-0">
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* --- CONTENT SECTION --- */}
      <div className="container py-5" style={{ maxWidth: "900px" }}>
        {/* Biography */}
        <div
          className="mb-5 h6 lh-lg text-secondary fw-normal"
          dangerouslySetInnerHTML={{ __html: attorney.aboutus }}
        />

        {/* Capabilities */}
        <div className="mb-5 py-4 border-top">
          <h2 className="h3 mb-4" style={{ fontFamily: "serif" }}>
            Capabilities
          </h2>
          <Link
            href={`/capability/${createSlug(attorneyCategory?.categoryName)}`}>
            <a
              className="fw-bold text-decoration-underline"
              style={{ color: gtGold }}>
              {attorneyCategory?.categoryName || "Corporate"}
            </a>
          </Link>
        </div>

        {/* Credentials */}
        <div className="mb-5 py-4 border-top">
          <h2 className="h3 mb-4" style={{ fontFamily: "serif" }}>
            Credentials
          </h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <p className="fw-bold text-uppercase small text-muted mb-2">
                Education
              </p>
              <div
                className="text-secondary"
                dangerouslySetInnerHTML={{ __html: attorney.education }}
              />
            </div>
            <div className="col-md-6 mb-4">
              <p className="fw-bold text-uppercase small text-muted mb-2">
                Admissions
              </p>
              <div
                className="text-secondary"
                dangerouslySetInnerHTML={{ __html: attorney.admission }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- NEWS & EVENTS SECTION --- */}
      <section
        className="bg-dark text-white py-5 no-print"
        style={{ backgroundColor: "#111 !important" }}>
        <div className="container py-5" style={{ maxWidth: "900px" }}>
          <h2 className="display-5 mb-5" style={{ fontFamily: "serif" }}>
            News, Insights & Events
          </h2>

          <div className="mb-4">
            <button
              className={`btn btn-sm me-2 rounded-0 ${activeTab === "News" ? "btn-secondary" : "btn-outline-secondary text-white"}`}
              onClick={() => setActiveTab("News")}>
              News
            </button>
            <button
              className={`btn btn-sm rounded-0 ${activeTab === "Events" ? "btn-secondary" : "btn-outline-secondary text-white"}`}
              onClick={() => setActiveTab("Events")}>
              Events
            </button>
          </div>

          <div className="list-group list-group-flush bg-transparent">
            {displayList.map((item, idx) => (
              <div
                key={idx}
                className="bg-transparent border-secondary border-bottom py-4 d-flex justify-content-between align-items-center">
                <div className="pe-3">
                  <div className="small text-uppercase text-muted mb-2">
                    {new Date(
                      item.createdAt || item.startDate,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}{" "}
                    | {activeTab.toUpperCase()}
                  </div>
                  <Link
                    href={`/${activeTab.toLowerCase()}/${createSlug(item.title)}`}>
                    <a
                      className="h4 text-decoration-none"
                      style={{ color: gtGold, fontFamily: "serif" }}>
                      {item.title}
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
        .cursor-pointer {
          cursor: pointer;
        }
      
       
     
        .cursor-pointer {
          cursor: pointer;
          transition: 0.3s;
        }
        .cursor-pointer:hover {
          color: white !important;
        }
        .animate-slide-left {
          animation: slideLeft 0.4s ease forwards;
        }
        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}
