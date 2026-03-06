// "use client";
// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//   getAllNews,
//   getAllCapabilitySubCategories,
//   getAllLocationCities,
//   IMG_URL,
// } from "../../services/authService";

// function NewsIndex() {
//   const router = useRouter();
//   const [newsList, setNewsList] = useState([]);
//   const [capabilities, setCapabilities] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeFilterTab, setActiveFilterTab] = useState(null);
//   const [filters, setFilters] = useState({
//     capability: "",
//     location: "",
//     date: "",
//   });

//   const getNewsImg = (path) => {
//     if (!path)
//       return "https://via.placeholder.com/1200x600?text=Core+Law+Updates";
//     if (path.startsWith("http")) return path;
//     const cleanPath = path.replace(/^uploads\//, "");
//     return `${IMG_URL}/uploads/${cleanPath}`;
//   };

//   const createSlug = (text) => {
//     return text
//       ?.toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]+/g, "")
//       .replace(/--+/g, "-");
//   };

//   const cleanContent = (html) => {
//     if (!html) return "";
//     return html.replace(/&nbsp;/g, " ").replace(/<[^>]*>?/gm, "");
//   };

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setLoading(true);
//       try {
//         const [newsRes, capRes, locRes] = await Promise.all([
//           getAllNews(),
//           getAllCapabilitySubCategories(),
//           getAllLocationCities(),
//         ]);
//         const newsData = newsRes?.data || newsRes || [];
//         setNewsList(Array.isArray(newsData) ? newsData : []);
//         if (capRes?.success) setCapabilities(capRes.data || []);
//         if (locRes?.success) setLocations(locRes.data || []);
//       } catch (error) {
//         console.error("Error fetching news index data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   const filteredNews = newsList.filter((item) => {
//     const titleMatch = (item.title || "")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const capIds = JSON.parse(item.capabilityCategoryId || "[]");
//     const locIds = JSON.parse(item.cityId || "[]");
//     const matchesCap = filters.capability
//       ? capIds.includes(Number(filters.capability))
//       : true;
//     const matchesLoc = filters.location
//       ? locIds.includes(Number(filters.location))
//       : true;
//     const matchesDate = filters.date ? item.date === filters.date : true;
//     return titleMatch && matchesCap && matchesLoc && matchesDate;
//   });

//   const bannerImg =
//     newsList.length > 0
//       ? getNewsImg(newsList[0].bannerImage || newsList[0].newsImage)
//       : null;

//   return (
//     <div className="bg-dark-section">
//       <Head>
//         <title>News | Core Law</title>
//       </Head>

//       {/* HERO SECTION - Unchanged as requested */}
//       <section
//         className="d-flex align-items-center justify-content-center text-center text-white position-relative"
//         style={{
//           height: "450px",
//           marginTop: "-80px",
//           backgroundImage: bannerImg
//             ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`
//             : "none",
//           backgroundColor: "#111",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}>
//         <div
//           className="container pt-5 mt-5 position-relative"
//           style={{ zIndex: 2 }}>
//           <h1
//             className="display-3 fw-bold mb-3"
//             style={{ fontFamily: "Georgia, serif" }}>
//             News
//           </h1>
//           <p className="lead opacity-75">Insights & Updates from Core Law</p>
//         </div>
//       </section>

//       {/* FILTER BAR - Unchanged as requested */}
//       <section className="py-4 bg-dark border-top border-warning border-4 shadow">
//         <div className="container">
//           <div className="row align-items-center g-3">
//             <div className="col-lg-4">
//               <div className="input-group border-bottom border-secondary">
//                 <input
//                   type="text"
//                   placeholder="Search news..."
//                   // className="form-control bg-transparent border-0 text-white shadow-none"
//                   className="form-control custom-search-input bg-transparent border-0 text-white shadow-none"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <span className="input-group-text bg-transparent border-0 text-warning">
//                   <i className="bi bi-search"></i>
//                 </span>
//               </div>
//             </div>
//             <div className="col-lg-8 text-white text-lg-end">
//               {["capability", "location", "date"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() =>
//                     setActiveFilterTab(activeFilterTab === tab ? null : tab)
//                   }
//                   className={`btn btn-link text-decoration-none text-uppercase fw-bold small px-3 ${activeFilterTab === tab ? "text-warning" : "text-white"}`}>
//                   {tab}{" "}
//                   <i
//                     className={`bi bi-chevron-${activeFilterTab === tab ? "up" : "down"} ms-1`}></i>
//                 </button>
//               ))}
//             </div>
//           </div>
//           {activeFilterTab && (
//             <div className="row mt-3 animate__animated animate__fadeIn">
//               <div className="col-12">
//                 {activeFilterTab === "capability" && (
//                   <select
//                     className="form-select rounded-0"
//                     value={filters.capability}
//                     onChange={(e) => {
//                       setFilters({ ...filters, capability: e.target.value });
//                       setActiveFilterTab(null);
//                     }}>
//                     <option value="">All Capabilities</option>
//                     {capabilities.map((cap) => (
//                       <option key={cap.id} value={cap.id}>
//                         {cap.subcategoryName || cap.categoryName}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 {activeFilterTab === "location" && (
//                   <select
//                     className="form-select rounded-0"
//                     value={filters.location}
//                     onChange={(e) => {
//                       setFilters({ ...filters, location: e.target.value });
//                       setActiveFilterTab(null);
//                     }}>
//                     <option value="">All Locations</option>
//                     {locations.map((loc) => (
//                       <option key={loc.id} value={loc.id}>
//                         {loc.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//                 {activeFilterTab === "date" && (
//                   <input
//                     type="date"
//                     className="form-control rounded-0"
//                     value={filters.date}
//                     onChange={(e) => {
//                       setFilters({ ...filters, date: e.target.value });
//                       setActiveFilterTab(null);
//                     }}
//                   />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* RECENT NEWS LISTING - UPDATED TO MATCH SCREENSHOT */}
//       <section className="py-5 bg-dark-section">
//         <div className="container py-4">
//           <h2 className="recent-news-heading mb-5">Recent News</h2>

//           {loading ? (
//             <div className="text-center py-5">
//               <div className="spinner-border text-warning"></div>
//             </div>
//           ) : filteredNews.length > 0 ? (
//             <div className="news-stack">
//               {filteredNews.map((item) => (
//                 <div key={item.id} className="news-row border-bottom-thin py-4">
//                   <div className="news-top-meta d-flex gap-2 align-items-center mb-1">
//                     <span className="meta-date">
//                       {item.date} {item.year}
//                     </span>
//                     <span className="meta-type text-uppercase">
//                       Press Release
//                     </span>
//                   </div>

//                   <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
//                     <Link href={`/news/${createSlug(item.title)}`}>
//                       <a className="text-decoration-none flex-grow-1">
//                         <h4 className="news-title-gold">{item.title}</h4>
//                         {item.subtitle && (
//                           <p className="news-subtitle mt-1">{item.subtitle}</p>
//                         )}
//                       </a>
//                     </Link>

//                     <div className="read-time-indicator d-flex align-items-center text-nowrap">
//                       <span className="indicator-line"></span>
//                       <span className="read-time-text">2 min read</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <div className="text-center mt-5">
//                 <button className="btn-view-more">View More +</button>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-5 text-white">
//               <h3>No articles match your search.</h3>
//             </div>
//           )}
//         </div>
//       </section>

//       <style jsx>{`
//         .bg-dark-section {
//           background-color: #212121; /* Matches the screenshot's dark grey */
//         }
//         .recent-news-heading {
//           color: #ffffff;
//           font-family: "Georgia", serif;
//           font-size: 2.5rem;
//           font-weight: 500;
//         }
//         .border-bottom-thin {
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//         }
//         .meta-date {
//           color: #a1a1a1;
//           font-size: 0.75rem;
//           font-weight: bold;
//           letter-spacing: 0.5px;
//         }
//         .meta-type {
//           color: #ffffff;
//           font-size: 0.75rem;
//           font-weight: 800;
//           letter-spacing: 1px;
//         }
//         .news-title-gold {
//           color: #c9a050; /* Signature gold color */
//           font-family: "Georgia", serif;
//           font-size: 1.35rem;
//           font-weight: 600;
//           line-height: 1.4;
//           margin-bottom: 0;
//           transition: color 0.2s;
//         }
//         .news-title-gold:hover {
//           color: #ffffff;
//         }
//         .news-subtitle {
//           color: #888;
//           font-style: italic;
//           font-size: 0.95rem;
//           margin-bottom: 0;
//         }
//         .read-time-text {
//           color: #a1a1a1;
//           font-size: 0.85rem;
//         }
//         .indicator-line {
//           display: inline-block;
//           width: 30px;
//           height: 1px;
//           background-color: #444;
//           margin-right: 10px;
//         }
//         .btn-view-more {
//           background: transparent;
//           border: none;
//           color: #c9a050;
//           font-weight: bold;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           font-size: 0.9rem;
//         }
//         .custom-search-input::placeholder {
//           color: rgba(255, 255, 255, 0.7);
//         }
//         @media (max-width: 768px) {
//           .news-title-gold {
//             font-size: 1.1rem;
//           }
//           .indicator-line {
//             display: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default NewsIndex;

"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getAllNews,
  getAllCapabilitySubCategories,
  getAllLocationCities,
  IMG_URL,
} from "../../services/authService";

function NewsIndex() {
  const router = useRouter();
  const [newsList, setNewsList] = useState([]);
  const [capabilities, setCapabilities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state: show 3 items initially
  const [visibleCount, setVisibleCount] = useState(3);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState(null);
  const [filters, setFilters] = useState({
    capability: "",
    location: "",
    date: "",
  });

  const getNewsImg = (path) => {
    if (!path)
      return "https://via.placeholder.com/1200x600?text=Core+Law+Updates";
    if (path.startsWith("http")) return path;
    const cleanPath = path.replace(/^uploads\//, "");
    return `${IMG_URL}/uploads/${cleanPath}`;
  };

  const createSlug = (text) => {
    return text
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [newsRes, capRes, locRes] = await Promise.all([
          getAllNews(),
          getAllCapabilitySubCategories(),
          getAllLocationCities(),
        ]);
        const newsData = newsRes?.data || newsRes || [];
        setNewsList(Array.isArray(newsData) ? newsData : []);
        if (capRes?.success) setCapabilities(capRes.data || []);
        if (locRes?.success) setLocations(locRes.data || []);
      } catch (error) {
        console.error("Error fetching news index data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const filteredNews = newsList.filter((item) => {
    const titleMatch = (item.title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const capIds = JSON.parse(item.capabilityCategoryId || "[]");
    const locIds = JSON.parse(item.cityId || "[]");
    const matchesCap = filters.capability
      ? capIds.includes(Number(filters.capability))
      : true;
    const matchesLoc = filters.location
      ? locIds.includes(Number(filters.location))
      : true;
    const matchesDate = filters.date ? item.date === filters.date : true;
    return titleMatch && matchesCap && matchesLoc && matchesDate;
  });

  // Limit display based on visibleCount
  const displayedNews = filteredNews.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const bannerImg =
    newsList.length > 0
      ? getNewsImg(newsList[0].bannerImage || newsList[0].newsImage)
      : null;

  return (
    <div style={{ backgroundColor: "#212121", minHeight: "100vh" }}>
      <Head>
        <title>News | Core Law</title>
      </Head>

      {/* HERO SECTION - Using Global Banner styles */}
      <section
        className="universal-banner d-flex align-items-center justify-content-center text-center position-relative"
        style={{
          height: "450px",
          marginTop: "-80px",
          backgroundImage: bannerImg ? `url(${bannerImg})` : "none",
          backgroundColor: "var(--bg-dark)",
        }}>
        <div className="banner-overlay"></div>
        <div className="banner-content container pt-5 mt-5">
          <h1 className="display-3 fw-bold mb-3 font-serif text-white">News</h1>
          <p className="lead text-white opacity-75">
            Insights & Updates from Core Law
          </p>
        </div>
      </section>

      {/* FILTER BAR - Using Global Variables for Colors */}
      <section
        className="py-4 shadow-sm"
        style={{
          backgroundColor: "var(--dark-navy)",
          borderTop: "4px solid var(--primary-gold)",
        }}>
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-lg-4">
              <div className="input-group border-bottom border-secondary text-white">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="form-control bg-transparent  border-0 text-white shadow-none"
                  style={{ fontFamily: "var(--font-base)" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text  bg-transparent border-0 text-white">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            <div className="col-lg-8 text-white text-lg-end">
              {["capability", "location", "date"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveFilterTab(activeFilterTab === tab ? null : tab)
                  }
                  className={`btn btn-link text-decoration-none text-uppercase fw-bold px-3 ${
                    activeFilterTab === tab ? "text-gold" : "text-white"
                  }`}
                  style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                  {tab}{" "}
                  <i
                    className={`bi bi-chevron-${activeFilterTab === tab ? "up" : "down"} ms-1`}></i>
                </button>
              ))}
            </div>
          </div>

          {activeFilterTab && (
            <div className="row mt-3 animate-fade-in">
              <div className="col-12">
                {activeFilterTab === "capability" && (
                  <select
                    className="form-select rounded-0"
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
                    className="form-select rounded-0"
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
                  <input
                    type="date"
                    className="form-control rounded-0"
                    value={filters.date}
                    onChange={(e) => {
                      setFilters({ ...filters, date: e.target.value });
                      setActiveFilterTab(null);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RECENT NEWS LISTING */}
      <section className="py-5">
        <div className="container py-4">
          <h2
            className="font-serif text-white mb-5"
            style={{ fontSize: "2.5rem" }}>
            Recent News
          </h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-gold"></div>
            </div>
          ) : displayedNews.length > 0 ? (
            <div className="news-stack">
              {displayedNews.map((item) => (
                <div
                  key={item.id}
                  className="py-4"
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}>
                  <div className="d-flex gap-2 align-items-center mb-1">
                    <span
                      className="text-white fw-bold"
                      style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                      {item.date} {item.year}
                    </span>
                    <span
                      className="text-white fw-bold text-uppercase"
                      style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                      Press Release
                    </span>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <Link href={`/news/${createSlug(item.title)}`}>
                      <a className="text-decoration-none flex-grow-1">
                        <h4
                          className="text-gold font-serif m-0"
                          style={{
                            fontWeight: "600",
                            fontSize: "1.35rem",
                            lineHeight: "1.4",
                          }}>
                          {item.title}
                        </h4>
                        {item.subtitle && (
                          <p
                            className="text-muted mt-1 fst-italic"
                            style={{ fontSize: "0.95rem" }}>
                            {item.subtitle}
                          </p>
                        )}
                      </a>
                    </Link>

                    <div className="d-flex align-items-center text-nowrap text-muted">
                      <span
                        className="d-none d-md-inline-block me-2"
                        style={{
                          width: "30px",
                          height: "1px",
                          backgroundColor: "#444",
                        }}></span>
                      <span style={{ fontSize: "0.85rem" }}>2 min read</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* View More Button Logic */}
              {visibleCount < filteredNews.length && (
                <div className="text-center mt-5">
                  <button
                    onClick={handleViewMore}
                    className="btn btn-link text-gold text-decoration-none fw-bold text-uppercase p-0"
                    style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>
                    View More +
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-5 text-white">
              <h3>No articles match your search.</h3>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .text-gold {
          color: var(--primary-gold) !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-in;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        h4:hover {
          color: var(--text-light) !important;
        }
      `}</style>
    </div>
  );
}

export default NewsIndex;