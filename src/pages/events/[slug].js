// // // import React, { useState, useEffect } from 'react';
// // // import { useRouter } from 'next/router';
// // // import Head from 'next/head';
// // // import Link from 'next/link';
// // // import {
// // //   getAllEvents,
// // //   getAllCapabilityCategories,
// // //   getAllCapabilitySubCategories,
// // //   getAllLocationCities,
// // //   getAllProfessionals,
// // //   IMG_URL
// // // } from '../../services/authService';

// // // export default function EventDetail() {
// // //   const router = useRouter();
// // //   const { slug } = router.query;

// // //   const [event, setEvent] = useState(null);
// // //   const [allEvents, setAllEvents] = useState([]);
// // //   const [categories, setCategories] = useState([]);
// // //   const [subCategories, setSubCategories] = useState([]);
// // //   const [cities, setCities] = useState([]);
// // //   const [professionals, setProfessionals] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const createSlug = (text) => text?.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       if (!slug) return;
// // //       setLoading(true);
// // //       try {
// // //         const [eventRes, catRes, subCatRes, cityRes, profRes] = await Promise.allSettled([
// // //           getAllEvents(), getAllCapabilityCategories(), getAllCapabilitySubCategories(), getAllLocationCities(), getAllProfessionals()
// // //         ]);

// // //         if (eventRes.status === 'fulfilled' && eventRes.value?.status) {
// // //           const found = eventRes.value.data.find(item => createSlug(item.title) === slug);
// // //           setEvent(found);
// // //           setAllEvents(eventRes.value.data.filter(item => createSlug(item.title) !== slug).slice(0, 3));
// // //         }

// // //         setCategories(catRes.status === 'fulfilled' ? catRes.value?.data || [] : []);
// // //         setSubCategories(subCatRes.status === 'fulfilled' ? (subCatRes.value?.data?.data || subCatRes.value?.data || []) : []);
// // //         setCities(cityRes.status === 'fulfilled' ? cityRes.value?.data || [] : []);
// // //         setProfessionals(profRes.status === 'fulfilled' ? profRes.value?.data || [] : []);
// // //       } catch (error) { console.error(error); } finally { setLoading(false); }
// // //     };
// // //     fetchData();
// // //   }, [slug]);

// // //   if (loading) return <div className="text-center py-5"><div className="spinner-border text-gold"></div></div>;
// // //   if (!event) return <div className="text-center py-5"><h3>Event Not Found</h3></div>;

// // //   const parseIds = (data) => {
// // //     try {
// // //       if (!data) return [];
// // //       if (Array.isArray(data)) return data.map(Number);
// // //       return JSON.parse(String(data).replace(/'/g, '"')).map(Number);
// // //     } catch (e) { return []; }
// // //   };

// // //   const renderProfessionals = () => {
// // //     const matched = professionals.filter(p => parseIds(event.attorneyId).includes(Number(p.id)));
// // //     return <span className="text-gold">{matched.length > 0 ? matched.map(p => p.attorneyName || `${p.firstName} ${p.lastName}`).join(" | ") : "Firm Wide"}</span>;
// // //   };

// // //   const renderCapabilities = () => {
// // //     const matchedSubs = subCategories.filter(s => parseIds(event.capabilityCategoryId).includes(Number(s.id)));
// // //     const grouped = matchedSubs.reduce((acc, sub) => {
// // //       const parentCat = categories.find(c => Number(c.id) === Number(sub.categoryId));
// // //       const catName = parentCat ? parentCat.categoryName : "Capability";
// // //       if (!acc[catName]) acc[catName] = [];
// // //       acc[catName].push(sub.subcategoryName);
// // //       return acc;
// // //     }, {});
// // //     return Object.keys(grouped).map((cat, i) => (
// // //       <span key={i} className="me-3">
// // //         <span className="text-white fw-bold">{cat}: </span><span className="text-gold">{grouped[cat].join(", ")}</span>
// // //         {i < Object.keys(grouped).length - 1 && <span className="ms-3 text-white opacity-25">|</span>}
// // //       </span>
// // //     ));
// // //   };

// // //   let social = { linkedin: "#", twitter: "#", facebook: "#" };
// // //   try { if(event.socialLinks) social = JSON.parse(event.socialLinks.replace(/,\s*}/, '}')); } catch (e) {}

// // //   return (
// // //     <div className="bg-white">
// // //       <Head><title>{event.title} | Core Law Events</title></Head>

// // //       {/* HEADER SECTION (Dark Blue) */}
// // //       <header className="py-5" style={{ backgroundColor: 'var(--dark-navy)', paddingTop: '120px !important' }}>
// // //         <div className="container pt-5 pb-4">
// // //           <div className="d-flex align-items-center gap-3 text-white small fw-bold mb-4 opacity-75 text-uppercase">
// // //             <span>{event.date}</span>
// // //             <span className="border-start ps-3">EVENT</span>
// // //           </div>
// // //           <h1 className="font-serif text-white mb-5 display-4">{event.title}</h1>

// // //           <div className="border-top border-secondary pt-4 mt-4">
// // //             <div className="row mb-2">
// // //                <div className="col-lg-3 fw-bold text-white text-uppercase small letter-spacing-1">Related Professionals</div>
// // //                <div className="col-lg-9">{renderProfessionals()}</div>
// // //             </div>
// // //             <div className="row mb-2">
// // //                <div className="col-lg-3 fw-bold text-white text-uppercase small letter-spacing-1">Capabilities</div>
// // //                <div className="col-lg-9">{renderCapabilities()}</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* BODY SECTION */}
// // //       <main className="container py-5 mt-4">
// // //         <div className="row g-5">
// // //           {/* Sidebar Share Icons */}
// // //           <div className="col-lg-1 text-center d-none d-lg-block">
// // //             <span className="text-uppercase small fw-bold text-muted d-block mb-4">Share</span>
// // //             <div className="d-flex flex-column gap-4 align-items-center sticky-top" style={{ top: '120px' }}>
// // //               <a href={social.linkedin} target="_blank" className="text-blue fs-4"><i className="bi bi-linkedin"></i></a>
// // //               <a href={social.twitter} target="_blank" className="text-blue fs-4"><i className="bi bi-twitter"></i></a>
// // //               <a href={social.facebook} target="_blank" className="text-blue fs-4"><i className="bi bi-facebook"></i></a>
// // //               <a href={`mailto:?subject=${event.title}`} className="text-blue fs-4"><i className="bi bi-envelope"></i></a>
// // //               <i className="bi bi-printer text-blue fs-4 cursor-pointer" onClick={() => window.print()}></i>
// // //             </div>
// // //           </div>

// // //           {/* Main Content Area */}
// // //           <div className="col-lg-11 col-md-12">

// // //             {/* LOCATION & REGISTRATION BOX (Screenshot ke mutabiq) */}
// // //             <div className="row mb-5 g-4 py-4 border-bottom border-light">
// // //                 <div className="col-md-3 fw-bold text-dark text-uppercase small">Location Details</div>
// // //                 <div className="col-md-9 text-secondary">
// // //                     {cities.find(c => parseIds(event.cityId).includes(Number(c.id)))?.cityName || "Global Office"}
// // //                     <br />
// // //                     {/* Yahan aap address field bhi add kar sakte hain agar backend mein ho */}
// // //                 </div>

// // //                 <div className="col-md-3 fw-bold text-dark text-uppercase mt-4 small">Registration</div>
// // //                 <div className="col-md-9 mt-4">
// // //                     <a href={event.registrationLink || "#"} target="_blank" className="text-gold text-decoration-underline fw-bold">
// // //                         {event.registrationLink || "Register for this event"}
// // //                     </a>
// // //                 </div>
// // //             </div>

// // //             {/* DESCRIPTION SECTION */}
// // //             <div className="article-body fs-5 text-dark mt-5" dangerouslySetInnerHTML={{ __html: event.textEditor }} />
// // //           </div>
// // //         </div>
// // //       </main>

// // //       {/* RELATED EVENTS SECTION (Black Footer) */}
// // //       <section className="bg-dark py-5 text-white">
// // //         <div className="container py-5">
// // //           <h2 className="font-serif border-bottom border-secondary pb-4 mb-5">You May Also Be Interested In:</h2>
// // //           {allEvents.map((item) => (
// // //             <div key={item.id} className="border-bottom border-secondary pb-4 mb-4">
// // //               <div className="row align-items-center g-3">
// // //                 <div className="col-md-9">
// // //                   <div className="small text-muted mb-2 text-uppercase fw-bold">{item.date} — EVENT</div>
// // //                   <Link href={`/events/${createSlug(item.title)}`}>
// // //                     <a className="font-serif text-gold text-decoration-none h3 d-block">{item.title}</a>
// // //                   </Link>
// // //                 </div>
// // //                 <div className="col-md-3 text-md-end text-muted small">
// // //                   <span className="d-none d-md-inline-block border-top me-2" style={{ width: '30px', verticalAlign: 'middle' }}></span>
// // //                   1 min read
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect } from 'react';
// // import { useRouter } from 'next/router';
// // import Head from 'next/head';
// // import Link from 'next/link';
// // import {
// //   getAllEvents,
// //   getAllCapabilitySubCategories,
// //   getAllLocationCities,
// //   getAllProfessionals,
// //   IMG_URL
// // } from '../../services/authService';

// // export default function EventDetail() {
// //   const router = useRouter();
// //   const { slug } = router.query;

// //   const [event, setEvent] = useState(null);
// //   const [allEvents, setAllEvents] = useState([]);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [cities, setCities] = useState([]);
// //   const [professionals, setProfessionals] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const createSlug = (text) =>
// //     text?.toLowerCase().trim().replace(/&/g, 'and').replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       if (!slug) return;
// //       setLoading(true);
// //       try {
// //         const [eventRes, subCatRes, cityRes, profRes] = await Promise.allSettled([
// //           getAllEvents(),
// //           getAllCapabilitySubCategories(),
// //           getAllLocationCities(),
// //           getAllProfessionals()
// //         ]);

// //         if (eventRes.status === 'fulfilled' && eventRes.value?.success) {
// //           const eventsData = eventRes.value.data;
// //           let foundEvent = eventsData.find((e) => createSlug(e.title) === slug || String(e.id) === slug);
// //           setEvent(foundEvent);
// //           setAllEvents(eventsData.filter((e) => e.id !== (foundEvent?.id || 0)).slice(0, 3));
// //         }

// //         setSubCategories(subCatRes.status === 'fulfilled' ? (subCatRes.value?.data?.data || subCatRes.value?.data || []) : []);
// //         setCities(cityRes.status === 'fulfilled' ? cityRes.value?.data || [] : []);
// //         setProfessionals(profRes.status === 'fulfilled' ? profRes.value?.data || [] : []);
// //       } catch (error) {
// //         console.error("Error fetching event details", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [slug]);

// //   if (loading) return <div className="text-center py-5 mt-5"><div className="spinner-border text-warning"></div></div>;
// //   if (!event) return <div className="text-center py-5 mt-5"><h3>Event Not Found</h3></div>;

// //   const formatDateRange = (start, end) => {
// //     const options = { month: 'long', day: 'numeric', year: 'numeric' };
// //     const s = new Date(start).toLocaleDateString('en-US', options);
// //     const e = new Date(end).toLocaleDateString('en-US', options);
// //     return s === e ? s : `${s} - ${e}`;
// //   };

// //   const getCityNames = (ids) => {
// //     const matched = cities.filter(c => (ids || []).includes(Number(c.id)));
// //     return matched.length > 0 ? matched.map(c => c.cityName).join(' | ') : 'Global Office';
// //   };

// //   return (
// //     <div className="bg-white">
// //       <Head><title>{event.title} | Core Law</title></Head>

// //       {/* --- HERO SECTION --- */}
// //       <header className="bg-dark text-white pt-5 pb-5">
// //         <div className="container pt-5 mt-4">
// //           <div className="mb-2 opacity-75">
// //              <span className="text-uppercase fw-bold small tracking-widest">
// //                 {formatDateRange(event.startDate, event.endDate)}
// //              </span>
// //              <span className="mx-2">|</span>
// //              <span className="text-uppercase fw-bold small">Event</span>
// //           </div>
// //           <h1 className="display-4 fw-bold mb-5 lh-sm" style={{ fontFamily: 'Georgia, serif' }}>{event.title}</h1>

// //           <div className="row g-3 border-top border-secondary pt-4">
// //             <div className="col-md-2 text-uppercase small fw-bold text-white">Related Professionals</div>
// //             <div className="col-md-10 fw-bold gold-text">
// //                 {professionals.filter(p => (event.attorneyIds || []).includes(Number(p.id))).map(p => p.attorneyName || `${p.firstName} ${p.lastName}`).join(', ') || 'Ian C. Ballon'}
// //             </div>
// //             <div className="col-md-2 text-uppercase small fw-bold fw-bold text-white">Capabilities</div>
// //             <div className="col-md-10 fw-bold gold-text">
// //                 {subCategories.filter(s => (event.subcategoryIds || []).includes(Number(s.id))).map(s => s.subcategoryName).join(', ') || 'Data Privacy'}
// //             </div>
// //             <div className="col-md-2 text-uppercase small fw-bold text-white">Offices</div>
// //             <div className="col-md-10 fw-bold gold-text">{getCityNames(event.cityIds)}</div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* --- MAIN CONTENT SECTION --- */}
// //       <main className="container py-5 mt-4">
// //         <div className="row justify-content-center">
// //           <div className="col-lg-10">

// //             {/* Meta Table (Location & Registration) */}
// //             <div className="row py-4 border-bottom mb-5 g-0">
// //               <div className="col-md-4 py-3">
// //                 <h6 className="text-uppercase fw-bold small text-muted">Location Details</h6>
// //               </div>
// //               <div className="col-md-8 py-3 fs-5 text-dark fw-medium">
// //                 {getCityNames(event.cityIds)} Office<br/>
// //                 <span className="text-muted small">United States</span>
// //               </div>

// //             </div>

// //             {/* Icons and Text Row (Aligned Together) */}
// //             <div className="row g-0 pt-4">
// //               {/* Share Icons Column */}
// //               <div className="col-1 col-md-1">
// //                 <div className="sticky-top" style={{ top: '110px' }}>
// //                   <p className="text-uppercase fw-bold text-muted" style={{ fontSize: '17px', marginBottom: '20px' }}>Share</p>
// //                   <div className="d-flex flex-column gap-4 fs-2 text-muted">
// //                     <a href="#" className="hover-gold text-secondary"><i className="bi bi-linkedin"></i></a>
// //                     <a href="#" className="hover-gold text-secondary"><i className="bi bi-twitter-x"></i></a>
// //                     <a href="#" className="hover-gold text-secondary"><i className="bi bi-facebook"></i></a>
// //                     <a href="#" className="hover-gold text-secondary"><i className="bi bi-envelope"></i></a>
// //                     <a href="#" onClick={() => window.print()} className="hover-gold text-secondary"><i className="bi bi-printer"></i></a>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Description Content Column */}
// //               <div className="col-3 col-md-11 ps-md-5">
// //                 <div className="description-body">
// //                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
// //                 </div>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </main>

      // {/* --- INTERESTED IN SECTION --- */}
      // <section className="bg-dark text-white py-5">
      //   <div className="container py-5">
      //     <h2 className="display-6 fw-bold border-bottom border-secondary pb-4 mb-5" style={{ fontFamily: 'Georgia, serif' }}>
      //       You May Also Be Interested In:
      //     </h2>
      //     {allEvents.map((item) => (
      //       <div key={item.id} className="border-bottom border-secondary pb-4 mb-4">
      //          <p className="small fw-bold text-uppercase text-white-50 mb-2">
      //            {formatDateRange(item.startDate, item.endDate)} | Event
      //          </p>
      //          <Link href={`/events/${createSlug(item.title)}`}>
      //            <a className="h3 gold-text text-decoration-none fw-bold d-block mb-1" style={{ fontFamily: 'Georgia, serif' }}>{item.title}</a>
      //          </Link>
      //          <p className="text-white-50 small mb-0">{getCityNames(item.cityIds)}, United States</p>
      //       </div>
      //     ))}
      //   </div>
      // </section>

// //       <style jsx global>{`
// //         .gold-text { color: #c5a059 !important; }
// //         .hover-gold:hover { color: #c5a059 !important; }
// //         .tracking-widest { letter-spacing: 0.1em; }

// //         /* Description Body Styling to prevent 'cutting' and gaps */
// //         .description-body {
// //           font-size: 1.15rem;
// //           line-height: 0.7;
// //           color: #333;
// //           font-family: 'Arial', sans-serif;

// //         }
// //         .description-body p {

// //           text-align: left; /* Justify hata diya taaki text clean dikhe */
// //         }
// //         .description-body strong {
// //           color: #000;
// //           font-weight: 700;
// //         }
// //         .description-body a {
// //           color: #c5a059;
// //           text-decoration: underline;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import React, { useState, useEffect, Fragment } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import {
//   getAllEvents,
//   getAllCapabilityCategories,
//   getAllLocationCities,
// } from "../../services/authService";

// export default function EventDetail() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [event, setEvent] = useState(null);
//   const [allEvents, setAllEvents] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const parseIds = (data) => {
//     if (!data) return [];
//     if (Array.isArray(data)) return data.map(Number);
//     if (typeof data === "string") {
//       try {
//         const parsed = JSON.parse(data);
//         return Array.isArray(parsed) ? parsed.map(Number) : [Number(data)];
//       } catch (e) {
//         return [Number(data)];
//       }
//     }
//     return [Number(data)];
//   };

//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/&/g, "and")
//       .replace(/[^a-z0-9 -]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!slug) return;
//       setLoading(true);
//       try {
//         const [eventRes, cityRes, catRes] = await Promise.allSettled([
//           getAllEvents(),
//           getAllLocationCities(),
//           getAllCapabilityCategories(),
//         ]);

//         const fetchedCities =
//           cityRes.status === "fulfilled"
//             ? cityRes.value?.data || cityRes.value || []
//             : [];
//         const fetchedCats =
//           catRes.status === "fulfilled"
//             ? catRes.value?.data || catRes.value || []
//             : [];

//         setCities(fetchedCities);
//         setCategories(fetchedCats);

//         if (eventRes.status === "fulfilled") {
//           const eventsData = eventRes.value?.data || eventRes.value || [];
//           let foundEvent = eventsData.find(
//             (e) => createSlug(e.title) === slug || String(e.id) === slug,
//           );
//           setEvent(foundEvent);
//           setAllEvents(
//             eventsData
//               .filter((e) => e.id !== (foundEvent?.id || 0))
//               .slice(0, 3),
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching event details", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [slug]);

//   if (loading)
//     return (
//       <div className="text-center py-5 mt-5">
//         <div className="spinner-border text-warning"></div>
//       </div>
//     );
//   if (!event)
//     return (
//       <div className="text-center py-5 mt-5">
//         <h3>Event Not Found</h3>
//       </div>
//     );

//   const formatDateRange = (start, end) => {
//     const options = { month: "long", day: "numeric", year: "numeric" };
//     const s = new Date(start).toLocaleDateString("en-US", options);
//     if (!end) return s;
//     const e = new Date(end).toLocaleDateString("en-US", options);
//     return s === e ? s : `${s} - ${e}`;
//   };

//   const matchedCities = cities.filter((c) =>
//     parseIds(event.cityIds || event.cityId).includes(Number(c.id)),
//   );
//   const matchedCategories = categories.filter((cat) =>
//     parseIds(event.capabilityCategoryId).includes(Number(cat.id)),
//   );

//   return (
//     <div className="bg-white">
//       <Head>
//         <title>{event.title} | Core Law</title>
//       </Head>

//       <header className="bg-dark text-white pt-5 pb-5">
//         <div className="container pt-5 mt-4">
//           <div className="mb-2 opacity-75">
//             <span className="text-uppercase fw-bold small tracking-widest">
//               {formatDateRange(event.startDate, event.endDate)}
//             </span>
//             <span className="mx-2">|</span>
//             <span className="text-uppercase fw-bold small">Event</span>
//           </div>
//           <h1
//             className="display-4 fw-bold mb-5 lh-sm"
//             style={{ fontFamily: "Georgia, serif" }}>
//             {event.title}
//           </h1>

//           <div className="row g-3 border-top border-secondary pt-4">
//             <div className="col-md-2 text-uppercase small fw-bold text-white">
//               Related Professionals
//             </div>
//             <div className="col-md-10 fw-bold gold-text">Ian C. Ballon</div>

//             <div className="col-md-2 text-uppercase small fw-bold text-white">
//               Capabilities
//             </div>
//             <div className="col-md-10 fw-bold">
//               {matchedCategories.length > 0 ? (
//                 matchedCategories.map((cat, index) => (
//                   <Fragment key={cat.id}>
//                     <Link href={`/capability/${createSlug(cat.categoryName)}`}>
//                       <a className="gold-text text-decoration-none hover-white">
//                         {cat.categoryName}
//                       </a>
//                     </Link>
//                     {index < matchedCategories.length - 1 && (
//                       <span className="text-white">, </span>
//                     )}
//                   </Fragment>
//                 ))
//               ) : (
//                 <span className="gold-text">Legal Practice</span>
//               )}
//             </div>

//             <div className="col-md-2 text-uppercase small fw-bold text-white">
//               Offices
//             </div>
//             <div className="col-md-10 fw-bold">
//               {matchedCities.length > 0 ? (
//                 matchedCities.map((c, index) => (
//                   <Fragment key={c.id}>
//                     <Link href={`/location/${createSlug(c.cityName)}`}>
//                       <a className="gold-text text-decoration-none hover-white">
//                         {c.cityName}
//                       </a>
//                     </Link>
//                     {index < matchedCities.length - 1 && (
//                       <span className="text-white"> | </span>
//                     )}
//                   </Fragment>
//                 ))
//               ) : (
//                 <span className="gold-text">Global Office</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="container py-5 mt-4">
//         <div className="row justify-content-center">
//           <div className="col-lg-10">
//             <div className="row py-4 border-bottom mb-5 g-0">
//               <div className="col-md-4 py-3">
//                 <h6 className="text-uppercase fw-bold small text-muted">
//                   Location Details
//                 </h6>
//               </div>
//               <div className="col-md-8 py-3 fs-5 text-dark fw-medium">
//                 {matchedCities.length > 0
//                   ? matchedCities.map((c) => (
//                       <div key={c.id}>
//                         <Link href={`/location/${createSlug(c.cityName)}`}>
//                           <a className="text-dark text-decoration-none hover-gold">
//                             {c.cityName} Office
//                           </a>
//                         </Link>
//                       </div>
//                     ))
//                   : "Global Office"}
//                 <span className="text-muted small d-block mt-1">
//                   Core Law, P.A.
//                 </span>
//               </div>
//             </div>

//             <div className="row g-0 pt-4">
//               <div className="col-1 col-md-1">
//                 <div className="sticky-top" style={{ top: "110px" }}>
//                   <p
//                     className="text-uppercase fw-bold text-muted"
//                     style={{ fontSize: "17px", marginBottom: "20px" }}>
//                     Share
//                   </p>
//                   <div className="d-flex flex-column gap-4 fs-2 text-muted">
//                     <a href="#" className="hover-gold text-secondary">
//                       <i className="bi bi-linkedin"></i>
//                     </a>
//                     <a href="#" className="hover-gold text-secondary">
//                       <i className="bi bi-twitter-x"></i>
//                     </a>
//                     <a href="#" className="hover-gold text-secondary">
//                       <i className="bi bi-facebook"></i>
//                     </a>
//                     <a href="#" className="hover-gold text-secondary">
//                       <i className="bi bi-envelope"></i>
//                     </a>
//                     <a
//                       href="#"
//                       onClick={() => window.print()}
//                       className="hover-gold text-secondary">
//                       <i className="bi bi-printer"></i>
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-11 ps-md-5">
//                 <div className="description-body">
//                   <div
//                     dangerouslySetInnerHTML={{ __html: event.description }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <section className="bg-dark text-white py-5">
//         <div className="container py-5">
//           {/* <h2
//             className="display-6 fw-bold border-bottom border-secondary pb-4 mb-5"
//             style={{ fontFamily: "Georgia, serif" }}>
//             You May Also Be Interested In:
//           </h2> */}
//           {allEvents.map((item) => (
//             <div
//               key={item.id}
//               className="border-bottom border-secondary pb-4 mb-4">
//               <p className="small fw-bold text-uppercase text-white-50 mb-2">
//                 {formatDateRange(item.startDate, item.endDate)} | Event
//               </p>
//               <Link href={`/events/${createSlug(item.title)}`}>
//                 <a
//                   className="h3 gold-text text-decoration-none fw-bold d-block mb-1"
//                   style={{ fontFamily: "Georgia, serif" }}>
//                   {item.title}
//                 </a>
//               </Link>
//               <p className="text-white-50 small mb-0">
//                 {cities
//                   .filter((c) =>
//                     parseIds(item.cityIds || item.cityId).includes(
//                       Number(c.id),
//                     ),
//                   )
//                   .map((c) => c.cityName)
//                   .join(", ")}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       <style jsx global>{`
//         .gold-text {
//           color: #c5a059 !important;
//         }
//         .hover-gold:hover {
//           color: #c5a059 !important;
//         }
//         .hover-white:hover {
//           color: #fff !important;
//           text-decoration: underline !important;
//         }
//         .tracking-widest {
//           letter-spacing: 0.1em;
//         }
//         .description-body {
//           font-size: 1.15rem;
//           line-height: 1.7;
//           color: #333;
//         }
//         .description-body p {
//           margin-bottom: 1.5rem;
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  getAllEvents,
  getAllCapabilityCategories,
  getAllLocationCities,
} from "../../services/authService";

export default function EventDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <title>{event.title} | Core Law</title>
      </Head>

      <header className="bg-dark text-white pt-5 pb-5">
        <div className="container pt-5 mt-4">
          <div className="mb-2 opacity-75">
            <span className="text-uppercase fw-bold small tracking-widest">
              {formatDateRange(event.startDate, event.endDate)}
            </span>
            <span className="mx-2">|</span>
            <span className="text-uppercase fw-bold small">Event</span>
          </div>
          <h1
            className="display-4 fw-bold mb-5 lh-sm"
            style={{ fontFamily: "Georgia, serif" }}>
            {event.title}
          </h1>

          <div className="row g-3 border-top border-secondary pt-4">
            <div className="col-md-2 text-uppercase small fw-bold text-white">
              Related Professionals
            </div>
            <div className="col-md-10 fw-bold gold-text">Ian C. Ballon</div>

            <div className="col-md-2 text-uppercase small fw-bold text-white">
              Capabilities
            </div>
            <div className="col-md-10 fw-bold">
              {matchedCategories.length > 0 ? (
                matchedCategories.map((cat, index) => (
                  <Fragment key={cat.id}>
                    <Link href={`/capability/${createSlug(cat.categoryName)}`}>
                      <a className="gold-text text-decoration-none hover-white">
                        {cat.categoryName}
                      </a>
                    </Link>
                    {index < matchedCategories.length - 1 && (
                      <span className="text-white">, </span>
                    )}
                  </Fragment>
                ))
              ) : (
                <span className="gold-text">Legal Practice</span>
              )}
            </div>

            <div className="col-md-2 text-uppercase small fw-bold text-white">
              Offices
            </div>
            <div className="col-md-10 fw-bold">
              {matchedCities.length > 0 ? (
                matchedCities.map((c, index) => (
                  <Fragment key={c.id}>
                    <Link href={`/location/${createSlug(c.cityName)}`}>
                      <a className="gold-text text-decoration-none hover-white">
                        {c.cityName}
                      </a>
                    </Link>
                    {index < matchedCities.length - 1 && (
                      <span className="text-white"> | </span>
                    )}
                  </Fragment>
                ))
              ) : (
                <span className="gold-text">Global Office</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5 mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row py-4 border-bottom mb-5 g-0">
              <div className="col-md-4 py-3">
                <h6 className="text-uppercase fw-bold small text-muted">
                  Location Details
                </h6>
              </div>
              <div className="col-md-8 py-3 fs-5 text-dark fw-medium">
                {matchedCities.length > 0
                  ? matchedCities.map((c) => (
                      <div key={c.id}>
                        <Link href={`/location/${createSlug(c.cityName)}`}>
                          <a className="text-dark text-decoration-none hover-gold">
                            {c.cityName} Office
                          </a>
                        </Link>
                      </div>
                    ))
                  : "Global Office"}
              </div>
            </div>

            <div className="row g-0 pt-4">
              {/* SOCIAL MEDIA SIDEBAR (Keep as is) */}
              <div className="col-1 col-md-1">
                <div className="sticky-top" style={{ top: "110px" }}>
                  <p
                    className="text-uppercase fw-bold text-muted"
                    style={{ fontSize: "17px", marginBottom: "20px" }}>
                    Share
                  </p>
                  <div className="d-flex flex-column gap-4 fs-2 text-muted">
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-twitter-x"></i>
                    </a>
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="hover-gold text-secondary">
                      <i className="bi bi-envelope"></i>
                    </a>
                    <a
                      href="#"
                      onClick={() => window.print()}
                      className="hover-gold text-secondary">
                      <i className="bi bi-printer"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION AREA WITH FIX */}
              <div className="col-11 ps-md-5">
                <div className="description-body">
                  <div
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      wordBreak: "normal",
                    }}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="bg-dark text-white py-5">
        <div className="container py-5">
          <h3 className="pb-2">You May Also Be Interested In:</h3>
          {allEvents.map((item) => (
            <div
              key={item.id}
              className="border-bottom border-secondary pb-4 mb-4">
              <p className="small fw-bold text-uppercase text-white-50 mb-2">
                {formatDateRange(item.startDate, item.endDate)} | Event
              </p>
              <Link href={`/events/${createSlug(item.title)}`}>
                <a
                  className="h3 gold-text text-decoration-none fw-bold d-block mb-1"
                  style={{ fontFamily: "Georgia, serif" }}>
                  {item.title}
                </a>
              </Link>
              <p className="text-white-50 small mb-0">
                {cities
                  .filter((c) =>
                    parseIds(item.cityIds || item.cityId).includes(
                      Number(c.id),
                    ),
                  )
                  .map((c) => c.cityName)
                  .join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
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
        .tracking-widest {
          letter-spacing: 0.1em;
        }
        .description-body {
          font-size: 1.15rem;
          line-height: 1.7;
          color: #333;
          /* Wrapping fix starts here */
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        .description-body p {
          margin-bottom: 1.5rem;
          white-space: normal !important; /* Forces backend HTML to wrap */
        }
        .description-body span {
          white-space: normal !important; /* Forces spans to wrap */
        }
        .description-body ul,
        .description-body li {
          white-space: normal !important;
        }
      `}</style>
    </div>
  );
}