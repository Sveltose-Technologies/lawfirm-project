// // // // import Link from 'next/link';
// // // // import React from 'react';

// // // // function Banner1() {

// // // //   const handleDeadClick = (e) => {
// // // //     e.preventDefault();
// // // //   };

// // // //   return (
// // // //     <>
// // // //       {/* =========================================
// // // //           SECTION 1: MAIN HERO BANNER
// // // //       ========================================= */}
// // // //       <div className="banner-section">
// // // //         <div className="container banner-content px-3">
// // // //           <div className="row justify-content-center m-0">
// // // //             <div className="col-lg-10 text-center">

// // // //               <div className="py-3">
// // // //                 <h1 className="text-white mb-3">
// // // //                   Global Legal Excellence
// // // //                 </h1>
// // // //                 <p className="lead text-white-50 mb-0 px-2">
// // // //                   Defining the future of law with integrity, innovation, and impact.
// // // //                 </p>
// // // //               </div>

// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

//       {/* =========================================
//           NEW SECTION: HERO STATS BAR (Premium Blue Design)
//       ========================================= */}
//       {/* Blue Background added via CSS class 'hero-stats-bar' */}
//  <div className="hero-stats-bar" style={{ marginTop: '30px' }}>
//         <div className="container">
//           <div className="row text-center m-0">

//             {/* Item 1 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0 display-6">2,500+</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">Consultations</p>
//             </div>

//             {/* Item 2 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">Success Rate</p>
//             </div>

//             {/* Item 3 */}
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">Years Experience</p>
//             </div>

//             {/* Item 4 */}
//             <div className="col-6 col-md-3 py-4">
//               <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
//               <p className="text-white small mb-0 text-uppercase tracking-wide">Attorneys</p>
//             </div>

//           </div>
//         </div>
//       </div>

// // // //       {/* =========================================
// // // //           SECTION 2: IN MEMORIAM
// // // //       ========================================= */}
// // // //       <div id="memoriam" className="memoriam-section py-4">
// // // //         <div className="container py-lg-4 px-3">
// // // //           <div className="row align-items-center m-0">

// // // //             <div className="col-lg-5 mb-4 mb-lg-0 text-center text-lg-start">
// // // //               <img
// // // //                 src="/assets/images/banner-img2.png"
// // // //                 alt="Larry J. Hoffman"
// // // //                 className="img-fluid memoriam-img shadow"
// // // //               />
// // // //             </div>

// // // //             <div className="col-lg-7 ps-lg-5">
// // // //               <h2 className="mb-3 font-serif">In Memoriam: Larry J. Hoffman</h2>
// // // //                <p className="text-secondary mb-4">
// // // //                It is with a heavy heart that we announce the passing of Larry J. Hoffman, one of Greenberg Traurig&apos;s co-founders.
// // // //               </p>
// // // //              <p className="text-secondary mb-4">
// // // //                 Larry&apos;s strategic vision and business acumen set the blueprint for a global law firm.
// // // //               </p>

// // // //              <a href="#" onClick={handleDeadClick} className="btn-premium">
// // // //                  IN MEMORIAM
// // // //                 </a>
// // // //             </div>
// // // // {/* IN MEMORIAM */}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* =========================================
// // // //           SECTION 3: MISSION
// // // //       ========================================= */}
// // // //       <div className="mission-section py-4 bg-white">
// // // //         <div className="container text-center py-lg-3 px-3">
// // // //           <div className="row justify-content-center m-0">
// // // //             <div className="col-lg-9">

// // // //               <h2 className="mb-3 text-dark">Adapt. Act. Advance.</h2>
// // // //                <p className="text-secondary mb-4">
// // // //               In a rapidly changing world, having the right legal partner makes a vital difference. At Greenberg Traurig, we help clients master uncertainty through proactive legal strategies, skilled counsel, and access to vast resources worldwide.
// // // //               </p>

// // // //               <div className="d-flex justify-content-center gap-3">
// // // //                 <a href="#" onClick={handleDeadClick} className="btn-premium">
// // // //                    LEARN MORE
// // // //                 </a>
// // // //               </div>

// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* =========================================
// // // //           SECTION 4: HUB
// // // //       ========================================= */}
// // // //       <div className="featured-hubs py-4 bg-light">
// // // //         <div className="container px-3">
// // // //           <div className="row g-0 card-shadow">

// // // //             <div className="col-lg-6">
// // // //               <div className="h-100">
// // // //                 <img
// // // //                   src="/assets/images/banner-img3.png"
// // // //                   alt="White House"
// // // //                   className="img-cover"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             <div className="col-lg-6 d-flex align-items-center p-4">
// // // //               <div>
// // // //                 <h2 className="mb-3 font-serif text-blue">
// // // //                   Executive Order and <br /> Presidential Actions Hub
// // // //                 </h2>
// // // //                 <p className="mb-4 text-secondary">
// // // //                   President Donald Trump has opened his second term with more than 100 executive orders, proclamations and memorandums. These executive actions will have broad legal and economic impacts on public and private sector entities.
// // // //                 </p>

// // // //                 <a href="#" onClick={handleDeadClick} className="btn-premium">
// // // //                   EXPLORE HUB
// // // //                 </a>
// // // //               </div>
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       {/* =========================================
// // // //           SECTION 5: CTA
// // // //       ========================================= */}
// // // //       <div className="cta-section py-4 bg-white">
// // // //         <div className="container px-3">
// // // //           <div className="row g-0 card-shadow bg-light">

// // // //             <div className="col-lg-6 d-flex align-items-center p-4 order-lg-1 order-2">
// // // //               <div>
// // // //                 <h2 className="mb-3 font-serif text-blue">
// // // //                   Corporate Transparency Act <br /> Task Force
// // // //                 </h2>

// // // //                 <p className="text-secondary mb-4">
// // // //                    On Jan. 1, 2024, the Corporate Transparency Act (CTA) took effect, requiring non-exempt U.S. entities and non-exempt foreign entities registered to do business in the United States to submit beneficial ownership information (BOI) reports.
// // // //                 </p>

// // // //                 <a href="#" onClick={handleDeadClick} className="btn-premium">
// // // //                   LEARN MORE
// // // //                 </a>
// // // //               </div>
// // // //             </div>

// // // //             <div className="col-lg-6 order-lg-2 order-1">
// // // //               <div className="h-100">
// // // //                 <img
// // // //                   src="/assets/images/banner-img4.png"
// // // //                   alt="Abstract Architecture"
// // // //                   className="img-cover"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //           </div>
// // // //         </div>
// // // //       </div>

// // //       {/* =========================================
// // //           SECTION 7: STATS (Footer Stats) - SPACE REDUCED
// // //       ========================================= */}
// // //       {/* Changed py-4 or py-5 to py-3 for less space */}
// // //       <div className="stats-section py-3">
// // //         <div className="container py-2 px-3">

// // //           <div className="row text-center mb-3 justify-content-center m-0">
// // //             <div className="col-lg-8">
// // //               <h2 className="mb-1">Global scale with street smarts.</h2>
// // //               <p className="lead text-white-50 mb-0" style={{ fontSize: '1rem' }}>
// // //                 With 51 locations, Greenberg Traurig&apos;s global network provides the platform clients need.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="row text-center gy-3 gx-md-5 mt-2 justify-content-center m-0">
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>800+</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">Chambers Rankings</p>
// // //             </div>
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>60+</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">Languages Spoken</p>
// // //             </div>
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>15</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">Countries</p>
// // //             </div>
// // //             <div className="col-lg-3 col-6">
// // //               <h3>51</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">Locations</p>
// // //             </div>
// // //           </div>

// // //           <div className="row mt-4 pt-3 m-0">
// // //   <div className="col-12 text-center">
// // //     <Link href="/location" passHref>
// // //       <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
// // //         Explore Locations
// // //       </a>
// // //     </Link>
// // //   </div>
// // // </div>

// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // // export default Banner1;

// // // // import Link from "next/link";
// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   getAllHomeBanners,
// // // //   getAllHomeData,
// // // //   getImgUrl,
// // // // } from "../../services/authService";

// // // // function Banner1() {
// // // //   const [heroData, setHeroData] = useState(null);
// // // //   const [homeContent, setHomeContent] = useState(null);

// // // //   useEffect(() => {
// // // //     getAllHomeBanners().then((res) => {
// // // //       if (res.data.status && res.data.data.length > 0)
// // // //         setHeroData(res.data.data[0]);
// // // //     });
// // // //     getAllHomeData().then((res) => {
// // // //       if (res.data.success && res.data.data.length > 0)
// // // //         setHomeContent(res.data.data[0]);
// // // //     });
// // // //   }, []);

// // // //   return (
// // // //     <>
// // // //       {/* SECTION 1: HERO */}
// // // //       <div
// // // //         className="banner-section"
// // // //         style={{
// // // //           "--banner-bg": heroData?.image
// // // //             ? `url(${getImgUrl(heroData.image)})`
// // // //             : 'url("/assets/images/bg/banner1-bg.png")',
// // // //         }}>
// // // //         <div className="container banner-content px-3">
// // // //           <div className="row justify-content-center m-0">
// // // //             <div className="col-lg-10 text-center">
// // // //               <div className="py-3">
// // // //                 {heroData?.textEditor && (
// // // //                   <div
// // // //                     className="hero-dynamic-text"
// // // //                     dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
// // // //                   />
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // //       // {/* =========================================
// // //       //     NEW SECTION: HERO STATS BAR (Premium Blue Design)
// // //       // ========================================= */}
// // //       // {/* Blue Background added via CSS class 'hero-stats-bar' */}
// // //       // <div className="hero-stats-bar" style={{ marginTop: "30px" }}>
// // //       //   <div className="container">
// // //       //     <div className="row text-center m-0">
// // //       //       {/* Item 1 */}
// // //       //       <div className="col-6 col-md-3 py-4 border-end-custom">
// // //       //         <h2 className="text-gold fw-bold mb-0 display-6">2,500+</h2>
// // //       //         <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //       //           Consultations
// // //       //         </p>
// // //       //       </div>

// // //       //       {/* Item 2 */}
// // //       //       <div className="col-6 col-md-3 py-4 border-end-custom">
// // //       //         <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
// // //       //         <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //       //           Success Rate
// // //       //         </p>
// // //       //       </div>

// // //       //       {/* Item 3 */}
// // //       //       <div className="col-6 col-md-3 py-4 border-end-custom">
// // //       //         <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
// // //       //         <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //       //           Years Experience
// // //       //         </p>
// // //       //       </div>

// // //       //       {/* Item 4 */}
// // //       //       <div className="col-6 col-md-3 py-4">
// // //       //         <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
// // //       //         <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //       //           Attorneys
// // //       //         </p>
// // //       //       </div>
// // //       //     </div>
// // //       //   </div>
// // //       // </div>
// // //       // {/* SECTION 2: IN MEMORIAM */}
// // //       // <div className="py-5 bg-white">
// // //       //   <div className="container px-3">
// // //       //     <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //       //       <div className="col-lg-6">
// // //       //         <img
// // //       //           src={
// // //       //             homeContent?.secondImage
// // //       //               ? getImgUrl(homeContent.secondImage)
// // //       //               : "/assets/images/banner-img2.png"
// // //       //           }
// // //       //           alt="In Memoriam"
// // //       //           className="w-100 h-100 object-fit-cover"
// // //       //           style={{ minHeight: "350px", display: "block" }}
// // //       //         />
// // //       //       </div>
// // //       //       <div className="col-lg-6 d-flex align-items-center">
// // //       //         <div className="p-4 p-lg-5 w-100">
// // //       //           <div className="dynamic-content-fix">
// // //       //             {homeContent?.secondTextEditor && (
// // //       //               <div
// // //       //                 dangerouslySetInnerHTML={{
// // //       //                   __html: homeContent.secondTextEditor,
// // //       //                 }}
// // //       //               />
// // //       //             )}
// // //       //             <div className="mt-4"></div>
// // //       //           </div>
// // //       //         </div>
// // //       //       </div>
// // //       //     </div>
// // //       //   </div>
// // //       // </div>

// // //       // {/* SECTION 4: HUB (IMAGE LEFT) */}
// // //       // <div className="featured-hubs py-5 bg-light">
// // //       //   <div className="container px-3">
// // //       //     <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //       //       <div className="col-lg-6">
// // //       //         <img
// // //       //           src={
// // //       //             homeContent?.thirdImage
// // //       //               ? getImgUrl(homeContent.thirdImage)
// // //       //               : "/assets/images/banner-img3.png"
// // //       //           }
// // //       //           alt="Hub"
// // //       //           className="w-100 h-100 object-fit-cover"
// // //       //           style={{ minHeight: "350px", display: "block" }}
// // //       //         />
// // //       //       </div>
// // //       //       <div className="col-lg-6 d-flex align-items-center">
// // //       //         <div className="p-4 p-lg-5 w-100">
// // //       //           <div className="dynamic-content-fix">
// // //       //             {homeContent?.thirdTextEditor && (
// // //       //               <div
// // //       //                 dangerouslySetInnerHTML={{
// // //       //                   __html: homeContent.thirdTextEditor,
// // //       //                 }}
// // //       //               />
// // //       //             )}
// // //       //           </div>
// // //       //         </div>
// // //       //       </div>
// // //       //     </div>
// // //       //   </div>
// // //       // </div>

// // //       // {/* SECTION 5: CTA (IMAGE RIGHT) */}
// // //       // <div className="cta-section py-5 bg-white">
// // //       //   <div className="container px-3">
// // //       //     <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //       //       <div className="col-lg-6 d-flex align-items-center order-lg-1 order-2">
// // //       //         <div className="p-4 p-lg-5 w-100">
// // //       //           <div className="dynamic-content-fix">
// // //       //             {homeContent?.fourthTextEditor && (
// // //       //               <div
// // //       //                 dangerouslySetInnerHTML={{
// // //       //                   __html: homeContent.fourthTextEditor,
// // //       //                 }}
// // //       //               />
// // //       //             )}
// // //       //           </div>
// // //       //         </div>
// // //       //       </div>
// // //       //       <div className="col-lg-6 order-lg-2 order-1">
// // //       //         <img
// // //       //           src={
// // //       //             homeContent?.fourthImage
// // //       //               ? getImgUrl(homeContent.fourthImage)
// // //       //               : "/assets/images/banner-img4.png"
// // //       //           }
// // //       //           alt="CTA"
// // //       //           className="w-100 h-100 object-fit-cover"
// // //       //           style={{ minHeight: "350px", display: "block" }}
// // //       //         />
// // //       //       </div>
// // //       //     </div>
// // //       //   </div>
// // //       // </div>
// // //       // {/* =========================================
// // //       //     SECTION 7: STATS (Footer Stats) - SPACE REDUCED
// // //       // ========================================= */}
// // //       // {/* Changed py-4 or py-5 to py-3 for less space */}
// // //       // <div className="stats-section py-3">
// // //       //   <div className="container py-2 px-3">
// // //       //     <div className="row text-center mb-3 justify-content-center m-0">
// // //       //       <div className="col-lg-8">
// // //       //         <h2 className="mb-1">Global scale with street smarts.</h2>
// // //       //         <p
// // //       //           className="lead text-white-50 mb-0"
// // //       //           style={{ fontSize: "1rem" }}>
// // //       //           With 51 locations, Greenberg Traurig&apos;s global network
// // //       //           provides the platform clients need.
// // //       //         </p>
// // //       //       </div>
// // //       //     </div>

// // //       //     <div className="row text-center gy-3 gx-md-5 mt-2 justify-content-center m-0">
// // //       //       <div className="col-lg-3 col-6 border-right-custom">
// // //       //         <h3>800+</h3>
// // //       //         <p className="text-gold fw-bold text-uppercase small mb-0">
// // //       //           Chambers Rankings
// // //       //         </p>
// // //       //       </div>
// // //       //       <div className="col-lg-3 col-6 border-right-custom">
// // //       //         <h3>60+</h3>
// // //       //         <p className="text-gold fw-bold text-uppercase small mb-0">
// // //       //           Languages Spoken
// // //       //         </p>
// // //       //       </div>
// // //       //       <div className="col-lg-3 col-6 border-right-custom">
// // //       //         <h3>15</h3>
// // //       //         <p className="text-gold fw-bold text-uppercase small mb-0">
// // //       //           Countries
// // //       //         </p>
// // //       //       </div>
// // //       //       <div className="col-lg-3 col-6">
// // //       //         <h3>51</h3>
// // //       //         <p className="text-gold fw-bold text-uppercase small mb-0">
// // //       //           Locations
// // //       //         </p>
// // //       //       </div>
// // //       //     </div>

// //           // <div className="row mt-4 pt-3 m-0">
// //           //   <div className="col-12 text-center">
// //           //     <Link href="/location" passHref>
// //           //       <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
// //           //         Explore Locations
// //           //       </a>
// //           //     </Link>
// //           //   </div>
// //           // </div>
// // //       //   </div>
// // //       // </div>
// // // //       <style jsx global>{`
// // // //         .card-shadow {
// // // //           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08) !important;
// // // //           border-radius: 12px;
// // // //           border: 1px solid #eee;
// // // //         }

// // // //         .object-fit-cover {
// // // //           object-fit: cover;
// // // //         }

// // // //         /* CONTENT WRAPPING FIX - YEH IMPORTANT HAI */
// // // //         .dynamic-content-fix {
// // // //           width: 100%;
// // // //           overflow: hidden;
// // // //           word-wrap: break-word; /* Purane browsers ke liye */
// // // //           overflow-wrap: break-word; /* New browsers ke liye */
// // // //           word-break: break-word; /* Heading break karne ke liye */
// // // //         }

// // // //         .dynamic-content-fix h2,
// // // //         .dynamic-content-fix h1 {
// // // //           color: #00415a !important;
// // // //           font-weight: 700 !important;
// // // //           font-size: clamp(
// // // //             1.8rem,
// // // //             4vw,
// // // //             2.5rem
// // // //           ) !important; /* Responsive font size */
// // // //           margin-bottom: 15px !important;
// // // //           line-height: 1.2 !important;
// // // //           white-space: normal !important; /* Force wrap */
// // // //         }

// // // //         .dynamic-content-fix p {
// // // //           color: #555 !important;
// // // //           font-size: 1.05rem !important;
// // // //           line-height: 1.6 !important;
// // // //           margin-bottom: 10px !important;
// // // //           white-space: normal !important; /* Force wrap */
// // // //         }

// // // //         .btn-outline-blue {
// // // //           display: inline-block;
// // // //           padding: 10px 20px;
// // // //           border: 1.5px solid #00415a;
// // // //           color: #00415a;
// // // //           text-decoration: none;
// // // //           font-weight: 600;
// // // //           font-size: 14px;
// // // //           transition: 0.3s;
// // // //         }
// // // //         .btn-outline-blue:hover {
// // // //           background: #00415a;
// // // //           color: #fff;
// // // //         }

// // // //         .hero-dynamic-text h1,
// // // //         .hero-dynamic-text p {
// // // //           color: white !important;
// // // //         }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // }

// // // // export default Banner1;

// // // import Link from "next/link";
// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   getAllHomeBanners,
// // //   getAllHomeData,
// // //   getImgUrl,
// // // } from "../../services/authService";

// // // function Banner1() {
// // //   const [heroData, setHeroData] = useState(null);
// // //   const [homeContent, setHomeContent] = useState(null);
// // //   const [mounted, setMounted] = useState(false);

// // //   useEffect(() => {
// // //     setMounted(true);

// // //     getAllHomeBanners()
// // //       .then((res) => {
// // //         const banners = res.data?.data || [];
// // //         const hero = banners.find((b) => b.id === 1);
// // //         if (hero) {
// // //           setHeroData(hero);
// // //         }
// // //       })
// // //       .catch((err) => console.error("Banner fetch error:", err));

// // //     // 2. Fetch Section Data
// // //     getAllHomeData().then((res) => {
// // //       if (res.data.success && res.data.data.length > 0)
// // //         setHomeContent(res.data.data[0]);
// // //     });
// // //   }, []);

// // //   // Hydration Fix
// // //   if (!mounted) return null;

// // //   return (
// // //     <>
// // //       {/* SECTION 1: HERO (DYNAMIC) */}
// // //       <div
// // //         className="banner-section"
// // //         style={{
// // //           "--banner-bg": heroData?.image
// // //             ? `url(${getImgUrl(heroData.image)})`
// // //             : 'url("/assets/images/bg/banner1-bg.png")',
// // //         }}>
// // //         <div className="container banner-content px-3">
// // //           <div className="row justify-content-center m-0">
// // //             <div className="col-lg-10 text-center">
// // //               <div className="py-3 dynamic-hero-text">
// // //                 {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
// // //                   <div
// // //                     dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
// // //                   />
// // //                 ) : (

// // //                   <>
// // //                     <h1 className="text-white mb-3">Global Legal Excellence</h1>
// // //                     <p className="lead text-white-50">
// // //                       Defining the future of law with integrity.
// // //                     </p>
// // //                   </>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* SECTION: HERO STATS BAR */}
// // //       {/* =========================================
// // //           NEW SECTION: HERO STATS BAR (Premium Blue Design)
// // //       ========================================= */}
// // //       {/* Blue Background added via CSS class 'hero-stats-bar' */}
// // //       <div className="hero-stats-bar" style={{ marginTop: "30px" }}>
// // //         <div className="container">
// // //           <div className="row text-center m-0">
// // //             {/* Item 1 */}
// // //             <div className="col-6 col-md-3 py-4 border-end-custom">
// // //               <h2 className="text-gold fw-bold mb-0 display-6">2,500+</h2>
// // //               <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //                 Consultations
// // //               </p>
// // //             </div>

// // //             {/* Item 2 */}
// // //             <div className="col-6 col-md-3 py-4 border-end-custom">
// // //               <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
// // //               <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //                 Success Rate
// // //               </p>
// // //             </div>

// // //             {/* Item 3 */}
// // //             <div className="col-6 col-md-3 py-4 border-end-custom">
// // //               <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
// // //               <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //                 Years Experience
// // //               </p>
// // //             </div>

// // //             {/* Item 4 */}
// // //             <div className="col-6 col-md-3 py-4">
// // //               <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
// // //               <p className="text-white small mb-0 text-uppercase tracking-wide">
// // //                 Attorneys
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       {/* SECTION 2: IN MEMORIAM */}
// // //       <div className="py-5 bg-white">
// // //         <div className="container px-3">
// // //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //             <div className="col-lg-6">
// // //               <img
// // //                 src={
// // //                   homeContent?.secondImage
// // //                     ? getImgUrl(homeContent.secondImage)
// // //                     : "/assets/images/banner-img2.png"
// // //                 }
// // //                 alt="In Memoriam"
// // //                 className="w-100 h-100 object-fit-cover"
// // //                 style={{ minHeight: "350px", display: "block" }}
// // //               />
// // //             </div>
// // //             <div className="col-lg-6 d-flex align-items-center">
// // //               <div className="p-4 p-lg-5 w-100">
// // //                 <div className="dynamic-content-fix">
// // //                   {homeContent?.secondTextEditor && (
// // //                     <div
// // //                       dangerouslySetInnerHTML={{
// // //                         __html: homeContent.secondTextEditor,
// // //                       }}
// // //                     />
// // //                   )}
// // //                   <div className="mt-4"></div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* SECTION 4: HUB (IMAGE LEFT) */}
// // //       <div className="featured-hubs py-5 bg-light">
// // //         <div className="container px-3">
// // //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //             <div className="col-lg-6">
// // //               <img
// // //                 src={
// // //                   homeContent?.thirdImage
// // //                     ? getImgUrl(homeContent.thirdImage)
// // //                     : "/assets/images/banner-img3.png"
// // //                 }
// // //                 alt="Hub"
// // //                 className="w-100 h-100 object-fit-cover"
// // //                 style={{ minHeight: "350px", display: "block" }}
// // //               />
// // //             </div>
// // //             <div className="col-lg-6 d-flex align-items-center">
// // //               <div className="p-4 p-lg-5 w-100">
// // //                 <div className="dynamic-content-fix">
// // //                   {homeContent?.thirdTextEditor && (
// // //                     <div
// // //                       dangerouslySetInnerHTML={{
// // //                         __html: homeContent.thirdTextEditor,
// // //                       }}
// // //                     />
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* SECTION 5: CTA (IMAGE RIGHT) */}
// // //       <div className="cta-section py-5 bg-white">
// // //         <div className="container px-3">
// // //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// // //             <div className="col-lg-6 d-flex align-items-center order-lg-1 order-2">
// // //               <div className="p-4 p-lg-5 w-100">
// // //                 <div className="dynamic-content-fix">
// // //                   {homeContent?.fourthTextEditor && (
// // //                     <div
// // //                       dangerouslySetInnerHTML={{
// // //                         __html: homeContent.fourthTextEditor,
// // //                       }}
// // //                     />
// // //                   )}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div className="col-lg-6 order-lg-2 order-1">
// // //               <img
// // //                 src={
// // //                   homeContent?.fourthImage
// // //                     ? getImgUrl(homeContent.fourthImage)
// // //                     : "/assets/images/banner-img4.png"
// // //                 }
// // //                 alt="CTA"
// // //                 className="w-100 h-100 object-fit-cover"
// // //                 style={{ minHeight: "350px", display: "block" }}
// // //               />
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       {/* =========================================
// // //           SECTION 7: STATS (Footer Stats) - SPACE REDUCED
// // //       ========================================= */}
// // //       {/* Changed py-4 or py-5 to py-3 for less space */}
// // //       <div className="stats-section py-3">
// // //         <div className="container py-2 px-3">
// // //           <div className="row text-center mb-3 justify-content-center m-0">
// // //             <div className="col-lg-8">
// // //               <h2 className="mb-1">Global scale with street smarts.</h2>
// // //               <p
// // //                 className="lead text-white-50 mb-0"
// // //                 style={{ fontSize: "1rem" }}>
// // //                 With 51 locations, Greenberg Traurig&apos;s global network
// // //                 provides the platform clients need.
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="row text-center gy-3 gx-md-5 mt-2 justify-content-center m-0">
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>800+</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">
// // //                 Chambers Rankings
// // //               </p>
// // //             </div>
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>60+</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">
// // //                 Languages Spoken
// // //               </p>
// // //             </div>
// // //             <div className="col-lg-3 col-6 border-right-custom">
// // //               <h3>15</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">
// // //                 Countries
// // //               </p>
// // //             </div>
// // //             <div className="col-lg-3 col-6">
// // //               <h3>51</h3>
// // //               <p className="text-gold fw-bold text-uppercase small mb-0">
// // //                 Locations
// // //               </p>
// // //             </div>
// // //           </div>

// // //           <div className="row mt-4 pt-3 m-0">
// // //             <div className="col-12 text-center">
// // //               <Link href="/location" passHref>
// // //                 <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
// // //                   Explore Locations
// // //                 </a>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style jsx global>{`
// // //         /* DYNAMIC HERO STYLE */
// // //         .dynamic-hero-text h1,
// // //         .dynamic-hero-text h2 {
// // //           font-size: 3.5rem !important;
// // //           color: white !important;
// // //           font-weight: 800 !important;
// // //           margin-bottom: 20px !important;
// // //         }
// // //         .dynamic-hero-text p {
// // //           font-size: 1.25rem !important;
// // //           color: rgba(255, 255, 255, 0.9) !important;
// // //         }

// // //         /* SECTION TEXT SIZES */
// // //         .dynamic-content-fix h2 {
// // //           font-size: 2.3rem !important;
// // //           color: #00415a !important;
// // //           font-family: serif !important;
// // //           margin-bottom: 15px !important;
// // //         }

// // //         .card-shadow {
// // //           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
// // //           border-radius: 12px;
// // //         }
// // //         .text-gold {
// // //           color: #c5a059 !important;
// // //         }
// // //         .border-end-custom {
// // //           border-right: 1px solid rgba(255, 255, 255, 0.1);
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // }

// // // export default Banner1;

// // import Link from "next/link";
// // import React, { useEffect, useState } from "react";
// // import {
// //   getAllHomeBanners,
// //   getAllHomeData,
// //   getImgUrl,
// // } from "../../services/authService";

// // function Banner1() {
// //   const [heroData, setHeroData] = useState(null);
// //   const [homeContent, setHomeContent] = useState(null);
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => {
// //     setMounted(true);

// //     // 1. Hero Banner Fetch (Top Section)
// //     getAllHomeBanners().then((res) => {
// //       const banners = res.data?.data || [];
// //       const hero = banners.find((b) => b.id === 1);
// //       if (hero) setHeroData(hero);
// //     });

// //     // 2. Home Data Fetch (4 Sections: first, second, third, fourth)
// //     getAllHomeData().then((res) => {
// //       if (res.data.success && res.data.data.length > 0)
// //         setHomeContent(res.data.data[0]);
// //     });
// //   }, []);

// //   if (!mounted) return null;

// //   return (
// //     <>
// //       {/* =========================================
// //           HERO SECTION (Banner API)
// //       ========================================= */}
// //       <div
// //         className="banner-section"
// //         style={{
// //           "--banner-bg": heroData?.image
// //             ? `url(${getImgUrl(heroData.image)})`
// //             : 'url("/assets/images/bg/banner1-bg.png")',
// //         }}>
// //         <div className="container banner-content px-3">
// //           <div className="row justify-content-center m-0">
// //             <div className="col-lg-10 text-center">
// //               <div className="py-3 dynamic-hero-text">
// //                 {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
// //                   <div
// //                     dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
// //                   />
// //                 ) : (
// //                   <h1 className="text-white">Global Legal Excellence</h1>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* STATS BAR (Static) */}
// //       <div className="hero-stats-bar" style={{ marginTop: "30px" }}>
// //         <div className="container">
// //           <div className="row text-center m-0">
// //             <div className="col-6 col-md-3 py-4 border-end-custom">
// //               <h2 className="text-gold fw-bold mb-0">2,500+</h2>
// //               <p className="text-white small mb-0 text-uppercase">
// //                 Consultations
// //               </p>
// //             </div>
// //             <div className="col-6 col-md-3 py-4 border-end-custom">
// //               <h2 className="text-gold fw-bold mb-0">98%</h2>
// //               <p className="text-white small mb-0 text-uppercase">
// //                 Success Rate
// //               </p>
// //             </div>
// //             <div className="col-6 col-md-3 py-4 border-end-custom">
// //               <h2 className="text-gold fw-bold mb-0">20+</h2>
// //               <p className="text-white small mb-0 text-uppercase">Experience</p>
// //             </div>
// //             <div className="col-6 col-md-3 py-4">
// //               <h2 className="text-gold fw-bold mb-0">35+</h2>
// //               <p className="text-white small mb-0 text-uppercase">Attorneys</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================
// //           SECTION 1 (First Image & Editor) - Alumni Network
// //       ========================================= */}
// //       <div className="py-5 bg-light">
// //         <div className="container px-3">
// //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// //             <div className="col-lg-6">
// //               <img
// //                 src={
// //                   homeContent?.firstImage
// //                     ? getImgUrl(homeContent.firstImage)
// //                     : "/assets/images/banner-img1.png"
// //                 }
// //                 className="w-100 h-100 object-fit-cover"
// //                 style={{ minHeight: "400px" }}
// //                 alt=""
// //               />
// //             </div>
// //             <div className="col-lg-6 d-flex align-items-center p-4 p-lg-5">
// //               <div className="dynamic-content-fix w-100">
// //                 {homeContent?.firstTextEditor && (
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: homeContent.firstTextEditor,
// //                     }}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================
// //           SECTION 2 (Second Image & Editor) - Memoriam
// //       ========================================= */}
// //       <div className="py-5 bg-white">
// //         <div className="container px-3">
// //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// //             <div className="col-lg-6 d-flex align-items-center p-4 p-lg-5 order-lg-1 order-2">
// //               <div className="dynamic-content-fix w-100">
// //                 {homeContent?.secondTextEditor && (
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: homeContent.secondTextEditor,
// //                     }}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //             <div className="col-lg-6 order-lg-2 order-1">
// //               <img
// //                 src={
// //                   homeContent?.secondImage
// //                     ? getImgUrl(homeContent.secondImage)
// //                     : "/assets/images/banner-img2.png"
// //                 }
// //                 className="w-100 h-100 object-fit-cover"
// //                 style={{ minHeight: "400px" }}
// //                 alt=""
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================
// //           SECTION 3 (Third Image & Editor) - Hub
// //       ========================================= */}
// //       <div className="featured-hubs py-5 bg-light">
// //         <div className="container px-3">
// //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// //             <div className="col-lg-6">
// //               <img
// //                 src={
// //                   homeContent?.thirdImage
// //                     ? getImgUrl(homeContent.thirdImage)
// //                     : "/assets/images/banner-img3.png"
// //                 }
// //                 className="w-100 h-100 object-fit-cover"
// //                 style={{ minHeight: "400px" }}
// //                 alt=""
// //               />
// //             </div>
// //             <div className="col-lg-6 d-flex align-items-center p-4 p-lg-5">
// //               <div className="dynamic-content-fix w-100">
// //                 {homeContent?.thirdTextEditor && (
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: homeContent.thirdTextEditor,
// //                     }}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* =========================================
// //           SECTION 4 (Fourth Image & Editor) - CTA
// //       ========================================= */}
// //       <div className="cta-section py-5 bg-white">
// //         <div className="container px-3">
// //           <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
// //             <div className="col-lg-6 d-flex align-items-center p-4 p-lg-5 order-lg-1 order-2">
// //               <div className="dynamic-content-fix w-100">
// //                 {homeContent?.fourthTextEditor && (
// //                   <div
// //                     dangerouslySetInnerHTML={{
// //                       __html: homeContent.fourthTextEditor,
// //                     }}
// //                   />
// //                 )}
// //               </div>
// //             </div>
// //             <div className="col-lg-6 order-lg-2 order-1">
// //               <img
// //                 src={
// //                   homeContent?.fourthImage
// //                     ? getImgUrl(homeContent.fourthImage)
// //                     : "/assets/images/banner-img4.png"
// //                 }
// //                 className="w-100 h-100 object-fit-cover"
// //                 style={{ minHeight: "400px" }}
// //                 alt=""
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

      // {/* FOOTER STATS */}
      // <div className="stats-section py-4">
      //   <div className="container text-center">
      //     <h2 className="text-white mb-3">Global scale with street smarts.</h2>
      //     <div className="row mt-4">
      //       <div className="col-md-3 col-6">
      //         <h3>800+</h3>
      //         <p className="text-gold">Rankings</p>
      //       </div>
      //       <div className="col-md-3 col-6">
      //         <h3>60+</h3>
      //         <p className="text-gold">Languages</p>
      //       </div>
      //       <div className="col-md-3 col-6">
      //         <h3>15</h3>
      //         <p className="text-gold">Countries</p>
      //       </div>
      //       <div className="col-md-3 col-6">
      //         <h3>51</h3>
      //         <p className="text-gold">Locations</p>
      //       </div>
      //       <div className="row mt-4 pt-3 m-0">
      //         <div className="col-12 text-center">
      //           <Link href="/location" passHref>
      //             <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
      //               Explore Locations
      //             </a>
      //           </Link>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>

// //       <style jsx global>{`
// //         /* CONTENT CUT HO NE SE ROKNE KE LIYE FIX */
// //         .dynamic-content-fix {
// //           width: 100% !important;
// //           max-width: 100% !important;
// //           overflow-wrap: break-word !important;
// //           word-wrap: break-word !important;
// //           word-break: break-word !important;
// //         }

// //         .dynamic-content-fix * {
// //           white-space: normal !important; /* nowrap ko hata deta hai */
// //           background-color: transparent !important; /* Editor ki extra BG hatata hai */
// //           max-width: 100% !important;
// //         }

// //         .dynamic-content-fix h2 {
// //           font-size: clamp(1.8rem, 4vw, 2.3rem) !important;
// //           color: #00415a !important;
// //           margin-bottom: 15px !important;
// //           font-family: serif !important;
// //         }

// //         .dynamic-content-fix p {
// //           font-size: 1.05rem !important;
// //           color: #555 !important;
// //           line-height: 1.6 !important;
// //         }

// //         .card-shadow {
// //           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
// //           border-radius: 12px;
// //         }
// //         .object-fit-cover {
// //           object-fit: cover;
// //         }
// //         .text-gold {
// //           color: #c5a059 !important;
// //         }
// //         .border-end-custom {
// //           border-right: 1px solid rgba(255, 255, 255, 0.1);
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// // export default Banner1;

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import {
//   getAllHomeBanners,
//   getAllHomeData,
//   getAllLogoTypes, // Added to find type ID dynamically
//   getImgUrl,
// } from "../../services/authService";

// function Banner1() {
//   const [heroData, setHeroData] = useState(null);
//   const [homeContent, setHomeContent] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);

//     const fetchData = async () => {
//       try {
//         // 1. Saare Data ek saath fetch karein
//         const [typesRes, bannersRes, dataRes] = await Promise.all([
//           getAllLogoTypes(),
//           getAllHomeBanners(),
//           getAllHomeData(),
//         ]);

//         const types = typesRes.data?.data || [];
//         const banners = bannersRes.data?.data || [];
//         const homeSections = dataRes.data?.data || [];

//         // 2. DYNAMIC LOGIC: Pehle "banner" naam ka type dhundho
//         const bannerType = types.find((t) => t.type.toLowerCase() === "banner");

//         if (bannerType) {
//           // Ab banners mein se wahi banner uthao jiski typeId is dynamic ID se match kare
//           const activeHero = banners.find(
//             (b) => Number(b.typeId) === Number(bannerType.id),
//           );
//           setHeroData(activeHero || banners[0]); // Fallback agar na mile to pehla banner
//         } else if (banners.length > 0) {
//           setHeroData(banners[0]); // Agar type na mile to pehla banner
//         }

//         // 3. Sections Data
//         if (homeSections.length > 0) {
//           setHomeContent(homeSections[0]);
//         }
//       } catch (error) {
//         console.error("Dynamic Data Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       {/* =========================================
//           SECTION 1: HERO (FULLY DYNAMIC)
//       ========================================= */}
//       <div
//         className="banner-section"
//         style={{
//           "--banner-bg": heroData?.image
//             ? `url(${getImgUrl(heroData.image)})`
//             : 'url("/assets/images/bg/banner1-bg.png")',
//         }}>
//         <div className="container banner-content px-3">
//           <div className="row justify-content-center m-0">
//             <div className="col-lg-10 text-center">
//               <div className="py-3 dynamic-hero-text">
//                 {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
//                   <div
//                     dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
//                   />
//                 ) : (
//                   <h1 className="text-white">Global Legal Excellence</h1>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* STATS BAR (Static UI) */}
//       <div
//         className="hero-stats-bar"
//         style={{ marginTop: "30px", background: "#002e44" }}>
//         <div className="container">
//           <div className="row text-center m-0">
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0">2,500+</h2>
//               <p className="text-white small mb-0 text-uppercase">
//                 Consultations
//               </p>
//             </div>
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0">98%</h2>
//               <p className="text-white small mb-0 text-uppercase">
//                 Success Rate
//               </p>
//             </div>
//             <div className="col-6 col-md-3 py-4 border-end-custom">
//               <h2 className="text-gold fw-bold mb-0">20+</h2>
//               <p className="text-white small mb-0 text-uppercase">Experience</p>
//             </div>
//             <div className="col-6 col-md-3 py-4">
//               <h2 className="text-gold fw-bold mb-0">35+</h2>
//               <p className="text-white small mb-0 text-uppercase">Attorneys</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           HOME SECTIONS (Dynamic Mapping from first to fourth)
//       ========================================= */}
//       {[
//         {
//           img: "firstImage",
//           txt: "firstTextEditor",
//           bg: "bg-light",
//           rev: false,
//         },
//         {
//           img: "secondImage",
//           txt: "secondTextEditor",
//           bg: "bg-white",
//           rev: true,
//         },
//         {
//           img: "thirdImage",
//           txt: "thirdTextEditor",
//           bg: "bg-light",
//           rev: false,
//         },
//         {
//           img: "fourthImage",
//           txt: "fourthTextEditor",
//           bg: "bg-white",
//           rev: true,
//         },
//       ].map((sec, idx) => (
//         <div key={idx} className={`py-5 ${sec.bg}`}>
//           <div className="container px-3">
//             <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
//               <div
//                 className={`col-lg-6 ${sec.rev ? "order-lg-2 order-1" : ""}`}>
//                 <img
//                   src={
//                     homeContent?.[sec.img]
//                       ? getImgUrl(homeContent[sec.img])
//                       : `/assets/images/banner-img${idx + 1}.png`
//                   }
//                   className="w-100 h-100 object-fit-cover"
//                   style={{ minHeight: "420px" }}
//                   alt=""
//                 />
//               </div>
//               <div
//                 className={`col-lg-6 d-flex align-items-center p-4 p-lg-5 ${sec.rev ? "order-lg-1 order-2" : ""}`}>
//                 <div className="dynamic-content-fix w-100">
//                   {homeContent?.[sec.txt] && (
//                     <div
//                       dangerouslySetInnerHTML={{ __html: homeContent[sec.txt] }}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* FOOTER STATS */}
//       <div className="stats-section py-5">
//         <div className="container text-center text-white">
//           <h2 className="mb-4">Global scale with street smarts.</h2>
//           <div className="row m-0 gy-4">
//             <div className="col-md-3 col-6">
//               <h3>800+</h3>
//               <p className="text-gold">Rankings</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>60+</h3>
//               <p className="text-gold">Languages</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>15</h3>
//               <p className="text-gold">Countries</p>
//             </div>
//             <div className="col-md-3 col-6">
//               <h3>51</h3>
//               <p className="text-gold">Locations</p>
//             </div>
//           </div>
//           <div className="mt-5">
//             <Link href="/location" passHref>
//               <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
//                 Explore Locations
//               </a>
//             </Link>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         /* CONTENT WRAPPING & CUT FIX */
//         .dynamic-content-fix {
//           width: 100% !important;
//           max-width: 100% !important;
//           word-wrap: break-word !important;
//           overflow-wrap: break-word !important;
//         }

//         .dynamic-content-fix * {
//           white-space: normal !important;
//           word-break: break-word !important;
//           max-width: 100% !important;
//         }

//         .dynamic-content-fix h2,
//         .dynamic-content-fix h1 {
//           font-size: clamp(1.8rem, 4vw, 2.4rem) !important;
//           color: #00415a !important;
//           font-family: serif !important;
//           margin-bottom: 20px !important;
//           line-height: 1.2;
//         }

//         .dynamic-content-fix p {
//           font-size: 1.05rem !important;
//           color: #555 !important;
//           line-height: 1.6;
//         }

//         .dynamic-hero-text h1 {
//           font-size: 3.5rem !important;
//           font-weight: 800;
//           color: white !important;
//         }
//         .dynamic-hero-text p {
//           font-size: 1.25rem !important;
//           color: white !important;
//         }

//         .card-shadow {
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
//           border-radius: 12px;
//         }
//         .object-fit-cover {
//           object-fit: cover;
//         }
//         .text-gold {
//           color: #c5a059 !important;
//         }
//         .border-end-custom {
//           border-right: 1px solid rgba(255, 255, 255, 0.1);
//         }
//       `}</style>
//     </>
//   );
// }

// export default Banner1;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getAllHomeBanners,
  getAllHomeData,
  getAllLogoTypes, // Isse hum samjhenge kaunsa banner hai
  getImgUrl,
} from "../../services/authService";

function Banner1() {
  const [heroData, setHeroData] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      try {
        // 1. Saare data types aur banners mangwayein
        const [typesRes, bannersRes, dataRes] = await Promise.all([
          getAllLogoTypes(),
          getAllHomeBanners(),
          getAllHomeData(),
        ]);

        const types = typesRes.data?.data || [];
        const allBanners = bannersRes.data?.data || [];
        const homeSections = dataRes.data?.data || [];

        // 2. LOGIC: "banner" waale type ki ID nikalein
        const bannerTypeObj = types.find(
          (t) => t.type.toLowerCase() === "banner",
        );

        if (bannerTypeObj) {
          // 3. Ab banners list mein se sirf wahi uthayein jinka typeId banner wali ID se match kare
          // Aur hum sabse naya (Latest ID) wala banner uthayenge
          const filteredBanners = allBanners.filter(
            (b) => Number(b.typeId) === Number(bannerTypeObj.id),
          );

          if (filteredBanners.length > 0) {
            // Sort karke sabse naya (ID 6) wala uthayenge
            const latestBanner = filteredBanners.sort((a, b) => b.id - a.id)[0];
            setHeroData(latestBanner);
          }
        }

        // 4. Home Sections (first, second, third, fourth)
        if (homeSections.length > 0) {
          setHomeContent(homeSections[0]);
        }
      } catch (error) {
        console.error("Data loading error:", error);
      }
    };

    fetchData();
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* SECTION 1: HERO */}
      <div
        className="banner-section"
        style={{
          "--banner-bg": heroData?.image
            ? `url(${getImgUrl(heroData.image)})`
            : 'url("/assets/images/bg/banner1-bg.png")',
        }}>
        <div className="container banner-content px-3">
          <div className="row justify-content-center m-0">
            <div className="col-lg-10 text-center">
              <div className="py-3 dynamic-hero-text">
                {heroData?.textEditor && heroData.textEditor !== "<p></p>" ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: heroData.textEditor }}
                  />
                ) : (
                  <h1 className="text-white">Global Legal Excellence</h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          NEW SECTION: HERO STATS BAR (Premium Blue Design)
      ========================================= */}
      {/* Blue Background added via CSS class 'hero-stats-bar' */}
      <div className="hero-stats-bar" style={{ marginTop: "30px" }}>
        <div className="container">
          <div className="row text-center m-0">
            {/* Item 1 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">2,500+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Consultations
              </p>
            </div>

            {/* Item 2 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">98%</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Success Rate
              </p>
            </div>

            {/* Item 3 */}
            <div className="col-6 col-md-3 py-4 border-end-custom">
              <h2 className="text-gold fw-bold mb-0 display-6">20+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Years Experience
              </p>
            </div>

            {/* Item 4 */}
            <div className="col-6 col-md-3 py-4">
              <h2 className="text-gold fw-bold mb-0 display-6">35+</h2>
              <p className="text-white small mb-0 text-uppercase tracking-wide">
                Attorneys
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* HOME SECTIONS (first to fourth) */}
      {[
        {
          img: "firstImage",
          txt: "firstTextEditor",
          bg: "bg-light",
          rev: false,
        },
        {
          img: "secondImage",
          txt: "secondTextEditor",
          bg: "bg-white",
          rev: true,
        },
        {
          img: "thirdImage",
          txt: "thirdTextEditor",
          bg: "bg-light",
          rev: false,
        },
        {
          img: "fourthImage",
          txt: "fourthTextEditor",
          bg: "bg-white",
          rev: true,
        },
      ].map((sec, idx) => (
        <div key={idx} className={`py-5 ${sec.bg}`}>
          <div className="container px-3">
            <div className="row g-0 card-shadow overflow-hidden bg-white align-items-stretch">
              <div
                className={`col-lg-6 ${sec.rev ? "order-lg-2 order-1" : ""}`}>
                <img
                  src={
                    homeContent?.[sec.img]
                      ? getImgUrl(homeContent[sec.img])
                      : `/assets/images/banner-img${idx + 1}.png`
                  }
                  className="w-100 h-100 object-fit-cover"
                  style={{ minHeight: "420px" }}
                  alt=""
                />
              </div>
              <div
                className={`col-lg-6 d-flex align-items-center p-4 p-lg-5 ${sec.rev ? "order-lg-1 order-2" : ""}`}>
                <div className="dynamic-content-fix w-100">
                  {homeContent?.[sec.txt] && (
                    <div
                      dangerouslySetInnerHTML={{ __html: homeContent[sec.txt] }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* FOOTER STATS */}
      <div className="stats-section py-4">
        <div className="container text-center">
          <h2 className="text-white mb-3">Global scale with street smarts.</h2>
          <div className="row mt-4">
            <div className="col-md-3 col-6">
              <h3>800+</h3>
              <p className="text-gold">Rankings</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>60+</h3>
              <p className="text-gold">Languages</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>15</h3>
              <p className="text-gold">Countries</p>
            </div>
            <div className="col-md-3 col-6">
              <h3>51</h3>
              <p className="text-gold">Locations</p>
            </div>
            <div className="row mt-4 pt-3 m-0">
              <div className="col-12 text-center">
                <Link href="/location" passHref>
                  <a className="btn btn-light btn-lg rounded-0 px-5 fw-bold">
                    Explore Locations
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* CONTENT CUT FIX */
        .dynamic-content-fix {
          width: 100% !important;
          max-width: 100% !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }

        .dynamic-content-fix * {
          white-space: normal !important;
          word-break: break-word !important;
          max-width: 100% !important;
          background-color: transparent !important;
        }

        .dynamic-content-fix h2,
        .dynamic-content-fix h1 {
          font-size: clamp(1.8rem, 4vw, 2.4rem) !important;
          color: #00415a !important;
          font-family: serif !important;
          margin-bottom: 20px !important;
          line-height: 1.2;
        }

        .dynamic-content-fix p {
          font-size: 1.1rem !important;
          color: #444 !important;
          line-height: 1.6;
        }

        .dynamic-hero-text h1 {
          font-size: 3.5rem !important;
          font-weight: 800;
          color: white !important;
        }
        .dynamic-hero-text p {
          font-size: 1.25rem !important;
          color: white !important;
        }

        .card-shadow {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08) !important;
          border-radius: 12px;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        .text-gold {
          color: #c5a059 !important;
        }
        .border-end-custom {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </>
  );
}

export default Banner1;