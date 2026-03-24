// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Link from "next/link";
// import {
//   getAllAttorneys,
//   getImgUrl,
//   getAllNews,
//   getAllEvents,
// } from "../../services/authService";

// export default function AttorneyProfilePage() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const profileRef = useRef();

//   const [attorney, setAttorney] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [news, setNews] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [activeTab, setActiveTab] = useState("News");
//   const [showShare, setShowShare] = useState(false);

//   const [expOpen, setExpOpen] = useState(false);
//   const [recOpen, setRecOpen] = useState(true);

//   const gtGold = "#c5a059";

//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-");

//   const createNameSlug = (f, l) => createSlug(`${f} ${l || ""}`);

//   useEffect(() => {
//     if (!slug) return;
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         const [attRes, newsRes, eventRes] = await Promise.all([
//           getAllAttorneys(),
//           getAllNews(),
//           getAllEvents(),
//         ]);
//         const list = attRes?.attorneys || attRes?.data || [];
//         const found = list.find(
//           (attr) => createNameSlug(attr.firstName, attr.lastName) === slug,
//         );
//         if (found) setAttorney(found);
//         setNews(newsRes?.data || []);
//         setEvents(eventRes?.data || []);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [slug]);

//   const handleDownloadPDF = async () => {
//     const html2pdf = (await import("html2pdf.js")).default;
//     const element = profileRef.current;
//     element.classList.add("pdf-capture-mode");

//     const opt = {
//       margin: [0, 0.4, 0.3, 0.4],
//       filename: `${attorney?.lastName}_Profile.pdf`,
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         letterRendering: true,
//         scrollY: 0,
//       },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//       pagebreak: { mode: ["css", "legacy"] },
//     };

//     await html2pdf().from(element).set(opt).save();
//     element.classList.remove("pdf-capture-mode");
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   if (loading)
//     return (
//       <div className="vh-100 d-flex align-items-center justify-content-center">
//         Loading...
//       </div>
//     );
//   if (!attorney)
//     return <div className="text-center py-5">Attorney not found.</div>;

//   const currentList = activeTab === "News" ? news : events;
//   const today = new Date().toLocaleString("en-US", {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
//   const currentUrl = typeof window !== "undefined" ? window.location.href : "";

//   return (
//     <main className="bg-white profile-main-wrapper" ref={profileRef}>
//       <Head>
//         <title>
//           {attorney.firstName} {attorney.lastName} | Corporate Lawyer |
//           Professionals | Greenberg Traurig LLP
//         </title>
//       </Head>

//       {/* --- PRINT-ONLY PROFESSIONAL HEADER --- */}
//       <div className="print-meta-header d-none d-print-flex justify-content-between mb-2 small text-muted border-bottom pb-1">
//         <span>{today}</span>
//         <span>
//           {attorney.firstName} {attorney.lastName} | Corporate Lawyer |
//           Professionals | Greenberg Traurig LLP
//         </span>
//       </div>

//       {/* --- HERO SECTION --- */}
//       <section
//         className="text-white pt-5 pb-3 hero-bg"
//         style={{ backgroundColor: "#1a1a1a" }}>
//         <div className="container" style={{ maxWidth: "1100px" }}>
//           <div className="row align-items-center align-items-md-end g-4">
//             <div className="col-4 col-md-5 d-flex justify-content-center print-col-img">
//               <img
//                 src={
//                   attorney.profileImage
//                     ? getImgUrl(attorney.profileImage)
//                     : "/assets/images/profile-placeholder.png"
//                 }
//                 alt={attorney.firstName}
//                 className="img-fluid profile-img shadow-sm"
//                 style={{
//                   width: "100%",
//                   maxWidth: "340px",
//                   height: "auto",
//                   objectFit: "cover",
//                 }}
//                 onError={(e) => {
//                   e.target.src = "/assets/images/profile.png";
//                 }}
//               />
//             </div>
//             <div className="col-8 col-md-7 ps-md-5 pb-4 pt-5 text-start print-col-text">
//               <h1 className="display-3 serif-font mb-4 fw-normal name-title">
//                 {attorney.firstName} <br className="d-none d-print-block" />{" "}
//                 {attorney.lastName}
//               </h1>

//               <div className="d-flex align-items-center mb-4">
//                 <div
//                   className="gold-line d-none d-md-block no-print"
//                   style={{
//                     width: "45px",
//                     height: "1px",
//                     backgroundColor: gtGold,
//                     marginRight: "15px",
//                   }}></div>
//                 <span
//                   className="text-uppercase small fw-bold text-secondary role-label"
//                   style={{ letterSpacing: "3px" }}>
//                   {attorney.servicesOffered || "ASSOCIATE"}
//                 </span>
//               </div>

//               <a
//                 href={`mailto:${attorney.email}`}
//                 className="d-block mb-4 h5 fw-light text-decoration-none serif-font email-link"
//                 style={{ color: gtGold }}>
//                 {attorney.email}
//               </a>

//               <div className="mt-4 contact-block">
//                 <p
//                   className="text-uppercase fw-bold mb-1 small office-label"
//                   style={{ color: gtGold }}>
//                   Washington, D.C.
//                 </p>
//                 <div className="small opacity-75 phone-block">
//                   <p className="mb-0">
//                     D {attorney.phoneOffice || "202.530.8593"}
//                   </p>
//                   <p className="mb-0">
//                     T {attorney.phoneCell || "202.331.3100"}
//                   </p>
//                 </div>
//               </div>

//               {/* PDF / PRINT / SHARE BUTTONS */}
//               <div className="d-flex justify-content-end align-items-center mt-5 gap-3 small no-print">
//                 <span
//                   className="text-info border-end pe-3 cursor-pointer"
//                   onClick={handleDownloadPDF}>
//                   PDF
//                 </span>
//                 <span
//                   className="text-info border-end pe-3 cursor-pointer"
//                   onClick={handlePrint}>
//                   Print
//                 </span>
//                 <div className="position-relative">
//                   <span
//                     className="text-info cursor-pointer"
//                     onClick={() => setShowShare(!showShare)}>
//                     Share {showShare ? "-" : "+"}
//                   </span>
//                   {showShare && (
//                     <div
//                       className="position-absolute d-flex gap-2 p-2 rounded shadow-lg share-box"
//                       style={{
//                         bottom: "-60px",
//                         right: 0,
//                         background: "transparent",
//                         zIndex: 100,
//                       }}>
//                       <a
//                         href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
//                         target="_blank"
//                         className="social-icon li">
//                         <i className="bi bi-linkedin"></i>
//                       </a>
//                       <a href="#" className="social-icon x">
//                         <i className="bi bi-twitter-x"></i>
//                       </a>
//                       <a href="#" className="social-icon fb">
//                         <i className="bi bi-facebook"></i>
//                       </a>
//                       <a
//                         href={`mailto:?body=${currentUrl}`}
//                         className="social-icon mail">
//                         <i className="bi bi-envelope-fill"></i>
//                       </a>
//                       <span onClick={handlePrint} className="social-icon print">
//                         <i className="bi bi-printer-fill"></i>
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- CONTENT BODY --- */}
//       <div
//         className="container py-4 content-body"
//         style={{ maxWidth: "850px" }}>
//         <div
//           className="mb-4 lh-lg text-secondary profile-bio"
//           dangerouslySetInnerHTML={{ __html: attorney.aboutus }}
//         />

//         {/* CAPABILITIES */}
//         <div className="border-top-doc pt-3 mb-4 pdf-avoid-break">
//           <h3 className="serif-font mb-3">Capabilities</h3>
//           <div className="capability-links">
//             <span className="fw-bold text-decoration-underline">Corporate</span>
//             <span className="mx-2 fw-bold">|</span>
//             <span className="fw-bold text-decoration-underline">
//               Health Care & FDA Practice
//             </span>
//           </div>
//         </div>

//         {/* EXPERIENCE */}
//         <div className="border-top-doc pt-3 mb-4 accordion-section pdf-avoid-break">
//           <h3 className="serif-font mb-3">Experience</h3>
//           <div
//             className="d-flex justify-content-between align-items-center border-bottom pb-1 cursor-pointer no-print"
//             onClick={() => setExpOpen(!expOpen)}>
//             <span className="fw-bold" style={{ color: gtGold }}>
//               Internships
//             </span>
//             <span className="accordion-icon" style={{ color: gtGold }}>
//               {expOpen ? "−" : "+"}
//             </span>
//           </div>
//           <p
//             className="fw-bold d-none d-print-block"
//             style={{ color: gtGold, margin: "5px 0" }}>
//             Internships
//           </p>
//           <div
//             className={`accordion-content py-2 text-secondary ${expOpen ? "d-block" : "d-none"}`}>
//             <ul className="ms-3">
//               <li>
//                 Certified Legal Intern, Community Development Clinic, Notre Dame
//                 Clinical Law Center, 2022
//               </li>
//               <li>
//                 Corporate Counsel Extern, Saint Joseph Health System and Loyola
//                 University Health System, 2021
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* RECOGNITION */}
//         <div className="border-top-doc pt-3 mb-4 accordion-section pdf-avoid-break">
//           <h3 className="serif-font mb-3">Recognition & Leadership</h3>
//           <div
//             className="d-flex justify-content-between align-items-center border-bottom pb-1 cursor-pointer no-print"
//             onClick={() => setRecOpen(!recOpen)}>
//             <span className="fw-bold" style={{ color: gtGold }}>
//               Professional & Community Involvement
//             </span>
//             <span className="accordion-icon" style={{ color: gtGold }}>
//               {recOpen ? "−" : "+"}
//             </span>
//           </div>
//           <p
//             className="fw-bold d-none d-print-block"
//             style={{ color: gtGold, margin: "5px 0" }}>
//             Professional & Community Involvement
//           </p>
//           <div
//             className={`accordion-content py-2 text-secondary ${recOpen ? "d-block" : "d-none"}`}>
//             <ul className="list-unstyled custom-list ms-3">
//               <li>• American Bar Association, Business Law Section</li>
//               <li>• Tennessee Bar Association</li>
//               <li>• Notre Dame Alumni Association</li>
//             </ul>
//           </div>
//         </div>

//         {/* CREDENTIALS */}
//         <div className="border-top-doc pt-3 mb-4 pdf-avoid-break">
//           <h3 className="serif-font mb-4">Credentials</h3>
//           <div className="row g-4">
//             <div className="col-6">
//               <h6
//                 className="text-uppercase fw-bold text-muted mb-2"
//                 style={{ fontSize: "0.75rem" }}>
//                 Education
//               </h6>
//               <div
//                 className="small text-secondary"
//                 dangerouslySetInnerHTML={{ __html: attorney.education }}
//               />
//             </div>
//             <div className="col-6">
//               <h6
//                 className="text-uppercase fw-bold text-muted mb-2"
//                 style={{ fontSize: "0.75rem" }}>
//                 Admissions
//               </h6>
//               <div
//                 className="small text-secondary"
//                 dangerouslySetInnerHTML={{ __html: attorney.admission }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- NEWS SECTION (no-print removed) --- */}
//       <section
//         className="bg-dark text-white py-5 news-events-section"
//         style={{ backgroundColor: "#1a1a1a" }}>
//         <div className="container py-4" style={{ maxWidth: "850px" }}>
//           <h3 className="serif-font mb-5" style={{ fontSize: "2.6rem" }}>
//             News & Events
//           </h3>
//           <div className="mb-4 d-flex gap-4 border-bottom border-secondary news-tabs">
//             <span
//               className={`cursor-pointer pb-2 fw-bold ${activeTab === "News" ? "text-white border-bottom border-white" : "opacity-50"}`}
//               onClick={() => setActiveTab("News")}>
//               News
//             </span>
//             <span
//               className={`cursor-pointer pb-2 fw-bold ${activeTab === "Events" ? "text-white border-bottom border-white" : "opacity-50"}`}
//               onClick={() => setActiveTab("Events")}>
//               Events
//             </span>
//           </div>
//           <div className="list-group list-group-flush bg-transparent">
//             {currentList.slice(0, 3).map((item, idx) => (
//               <div
//                 key={idx}
//                 className="bg-transparent border-bottom border-secondary py-4 news-item">
//                 <div className="small text-uppercase opacity-50 mb-2 date-label">
//                   {new Date(
//                     item.createdAt || item.startDate,
//                   ).toLocaleDateString()}{" "}
//                   | {activeTab.toUpperCase()}
//                 </div>
//                 <Link
//                   href={`/${activeTab.toLowerCase()}/${createSlug(item.title)}`}>
//                   <a
//                     className="h4 text-decoration-none d-block serif-font"
//                     style={{ color: gtGold }}>
//                     {item.title}
//                   </a>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <style jsx global>{`
//         .serif-font {
//           font-family: "Georgia", serif;
//         }
//         .cursor-pointer {
//           cursor: pointer;
//         }
//         .pdf-avoid-break {
//           page-break-inside: avoid !important;
//           break-inside: avoid !important;
//         }

//         .social-icon {
//           width: 32px;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white !important;
//           border-radius: 2px;
//           text-decoration: none !important;
//         }
//         .social-icon.li {
//           background: #0077b5;
//         }
//         .social-icon.x {
//           background: #000000;
//         }
//         .social-icon.fb {
//           background: #3b5998;
//         }
//         .social-icon.mail {
//           background: #71b9e5;
//         }
//         .social-icon.print {
//           background: #56add6;
//           cursor: pointer;
//         }

//         @media print {
//           header,
//           footer,
//           nav,
//           .no-print,
//           .accordion-icon,
//           .news-tabs {
//             display: none !important;
//           }
//           .d-print-flex {
//             display: flex !important;
//           }
//           .d-print-block {
//             display: block !important;
//           }
//           @page {
//             margin: 0.2in;
//           }
//           body,
//           .profile-main-wrapper {
//             background: white !important;
//             color: black !important;
//             margin: 0;
//             padding: 0;
//           }
//           .hero-bg,
//           .news-events-section {
//             background: white !important;
//             color: black !important;
//             padding: 0 !important;
//             margin-bottom: 20px !important;
//           }
//           .news-events-section h3 {
//             color: black !important;
//             margin-top: 30px !important;
//           }
//           .news-item {
//             border-color: #eee !important;
//           }
//           .date-label {
//             color: #666 !important;
//             opacity: 1 !important;
//           }
//           .print-col-img {
//             width: 40% !important;
//             flex: 0 0 40% !important;
//           }
//           .print-col-text {
//             width: 60% !important;
//             flex: 0 0 60% !important;
//             padding-left: 50px !important;
//           }
//           .profile-img {
//             max-width: 320px !important;
//           }
//           .name-title {
//             color: black !important;
//             font-size: 2.8rem !important;
//             line-height: 1;
//             margin-bottom: 10px !important;
//           }
//           .email-link {
//             color: black !important;
//             font-size: 1.15rem !important;
//             margin-bottom: 20px !important;
//           }
//           .role-label,
//           .office-label {
//             color: #333 !important;
//             font-weight: bold !important;
//           }
//           .accordion-content {
//             display: block !important;
//           }
//           .capability-links span {
//             text-decoration: underline !important;
//             color: black !important;
//           }
//           .border-top-doc {
//             border-top: 1px solid #eee !important;
//             margin-top: 15px;
//           }
//         }

//         /* PDF Download Fixes */
//         .pdf-capture-mode .no-print,
//         .pdf-capture-mode .news-tabs {
//           display: none !important;
//         }
//         .pdf-capture-mode .hero-bg,
//         .pdf-capture-mode .news-events-section {
//           background: white !important;
//           color: black !important;
//           padding-top: 10px !important;
//           margin-top: 0 !important;
//         }
//         .pdf-capture-mode .news-events-section h3 {
//           color: black !important;
//         }
//         .pdf-capture-mode .date-label {
//           color: #666 !important;
//           opacity: 1 !important;
//         }
//         .pdf-capture-mode .news-item {
//           border-color: #eee !important;
//         }
//         .pdf-capture-mode .name-title {
//           color: black !important;
//           font-size: 2.6rem;
//         }
//         .pdf-capture-mode .print-meta-header {
//           display: flex !important;
//           margin-bottom: 5px !important;
//         }
//         .pdf-capture-mode .accordion-content {
//           display: block !important;
//         }
//       `}</style>
//     </main>
//   );
// }


"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import {
  getAllAttorneys,
  getImgUrl,
  getAllNews,
  getAllEvents,
} from "../../services/authService";

export default function AttorneyProfilePage() {
  const router = useRouter();
  const { slug } = router.query;
  const profileRef = useRef();

  const [attorney, setAttorney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("News");
  const [showShare, setShowShare] = useState(false);

  const [expOpen, setExpOpen] = useState(false);
  const [recOpen, setRecOpen] = useState(true);

  const gtGold = "#c5a059";

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

  const createNameSlug = (f, l) => createSlug(`${f} ${l || ""}`);

  useEffect(() => {
    if (!slug) return;
    const loadData = async () => {
      setLoading(true);
      try {
        const [attRes, newsRes, eventRes] = await Promise.all([
          getAllAttorneys(),
          getAllNews(),
          getAllEvents(),
        ]);
        const list = attRes?.attorneys || attRes?.data || [];
        const found = list.find(
          (attr) => createNameSlug(attr.firstName, attr.lastName) === slug,
        );
        if (found) setAttorney(found);
        setNews(newsRes?.data || []);
        setEvents(eventRes?.data || []);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  const handleDownloadPDF = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = profileRef.current;
    element.classList.add("pdf-capture-mode");

    const opt = {
      margin: [0, 0.4, 0.3, 0.4],
      filename: `${attorney?.lastName}_Profile.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    await html2pdf().from(element).set(opt).save();
    element.classList.remove("pdf-capture-mode");
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </div>
    );
  if (!attorney)
    return <div className="text-center py-5">Attorney not found.</div>;

  const currentList = activeTab === "News" ? news : events;
  const today = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="bg-white profile-main-wrapper" ref={profileRef}>
      <Head>
        <title>
          {attorney.firstName} {attorney.lastName} | Corporate Lawyer |
          Professionals | Greenberg Traurig LLP
        </title>
      </Head>

      {/* --- PRINT-ONLY PROFESSIONAL HEADER --- */}
      <div className="print-meta-header d-none d-print-flex justify-content-between mb-2 small text-muted border-bottom pb-1">
        <span>{today}</span>
        <span>
          {attorney.firstName} {attorney.lastName} | Corporate Lawyer |
          Professionals | Greenberg Traurig LLP
        </span>
      </div>

      {/* --- HERO SECTION --- */}
      <section
        className="text-white pt-5 pb-0 hero-bg" // Changed pb-3 to pb-0
        style={{ backgroundColor: "#1a1a1a", overflow: "hidden" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div className="row align-items-end g-4">
            {" "}
            {/* Changed align-items-center to align-items-end */}
            <div className="col-4 col-md-5 d-flex justify-content-center print-col-img">
              <img
                src={
                  attorney.profileImage
                    ? getImgUrl(attorney.profileImage)
                    : "/assets/images/profile.png"
                }
                alt={attorney.firstName}
                className="img-fluid profile-img" 
                style={{
                  width: "100%",
                  maxWidth: "300px", 
                  height: "auto",
                  objectFit: "contain", 
                  display: "block",
                  marginBottom: "-1px", 
                }}
                onError={(e) => {
                  e.target.src = "/assets/images/profile.png";
                }}
              />
            </div>
            <div className="col-8 col-md-7 ps-md-5 pb-5 pt-5 text-start print-col-text">
              <h1 className="display-3 serif-font mb-4 fw-normal name-title">
                {attorney.firstName} <br className="d-none d-print-block" />{" "}
                {attorney.lastName}
              </h1>

              <div className="d-flex align-items-center mb-4">
                <div
                  className="gold-line d-none d-md-block no-print"
                  style={{
                    width: "45px",
                    height: "1px",
                    backgroundColor: gtGold,
                    marginRight: "15px",
                  }}></div>
                <span
                  className="text-uppercase small fw-bold text-secondary role-label"
                  style={{ letterSpacing: "3px" }}>
                  {attorney.servicesOffered || "ASSOCIATE"}
                </span>
              </div>

              <a
                href={`mailto:${attorney.email}`}
                className="d-block mb-4 h5 fw-light text-decoration-none serif-font email-link"
                style={{ color: gtGold }}>
                {attorney.email}
              </a>

              <div className="mt-4 contact-block">
                <p
                  className="text-uppercase fw-bold mb-1 small office-label"
                  style={{ color: gtGold }}>
                  Washington, D.C.
                </p>
                <div className="small opacity-75 phone-block">
                  <p className="mb-0">
                    D +1 {attorney.phoneOffice || "202.530.8593"}
                  </p>
                  <p className="mb-0">
                    T +1 {attorney.phoneCell || "202.331.3100"}
                  </p>
                </div>
              </div>

              {/* PDF / PRINT / SHARE BUTTONS */}
              <div className="d-flex justify-content-end align-items-center mt-5 gap-3 small no-print">
                <span
                  className="text-info border-end pe-3 cursor-pointer"
                  onClick={handleDownloadPDF}>
                  PDF
                </span>
                <span
                  className="text-info border-end pe-3 cursor-pointer"
                  onClick={handlePrint}>
                  Print
                </span>
                <div className="position-relative">
                  <span
                    className="text-info cursor-pointer"
                    onClick={() => setShowShare(!showShare)}>
                    Share {showShare ? "-" : "+"}
                  </span>
                  {showShare && (
                    <div
                      className="position-absolute d-flex gap-2 p-2 rounded shadow-lg share-box"
                      style={{
                        bottom: "-60px",
                        right: 0,
                        background: "transparent",
                        zIndex: 100,
                      }}>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                        target="_blank"
                        className="social-icon li">
                        <i className="bi bi-linkedin"></i>
                      </a>
                      <a href="#" className="social-icon x">
                        <i className="bi bi-twitter-x"></i>
                      </a>
                      <a href="#" className="social-icon fb">
                        <i className="bi bi-facebook"></i>
                      </a>
                      <a
                        href={`mailto:?body=${currentUrl}`}
                        className="social-icon mail">
                        <i className="bi bi-envelope-fill"></i>
                      </a>
                      <span onClick={handlePrint} className="social-icon print">
                        <i className="bi bi-printer-fill"></i>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTENT BODY --- */}
      <div
        className="container py-4 content-body"
        style={{ maxWidth: "850px" }}>
        <div
          className="mb-4 lh-lg text-secondary profile-bio"
          dangerouslySetInnerHTML={{ __html: attorney.aboutus }}
        />

        {/* CAPABILITIES */}
        <div className="border-top-doc pt-3 mb-4 pdf-avoid-break">
          <h3 className="serif-font mb-3">Capabilities</h3>
          <div className="capability-links">
            <span className="text-decoration-underline">Corporate</span>
            <span className="mx-2">|</span>
            <span className=" text-decoration-underline">
              Health Care & FDA Practice
            </span>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="border-top-doc pt-3 mb-4 accordion-section pdf-avoid-break">
          <h3 className="serif-font mb-3">Experience</h3>
          <div
            className="d-flex justify-content-between align-items-center border-bottom pb-1 cursor-pointer no-print"
            onClick={() => setExpOpen(!expOpen)}>
            <span className="fw-bold" style={{ color: gtGold }}>
              Internships
            </span>
            <span className="accordion-icon" style={{ color: gtGold }}>
              {expOpen ? "−" : "+"}
            </span>
          </div>
          <p
            className="fw-bold d-none d-print-block"
            style={{ color: gtGold, margin: "5px 0" }}>
            Internships
          </p>
          <div
            className={`accordion-content py-2 text-secondary ${expOpen ? "d-block" : "d-none"}`}>
            <ul className="ms-3">
              <li>
                Certified Legal Intern, Community Development Clinic, Notre Dame
                Clinical Law Center, 2022
              </li>
              <li>
                Corporate Counsel Extern, Saint Joseph Health System and Loyola
                University Health System, 2021
              </li>
            </ul>
          </div>
        </div>

        {/* RECOGNITION */}
        <div className="border-top-doc pt-3 mb-4 accordion-section pdf-avoid-break">
          <h3 className="serif-font mb-3">Recognition & Leadership</h3>
          <div
            className="d-flex justify-content-between align-items-center border-bottom pb-1 cursor-pointer no-print"
            onClick={() => setRecOpen(!recOpen)}>
            <span className="fw-bold" style={{ color: gtGold }}>
              Professional & Community Involvement
            </span>
            <span className="accordion-icon" style={{ color: gtGold }}>
              {recOpen ? "−" : "+"}      
            </span>
          </div>
          <p
            className="fw-bold d-none d-print-block"
            style={{ color: gtGold, margin: "5px 0" }}>
            Professional & Community Involvement
          </p>
          <div
            className={`accordion-content py-2 text-secondary ${recOpen ? "d-block" : "d-none"}`}>
            <ul className="list-unstyled custom-list ms-3">
              <li>• American Bar Association, Business Law Section</li>
              <li>• Tennessee Bar Association</li>
              <li>• Notre Dame Alumni Association</li>
            </ul>
          </div>
        </div>

        {/* CREDENTIALS */}
        <div className="border-top-doc pt-3 mb-4 pdf-avoid-break">
          <h3 className="serif-font mb-4">Credentials</h3>
          <div className="row g-4">
            <div className="col-6">
              <h6
                className="text-uppercase fw-bold text-muted mb-2"
                style={{ fontSize: "0.75rem" }}>
                Education
              </h6>
              <div
                className="small text-secondary"
                dangerouslySetInnerHTML={{ __html: attorney.education }}
              />
            </div>
            <div className="col-6">
              <h6
                className="text-uppercase fw-bold text-muted mb-2"
                style={{ fontSize: "0.75rem" }}>
                Admissions
              </h6>
              <div
                className="small text-secondary"
                dangerouslySetInnerHTML={{ __html: attorney.admission }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- NEWS SECTION --- */}
      <section
        className="bg-dark text-white py-5 news-events-section"
        style={{ backgroundColor: "#1a1a1a" }}>
        <div className="container py-4" style={{ maxWidth: "850px" }}>
          <h3 className="serif-font mb-5" style={{ fontSize: "2.6rem" }}>
            News & Events
          </h3>
          <div className="mb-4 d-flex gap-4 border-bottom border-secondary news-tabs">
            <span
              className={`cursor-pointer pb-2 fw-bold ${activeTab === "News" ? "text-white border-bottom border-white" : "opacity-50"}`}
              onClick={() => setActiveTab("News")}>
              News
            </span>
            <span
              className={`cursor-pointer pb-2 fw-bold ${activeTab === "Events" ? "text-white border-bottom border-white" : "opacity-50"}`}
              onClick={() => setActiveTab("Events")}>
              Events
            </span>
          </div>
          <div className="list-group list-group-flush bg-transparent">
            {currentList.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="bg-transparent border-bottom border-secondary py-4 news-item">
                <div className="small text-uppercase opacity-50 mb-2 date-label">
                  {new Date(
                    item.createdAt || item.startDate,
                  ).toLocaleDateString()}{" "}
                  | {activeTab.toUpperCase()}
                </div>
                <Link
                  href={`/${activeTab.toLowerCase()}/${createSlug(item.title)}`}>
                  <a
                    className="h4 text-decoration-none d-block serif-font"
                    style={{ color: gtGold }}>
                    {item.title}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .serif-font {
          font-family: "Georgia", serif;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .pdf-avoid-break {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .social-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white !important;
          border-radius: 2px;
          text-decoration: none !important;
        }
        .social-icon.li {
          background: #0077b5;
        }
        .social-icon.x {
          background: #000000;
        }
        .social-icon.fb {
          background: #3b5998;
        }
        .social-icon.mail {
          background: #71b9e5;
        }
        .social-icon.print {
          background: #56add6;
          cursor: pointer;
        }

        @media print {
          header,
          footer,
          nav,
          .no-print,
          .accordion-icon,
          .news-tabs {
            display: none !important;
          }
          .d-print-flex {
            display: flex !important;
          }
          .d-print-block {
            display: block !important;
          }
          @page {
            margin: 0.2in;
          }
          body,
          .profile-main-wrapper {
            background: white !important;
            color: black !important;
            margin: 0;
            padding: 0;
          }
          .hero-bg,
          .news-events-section {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin-bottom: 20px !important;
          }
          .news-events-section h3 {
            color: black !important;
            margin-top: 30px !important;
          }
          .news-item {
            border-color: #eee !important;
          }
          .date-label {
            color: #666 !important;
            opacity: 1 !important;
          }
          .print-col-img {
            width: 40% !important;
            flex: 0 0 40% !important;
          }
          .print-col-text {
            width: 60% !important;
            flex: 0 0 60% !important;
            padding-left: 50px !important;
          }
          .profile-img {
            max-width: 320px !important;
          }
          .name-title {
            color: black !important;
            font-size: 2.8rem !important;
            line-height: 1;
            margin-bottom: 10px !important;
          }
          .email-link {
            color: black !important;
            font-size: 1.15rem !important;
            margin-bottom: 20px !important;
          }
          .role-label,
          .office-label {
            color: #333 !important;
            font-weight: bold !important;
          }
          .accordion-content {
            display: block !important;
          }
          .capability-links span {
            text-decoration: underline !important;
            color: black !important;
          }
          .border-top-doc {
            border-top: 1px solid #eee !important;
            margin-top: 15px;
          }
        }

        /* PDF Download Fixes */
        .pdf-capture-mode .no-print,
        .pdf-capture-mode .news-tabs {
          display: none !important;
        }
        .pdf-capture-mode .hero-bg,
        .pdf-capture-mode .news-events-section {
          background: white !important;
          color: black !important;
          padding-top: 10px !important;
          margin-top: 0 !important;
        }
        .pdf-capture-mode .news-events-section h3 {
          color: black !important;
        }
        .pdf-capture-mode .date-label {
          color: #666 !important;
          opacity: 1 !important;
        }
        .pdf-capture-mode .news-item {
          border-color: #eee !important;
        }
        .pdf-capture-mode .name-title {
          color: black !important;
          font-size: 2.6rem;
        }
        .pdf-capture-mode .print-meta-header {
          display: flex !important;
          margin-bottom: 5px !important;
        }
        .pdf-capture-mode .accordion-content {
          display: block !important;
        }
      `}</style>
    </main>
  );
}
