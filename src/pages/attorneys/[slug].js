import React, { useState, useEffect } from "react";
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

  const gtGold = "#c1a152";
  const gtDark = "#1a1a1a";

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

  const createNameSlug = (fname, lname) => {
    const name = `${fname} ${lname || ""}`;
    return createSlug(name);
  };

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

  const handlePrint = () => window.print();

  if (loading)
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-white">
        <div className="spinner-border" style={{ color: gtGold }}></div>
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
  const isEventTab = activeTab === "Upcoming Events";
  const displayList = isEventTab ? events.slice(0, 4) : news.slice(0, 4);

  return (
    <main
      className="bg-white min-vh-100"
      style={{ fontFamily: "Georgia, serif" }}>
      <Head>
        <title>
          {attorney.firstName} {attorney.lastName} | Profile
        </title>
        <style>{`
          @media print { .no-print { display: none !important; } }
          .hero-section { background-color: ${gtDark}; color: white; padding-top: 40px; min-height: 550px; }
          .utility-link { font-size: 12px; color: #999; text-transform: uppercase; text-decoration: none; letter-spacing: 1px; cursor: pointer; }
          .utility-link:hover { color: white; }
          .contact-label { font-size: 12px; color: #777; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; margin-bottom: 5px; }
          .email-link { color: white; text-decoration: underline; font-size: 1.2rem; }
          .email-link:hover { color: ${gtGold}; }
          .back-btn { font-size: 12px; color: ${gtGold}; text-transform: uppercase; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; margin-bottom: 20px; }
          .back-btn:hover { color: white; }
        `}</style>
      </Head>

      {/* --- HERO SECTION (EXACT AS IMAGE) --- */}
      <section className="hero-section">
        <div className="container">
          {/* Back Button */}
          <div className="no-print">
            <span onClick={() => router.back()} className="back-btn">
              <i className="bi bi-chevron-left me-1"></i> Back to Professionals
            </span>
          </div>

          <div className="row g-0 align-items-center">
            {/* Left: Image with Gold Border */}
            <div className="col-md-5">
              <div className="pe-md-4">
                <img
                  src={getImgUrl(attorney.profileImage)}
                  alt={attorney.firstName}
                  className="img-fluid w-100"
                  style={{
                    borderBottom: `8px solid ${gtGold}`,
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="col-md-7 ps-md-4 py-4 position-relative">
              {/* Top Utility Links */}
              <div className="d-flex justify-content-start gap-3 mb-5 no-print">
                <span className="utility-link" onClick={handlePrint}>
                  Download PDF
                </span>
                <span className="utility-link" onClick={handlePrint}>
                  Print Profile
                </span>
                <div className="position-relative">
                  <span
                    className="utility-link"
                    onClick={() => setShowShare(!showShare)}>
                    Share +
                  </span>
                  {showShare && (
                    <div
                      className="position-absolute bg-white p-2 shadow rounded d-flex gap-3 mt-2"
                      style={{ zIndex: 100 }}>
                      {attorney.linkedin && (
                        <a
                          href={attorney.linkedin}
                          target="_blank"
                          className="text-primary">
                          <i className="bi bi-linkedin fs-5"></i>
                        </a>
                      )}
                      {attorney.twitter && (
                        <a
                          href={attorney.twitter}
                          target="_blank"
                          className="text-dark">
                          <i className="bi bi-twitter-x fs-5"></i>
                        </a>
                      )}
                      {attorney.facebook && (
                        <a
                          href={attorney.facebook}
                          target="_blank"
                          className="text-primary">
                          <i className="bi bi-facebook fs-5"></i>
                        </a>
                      )}
                      {attorney.gmail && (
                        <a
                          href={`mailto:${attorney.gmail}`}
                          className="text-danger">
                          <i className="bi bi-envelope-fill fs-5"></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Name Block */}
              <h2 className="display-2 fw-normal mb-1">
                {attorney.firstName} {attorney.lastName}
              </h2>

              <div className="text-uppercase small mb-5 opacity-50 tracking-widest">
                {attorney.servicesOffered || "Counsel"}
              </div>

              {/* Contact Information */}
              <div className="mb-5">
                <div className="contact-label">Contact Information</div>
                <a href={`mailto:${attorney.email}`} className="email-link">
                  {attorney.email}
                </a>
                <div className="fs-4 mt-2">
                  T +91 {attorney.phoneOffice || attorney.phoneCell}
                </div>
              </div>

              {/* Primary Office */}
              <div className="mb-4">
                <div className="contact-label">Primary Office</div>
                <Link href={`/location/${createSlug(attorneyCity?.cityName)}`}>
                  <span
                    className="cursor-pointer fw-bold fs-4"
                    style={{ color: gtGold }}>
                    {attorneyCity?.cityName?.toUpperCase() || "GLOBAL"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Biography */}
            <div className="mb-5 mt-4">
              <div
                className="fs-5"
                style={{
                  lineHeight: "1.9",
                  textAlign: "justify",
                  color: "#333",
                }}
                dangerouslySetInnerHTML={{
                  __html: attorney.aboutus || "Biography coming soon.",
                }}
              />
            </div>

            {/* Capabilities */}
            <div className="mb-5 border-top pt-4">
              <h3 className="fw-bold mb-4" style={{ fontFamily: "serif" }}>
                Capabilities
              </h3>
              <Link
                href={`/capability/${createSlug(attorneyCategory?.categoryName || "general")}`}>
                <span
                  className="text-decoration-none fw-bold fs-5 cursor-pointer"
                  style={{ color: gtGold }}>
                  {attorneyCategory?.categoryName || "General Practice"}
                </span>
              </Link>
            </div>

            {/* Credentials */}
            <div className="mt-5 pt-4 border-top">
              <h3 className="fw-bold mb-4" style={{ fontFamily: "serif" }}>
                Credentials
              </h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="contact-label mb-2">Education</div>
                  <p className="opacity-75">
                    {attorney.education || "Pending details."}
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="contact-label mb-2">Admissions</div>
                  <p className="opacity-75">{attorney.admission || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWS & EVENTS (REVERTED TO LIST) --- */}
      <section className="py-5 no-print" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2
                className="display-5 text-white mb-5"
                style={{ fontFamily: "serif" }}>
                News & Events
              </h2>

              <div className="d-flex flex-wrap border-bottom border-secondary mb-5 pb-0 gap-4">
                {["News", "Upcoming Events"].map((tab) => (
                  <span
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`fw-bold pb-2 cursor-pointer ${activeTab === tab ? "text-white border-bottom border-3" : "text-white-50"}`}
                    style={{
                      borderColor: activeTab === tab ? gtGold : "transparent",
                      fontSize: "0.9rem",
                    }}>
                    {tab.toUpperCase()}
                  </span>
                ))}
              </div>

              <div className="row">
                {displayList.map((item, idx) => (
                  <div
                    key={idx}
                    className="col-12 mb-5 text-white border-bottom border-secondary pb-4">
                    <div className="small text-uppercase opacity-50 mb-2">
                      {new Date(
                        item.createdAt || item.startDate,
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}{" "}
                      | {isEventTab ? "EVENT" : "PRESS RELEASE"}
                    </div>
                    <Link
                      href={`/${isEventTab ? "events" : "news"}/${createSlug(item.title)}`}>
                      <a className="text-decoration-none">
                        <h4 style={{ color: gtGold, fontFamily: "serif" }}>
                          {item.title}
                        </h4>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
