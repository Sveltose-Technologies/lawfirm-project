// // // import React, { useState, useEffect } from "react";
// // // import Head from "next/head";
// // // import Link from "next/link";
// // // import { useRouter } from "next/router";
// // // import {
// // //   getAllNews,
// // //   IMG_URL
// // // } from "../../services/authService";

// // // export default function NewsDetail() {
// // //   const router = useRouter();
// // //   const { slug } = router.query;

// // //   const [newsItem, setNewsItem] = useState(null);
// // //   const [relatedNews, setRelatedNews] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [socialLinks, setSocialLinks] = useState({});

// // //   const createSlug = (text) => text?.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

// // //   const cleanHTML = (html) => {
// // //     if (!html) return "";
// // //     return html.replace(/&nbsp;/g, ' ');
// // //   };

// // //   useEffect(() => {
// // //     async function fetchData() {
// // //       if (!slug) return;
// // //       setLoading(true);
// // //       try {
// // //         const res = await getAllNews();
// // //         if (res?.status && res.data) {
// // //           const matched = res.data.find(item => createSlug(item.title) === slug);

// // //           if (matched) {
// // //             setNewsItem(matched);
// // //             // Dynamic Social Links Parsing
// // //             try {
// // //               const parsedSocial = matched.socialLinks ? JSON.parse(matched.socialLinks) : {};
// // //               setSocialLinks(parsedSocial);
// // //             } catch (e) {
// // //               console.error("Social links parse error", e);
// // //             }
// // //             setRelatedNews(res.data.filter(n => n.id !== matched.id).slice(0, 3));
// // //           }
// // //         }
// // //       } catch (err) {
// // //         console.error("❌ Error fetching news detail:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }
// // //     fetchData();
// // //   }, [slug]);

// // //   if (loading) return <div className="p-5 text-center"><div className="spinner-border text-warning"></div></div>;
// // //   if (!newsItem) return <div className="p-5 text-center">News not found.</div>;

// // //   const formattedDate = new Date(newsItem.date).toLocaleDateString('en-US', {
// // //     month: 'long', day: 'numeric', year: 'numeric'
// // //   });

// // //   return (
// // //     <>
// // //       <Head><title>{newsItem.title} | Core Law News</title></Head>

// // //       {/* 1. DARK HERO SECTION - Adjusted Spacing */}
// // //       <div className="bg-dark text-white" style={{ marginTop: '-50px', paddingTop: '140px', paddingBottom: '60px', minHeight: '400px' }}>
// // //         <div className="container">
// // //           {/* BACK BUTTON */}
// // //           <div className="mb-4">
// // //              <button onClick={() => router.back()} className="btn btn-link text-white text-decoration-none p-0 fw-bold small">
// // //                 <i className="bi bi-arrow-left me-2"></i> BACK TO NEWS
// // //              </button>
// // //           </div>

// // //           <div className="small text-uppercase fw-bold mb-3 opacity-75" style={{ letterSpacing: '1px' }}>
// // //             {formattedDate} <span className="mx-2">|</span> PRESS RELEASE
// // //           </div>

// // //           <h1 className="display-4 fw-bold font-serif mb-5" style={{ lineHeight: '1.2' }}>
// // //             {newsItem.title}
// // //           </h1>

// // //           <div className="row g-4 mt-2 border-top border-secondary pt-4">
// // //             <div className="col-md-3 col-6">
// // //               <p className="small text-secondary text-uppercase mb-1 fw-bold">Related Professionals</p>
// // //               <Link href="/professionals"><a className="text-warning text-decoration-none small">View Professionals</a></Link>
// // //             </div>
// // //             <div className="col-md-3 col-6">
// // //               <p className="small text-secondary text-uppercase mb-1 fw-bold">Capabilities</p>
// // //               <Link href="/capabilities"><a className="text-warning text-decoration-none small">Corporate / M&A</a></Link>
// // //             </div>
// // //             <div className="col-md-3 col-6">
// // //               <p className="small text-secondary text-uppercase mb-1 fw-bold">Offices</p>
// // //               <Link href="/locations"><a className="text-warning text-decoration-none small">Global Offices</a></Link>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* 2. MAIN BODY SECTION */}
// // //       <div className="container py-5 mt-4">
// // //         <div className="row">

// // //           {/* SHARE SIDEBAR (Left) - Dynamic Links */}
// // //           <div className="col-lg-1 col-md-2 d-none d-md-block">
// // //              <div className="sticky-top" style={{ top: '120px' }}>
// // //                 <p className="small fw-bold text-muted text-uppercase mb-3" style={{ fontSize: '0.7rem' }}>Share</p>
// // //                 <div className="d-flex flex-column gap-4 fs-4 text-secondary">
// // //                   {socialLinks.linkedin && (
// // //                     <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-secondary"><i className="bi bi-linkedin share-icon"></i></a>
// // //                   )}
// // //                   {socialLinks.twitter && (
// // //                     <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="text-secondary"><i className="bi bi-twitter-x share-icon"></i></a>
// // //                   )}
// // //                   {socialLinks.facebook && (
// // //                     <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="text-secondary"><i className="bi bi-facebook share-icon"></i></a>
// // //                   )}
// // //                   <a href={`mailto:?subject=${newsItem.title}`} className="text-secondary"><i className="bi bi-envelope-fill share-icon"></i></a>
// // //                   <i className="bi bi-printer-fill share-icon" onClick={() => window.print()}></i>
// // //                 </div>
// // //              </div>
// // //           </div>

// // //           {/* ARTICLE CONTENT (Center) */}
// // //           <div className="col-lg-8 col-md-10 offset-lg-1">
// // //             <div className="article-content">
// // //               <p className="fw-bold mb-4">
// // //                 LOCATION – {formattedDate} –
// // //                 <span className="fw-normal ms-2">Core Law global attorneys advised on the key developments surrounding {newsItem.title}.</span>
// // //               </p>

// // //               <div
// // //                 className="article-text-render"
// // //                 dangerouslySetInnerHTML={{ __html: cleanHTML(newsItem.textEditor) }}
// // //               />
// // //             </div>
// // //           </div>

// // //         </div>
// // //       </div>

// // //       {/* 3. RELATED NEWS SECTION */}
// // //       <div className="bg-dark text-white py-5 mt-5">
// // //         <div className="container">
// // //           <h2 className="font-serif fw-bold mb-5 border-bottom border-secondary pb-3">You May Also Be Interested In:</h2>

// // //           <div className="row">
// // //             {relatedNews.length > 0 ? relatedNews.map((item) => (
// // //               <div key={item.id} className="col-12 mb-5">
// // //                 <div className="small text-secondary text-uppercase mb-2">
// // //                   {new Date(item.date).toLocaleDateString()} | MEDIA COVERAGE
// // //                 </div>
// // //                 <Link href={`/news/${createSlug(item.title)}`}>
// // //                   <a className="text-decoration-none"><h4 className="text-warning font-serif hover-white mb-2">{item.title}</h4></a>
// // //                 </Link>
// // //                 <div className="small opacity-50 text-white">less than a min read</div>
// // //                 <hr className="border-secondary opacity-25 mt-4" />
// // //               </div>
// // //             )) : <p className="text-muted">No related news found.</p>}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         .font-serif { font-family: 'Georgia', serif; }
// // //         .share-icon { cursor: pointer; transition: 0.3s; }
// // //         .share-icon:hover { color: #de9f57 !important; }
// // //         .hover-white:hover { color: #fff !important; }

// // //         .article-text-render {
// // //           font-size: 1.15rem;
// // //           line-height: 1.8;
// // //           color: #333;
// // //           word-wrap: break-word;
// // //         }

// // //         .article-text-render :global(p) {
// // //           margin-bottom: 1.5rem;
// // //           text-align: justify;
// // //         }

// // //         .article-text-render :global(a) {
// // //           color: #de9f57;
// // //           text-decoration: underline;
// // //         }

// // //         @media (max-width: 768px) {
// // //           .display-4 { font-size: 2.2rem; }
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // }

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import Head from "next/head";
// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import { getAllNews, getImgUrl } from "../../services/authService";

// // export default function NewsDetail() {
// //   const router = useRouter();
// //   const { slug } = router.query;

// //   const [newsItem, setNewsItem] = useState(null);
// //   const [relatedNews, setRelatedNews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [socialLinks, setSocialLinks] = useState({
// //     linkedin: "",
// //     twitter: "",
// //     facebook: "",
// //   });

// //   // Slug helper must match the one in NewsIndex
// //   const createSlug = (text) =>
// //     text
// //       ?.toLowerCase()
// //       .trim()
// //       .replace(/\s+/g, "-")
// //       .replace(/[^\w-]+/g, "")
// //       .replace(/--+/g, "-");

// //   const cleanHTML = (html) => {
// //     if (!html) return "";
// //     return html.replace(/&nbsp;/g, " ");
// //   };

// //   useEffect(() => {
// //     async function fetchData() {
// //       if (!slug) return;
// //       setLoading(true);
// //       try {
// //         const res = await getAllNews();
// //         // Handling both {success, data} and raw array responses
// //         const allNews = res?.data || res || [];

// //         if (Array.isArray(allNews)) {
// //           const matched = allNews.find(
// //             (item) => createSlug(item.title) === slug,
// //           );

// //           if (matched) {
// //             setNewsItem(matched);

// //             // Parse social links safely
// //             try {
// //               if (matched.socialLinks) {
// //                 const parsed =
// //                   typeof matched.socialLinks === "string"
// //                     ? JSON.parse(matched.socialLinks)
// //                     : matched.socialLinks;
// //                 setSocialLinks(parsed);
// //               }
// //             } catch (e) {
// //               console.error("Social links parse error", e);
// //             }

// //             // Set related news (excluding current)
// //             setRelatedNews(
// //               allNews.filter((n) => n.id !== matched.id).slice(0, 3),
// //             );
// //           }
// //         }
// //       } catch (err) {
// //         console.error("Error fetching news detail:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchData();
// //   }, [slug]);

// //   if (loading)
// //     return (
// //       <div className="p-5 text-center">
// //         <div className="spinner-border text-warning"></div>
// //       </div>
// //     );
// //   if (!newsItem)
// //     return (
// //       <div className="p-5 text-center">
// //         <h3>News article not found.</h3>
// //         <Link href="/news">
// //           <a className="btn btn-warning mt-3">Back to News</a>
// //         </Link>
// //       </div>
// //     );

// //   const formattedDate = newsItem.date
// //     ? new Date(newsItem.date).toLocaleDateString("en-US", {
// //         month: "long",
// //         day: "numeric",
// //         year: "numeric",
// //       })
// //     : "";

// //   return (
// //     <>
// //       <Head>
// //         <title>{newsItem.title} | Core Law News</title>
// //       </Head>

// //       {/* 1. HERO SECTION WITH IMAGE */}
// //       <div
// //         className="text-white position-relative"
// //         style={{
// //           marginTop: "-80px",
// //           paddingTop: "160px",
// //           paddingBottom: "80px",
// //           backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${getImgUrl(newsItem.bannerImage || newsItem.newsImage)})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           minHeight: "500px",
// //         }}>
// //         <div className="container">
// //           <div className="mb-4">
// //             <button
// //               onClick={() => router.push("/news")}
// //               className="btn btn-link text-white text-decoration-none p-0 fw-bold small">
// //               <i className="bi bi-arrow-left me-2"></i> BACK TO NEWS
// //             </button>
// //           </div>

// //           <div
// //             className="small text-uppercase fw-bold mb-3 opacity-75"
// //             style={{ letterSpacing: "2px" }}>
// //             {formattedDate} {newsItem.year && `| ${newsItem.year}`}
// //           </div>

// //           <h3
// //             className="display-4 fw-bold font-serif mb-4"
// //             style={{ lineHeight: "1.1", maxWidth: "900px" }}>
// //             {newsItem.title}
// //           </h3>

// //           <div className="d-flex gap-4 mt-5 border-top border-secondary pt-4 overflow-auto">
// //             <div className="text-nowrap">
// //               <p className="small text-secondary text-uppercase mb-1 fw-bold">
// //                 Professionals
// //               </p>
// //               <Link href="/professionals">
// //                 <a className="text-warning text-decoration-none small">
// //                   View Team
// //                 </a>
// //               </Link>
// //             </div>
// //             <div className="text-nowrap">
// //               <p className="small text-secondary text-uppercase mb-1 fw-bold">
// //                 Practices
// //               </p>
// //               <Link href="/capabilities">
// //                 <a className="text-warning text-decoration-none small">
// //                   Capabilities
// //                 </a>
// //               </Link>
// //             </div>
// //             <div className="text-nowrap">
// //               <p className="small text-secondary text-uppercase mb-1 fw-bold">
// //                 Offices
// //               </p>
// //               <Link href="/locations">
// //                 <a className="text-warning text-decoration-none small">
// //                   Global Presence
// //                 </a>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 2. CONTENT SECTION */}
// //       <div className="container py-5 mt-4">
// //         <div className="row">
// //           {/* SIDEBAR SHARE */}
// //           <div className="col-lg-1 d-none d-lg-block">
// //             <div className="sticky-top" style={{ top: "120px" }}>
// //               <p
// //                 className="small fw-bold text-muted text-uppercase mb-3"
// //                 style={{ fontSize: "0.65rem" }}>
// //                 Share
// //               </p>
// //               <div className="d-flex flex-column gap-4 fs-4">
// //                 {socialLinks?.linkedin && (
// //                   <a
// //                     href={socialLinks.linkedin}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="text-secondary hover-gold">
// //                     <i className="bi bi-linkedin"></i>
// //                   </a>
// //                 )}
// //                 {socialLinks?.twitter && (
// //                   <a
// //                     href={socialLinks.twitter}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="text-secondary hover-gold">
// //                     <i className="bi bi-twitter-x"></i>
// //                   </a>
// //                 )}
// //                 {socialLinks?.facebook && (
// //                   <a
// //                     href={socialLinks.facebook}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                     className="text-secondary hover-gold">
// //                     <i className="bi bi-facebook"></i>
// //                   </a>
// //                 )}
// //                 <a
// //                   href={`mailto:?subject=${newsItem.title}`}
// //                   className="text-secondary hover-gold">
// //                   <i className="bi bi-envelope-fill"></i>
// //                 </a>
// //                 <i
// //                   className="bi bi-printer-fill text-secondary hover-gold cursor-pointer"
// //                   onClick={() => window.print()}></i>
// //               </div>
// //             </div>
// //           </div>

// //           {/* MAIN ARTICLE */}
// //           <div className="col-lg-8 offset-lg-1">
// //             <div className="article-body">
// //               <h4
// //                 className="fw-bold mb-4 text-dark"
// //                 style={{
// //                   borderLeft: "4px solid #de9f57",
// //                   paddingLeft: "15px",
// //                 }}>
// //                 Core Law provides insights into the strategic implications of{" "}
// //                 {newsItem.title}.
// //               </h4>

// //               <div
// //                 className="article-text-content"
// //                 dangerouslySetInnerHTML={{
// //                   __html: cleanHTML(newsItem.textEditor),
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 3. RELATED ARTICLES */}
// //       <div className="bg-light py-5 border-top">
// //         <div className="container py-4">
// //           <h2 className="font-serif fw-bold mb-5">Related News</h2>

// //           <div className="row g-4">
// //             {relatedNews.length > 0 ? (
// //               relatedNews.map((item) => (
// //                 <div key={item.id} className="col-md-4">
// //                   <div className="card h-100 border-0 bg-transparent">
// //                     <div
// //                       className="small text-muted mb-2 text-uppercase fw-bold"
// //                       style={{ fontSize: "0.75rem" }}>
// //                       {new Date(item.date).toLocaleDateString()}
// //                     </div>
// //                     <Link href={`/news/${createSlug(item.title)}`}>
// //                       <a className="text-decoration-none">
// //                         <h5 className="text-dark font-serif fw-bold hover-gold">
// //                           {item.title}
// //                         </h5>
// //                       </a>
// //                     </Link>
// //                     <hr className="w-25 border-warning border-2" />
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <p className="text-muted">No related updates at this time.</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .font-serif {
// //           font-family: "Georgia", serif;
// //         }
// //         .hover-gold:hover {
// //           color: #de9f57 !important;
// //           transition: 0.3s;
// //         }
// //         .cursor-pointer {
// //           cursor: pointer;
// //         }

// //         .article-text-content {
// //           font-size: 1.2rem;
// //           line-height: 1.9;
// //           color: #333;
// //         }

// //         .article-text-content :global(p) {
// //           margin-bottom: 1.8rem;
// //         }
// //         .article-text-content :global(img) {
// //           max-width: 100%;
// //           height: auto;
// //           border-radius: 8px;
// //           margin: 20px 0;
// //         }

// //         @media (max-width: 768px) {
// //           .display-3 {
// //             font-size: 2.2rem;
// //           }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// "use client";
// import React, { useState, useEffect } from "react";
// import Head from "next/head";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//   getAllNews,
//   getAllCapabilityCategories,
//   getAllLocationCities,
//   // getAllAttorneys, // Commented out for now
//   getImgUrl,
// } from "../../services/authService";

// export default function NewsDetail() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [newsItem, setNewsItem] = useState(null);
//   const [capabilities, setCapabilities] = useState([]);
//   const [offices, setOffices] = useState([]);
//   const [relatedNews, setRelatedNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- STATIC PROFESSIONALS DATA ---
//   const [professionals] = useState([
//     { id: 1, name: "Lori G. Cohen" },
//     { id: 2, name: "Steven Bainbridge" },
//     { id: 3, name: "Jeffrey A. Chester" },
//     { id: 4, name: "Clive Jones" },
//     { id: 5, name: "Paweł Piotrowski" },
//     { id: 6, name: "Guillermo Sánchez Chao" },
//     { id: 7, name: "Junko Suetomi" },
//     { id: 8, name: "Luis Jorge Akle Arronte" },
//     { id: 9, name: "David Argueta" },
//     { id: 10, name: "Stella (Sun Hye) Bae" },
//   ]);

//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w-]+/g, "")
//       .replace(/--+/g, "-");

//   const cleanHTML = (html) => (html ? html.replace(/&nbsp;/g, " ") : "");

//   useEffect(() => {
//     async function fetchPageData() {
//       if (!slug) return;
//       setLoading(true);
//       try {
//         const [newsRes, catRes, cityRes] = await Promise.all([
//           getAllNews(),
//           getAllCapabilityCategories(),
//           getAllLocationCities(),
//           // getAllAttorneys() // API call commented
//         ]);

//         // 1. Current News Item logic
//         const allNews = newsRes?.data || [];
//         const matched = allNews.find((item) => createSlug(item.title) === slug);
//         if (matched) {
//           setNewsItem(matched);
//           setRelatedNews(
//             allNews.filter((n) => n.id !== matched.id).slice(0, 3),
//           );
//         }

//         // 2. Set Dynamic Lists
//         setCapabilities(catRes?.data || []);
//         setOffices(cityRes?.data || cityRes || []);
//       } catch (err) {
//         console.error("Error fetching news detail data:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPageData();
//   }, [slug]);

//   if (loading)
//     return (
//       <div className="p-5 text-center">
//         <div className="spinner-border text-dark"></div>
//       </div>
//     );
//   if (!newsItem)
//     return (
//       <div className="p-5 text-center">
//         <h3>Article not found.</h3>
//       </div>
//     );

//   return (
//     <>
//       <Head>
//         <title>{newsItem.title} | Law Firm News</title>
//         <link
//           rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
//         />
//       </Head>

//       <div className="bg-white min-vh-100">
//         {/* --- HEADER SECTION (GT STYLE) --- */}
//         <div
//           className="py-5"
//           style={{ backgroundColor: "#2d2d2d", color: "#fff" }}>
//           <div className="container">
//             <div
//               className="small text-uppercase mb-3 opacity-75 fw-bold"
//               style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
//               {new Date(newsItem.date).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })}{" "}
//               | PRESS RELEASE
//             </div>
//             <h1
//               className="display-5 fw-bold mb-5 font-serif"
//               style={{ lineHeight: "1.2" }}>
//               {newsItem.title}
//             </h1>

//             <div className="row g-4 mt-2">
//               {/* 1. Related Professionals (STATIC) */}
//               <div className="col-lg-4">
//                 <span
//                   className="text-uppercase fw-bold d-block mb-2"
//                   style={{ fontSize: "0.65rem", color: "#999" }}>
//                   Related Professionals
//                 </span>
//                 <div className="header-list-container">
//                   {professionals.map((p, i) => (
//                     <React.Fragment key={p.id}>
//                       <Link href="/attorneys">
//                         <a className="text-decoration-none list-link">
//                           {p.name}
//                         </a>
//                       </Link>
//                       {i < professionals.length - 1 && (
//                         <span className="mx-1 text-muted">.</span>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>

//               {/* 2. Capabilities (DYNAMIC) */}
//               <div className="col-lg-4 border-start border-secondary border-opacity-25">
//                 <span
//                   className="text-uppercase fw-bold d-block mb-2"
//                   style={{ fontSize: "0.65rem", color: "#999" }}>
//                   Capabilities
//                 </span>
//                 <div className="header-list-container">
//                   {capabilities.map((c, i) => (
//                     <React.Fragment key={c.id}>
//                       <Link href={`/capability/${createSlug(c.categoryName)}`}>
//                         <a className="text-decoration-none list-link">
//                           {c.categoryName}
//                         </a>
//                       </Link>
//                       {i < capabilities.length - 1 && (
//                         <span className="mx-1 text-muted">.</span>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>

//               {/* 3. Offices (DYNAMIC) */}
//               <div className="col-lg-4 border-start border-secondary border-opacity-25">
//                 <span
//                   className="text-uppercase fw-bold d-block mb-2"
//                   style={{ fontSize: "0.65rem", color: "#999" }}>
//                   Offices
//                 </span>
//                 <div className="header-list-container">
//                   {offices.map((o, i) => (
//                     <React.Fragment key={o.id}>
//                       <Link href="/location">
//                         <a className="text-decoration-none list-link">
//                           {o.cityName}
//                         </a>
//                       </Link>
//                       {i < offices.length - 1 && (
//                         <span className="mx-1 text-muted">.</span>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- MAIN CONTENT SECTION --- */}
//         <div className="container py-5 mt-4">
//           <div className="row">
//             {/* STICKY SIDEBAR SHARE */}
//             <div className="col-lg-1 d-none d-lg-block">
//               <div className="sticky-top" style={{ top: "120px" }}>
//                 <p
//                   className="small fw-bold text-uppercase text-muted mb-3"
//                   style={{ fontSize: "0.6rem" }}>
//                   Share
//                 </p>
//                 <div
//                   className="d-flex flex-column gap-4 fs-5"
//                   style={{ color: "#666" }}>
//                   <i className="bi bi-linkedin icon-hover"></i>
//                   <i className="bi bi-twitter-x icon-hover"></i>
//                   <i className="bi bi-facebook icon-hover"></i>
//                   <i className="bi bi-envelope icon-hover"></i>
//                   <i
//                     className="bi bi-printer icon-hover"
//                     onClick={() => window.print()}></i>
//                 </div>
//               </div>
//             </div>

//             {/* ARTICLE BODY */}
//             <div className="col-lg-8 offset-lg-1">
//               <div className="article-main-text">
//                 <p
//                   className="fw-bold mb-4"
//                   style={{ fontSize: "1.1rem", color: "#000" }}>
//                   NEW YORK –{" "}
//                   {new Date(newsItem.date).toLocaleDateString("en-US", {
//                     month: "long",
//                     day: "numeric",
//                     year: "numeric",
//                   })}{" "}
//                   – {newsItem.title}.
//                 </p>
//                 <div
//                   className="content-render"
//                   style={{
//                     fontSize: "1.05rem",
//                     lineHeight: "1.8",
//                     color: "#333",
//                   }}
//                   dangerouslySetInnerHTML={{
//                     __html: cleanHTML(newsItem.textEditor || newsItem.content),
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- BOTTOM SECTION: INTERESTED IN --- */}
//         <div
//           className="py-5 mt-5"
//           style={{ backgroundColor: "#fcfcfc", borderTop: "1px solid #eee" }}>
//           <div className="container">
//             <h2
//               className="display-6 mb-5 font-serif fw-bold"
//               style={{ color: "#2d2d2d" }}>
//               You May Also Be Interested In:
//             </h2>
//             <div className="row">
//               {relatedNews.map((item) => (
//                 <div key={item.id} className="col-12 border-bottom py-4">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <span
//                       className="small text-uppercase fw-bold text-muted"
//                       style={{ fontSize: "0.7rem" }}>
//                       {new Date(item.date).toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })}{" "}
//                       | PRESS RELEASE
//                     </span>
//                     <span
//                       className="small text-muted text-uppercase"
//                       style={{ fontSize: "0.65rem" }}>
//                       — 1 min read
//                     </span>
//                   </div>
//                   <Link href={`/news/${createSlug(item.title)}`}>
//                     <a className="text-decoration-none">
//                       <h4
//                         className="fw-bold font-serif item-title-hover"
//                         style={{ color: "#a67c33" }}>
//                         {item.title}
//                       </h4>
//                     </a>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap");

//         .font-serif {
//           font-family: "Playfair Display", Georgia, serif;
//         }

//         /* Header List Styling */
//         .header-list-container {
//           line-height: 1.6;
//           font-size: 0.82rem;
//           max-height: 120px;
//           overflow-y: auto;
//           scrollbar-width: thin;
//         }
//         .list-link {
//           color: #be9144;
//           transition: 0.2s;
//         }
//         .list-link:hover {
//           color: #fff !important;
//           text-decoration: underline !important;
//         }

//         /* Icon Hover */
//         .icon-hover {
//           cursor: pointer;
//           transition: 0.2s;
//         }
//         .icon-hover:hover {
//           color: #be9144;
//         }

//         /* Article Styling */
//         .content-render p {
//           margin-bottom: 1.5rem;
//         }
//         .content-render img {
//           max-width: 100%;
//           height: auto;
//           margin: 2rem 0;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//         }

//         /* Bottom Section Hover */
//         .item-title-hover:hover {
//           text-decoration: underline !important;
//         }

//         /* Header Scrollbar */
//         .header-list-container::-webkit-scrollbar {
//           width: 3px;
//         }
//         .header-list-container::-webkit-scrollbar-thumb {
//           background: #555;
//         }
//       `}</style>
//     </>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  getAllNews,
  getAllCapabilityCategories,
  getAllLocationCities,
  getImgUrl,
} from "../../services/authService";

export default function NewsDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [newsItem, setNewsItem] = useState(null);
  const [capabilities, setCapabilities] = useState([]);
  const [offices, setOffices] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATIC PROFESSIONALS DATA ---
  const [professionals] = useState([
    { id: 1, name: "Lori G. Cohen" },
    { id: 2, name: "Steven Bainbridge" },
    { id: 3, name: "Jeffrey A. Chester" },
    { id: 4, name: "Clive Jones" },
    { id: 5, name: "Paweł Piotrowski" },
    { id: 6, name: "Guillermo Sánchez Chao" },
    { id: 7, name: "Junko Suetomi" },
    { id: 8, name: "Luis Jorge Akle Arronte" },
    { id: 9, name: "David Argueta" },
    { id: 10, name: "Stella (Sun Hye) Bae" },
  ]);

  // Standard Slug Creator (Must match your [slug].js logic)
  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/&/g, "and") // handles & symbols
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const cleanHTML = (html) => (html ? html.replace(/&nbsp;/g, " ") : "");

  useEffect(() => {
    async function fetchPageData() {
      if (!slug) return;
      setLoading(true);
      try {
        const [newsRes, catRes, cityRes] = await Promise.all([
          getAllNews(),
          getAllCapabilityCategories(),
          getAllLocationCities(),
        ]);

        const allNews = newsRes?.data || [];
        const matched = allNews.find((item) => createSlug(item.title) === slug);
        if (matched) {
          setNewsItem(matched);
          setRelatedNews(
            allNews.filter((n) => n.id !== matched.id).slice(0, 3),
          );
        }

        setCapabilities(catRes?.data || []);
        setOffices(cityRes?.data || cityRes || []);
      } catch (err) {
        console.error("Error fetching news detail data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPageData();
  }, [slug]);

  if (loading)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-dark"></div>
      </div>
    );
  if (!newsItem)
    return (
      <div className="p-5 text-center">
        <h3>Article not found.</h3>
      </div>
    );

  return (
    <>
      <Head>
        <title>{newsItem.title} | Law Firm News</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <div className="bg-white min-vh-100">
        {/* --- HEADER SECTION --- */}
        <div
          className="py-5"
          style={{ backgroundColor: "#2d2d2d", color: "#fff" }}>
          <div className="container">
            <div
              className="small text-uppercase mb-3 opacity-75 fw-bold"
              style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
              {new Date(newsItem.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              | PRESS RELEASE
            </div>
            <h1
              className="display-5 fw-bold mb-5 font-serif"
              style={{ lineHeight: "1.2" }}>
              {newsItem.title}
            </h1>

            <div className="row g-4 mt-2">
              {/* 1. Related Professionals (Static Links) */}
              <div className="col-lg-4">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Related Professionals
                </span>
                <div className="header-list-container">
                  {professionals.map((p, i) => (
                    <React.Fragment key={p.id}>
                      <Link href="/attorneys">
                        <a className="text-decoration-none list-link">
                          {p.name}
                        </a>
                      </Link>
                      {i < professionals.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 2. Capabilities (Dynamic Slugs) */}
              <div className="col-lg-4 border-start border-secondary border-opacity-25">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Capabilities
                </span>
                <div className="header-list-container">
                  {capabilities.map((c, i) => (
                    <React.Fragment key={c.id}>
                      {/* Navigates to /capability/[slug] */}
                      <Link href={`/capability/${createSlug(c.categoryName)}`}>
                        <a className="text-decoration-none list-link">
                          {c.categoryName}
                        </a>
                      </Link>
                      {i < capabilities.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 3. Offices (Dynamic Slugs) */}
              <div className="col-lg-4 border-start border-secondary border-opacity-25">
                <span
                  className="text-uppercase fw-bold d-block mb-2"
                  style={{ fontSize: "0.65rem", color: "#999" }}>
                  Offices
                </span>
                <div className="header-list-container">
                  {offices.map((o, i) => (
                    <React.Fragment key={o.id}>
                      {/* Navigates to /location/[slug] */}
                      <Link href={`/location/${createSlug(o.cityName)}`}>
                        <a className="text-decoration-none list-link">
                          {o.cityName}
                        </a>
                      </Link>
                      {i < offices.length - 1 && (
                        <span className="mx-1 text-muted">.</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="container py-5 mt-4">
          <div className="row">
            <div className="col-lg-1 d-none d-lg-block">
              <div className="sticky-top" style={{ top: "120px" }}>
                <p
                  className="small fw-bold text-uppercase text-muted mb-3"
                  style={{ fontSize: "0.6rem" }}>
                  Share
                </p>
                <div
                  className="d-flex flex-column gap-4 fs-5"
                  style={{ color: "#666" }}>
                  <i className="bi bi-linkedin icon-hover"></i>
                  <i className="bi bi-twitter-x icon-hover"></i>
                  <i className="bi bi-facebook icon-hover"></i>
                  <i className="bi bi-envelope icon-hover"></i>
                  <i
                    className="bi bi-printer icon-hover"
                    onClick={() => window.print()}></i>
                </div>
              </div>
            </div>

            <div className="col-lg-8 offset-lg-1">
              <div className="article-main-text">
                <p
                  className="fw-bold mb-4"
                  style={{ fontSize: "1.1rem", color: "#000" }}>
                  NEW YORK –{" "}
                  {new Date(newsItem.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  – {newsItem.title}.
                </p>
                <div
                  className="content-render"
                  style={{
                    fontSize: "1.05rem",
                    lineHeight: "1.8",
                    color: "#333",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: cleanHTML(newsItem.textEditor || newsItem.content),
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div
          className="py-5 mt-5"
          style={{ backgroundColor: "#fcfcfc", borderTop: "1px solid #eee" }}>
          <div className="container">
            {/* <h2
              className="display-6 mb-5 font-serif fw-bold"
              style={{ color: "#2d2d2d" }}>
              You May Also Be Interested In:
            </h2> */}
            <div className="row">
              {relatedNews.map((item) => (
                <div key={item.id} className="col-12 border-bottom py-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="small text-uppercase fw-bold text-muted"
                      style={{ fontSize: "0.7rem" }}>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      | PRESS RELEASE
                    </span>
                    <span
                      className="small text-muted text-uppercase"
                      style={{ fontSize: "0.65rem" }}>
                      — 1 min read
                    </span>
                  </div>
                  <Link href={`/news/${createSlug(item.title)}`}>
                    <a className="text-decoration-none">
                      <h4
                        className="fw-bold font-serif item-title-hover"
                        style={{ color: "#a67c33" }}>
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

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap");
        .font-serif {
          font-family: "Playfair Display", Georgia, serif;
        }
        .header-list-container {
          line-height: 1.6;
          font-size: 0.82rem;
          max-height: 120px;
          overflow-y: auto;
        }
        .list-link {
          color: #be9144;
          transition: 0.2s;
        }
        .list-link:hover {
          color: #fff !important;
          text-decoration: underline !important;
        }
        .icon-hover {
          cursor: pointer;
          transition: 0.2s;
        }
        .icon-hover:hover {
          color: #be9144;
        }
        .content-render p {
          margin-bottom: 1.5rem;
        }
        .item-title-hover:hover {
          text-decoration: underline !important;
        }
      `}</style>
    </>
  );
}