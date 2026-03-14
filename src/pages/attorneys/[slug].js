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
  const [showShare, setShowShare] = useState(false); // Share toggle state
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  // Tabs and News Logic (SECTION NOT CHANGED AS REQUESTED)
  const [activeTab, setActiveTab] = useState("News");
  const isEventTab = activeTab === "Upcoming Events";
  const displayList = isEventTab ? events.slice(0, 4) : news.slice(0, 4);

  const gtGold = "#c1a152";
  const gtDark = "#1a1a1a";
  const bgSidebar = "#be9144";

  // Slug Helpers
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

  return (
    <main
      className="bg-white min-vh-100"
      style={{ fontFamily: "Georgia, serif" }}>
      <Head>
        <title>
          {attorney.firstName} {attorney.lastName} | Profile
        </title>
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white !important; color: black !important; }
            .hero-bg { background-color: #1a1a1a !important; -webkit-print-color-adjust: exact; }
          }
          .hero-section { min-height: 550px; padding-top: 50px; }
          .gt-link { color: #c1a152; text-decoration: none; transition: 0.3s; }
          .gt-link:hover { text-decoration: underline; color: #c1a152; }
          .sidebar-btn { font-size: 11px; letter-spacing: 1px; border-bottom: 1px solid #ddd !important; }
          .share-popup { animation: fadeIn 0.3s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </Head>

      {/* --- HERO SECTION --- */}
      <section
        style={{ backgroundColor: gtDark }}
        className="text-white hero-section position-relative hero-bg">
        <div className="container h-100">
          <div className="row align-items-end h-100 g-0">
            {/* Left: Attorney Image */}
            <div className="col-md-5 text-center">
              <img
                src={getImgUrl(attorney.profileImage)}
                alt={attorney.firstName}
                className="img-fluid"
                style={{
                  maxHeight: "500px",
                  borderBottom: `8px solid ${gtGold}`,
                }}
              />
            </div>
            {/* Right: Info */}
            <div className="col-md-7 mb-5 ps-md-5">
              <h3
                className="display-3 mb-1"
                style={{ fontWeight: "400", fontFamily: "serif" }}>
                {attorney.firstName} {attorney.lastName}
              </h3>

              <div className="d-flex align-items-center mb-4">
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    backgroundColor: "white",
                  }}
                  className="me-3"></div>
                <span className="text-uppercase small fw-bold opacity-75 tracking-widest">
                  {attorney.servicesOffered || "ASSOCIATE"}
                </span>
              </div>

              <div className="mb-4">
                <a
                  href={`mailto:${attorney.email}`}
                  className="text-decoration-none gt-link text-white border-bottom border-secondary pb-1">
                  {attorney.email}
                </a>
              </div>

              <div className="row text-uppercase small fw-bold mt-4">
                <div className="col-md-12">
                  <Link
                    href={`/location/${createSlug(attorneyCity?.cityName)}`}>
                    <span
                      className="cursor-pointer gt-link"
                      style={{ color: gtGold }}>
                      {attorneyCity?.cityName?.toUpperCase() || "GLOBAL OFFICE"}
                    </span>
                  </Link>
                  <div className="fw-normal mt-1">
                    T +91 {attorney.phoneOffice || attorney.phoneCell}
                  </div>
                </div>
              </div>

              {/* PDF | Print | Share Utility */}
              <div className="d-flex justify-content-end gap-3 mt-5 pt-4 small fw-bold no-print position-relative">
                <span
                  className="cursor-pointer"
                  onClick={handlePrint}
                  style={{ color: "#5baed5" }}>
                  PDF
                </span>
                <span className="opacity-50">|</span>
                <span
                  className="cursor-pointer"
                  onClick={handlePrint}
                  style={{ color: "#5baed5" }}>
                  Print
                </span>
                <span className="opacity-50">|</span>
                <div className="position-relative">
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowShare(!showShare)}
                    style={{ color: "#5baed5" }}>
                    Share +
                  </span>
                  {/* DYNAMIC SHARE ICONS */}
                  {showShare && (
                    <div
                      className="position-absolute bg-white p-2 shadow-lg rounded mt-2 share-popup d-flex gap-3"
                      style={{ bottom: "35px", right: "0", zIndex: 100 }}>
                      {attorney.linkedin && (
                        <a
                          href={attorney.linkedin}
                          target="_blank"
                          className="text-info">
                          <i className="bi bi-linkedin fs-5"></i>
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
                      {attorney.twitter && (
                        <a
                          href={attorney.twitter}
                          target="_blank"
                          className="text-dark">
                          <i className="bi bi-twitter-x fs-5"></i>
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
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN BODY CONTENT --- */}
      <section className="container py-5">
        <div className="row">
          {/* Sidebar Nav */}
          <div className="col-md-3 no-print mb-4">
           
           
          </div>

          <div className="col-md-9 ps-md-5">
            <div className="mb-5">
              <p
                className="fs-5"
                style={{
                  lineHeight: "1.8",
                  textAlign: "justify",
                  color: "#333",
                }}
                dangerouslySetInnerHTML={{
                  __html: attorney.aboutus || "Biography coming soon.",
                }}
              />
            </div>

            {/* Dynamic Capability Link */}
            <div className="mb-5 border-top pt-4">
              <h2
                className="display-6 fw-bold mb-4"
                style={{ fontFamily: "serif" }}>
                Capabilities
              </h2>
              <Link
                href={`/capability/${createSlug(attorneyCategory?.categoryName || "general")}`}>
                <span className="gt-link fw-bold fs-5 cursor-pointer">
                  {attorneyCategory?.categoryName ||
                    attorney.servicesOffered ||
                    "General Practice"}
                </span>
              </Link>
            </div>

            {/* Credentials Row */}
            <div className="mt-5 pt-5 border-top">
              <h2
                className="display-6 fw-bold mb-4"
                style={{ fontFamily: "serif" }}>
                Credentials
              </h2>
              <div className="row g-4">
                <div className="col-md-6 mb-4">
                  <h6 className="fw-bold text-uppercase mb-3 small tracking-widest">
                    Education
                  </h6>
                  <ul className="ps-0 list-unstyled">
                    <li className="mb-2 opacity-75">
                      • {attorney.education || "Details pending."}
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6 className="fw-bold text-uppercase mb-3 small tracking-widest">
                    Admissions
                  </h6>
                  <ul className="ps-0 list-unstyled">
                    <li className="mb-2 opacity-75">
                      • {attorney.admission || "N/A"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWS & EVENTS SECTION (NO CHANGES MADE HERE) --- */}
      <section className="py-5 no-print" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container py-4">
          <div className="row justify-content-end">
            <div className="col-lg-9 ps-md-5">
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
                      cursor: "pointer",
                      borderColor:
                        activeTab === tab ? "#c1a152" : "transparent",
                      fontSize: "0.9rem",
                    }}>
                    {tab}
                  </span>
                ))}
              </div>
              <div className="row">
                {displayList.map((item, idx) => (
                  <div key={idx} className="col-12 mb-5 text-white">
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
                        <h5 style={{ color: gtGold, fontFamily: "serif" }}>
                          {item.title}
                        </h5>
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
