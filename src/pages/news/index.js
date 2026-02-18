// import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import {
//   getAllNews,
//   getAllCapabilitySubCategories,
//   getAllLocationCities,
//   IMG_URL
// } from '../../services/authService';

// function NewsIndex() {
//   const router = useRouter();
//   const [newsList, setNewsList] = useState([]);
//   const [capabilities, setCapabilities] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilterTab, setActiveFilterTab] = useState(null);
//   const [filters, setFilters] = useState({ capability: '', location: '', date: '' });

//   // Slug banane ka helper
//   const createSlug = (text) => {
//     return text?.toLowerCase().trim()
//       .replace(/\s+/g, '-')
//       .replace(/[^\w-]+/g, '')
//       .replace(/--+/g, '-');
//   };

//   // 1. DYNAMIC IMAGE HELPER (Bulletproof logic)
//   const getNewsImg = (path) => {
//     if (!path) return "https://via.placeholder.com/400x250?text=No+Image";

//     // Agar pura URL pehle se hai
//     if (path.startsWith("http")) return path;

//     // "uploads/" agar path ke shuruat mein hai toh use hata do pehle taaki double na ho
//     const cleanPath = path.replace(/^uploads\//, "");

//     // Final URL: Base URL + /uploads/ + filename
//     const finalUrl = `${IMG_URL}/uploads/${cleanPath}`;

//     // Aap console mein check kar sakte hain ki URL sahi ban raha hai ya nahi
//     // console.log("Generated Image URL:", finalUrl);

//     return finalUrl;
//   };

//   const cleanContent = (html) => {
//     if (!html) return "";
//     return html.replace(/&nbsp;/g, ' ').replace(/<[^>]*>?/gm, '');
//   };

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setLoading(true);
//       try {
//         const [newsRes, capRes, locRes] = await Promise.all([
//           getAllNews(),
//           getAllCapabilitySubCategories(),
//           getAllLocationCities()
//         ]);
//         if (newsRes?.status) setNewsList(newsRes.data);
//         if (capRes?.success) setCapabilities(capRes.data || []);
//         if (locRes?.success) setLocations(locRes.data || []);
//       } catch (error) { console.error(error); } finally { setLoading(false); }
//     };
//     fetchAllData();
//   }, []);

//   const filteredNews = newsList.filter(item => {
//     const titleMatch = (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());
//     const capIds = JSON.parse(item.capabilityCategoryId || "[]");
//     const locIds = JSON.parse(item.cityId || "[]");
//     const matchesCap = filters.capability ? capIds.includes(Number(filters.capability)) : true;
//     const matchesLoc = filters.location ? locIds.includes(Number(filters.location)) : true;
//     const matchesDate = filters.date ? item.date === filters.date : true;
//     return titleMatch && matchesCap && matchesLoc && matchesDate;
//   });

//   return (
//     <div className="bg-white">
//       <Head><title>News | Core Law</title></Head>

//       {/* HERO SECTION */}
//       <section className="d-flex align-items-center justify-content-center text-center text-white"
//         style={{ height: '400px', backgroundColor: '#111', marginTop: '-80px' }}>
//         <div className="container pt-5 mt-5">

//           <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>News</h1>
//           <p className="lead opacity-75">Insights & Updates from Core Law</p>
//         </div>
//       </section>

//       {/* FILTER BAR */}
//       <section className="py-4 bg-dark border-top border-warning border-4 shadow">
//         <div className="container">
//           <div className="row align-items-center g-3">
//             <div className="col-lg-4">
//               <div className="input-group border-bottom border-secondary">
//                 <input type="text" placeholder="Search..." className="form-control bg-transparent border-0 text-white shadow-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//                 <span className="input-group-text bg-transparent border-0 text-warning"><i className="bi bi-search"></i></span>
//               </div>
//             </div>
//             <div className="col-lg-8 text-white text-lg-end">
//                 {['capability', 'location', 'date'].map((tab) => (
//                   <button key={tab} onClick={() => setActiveFilterTab(activeFilterTab === tab ? null : tab)} className={`btn btn-link text-decoration-none text-uppercase fw-bold small px-3 ${activeFilterTab === tab ? 'text-warning' : 'text-white'}`}>
//                     {tab} <i className={`bi bi-chevron-${activeFilterTab === tab ? 'up' : 'down'} ms-1`}></i>
//                   </button>
//                 ))}
//             </div>
//           </div>
//           {activeFilterTab && (
//             <div className="row mt-3">
//               <div className="col-12">
//                 {activeFilterTab === 'capability' && (
//                   <select className="form-select rounded-0" value={filters.capability} onChange={(e) => { setFilters({...filters, capability: e.target.value}); setActiveFilterTab(null); }}>
//                     <option value="">All Capabilities</option>
//                     {capabilities.map(cap => <option key={cap.id} value={cap.id}>{cap.subcategoryName || cap.categoryName}</option>)}
//                   </select>
//                 )}
//                 {activeFilterTab === 'location' && (
//                   <select className="form-select rounded-0" value={filters.location} onChange={(e) => { setFilters({...filters, location: e.target.value}); setActiveFilterTab(null); }}>
//                     <option value="">All Locations</option>
//                     {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.cityName}</option>)}
//                   </select>
//                 )}
//                 {activeFilterTab === 'date' && (
//                   <input type="date" className="form-control rounded-0" value={filters.date} onChange={(e) => { setFilters({...filters, date: e.target.value}); setActiveFilterTab(null); }} />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* NEWS LISTING */}
//       <section className="container py-5">
//         <h2 className="fw-bold mb-5" style={{ fontFamily: 'Georgia, serif' }}>Recent News</h2>
//         {loading ? (
//           <div className="text-center py-5"><div className="spinner-border text-warning"></div></div>
//         ) : filteredNews.length > 0 ? (
//           <div className="row">
//             {filteredNews.map((item) => (
//               <div key={item.id} className="col-12 mb-5 border-bottom pb-5">
//                 <div className="row align-items-center g-4">

//                   <div className="col-md-4">
//                     <Link href={`/news/${createSlug(item.title)}`}>
//                       <a className="d-block shadow-sm rounded overflow-hidden">
//                          <img
//                            src={getNewsImg(item.bannerImage || item.newsImage)}
//                            alt={item.title}
//                            className="img-fluid w-100"
//                            style={{ height: '250px', objectFit: 'cover' }}
//                            onError={(e) => {
//                              // Agar fir bhi fail ho toh ye placeholder dikhayega
//                              e.target.src = "https://via.placeholder.com/400x250?text=Core+Law+News";
//                            }}
//                          />
//                       </a>
//                     </Link>
//                   </div>

//                   <div className="col-md-8">
//                     <div className="small text-uppercase fw-bold text-muted mb-2">
//                       <span className="text-warning"><i className="bi bi-calendar3 me-1"></i> {item.date}</span>
//                     </div>
//                     <Link href={`/news/${createSlug(item.title)}`}>
//                       <a className="text-decoration-none text-dark hover-gold">
//                         <h3 className="fw-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>{item.title}</h3>
//                       </a>
//                     </Link>
//                     <p className="text-secondary mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical' }}>
//                       {cleanContent(item.textEditor)}
//                     </p>
//                     <Link href={`/news/${createSlug(item.title)}`}>
//                       <a className="btn btn-outline-dark rounded-0 px-4 py-2 fw-bold small">READ MORE</a>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-5"><h3>No news found.</h3></div>
//         )}
//       </section>

//       <style jsx>{`
//         .hover-gold:hover h3 { color: #de9f57 !important; transition: 0.3s; }
//         @media (max-width: 768px) { .display-3 { font-size: 2.5rem; } }
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

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState(null);
  const [filters, setFilters] = useState({
    capability: "",
    location: "",
    date: "",
  });

  // 1. DYNAMIC IMAGE HELPER (Consistency for all images)
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

  const cleanContent = (html) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, " ").replace(/<[^>]*>?/gm, "");
  };

  // 2. GET API FETCHING
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [newsRes, capRes, locRes] = await Promise.all([
          getAllNews(),
          getAllCapabilitySubCategories(),
          getAllLocationCities(),
        ]);

        // Checking based on your API response structure
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

  // Latest news image for Banner
  const bannerImg =
    newsList.length > 0
      ? getNewsImg(newsList[0].bannerImage || newsList[0].newsImage)
      : null;

  return (
    <div className="bg-white">
      <Head>
        <title>News | Core Law</title>
      </Head>

      {/* HERO SECTION - Now with Dynamic Background Image */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white position-relative"
        style={{
          height: "450px",
          marginTop: "-80px",
          backgroundImage: bannerImg
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`
            : "none",
          backgroundColor: "#111",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div
          className="container pt-5 mt-5 position-relative"
          style={{ zIndex: 2 }}>
          <h1
            className="display-3 fw-bold mb-3"
            style={{ fontFamily: "Georgia, serif" }}>
            News
          </h1>
          <p className="lead opacity-75">Insights & Updates from Core Law</p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="py-4 bg-dark border-top border-warning border-4 shadow">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-lg-4">
              <div className="input-group border-bottom border-secondary">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="form-control bg-transparent border-0 text-white shadow-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="input-group-text bg-transparent border-0 text-warning">
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
                  className={`btn btn-link text-decoration-none text-uppercase fw-bold small px-3 ${activeFilterTab === tab ? "text-warning" : "text-white"}`}>
                  {tab}{" "}
                  <i
                    className={`bi bi-chevron-${activeFilterTab === tab ? "up" : "down"} ms-1`}></i>
                </button>
              ))}
            </div>
          </div>
          {activeFilterTab && (
            <div className="row mt-3 animate__animated animate__fadeIn">
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

      {/* NEWS LISTING */}
      <section className="container py-5">
        <h2 className="fw-bold mb-5" style={{ fontFamily: "Georgia, serif" }}>
          Recent Updates
        </h2>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning"></div>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="row">
            {filteredNews.map((item) => (
              <div key={item.id} className="col-12 mb-5 border-bottom pb-5">
                <div className="row align-items-center g-4">
                  <div className="col-md-4">
                    <Link href={`/news/${createSlug(item.title)}`}>
                      <a className="d-block shadow-sm rounded overflow-hidden">
                        <img
                          src={getNewsImg(item.bannerImage || item.newsImage)}
                          alt={item.title}
                          className="img-fluid w-100 news-thumbnail"
                          style={{ height: "250px", objectFit: "cover" }}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x250?text=Core+Law+News";
                          }}
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="col-md-8">
                    <div className="small text-uppercase fw-bold text-muted mb-2">
                      <span className="text-warning">
                        <i className="bi bi-calendar3 me-1"></i> {item.date}{" "}
                        {item.year}
                      </span>
                    </div>
                    <Link href={`/news/${createSlug(item.title)}`}>
                      <a className="text-decoration-none text-dark hover-gold">
                        <h3
                          className="fw-bold mb-3"
                          style={{ fontFamily: "Georgia, serif" }}>
                          {item.title}
                        </h3>
                      </a>
                    </Link>
                    <p
                      className="text-secondary mb-4 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}>
                      {cleanContent(item.textEditor)}
                    </p>
                    <Link href={`/news/${createSlug(item.title)}`}>
                      <a className="btn btn-outline-dark rounded-0 px-4 py-2 fw-bold small">
                        READ MORE
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <h3>No articles match your search.</h3>
          </div>
        )}
      </section>

      <style jsx>{`
        .hover-gold:hover h3 {
          color: #de9f57 !important;
          transition: 0.3s;
        }
        .news-thumbnail {
          transition: transform 0.5s ease;
        }
        .news-thumbnail:hover {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}

export default NewsIndex;