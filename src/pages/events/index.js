import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  getAllEvents,
  getAllCapabilitySubCategories,
  getAllLocationCities,
  IMG_URL,
} from "../../services/authService";

function EventsIndex() {
  const [eventsList, setEventsList] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState(null);
  const [filters, setFilters] = useState({
    capability: "",
    location: "",
    date: "",
  });

  const createSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Helper to format 24h time to 12h AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return null;
    try {
      const [hours, minutes] = timeString.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return timeString;
    }
  };

  useEffect(() => {
    setMounted(true);
    const fetchEventsData = async () => {
      setLoading(true);
      try {
        const [eventRes, capRes, locRes] = await Promise.all([
          getAllEvents(),
          getAllCapabilitySubCategories(),
          getAllLocationCities(),
        ]);

        if (eventRes?.success) {
          setEventsList(eventRes.data);
        }
        if (capRes?.success)
          setCapabilities(capRes.data?.data || capRes.data || []);
        if (locRes?.success) setLocations(locRes.data || []);
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  if (!mounted) return null;

  const filteredEvents = eventsList.filter((item) => {
    const matchesSearch = (item.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesCap = filters.capability
      ? Number(item.capabilityCategoryId) === Number(filters.capability)
      : true;

    // Fixed cityIds check to handle both stringified and array data
    let currentCityIds = [];
    try {
      currentCityIds =
        typeof item.cityIds === "string"
          ? JSON.parse(item.cityIds)
          : item.cityIds;
    } catch (e) {
      currentCityIds = [];
    }

    let matchesLoc = filters.location
      ? currentCityIds?.includes(Number(filters.location))
      : true;

    let itemDate = item.startDate ? item.startDate.split("T")[0] : "";
    let matchesDate = filters.date ? itemDate === filters.date : true;

    return matchesSearch && matchesCap && matchesLoc && matchesDate;
  });
  console.log("filteredEvents", filteredEvents);

  const topBanner =
    eventsList.length > 0
      ? `${IMG_URL}/uploads/${eventsList[0].bannerImage}`
      : null;

  return (
    <div className="bg-white">
      <Head>
        <title>Events | Core Law</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      {/* Hero Section */}
      <section
        className="py-4 text-center position-relative"
        style={{
          backgroundImage: topBanner
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${topBanner})`
            : "none",
          backgroundColor: "#222",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "280px",
          display: "flex",
          alignItems: "center",
          color: "white",
          marginTop: "40px",
        }}>
        <div className="container position-relative">
          <h1
            className="fw-bold mb-2 responsive-hero-title"
            style={{ fontFamily: "Georgia, serif" }}>
            Events
          </h1>
          <p className="opacity-75 responsive-hero-sub">
            Opportunities for us to connect and share expertise.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section
        className="border-top"
        style={{ backgroundColor: "#111", borderTop: "4px solid #c5a059" }}>
        <div className="container">
          <div className="row align-items-center py-3 g-3">
            <div className="col-lg-5">
              <div className="d-flex align-items-center border-bottom border-secondary border-opacity-50 pb-1">
                <input
                  type="text"
                  placeholder="Search Events..."
                  className="bg-transparent border-0 text-white w-100 outline-none shadow-none"
                  style={{ fontSize: "0.95rem", padding: "5px 0" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search text-warning small"></i>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="d-flex flex-wrap justify-content-lg-end align-items-center gap-3 text-white">
                <span
                  className="fw-bold d-none d-md-block"
                  style={{ color: "#94cce9", fontSize: "0.8rem" }}>
                  Filter by:
                </span>
                {["Date", "Location", "Capability"].map((label) => (
                  <span
                    key={label}
                    onClick={() =>
                      setActiveFilterTab(
                        activeFilterTab === label.toLowerCase()
                          ? null
                          : label.toLowerCase(),
                      )
                    }
                    className="cursor-pointer text-uppercase fw-bold"
                    style={{
                      color:
                        activeFilterTab === label.toLowerCase()
                          ? "#c5a059"
                          : "white",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      letterSpacing: "0.5px",
                    }}>
                    {label}{" "}
                    <i
                      className={`bi bi-chevron-${activeFilterTab === label.toLowerCase() ? "up" : "down"} ms-1`}
                      style={{ fontSize: "0.6rem" }}></i>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {activeFilterTab && (
            <div className="row pb-3">
              <div className="col-12">
                {activeFilterTab === "capability" && (
                  <select
                    className="form-select rounded-0 form-select-sm"
                    value={filters.capability}
                    onChange={(e) => {
                      setFilters({ ...filters, capability: e.target.value });
                      setActiveFilterTab(null);
                    }}>
                    <option value="">All Capabilities</option>
                    {capabilities.map((cap) => (
                      <option key={cap.id} value={cap.id}>
                        {cap.subcategoryName || cap.categoryName}
                      </option>
                    ))}
                  </select>
                )}
                {activeFilterTab === "location" && (
                  <select
                    className="form-select rounded-0 form-select-sm"
                    value={filters.location}
                    onChange={(e) => {
                      setFilters({ ...filters, location: e.target.value });
                      setActiveFilterTab(null);
                    }}>
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.cityName}
                      </option>
                    ))}
                  </select>
                )}
                {activeFilterTab === "date" && (
                  <div className="d-flex gap-2">
                    <input
                      type="date"
                      className="form-control rounded-0 form-control-sm w-auto"
                      value={filters.date}
                      onChange={(e) =>
                        setFilters({ ...filters, date: e.target.value })
                      }
                    />
                    <button
                      className="btn btn-warning btn-sm rounded-0 fw-bold"
                      onClick={() => {
                        setFilters({ ...filters, date: "" });
                        setActiveFilterTab(null);
                      }}>
                      RESET
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events List */}
      <section className="container py-5 min-vh-100">
        <h4
          className="fw-bold mb-4 border-bottom pb-2"
          style={{ fontFamily: "Georgia, serif" }}>
          Upcoming Events
        </h4>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning spinner-border-sm"></div>
          </div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((item) => {
            let parsedCityIds = [];
            try {
              if (Array.isArray(item.cityIds)) parsedCityIds = item.cityIds;
              else if (typeof item.cityIds === "string")
                parsedCityIds = JSON.parse(item.cityIds);
            } catch (e) {
              parsedCityIds = [];
            }

            const dynamicCityNames = Array.isArray(parsedCityIds)
              ? parsedCityIds
                  .map(
                    (id) =>
                      locations.find((loc) => Number(loc.id) === Number(id))
                        ?.cityName,
                  )
                  .filter(Boolean)
                  .join(", ")
              : "";

            const eventSlug = createSlug(item.title);
            const displayStartTime = formatTime(item.startTime);
            const displayEndTime = formatTime(item.endTime);

            return (
              <div
                key={item.id}
                className="event-row border-bottom py-3 mb-1 transition-all">
                <div className="row align-items-center">
                  <div className="col-md-10">
                    <div
                      className="d-flex align-items-center flex-wrap gap-2 mb-1 fw-bold text-uppercase"
                      style={{ fontSize: "0.7rem" }}>
                      <span className="text-primary">
                        {item.startDate
                          ? new Date(item.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "Date TBD"}
                      </span>

                      {/* START TIME & END TIME DISPLAY */}
                      {(displayStartTime || displayEndTime) && (
                        <>
                          <span className="text-muted opacity-50">|</span>
                          <span className="text-dark">
                            <i className="bi bi-clock me-1"></i>
                            {displayStartTime}{" "}
                            {displayEndTime && ` - ${displayEndTime}`}
                          </span>
                        </>
                      )}

                      <span className="text-muted opacity-50">•</span>
                      <span className="text-muted">EVENT</span>
                    </div>

                    <Link href={`/events/${eventSlug}`}>
                      <a className="text-decoration-none">
                        <h6
                          className="text-dark mb-1 fw-bold hover-gold"
                          style={{
                            fontFamily: "Georgia, serif",
                            fontSize: "1.20rem",
                          }}>
                          {item.title}
                        </h6>
                      </a>
                    </Link>
                    <p
                      className="text-secondary mb-0"
                      style={{ fontSize: "0.85rem" }}>
                      <i
                        className="bi bi-geo-alt-fill text-warning me-2"
                        style={{ fontSize: "0.75rem" }}></i>
                      {dynamicCityNames ||
                        item.locationName ||
                        "Virtual / To Be Decided"}
                    </p>
                  </div>
                  <div className="col-md-2 text-md-end mt-2 mt-md-0">
                    <Link href={`/events/${eventSlug}`}>
                      <a
                        className="btn btn-xs btn-outline-dark rounded-0 px-3 fw-bold"
                        style={{ fontSize: "0.7rem" }}>
                        DETAILS
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">
              No upcoming events found matching your criteria.
            </p>
          </div>
        )}
      </section>

      <style jsx>{`
        .hover-gold:hover {
          color: #c5a059 !important;
          transition: 0.3s;
        }
        .event-row:hover {
          background-color: #fcfcfc;
          padding-left: 10px;
          border-left: 3px solid #c5a059;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        .form-select:focus {
          border-color: #c5a059;
          box-shadow: none;
        }
        .responsive-hero-title {
          font-size: 2rem;
        }
        .responsive-hero-sub {
          font-size: 0.95rem;
        }
        @media (min-width: 768px) {
          .responsive-hero-title {
            font-size: 3rem;
          }
          .responsive-hero-sub {
            font-size: 1.1rem;
          }
        }
        .btn-xs {
          padding: 0.25rem 0.5rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

export default EventsIndex;
