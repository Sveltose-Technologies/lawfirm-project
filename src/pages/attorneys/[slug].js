

// // // import React, { useEffect, useState } from 'react';
// // // import { useRouter } from 'next/router';
// // // import Link from 'next/link';
// // // // Data Import from same folder
// // // import { attorneysData } from './index'; 

// // // function AttorneyDetails() {
// // //   const router = useRouter();
// // //   const { slug } = router.query; 
// // //   const [attorney, setAttorney] = useState(null);

// // //   useEffect(() => {
// // //     if (id) {
// // //       const found = attorneysData.find(item => item.id.toString() === id.toString());
// // //       setAttorney(found);
// // //     }
// // //   }, [id]);

// // //   if (!id) return <div className="text-center py-5">Loading...</div>;
// // //   if (!attorney) return (
// // //     <div className="text-center py-5">
// // //       <h3>Attorney Not Found</h3>
// // //       <Link href="/attorneys">
// // //         <a className="btn btn-primary mt-3">Back to List</a>
// // //       </Link>
// // //     </div>
// // //   );

// // //   return (
// // //     <>
// // //       {/* HERO SECTION */}
// // //       <div className="section-hero">
// // //         <div className="container">
// // //           <div className="row align-items-center">
            
// // //             {/* Profile Image */}
// // //             <div className="col-lg-3 col-md-4 mb-4 mb-md-0 text-center text-md-start">
// // //               <img 
// // //                 src={attorney.image} 
// // //                 alt={attorney.name} 
// // //                 className="img-fluid rounded shadow-lg profile-image" 
// // //               />
// // //             </div>

// // //             {/* Basic Info */}
// // //             <div className="col-lg-9 col-md-8 ps-md-5">
// // //               <h4 className="text-uppercase fw-bold mb-2 role-title">
// // //                 {attorney.role}
// // //               </h4>
// // //               <h1 className="display-4 fw-bold font-serif mb-3 responsive-title text-white">{attorney.name}</h1>
              
// // //               {/* Contact Icons */}
// // //               <div className="d-flex flex-wrap gap-4 mb-4 text-white-50 info-icons">
// // //                 <div className="d-flex align-items-center gap-2">
// // //                   <i className="bi bi-geo-alt-fill text-gold"></i>
// // //                   <span className="text-white fs-5">{attorney.location}</span>
// // //                 </div>
// // //                 <div className="d-flex align-items-center gap-2">
// // //                   <i className="bi bi-envelope-fill text-gold"></i>
// // //                   <a href={`mailto:${attorney.email}`} className="text-white text-decoration-none fs-5">{attorney.email}</a>
// // //                 </div>
// // //                 <div className="d-flex align-items-center gap-2">
// // //                   <i className="bi bi-telephone-fill text-gold"></i>
// // //                   <span className="text-white fs-5">{attorney.phone}</span>
// // //                 </div>
// // //               </div>
              
// // //               {/* Rating & Rate */}
// // //               <div className="d-flex align-items-center gap-3">
// // //                  <span className="badge bg-gold text-dark fs-6 px-3 py-2">${attorney.hourlyRate} / hr</span>
// // //                  <div className="text-warning fs-5">
// // //                     {[...Array(5)].map((_, i) => (
// // //                         <i key={i} className={`bi bi-star${i < attorney.rating ? '-fill' : ''}`}></i>
// // //                     ))}
// // //                  </div>
// // //               </div>

// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* DETAILS CONTENT */}
// // //       <div className="py-5 section-details">
// // //         <div className="container">
// // //           <div className="row">
            
// // //             {/* LEFT COLUMN: Bio & Experience */}
// // //             <div className="col-lg-8 pe-lg-5 mb-5">
              
// // //               {/* Biography Section */}
// // //               <div className="mb-5">
// // //                 <h3 className="border-bottom pb-2 mb-4 section-heading">Biography</h3>
// // //                 {/* 18px Font applied via css below */}
// // //                 {attorney.bio?.map((para, idx) => (
// // //                     <p key={idx} className="text-muted bio-text">{para}</p>
// // //                 ))}
// // //               </div>

// // //               {/* Experience Section (NEW) */}
// // //               {attorney.experience && (
// // //                 <div className="mb-5">
// // //                     <h3 className="border-bottom pb-2 mb-4 section-heading">Representative Experience</h3>
// // //                     <ul className="list-unstyled">
// // //                         {attorney.experience.map((exp, i) => (
// // //                             <li key={i} className="mb-3 d-flex align-items-start text-muted experience-item">
// // //                                 <i className="bi bi-arrow-right-circle-fill text-gold me-3 mt-1"></i>
// // //                                 <span>{exp}</span>
// // //                             </li>
// // //                         ))}
// // //                     </ul>
// // //                 </div>
// // //               )}

// // //               <div className="mt-5">
// // //                   <Link href="/attorneys">
// // //                     <a className="btn btn-outline-navy px-4 py-2"><i className="bi bi-arrow-left me-2"></i>Back to Professionals</a>
// // //                   </Link>
// // //               </div>
// // //             </div>

// // //             {/* RIGHT COLUMN: Sidebar */}
// // //             <div className="col-lg-4">
// // //               <div className="bg-light p-4 rounded border sidebar-box">
                 
// // //                  {/* Education */}
// // //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1">Education</h5>
// // //                  <ul className="list-unstyled text-secondary mb-4">
// // //                     {attorney.education?.map((edu, i) => (
// // //                         <li key={i} className="mb-2 d-flex fs-6">
// // //                             <i className="bi bi-mortarboard-fill me-2 text-gold"></i>
// // //                             <span>{edu}</span>
// // //                         </li>
// // //                     ))}
// // //                  </ul>

// // //                  <hr className="text-muted opacity-25" />

// // //                  {/* Admissions */}
// // //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Admissions</h5>
// // //                  <ul className="list-unstyled text-secondary mb-4">
// // //                     {attorney.admissions?.map((adm, i) => (
// // //                         <li key={i} className="mb-2 d-flex fs-6">
// // //                             <i className="bi bi-building me-2 text-gold"></i>
// // //                             <span>{adm}</span>
// // //                         </li>
// // //                     ))}
// // //                  </ul>

// // //                  {/* Awards (NEW) */}
// // //                  {attorney.awards && (
// // //                     <>
// // //                         <hr className="text-muted opacity-25" />
// // //                         <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Recognition</h5>
// // //                         <ul className="list-unstyled text-secondary mb-4">
// // //                             {attorney.awards.map((award, i) => (
// // //                                 <li key={i} className="mb-2 d-flex fs-6">
// // //                                     <i className="bi bi-trophy-fill me-2 text-gold"></i>
// // //                                     <span>{award}</span>
// // //                                 </li>
// // //                             ))}
// // //                         </ul>
// // //                     </>
// // //                  )}

// // //                  {/* Languages (NEW) */}
// // //                  {attorney.languages && (
// // //                     <>
// // //                         <hr className="text-muted opacity-25" />
// // //                         <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Languages</h5>
// // //                         <div className="d-flex flex-wrap gap-2">
// // //                             {attorney.languages.map((lang, i) => (
// // //                                 <span key={i} className="badge bg-white border text-secondary p-2 fs-6">
// // //                                     {lang}
// // //                                 </span>
// // //                             ))}
// // //                         </div>
// // //                     </>
// // //                  )}

// // //               </div>
// // //             </div>

// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       <style jsx>{`
// // //         /* COLORS */
// // //         .text-gold { color: #de9f57 !important; }
// // //         .bg-gold { background-color: #de9f57 !important; }
// // //         .btn-outline-navy { color: #002855; border: 2px solid #002855; font-weight: bold; transition: 0.3s; }
// // //         .btn-outline-navy:hover { background-color: #002855; color: #fff; }

// // //         .ls-1 { letter-spacing: 1px; font-size: 0.9rem; }

// // //         /* HERO */
// // //         .section-hero { background-color: #002855; padding-top: 100px; padding-bottom: 80px; color: #ffffff; }
// // //         .profile-image { border: 4px solid #de9f57; width: 100%; max-width: 280px; height: 280px; object-fit: cover; object-position: top; }
// // //         .role-title { color: #de9f57; letter-spacing: 2px; font-size: 1.1rem; }

// // //         /* BIG FONTS CLASS */
// // //         .bio-text {
// // //             font-size: 18px; /* 18px Font Size for Bio */
// // //             line-height: 1.8;
// // //             margin-bottom: 20px;
// // //         }
// // //         .experience-item {
// // //             font-size: 17px;
// // //         }

// // //         /* HEADINGS */
// // //         .section-heading { color: #002855; border-color: #de9f57 !important; font-weight: bold; font-size: 1.75rem; }
// // //         .sidebar-heading { color: #002855; }
// // //         .sidebar-box { box-shadow: 0 5px 15px rgba(0,0,0,0.05); }

// // //         /* RESPONSIVE */
// // //         @media (max-width: 768px) {
// // //             .responsive-title { font-size: 2.2rem; }
// // //             .info-icons { flex-direction: column; gap: 10px !important; }
// // //             .profile-image { margin-bottom: 20px; }
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // }

// // // export default AttorneyDetails;

// // //pages/attrneys/[slug].js 
// // import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/router';
// // import Link from 'next/link';
// // // Data Import from same folder
// // import { attorneysData } from './index'; 

// // function AttorneyDetails() {
// //   const router = useRouter();
// //   const { slug } = router.query; // Pehle yaha id tha, ab slug hai
// //   const [attorney, setAttorney] = useState(null);

// //   useEffect(() => {
// //     if (slug) {
// //       // Ab hum ID ki jagah slug se find kar rahe hain
// //       const found = attorneysData.find(item => item.slug === slug);
// //       setAttorney(found);
// //     }
// //   }, [slug]); // Dependency array mein bhi slug aayega

// //   // Jab tak URL se slug na mile, loading dikhao
// //   if (!slug) return <div className="text-center py-5">Loading...</div>;

// //   if (!attorney) return (
// //     <div className="text-center py-5">
// //       <h3>Attorney Not Found</h3>
// //       <Link href="/attorneys">
// //         <a className="btn btn-primary mt-3">Back to List</a>
// //       </Link>
// //     </div>
// //   );

// //   return (
// //     <>
// //       {/* HERO SECTION */}
// //       <div className="section-hero">
// //         <div className="container">
// //           <div className="row align-items-center">
            
// //             {/* Profile Image */}
// //             <div className="col-lg-3 col-md-4 mb-4 mb-md-0 text-center text-md-start">
// //               <img 
// //                 src={attorney.image} 
// //                 alt={attorney.name} 
// //                 className="img-fluid rounded shadow-lg profile-image" 
// //               />
// //             </div>

// //             {/* Basic Info */}
// //             <div className="col-lg-9 col-md-8 ps-md-5">
// //               <h4 className="text-uppercase fw-bold mb-2 role-title">
// //                 {attorney.role}
// //               </h4>
// //               <h1 className="display-4 fw-bold font-serif mb-3 responsive-title text-white">{attorney.name}</h1>
              
// //               {/* Contact Icons */}
// //               <div className="d-flex flex-wrap gap-4 mb-4 text-white-50 info-icons">
// //                 <div className="d-flex align-items-center gap-2">
// //                   <i className="bi bi-geo-alt-fill text-gold"></i>
// //                   <span className="text-white fs-5">{attorney.location}</span>
// //                 </div>
// //                 <div className="d-flex align-items-center gap-2">
// //                   <i className="bi bi-envelope-fill text-gold"></i>
// //                   <a href={`mailto:${attorney.email}`} className="text-white text-decoration-none fs-5">{attorney.email}</a>
// //                 </div>
// //                 <div className="d-flex align-items-center gap-2">
// //                   <i className="bi bi-telephone-fill text-gold"></i>
// //                   <span className="text-white fs-5">{attorney.phone}</span>
// //                 </div>
// //               </div>
              
// //               {/* Rating & Rate */}
// //               <div className="d-flex align-items-center gap-3">
// //                  <span className="badge bg-gold text-dark fs-6 px-3 py-2">${attorney.hourlyRate} / hr</span>
// //                  <div className="text-warning fs-5">
// //                     {[...Array(5)].map((_, i) => (
// //                         <i key={i} className={`bi bi-star${i < attorney.rating ? '-fill' : ''}`}></i>
// //                     ))}
// //                  </div>
// //               </div>

// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* DETAILS CONTENT */}
// //       <div className="py-5 section-details">
// //         <div className="container">
// //           <div className="row">
            
// //             {/* LEFT COLUMN: Bio & Experience */}
// //             <div className="col-lg-8 pe-lg-5 mb-5">
              
// //               {/* Biography Section */}
// //               <div className="mb-5">
// //                 <h3 className="border-bottom pb-2 mb-4 section-heading">Biography</h3>
// //                 {attorney.bio?.map((para, idx) => (
// //                     <p key={idx} className="text-muted bio-text">{para}</p>
// //                 ))}
// //               </div>

// //               {/* Experience Section */}
// //               {attorney.experience && (
// //                 <div className="mb-5">
// //                     <h3 className="border-bottom pb-2 mb-4 section-heading">Representative Experience</h3>
// //                     <ul className="list-unstyled">
// //                         {attorney.experience.map((exp, i) => (
// //                             <li key={i} className="mb-3 d-flex align-items-start text-muted experience-item">
// //                                 <i className="bi bi-arrow-right-circle-fill text-gold me-3 mt-1"></i>
// //                                 <span>{exp}</span>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 </div>
// //               )}

// //               <div className="mt-5">
// //                   <Link href="/attorneys">
// //                     <a className="btn btn-outline-navy px-4 py-2"><i className="bi bi-arrow-left me-2"></i>Back to Professionals</a>
// //                   </Link>
// //               </div>
// //             </div>

// //             {/* RIGHT COLUMN: Sidebar */}
// //             <div className="col-lg-4">
// //               <div className="bg-light p-4 rounded border sidebar-box">
                 
// //                  {/* Education */}
// //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1">Education</h5>
// //                  <ul className="list-unstyled text-secondary mb-4">
// //                     {attorney.education?.map((edu, i) => (
// //                         <li key={i} className="mb-2 d-flex fs-6">
// //                             <i className="bi bi-mortarboard-fill me-2 text-gold"></i>
// //                             <span>{edu}</span>
// //                         </li>
// //                     ))}
// //                  </ul>

// //                  <hr className="text-muted opacity-25" />

// //                  {/* Admissions */}
// //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Admissions</h5>
// //                  <ul className="list-unstyled text-secondary mb-4">
// //                     {attorney.admissions?.map((adm, i) => (
// //                         <li key={i} className="mb-2 d-flex fs-6">
// //                             <i className="bi bi-building me-2 text-gold"></i>
// //                             <span>{adm}</span>
// //                         </li>
// //                     ))}
// //                  </ul>

// //                  {/* Awards */}
// //                  {attorney.awards && (
// //                     <>
// //                         <hr className="text-muted opacity-25" />
// //                         <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Recognition</h5>
// //                         <ul className="list-unstyled text-secondary mb-4">
// //                             {attorney.awards.map((award, i) => (
// //                                 <li key={i} className="mb-2 d-flex fs-6">
// //                                     <i className="bi bi-trophy-fill me-2 text-gold"></i>
// //                                     <span>{award}</span>
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     </>
// //                  )}

// //                  {/* Languages */}
// //                  {attorney.languages && (
// //                     <>
// //                         <hr className="text-muted opacity-25" />
// //                         <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Languages</h5>
// //                         <div className="d-flex flex-wrap gap-2">
// //                             {attorney.languages.map((lang, i) => (
// //                                 <span key={i} className="badge bg-white border text-secondary p-2 fs-6">
// //                                     {lang}
// //                                 </span>
// //                             ))}
// //                         </div>
// //                     </>
// //                  )}

// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
      
// //       <style jsx>{`
// //         .text-gold { color: #de9f57 !important; }
// //         .bg-gold { background-color: #de9f57 !important; }
// //         .btn-outline-navy { color: #002855; border: 2px solid #002855; font-weight: bold; transition: 0.3s; }
// //         .btn-outline-navy:hover { background-color: #002855; color: #fff; }
// //         .ls-1 { letter-spacing: 1px; font-size: 0.9rem; }
// //         .section-hero { background-color: #002855; padding-top: 100px; padding-bottom: 80px; color: #ffffff; }
// //         .profile-image { border: 4px solid #de9f57; width: 100%; max-width: 280px; height: 280px; object-fit: cover; object-position: top; }
// //         .role-title { color: #de9f57; letter-spacing: 2px; font-size: 1.1rem; }
// //         .bio-text { font-size: 18px; line-height: 1.8; margin-bottom: 20px; }
// //         .experience-item { font-size: 17px; }
// //         .section-heading { color: #002855; border-color: #de9f57 !important; font-weight: bold; font-size: 1.75rem; }
// //         .sidebar-heading { color: #002855; }
// //         .sidebar-box { box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
// //         @media (max-width: 768px) {
// //             .responsive-title { font-size: 2.2rem; }
// //             .info-icons { flex-direction: column; gap: 10px !important; }
// //             .profile-image { margin-bottom: 20px; }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// // export default AttorneyDetails;


// // import React, { useEffect, useState } from 'react';
// // import { useRouter } from 'next/router';
// // import Link from 'next/link';
// // // Data Import
// // import { attorneysData } from './index'; 

// // function AttorneyDetails() {
// //   const router = useRouter();
// //   const { slug } = router.query; 
// //   const [attorney, setAttorney] = useState(null);

// //   useEffect(() => {
// //     if (slug) {
// //       // Slug se find kar rahe hain
// //       const found = attorneysData.find(item => item.slug === slug);
// //       setAttorney(found);
// //     }
// //   }, [slug]);

// //   if (!slug) return <div className="text-center py-5">Loading...</div>;

// //   if (!attorney) return (
// //     <div className="text-center py-5">
// //       <h3>Attorney Not Found</h3>
// //       <Link href="/attorneys"><a className="btn btn-primary mt-3">Back to List</a></Link>
// //     </div>
// //   );

// //   return (
// //     <>
// //       <div className="section-hero">
// //         <div className="container">
// //           <div className="row align-items-center">
// //             <div className="col-lg-3 col-md-4 mb-4 mb-md-0 text-center text-md-start">
// //               <img src={attorney.image} alt={attorney.name} className="img-fluid rounded shadow-lg profile-image" />
// //             </div>
// //             <div className="col-lg-9 col-md-8 ps-md-5">
// //               <h4 className="text-uppercase fw-bold mb-2 role-title">{attorney.role}</h4>
// //               <h1 className="display-4 fw-bold font-serif mb-3 text-white">{attorney.name}</h1>
// //               <div className="d-flex flex-wrap gap-4 mb-4 text-white-50 info-icons">
// //                 <div className="d-flex align-items-center gap-2"><i className="bi bi-geo-alt-fill text-gold"></i><span className="text-white fs-5">{attorney.location}</span></div>
// //                 <div className="d-flex align-items-center gap-2"><i className="bi bi-envelope-fill text-gold"></i><a href={`mailto:${attorney.email}`} className="text-white text-decoration-none fs-5">{attorney.email}</a></div>
// //                 <div className="d-flex align-items-center gap-2"><i className="bi bi-telephone-fill text-gold"></i><span className="text-white fs-5">{attorney.phone}</span></div>
// //               </div>
// //               <div className="d-flex align-items-center gap-3">
// //                  <span className="badge bg-gold text-dark fs-6 px-3 py-2">${attorney.hourlyRate} / hr</span>
// //                  <div className="text-warning fs-5">
// //                     {[...Array(5)].map((_, i) => <i key={i} className={`bi bi-star${i < attorney.rating ? '-fill' : ''}`}></i>)}
// //                  </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="py-5 section-details">
// //         <div className="container">
// //           <div className="row">
// //             <div className="col-lg-8 pe-lg-5 mb-5">
// //               <div className="mb-5">
// //                 <h3 className="border-bottom pb-2 mb-4 section-heading">Biography</h3>
// //                 {attorney.bio?.map((para, idx) => <p key={idx} className="text-muted bio-text">{para}</p>)}
// //               </div>
// //               <div className="mt-5">
// //                   <Link href="/attorneys"><a className="btn btn-outline-navy px-4 py-2"><i className="bi bi-arrow-left me-2"></i>Back to Professionals</a></Link>
// //               </div>
// //             </div>

// //             <div className="col-lg-4">
// //               <div className="bg-light p-4 rounded border sidebar-box">
// //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1">Education</h5>
// //                  <ul className="list-unstyled text-secondary mb-4">
// //                     {attorney.education?.map((edu, i) => <li key={i} className="mb-2 d-flex fs-6"><i className="bi bi-mortarboard-fill me-2 text-gold"></i><span>{edu}</span></li>)}
// //                  </ul>
// //                  <hr className="text-muted opacity-25" />
// //                  <h5 className="fw-bold mb-3 sidebar-heading text-uppercase ls-1 mt-4">Admissions</h5>
// //                  <ul className="list-unstyled text-secondary mb-4">
// //                     {attorney.admissions?.map((adm, i) => <li key={i} className="mb-2 d-flex fs-6"><i className="bi bi-building me-2 text-gold"></i><span>{adm}</span></li>)}
// //                  </ul>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
      
// //       <style jsx>{`
// //         .text-gold { color: #de9f57 !important; }
// //         .bg-gold { background-color: #de9f57 !important; }
// //         .btn-outline-navy { color: #002855; border: 2px solid #002855; font-weight: bold; transition: 0.3s; }
// //         .btn-outline-navy:hover { background-color: #002855; color: #fff; }
// //         .section-hero { background-color: #002855; padding-top: 100px; padding-bottom: 80px; color: #ffffff; }
// //         .profile-image { border: 4px solid #de9f57; width: 100%; max-width: 280px; height: 280px; object-fit: cover; object-position: top; }
// //         .role-title { color: #de9f57; letter-spacing: 2px; }
// //         .bio-text { font-size: 18px; line-height: 1.8; }
// //         .section-heading { color: #002855; border-color: #de9f57 !important; font-weight: bold; }
// //         .sidebar-box { box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
// //       `}</style>
// //     </>
// //   );
// // }

// // export default AttorneyDetails;

// // import React from 'react';
// // import { useRouter } from 'next/router';

// // // Updated Data with Local Image Path
// // const attorneyList = [
// //   { id: 1, name: "Greta Habib", role: "SHAREHOLDER", email: "Greta.Habib@gtlaw.com", phone: "+971 (0) 50 641 2088", location: "Dubai", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
// //   { id: 2, name: "Dr. Lukas Hackmann", role: "SENIOR ASSOCIATE", email: "Lukas.Hackmann@gtlaw.com", phone: "+49 30.700.171.202", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
// //   { id: 3, name: "Fatin F. Haddad", role: "OF COUNSEL", email: "haddadf@gtlaw.com", phone: "+1 518.689.1437", location: "Albany", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
// //   { id: 4, name: "Elizabeth Ross Hadley", role: "SHAREHOLDER", email: "Elizabeth.Hadley@gtlaw.com", phone: "+1 512.320.7227", location: "Austin", practice: "GOVERNMENT LAW & POLICY", img: "/assets/images/attorney1.png" },
// //   { id: 5, name: "Sebastian Haimerl", role: "ASSOCIATE", email: "Sebastian.Haimerl@gtlaw.com", phone: "+49 30.700.171.112", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
// // ];

// // export default function AttorneySlugPage() {
// //   const router = useRouter();
// //   const { slug } = router.query;
// //   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// //   // Filter Logic: Starts with clicked letter
// //   const filteredAttorneys = attorneyList.filter(a => 
// //     a.name.toLowerCase().startsWith(slug?.toLowerCase())
// //   );

// //   return (
// //     <main className="bg-white overflow-hidden min-vh-100">
      
// //       {/* 1. TOP ALPHABET NAV */}
// //       <div className="container py-4 border-bottom">
// //         <div className="d-flex justify-content-between overflow-auto pb-2">
// //           {alphabet.map((char) => (
// //             <button 
// //               key={char} 
// //               onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
// //               className={`btn btn-link text-decoration-none fw-bold fs-3 px-2 border-0 ${slug === char.toLowerCase() ? 'text-warning' : 'text-dark'}`}
// //               style={{ fontFamily: 'serif', letterSpacing: '2px' }}
// //             >
// //               {char}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* 2. RESULTS LIST SECTION */}
// //       <section className="container mt-5 bg-white">
// //         <div className="d-flex justify-content-between align-items-end border-bottom border-dark pb-3 mb-5">
// //           <div>
// //             <span className="display-5 fw-light" style={{ fontFamily: 'serif' }}>Results — </span>
// //             <span className="display-5 fw-bold" style={{ fontFamily: 'serif' }}>{filteredAttorneys.length}</span>
// //             <div className="mt-2 small text-uppercase">
// //               <span className="fw-bold">Search Criteria:</span>
// //               <span className="ms-2 text-warning fw-bold">{slug?.toUpperCase()}</span>
// //             </div>
// //           </div>
// //           <div className="text-uppercase small fw-bold">Sort By: <span className="text-secondary">Position | </span><span className="text-warning">Alphabetical</span></div>
// //         </div>

// //         <div className="pb-5">
// //           {filteredAttorneys.length > 0 ? (
// //             filteredAttorneys.map((attorney) => (
// //               <div key={attorney.id} className="row g-0 py-5 border-bottom align-items-start">
// //                 <div className="col-auto">
// //                   {/* Local Image Used Here */}
// //                   <img 
// //                     src={attorney.img} 
// //                     alt={attorney.name} 
// //                     style={{ width: '160px', height: '180px', objectFit: 'cover' }} 
// //                   />
// //                 </div>
// //                 <div className="col ps-4">
// //                   <h2 className="text-warning mb-1" style={{ fontFamily: 'serif', fontWeight: 'bold' }}>{attorney.name}</h2>
// //                   <div className="small fw-bold text-secondary mb-3 tracking-widest">{attorney.role}</div>
// //                   <div className="mb-1">
// //                     <a href={`mailto:${attorney.email}`} className="text-decoration-none text-primary small fw-bold">{attorney.email}</a>
// //                   </div>
// //                   <div className="text-dark small">{attorney.phone}</div>
// //                 </div>
// //                 <div className="col-auto text-end h-100 d-flex flex-column justify-content-between">
// //                   <div className="text-primary small fw-bold">{attorney.location}</div>
// //                   <div className="mt-5 pt-5">
// //                     <span className="border border-dark px-3 py-2 small fw-bold text-uppercase d-inline-block">
// //                         {attorney.practice}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="py-5 text-center text-muted h4">
// //                 No professionals found starting with "{slug?.toUpperCase()}"
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       <div className="container pb-5">
// //          <button onClick={() => router.push('/attorneys')} className="btn btn-dark rounded-0 px-4 py-2">
// //             ← BACK TO SEARCH
// //          </button>
// //       </div>

// //     </main>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// // Updated Data with Local Image Path
// const attorneyList = [
//   { id: 1, name: "Greta Habib", role: "SHAREHOLDER", email: "Greta.Habib@gtlaw.com", phone: "+971 (0) 50 641 2088", location: "Dubai", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
//   { id: 2, name: "Dr. Lukas Hackmann", role: "SENIOR ASSOCIATE", email: "Lukas.Hackmann@gtlaw.com", phone: "+49 30.700.171.202", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
//   { id: 3, name: "Fatin F. Haddad", role: "OF COUNSEL", email: "haddadf@gtlaw.com", phone: "+1 518.689.1437", location: "Albany", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
//   { id: 4, name: "Elizabeth Ross Hadley", role: "SHAREHOLDER", email: "Elizabeth.Hadley@gtlaw.com", phone: "+1 512.320.7227", location: "Austin", practice: "GOVERNMENT LAW & POLICY", img: "/assets/images/attorney1.png" },
//   { id: 5, name: "Sebastian Haimerl", role: "ASSOCIATE", email: "Sebastian.Haimerl@gtlaw.com", phone: "+49 30.700.171.112", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
// ];

// export default function AttorneySlugPage() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   // New State for Profile Detail View
//   const [selectedAttorney, setSelectedAttorney] = useState(null);

//   // Reset detail view when slug (alphabet letter) changes
//   useEffect(() => {
//     setSelectedAttorney(null);
//   }, [slug]);

//   const filteredAttorneys = attorneyList.filter(a => 
//     a.name.toLowerCase().startsWith(slug?.toLowerCase())
//   );

//   const gtGold = "#c1a152";
//   const gtDark = "#333333";
//   const gtSkyBlue = "#5baed5";

//   // --- PROFILE DETAIL VIEW (Matches your image) ---
//   if (selectedAttorney) {
//     return (
//       <main className="bg-white min-vh-100 font-sans">
//         {/* Profile Hero Section (Dark) */}
//         <section style={{ backgroundColor: gtDark }} className="text-white pt-5 pb-3">
//           <div className="container">
//             <div className="row align-items-end">
//               <div className="col-md-4 text-center">
//                 <img 
//                   src={selectedAttorney.img} 
//                   alt="Profile" 
//                   className="img-fluid" 
//                   style={{ borderBottom: `8px solid ${gtGold}`, maxHeight: '420px' }} 
//                 />
//               </div>
//               <div className="col-md-8 mb-4">
//                 <button onClick={() => setSelectedAttorney(null)} className="btn btn-sm btn-outline-light rounded-0 text-uppercase fw-bold mb-4">
//                    ← Back to Results
//                 </button>
//                 <h1 className="display-3 fw-bold border-top pt-4 mb-2" style={{ fontFamily: 'serif' }}>{selectedAttorney.name}</h1>
//                 <div className="d-flex align-items-center mb-3">
//                   <div style={{ width: '40px', height: '2px', backgroundColor: gtGold }} className="me-2"></div>
//                   <span className="text-uppercase fw-bold small tracking-widest">{selectedAttorney.role}</span>
//                 </div>
//                 <p className="mb-4"><a href={`mailto:${selectedAttorney.email}`} className="text-decoration-none" style={{ color: gtGold }}>{selectedAttorney.email}</a></p>
                
//                 <div className="row text-uppercase small fw-bold">
//                   <div className="col-md-3">
//                     <div style={{ color: gtGold }} className="mb-1">{selectedAttorney.location}</div>
//                     <div className="fw-normal">{selectedAttorney.phone}</div>
//                   </div>
//                   <div className="col-md-3 border-start border-secondary ps-4">
//                     <div style={{ color: gtGold }} className="mb-1">New York</div>
//                     <div className="fw-normal">T +1 212.801.9200</div>
//                   </div>
//                   <div className="col-md-3 border-start border-secondary ps-4">
//                     <div style={{ color: gtGold }} className="mb-1">São Paulo ›</div>
//                     <div className="fw-normal">T +55 11 3521.7049</div>
//                   </div>
//                 </div>
//                 <div className="text-end mt-4 small">
//                   <span className="mx-2" style={{ color: gtSkyBlue }}>vCard | PDF | Print | Share +</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Profile Tabs & Content Area */}
//         <section className="container py-5">
//           <div className="row">
//             <div className="col-md-3 d-none d-md-block">
//               {['Profile', 'Capabilities', 'Experience', 'Recognition & Leadership', 'Credentials', 'News, Insights & Events'].map((item, idx) => (
//                 <button key={idx} className={`btn w-100 text-start text-uppercase fw-bold py-3 px-3 rounded-0 border-bottom mb-1 ${idx === 0 ? 'bg-warning' : 'bg-light'}`} style={{ fontSize: '11px', letterSpacing: '1px' }}>
//                   {item}
//                 </button>
//               ))}
//               <button className="btn btn-outline-dark w-100 rounded-0 mt-4 py-2 text-uppercase fw-bold small">Expand All</button>
//             </div>

//             <div className="col-md-9 ps-md-5 text-dark" style={{ lineHeight: '1.8' }}>
//               <p>With a practice that spans nearly 30 years, {selectedAttorney.name.split(' ')[0]} has represented clients on high-profile mergers and acquisitions, joint ventures, project financings, and corporate restructurings across Ibero-America and the Caribbean...</p>
//               <p className="text-center mt-4 fw-bold" style={{ color: gtSkyBlue }}>Read More +</p>

//               <div className="mt-5 border-top pt-5">
//                 <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Capabilities</h2>
//                 <div className="d-flex flex-wrap gap-3">
//                   {['Corporate', 'Infrastructure', 'Mergers & Acquisitions', 'Latin America Practice'].map((tag, i) => (
//                     <span key={i} className="text-decoration-underline" style={{ color: gtGold }}>{tag}{i < 3 && ' |'}</span>
//                   ))}
//                 </div>
//               </div>

//               <div className="mt-5 pt-4">
//                 <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Experience</h2>
//                 {['Mergers & Acquisitions', 'Joint Ventures', 'Corporate Representation', 'Project Finance'].map((item, i) => (
//                   <div key={i} className="d-flex justify-content-between align-items-center py-3 border-top border-bottom">
//                     <span className="h5 mb-0 fw-bold" style={{ color: gtGold }}>{item}</span>
//                     <i className="bi bi-plus fs-2" style={{ color: gtSkyBlue }}></i>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-5 pt-5 border-top">
//                 <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Credentials</h2>
//                 <div className="row small">
//                   <div className="col-md-6">
//                     <h6 className="fw-bold text-uppercase mb-3">Education</h6>
//                     <ul className="list-unstyled opacity-75">
//                       <li className="mb-2">J.D., New York University School of Law, 1998</li>
//                       <li>B.S., Finance, with honors, University of Florida, 1994</li>
//                     </ul>
//                   </div>
//                   <div className="col-md-6">
//                     <h6 className="fw-bold text-uppercase mb-3">Admissions</h6>
//                     <ul className="list-unstyled opacity-75">
//                       <li className="mb-2">Florida | New York</li>
//                       <li>Licensed as a foreign legal consultant in Brazil</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Bottom News Section (Dark) */}
//         <section className="bg-dark text-white py-5 mt-5">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-3">
//                 <h2 className="display-5 border-bottom pb-4 mb-4" style={{ fontFamily: 'serif' }}>News, Insights & Events</h2>
//               </div>
//               <div className="col-md-9 ps-md-5">
//                 <div className="mb-5 d-flex gap-4 border-bottom border-secondary pb-3">
//                   {['Featured', 'News', 'Insights', 'Past Events'].map((tab, i) => (
//                     <span key={i} className={`fw-bold text-uppercase small ${i === 0 ? 'text-white border-bottom border-white pb-3' : 'text-secondary'}`}>{tab}</span>
//                   ))}
//                 </div>
//                 {[1, 2].map((item) => (
//                   <div key={item} className="mb-5 border-bottom border-secondary pb-4">
//                     <div className="small text-uppercase opacity-50 mb-2">September 11, 2024 · Press Release</div>
//                     <div className="row">
//                       <div className="col-md-10">
//                         <h3 className="h4" style={{ color: gtGold }}>Greenberg Traurig Continues Strategic Growth in Latin America...</h3>
//                       </div>
//                       <div className="col-md-2 text-md-end opacity-50 small">2 min read</div>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="text-center mt-5"><span style={{ color: gtSkyBlue }} className="fw-bold cursor-pointer">View More +</span></div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     );
//   }

//   // --- ORIGINAL LIST VIEW (Unchanged) ---
//   return (
//     <main className="bg-white overflow-hidden min-vh-100">
      
//       {/* 1. TOP ALPHABET NAV */}
//       <div className="container py-4 border-bottom">
//         <div className="d-flex justify-content-between overflow-auto pb-2">
//           {alphabet.map((char) => (
//             <button 
//               key={char} 
//               onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
//               className={`btn btn-link text-decoration-none fw-bold fs-3 px-2 border-0 ${slug === char.toLowerCase() ? 'text-warning' : 'text-dark'}`}
//               style={{ fontFamily: 'serif', letterSpacing: '2px' }}
//             >
//               {char}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 2. RESULTS LIST SECTION */}
//       <section className="container mt-5 bg-white">
//         <div className="d-flex justify-content-between align-items-end border-bottom border-dark pb-3 mb-5">
//           <div>
//             <span className="display-5 fw-light" style={{ fontFamily: 'serif' }}>Results — </span>
//             <span className="display-5 fw-bold" style={{ fontFamily: 'serif' }}>{filteredAttorneys.length}</span>
//             <div className="mt-2 small text-uppercase">
//               <span className="fw-bold">Search Criteria:</span>
//               <span className="ms-2 text-warning fw-bold">{slug?.toUpperCase()}</span>
//             </div>
//           </div>
//           <div className="text-uppercase small fw-bold">Sort By: <span className="text-secondary">Position | </span><span className="text-warning">Alphabetical</span></div>
//         </div>

//         <div className="pb-5">
//           {filteredAttorneys.length > 0 ? (
//             filteredAttorneys.map((attorney) => (
//               <div key={attorney.id} className="row g-0 py-5 border-bottom align-items-start">
//                 <div className="col-auto">
//                   <img 
//                     src={attorney.img} 
//                     alt={attorney.name} 
//                     style={{ width: '160px', height: '180px', objectFit: 'cover', cursor: 'pointer' }} 
//                     onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
//                   />
//                 </div>
//                 <div className="col ps-4">
//                   <h2 
//                     className="text-warning mb-1" 
//                     style={{ fontFamily: 'serif', fontWeight: 'bold', cursor: 'pointer' }}
//                     onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
//                   >
//                     {attorney.name}
//                   </h2>
//                   <div className="small fw-bold text-secondary mb-3 tracking-widest">{attorney.role}</div>
//                   <div className="mb-1">
//                     <a href={`mailto:${attorney.email}`} className="text-decoration-none text-primary small fw-bold">{attorney.email}</a>
//                   </div>
//                   <div className="text-dark small">{attorney.phone}</div>
//                 </div>
//                 <div className="col-auto text-end h-100 d-flex flex-column justify-content-between">
//                   <div className="text-primary small fw-bold">{attorney.location}</div>
//                   <div className="mt-5 pt-5">
//                     <span className="border border-dark px-3 py-2 small fw-bold text-uppercase d-inline-block">
//                         {attorney.practice}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="py-5 text-center text-muted h4">
//                 No professionals found starting with "{slug?.toUpperCase()}"
//             </div>
//           )}
//         </div>
//       </section>

//       <div className="container pb-5">
//          <button onClick={() => router.push('/attorneys')} className="btn btn-dark rounded-0 px-4 py-2">
//             ← BACK TO SEARCH
//          </button>
//       </div>

//     </main>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Updated Data with Local Image Path
const attorneyList = [
  { id: 1, name: "Greta Habib", role: "SHAREHOLDER", email: "Greta.Habib@gtlaw.com", phone: "+971 (0) 50 641 2088", location: "Dubai", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
  { id: 2, name: "Dr. Lukas Hackmann", role: "SENIOR ASSOCIATE", email: "Lukas.Hackmann@gtlaw.com", phone: "+49 30.700.171.202", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
  { id: 3, name: "Fatin F. Haddad", role: "OF COUNSEL", email: "haddadf@gtlaw.com", phone: "+1 518.689.1437", location: "Albany", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
  { id: 4, name: "Elizabeth Ross Hadley", role: "SHAREHOLDER", email: "Elizabeth.Hadley@gtlaw.com", phone: "+1 512.320.7227", location: "Austin", practice: "GOVERNMENT LAW & POLICY", img: "/assets/images/attorney1.png" },
  { id: 5, name: "Sebastian Haimerl", role: "ASSOCIATE", email: "Sebastian.Haimerl@gtlaw.com", phone: "+49 30.700.171.112", location: "Berlin", practice: "CORPORATE", img: "/assets/images/attorney1.png" },
];

export default function AttorneySlugPage() {
  const router = useRouter();
  const { slug } = router.query;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // New State for Profile Detail View
  const [selectedAttorney, setSelectedAttorney] = useState(null);

  // Reset detail view when slug (alphabet letter) changes
  useEffect(() => {
    setSelectedAttorney(null);
  }, [slug]);

  const filteredAttorneys = attorneyList.filter(a => 
    a.name.toLowerCase().startsWith(slug?.toLowerCase())
  );

  const gtGold = "#c1a152";
  const gtDark = "#333333";
  const gtSkyBlue = "#5baed5";

  // --- PROFILE DETAIL VIEW (Matches your image) ---
  if (selectedAttorney) {
    return (
      <main className="bg-white min-vh-100 font-sans">
        {/* Profile Hero Section (Dark) */}
        <section style={{ backgroundColor: gtDark }} className="text-white pt-5 pb-3">
          <div className="container">
            <div className="row align-items-end">
              <div className="col-md-4 text-center pt-3">
                <img 
                  src={selectedAttorney.img} 
                  alt="Profile" 
                  className="img-fluid" 
                  style={{ borderBottom: `8px solid ${gtGold}`, maxHeight: '400px' }} 
                />
              </div>
              <div className="col-md-8 mb-4">
                <button onClick={() => setSelectedAttorney(null)} className="btn btn-sm btn-outline-light rounded-0 text-uppercase fw-bold mb-4">
                   ← Back to Results
                </button>
                <h1 className="display-4 fw-bold border-top pt-4 mb-2" style={{ fontFamily: 'serif' }}>{selectedAttorney.name}</h1>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '40px', height: '2px', backgroundColor: gtGold }} className="me-2"></div>
                  <span className="text-uppercase fw-bold small tracking-widest">{selectedAttorney.role}</span>
                </div>
                <p className="mb-4"><a href={`mailto:${selectedAttorney.email}`} className="text-decoration-none" style={{ color: gtGold }}>{selectedAttorney.email}</a></p>
                
                <div className="row text-uppercase small fw-bold">
                  <div className="col-md-3">
                    <div style={{ color: gtGold }} className="mb-1">{selectedAttorney.location}</div>
                    <div className="fw-normal">{selectedAttorney.phone}</div>
                  </div>
                  <div className="col-md-3 border-start border-secondary ps-4">
                    <div style={{ color: gtGold }} className="mb-1">New York</div>
                    <div className="fw-normal">T +1 212.801.9200</div>
                  </div>
                  <div className="col-md-3 border-start border-secondary ps-4">
                    <div style={{ color: gtGold }} className="mb-1">São Paulo ›</div>
                    <div className="fw-normal">T +55 11 3521.7049</div>
                  </div>
                </div>
                {/* <div className="text-end mt-4 small">
                  <span className="mx-2" style={{ color: gtSkyBlue }}>Card | PDF | Print | Share +</span>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Profile Tabs & Content Area */}
        <section className="container py-5">
          <div className="row">
            {/* <div className="col-md-3 d-none d-md-block">
              {['Profile', 'Capabilities', 'Experience', 'Recognition & Leadership', 'Credentials', 'News, Insights & Events'].map((item, idx) => (
                <button key={idx} className={`btn w-100 text-start text-uppercase fw-bold py-3 px-3 rounded-0 border-bottom mb-1 ${idx === 0 ? 'bg-warning' : 'bg-light'}`} style={{ fontSize: '11px', letterSpacing: '1px' }}>
                  {item}
                </button>
              ))}
              <button className="btn btn-outline-dark w-100 rounded-0 mt-4 py-2 text-uppercase fw-bold small">Expand All</button>
            </div> */}

            <div className="col-md-9 ps-md-5 text-dark" style={{ lineHeight: '1.8' }}>
              <p>With a practice that spans nearly 30 years, {selectedAttorney.name.split(' ')[0]} has represented clients on high-profile mergers and acquisitions, joint ventures, project financings, and corporate restructurings across Ibero-America and the Caribbean...</p>
              <p className="text-center mt-4 fw-bold" style={{ color: gtSkyBlue }}>Read More +</p>

              <div className="mt-5 border-top pt-5">
                <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Capabilities</h2>
                <div className="d-flex flex-wrap gap-3">
                  {['Corporate', 'Infrastructure', 'Mergers & Acquisitions', 'Latin America Practice'].map((tag, i) => (
                    <span key={i} className="text-decoration-underline" style={{ color: gtGold }}>{tag}{i < 3 && ' |'}</span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4">
                <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Experience</h2>
                {['Mergers & Acquisitions', 'Joint Ventures', 'Corporate Representation', 'Project Finance'].map((item, i) => (
                  <div key={i} className="d-flex justify-content-between align-items-center py-3 border-top border-bottom">
                    <span className="h5 mb-0 fw-bold" style={{ color: gtGold }}>{item}</span>
                    <i className="bi bi-plus fs-2" style={{ color: gtSkyBlue }}></i>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-top">
                <h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'serif' }}>Credentials</h2>
                <div className="row small">
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase mb-3">Education</h6>
                    <ul className="list-unstyled opacity-75">
                      <li className="mb-2">J.D., New York University School of Law, 1998</li>
                      <li>B.S., Finance, with honors, University of Florida, 1994</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold text-uppercase mb-3">Admissions</h6>
                    <ul className="list-unstyled opacity-75">
                      <li className="mb-2">Florida | New York</li>
                      <li>Licensed as a foreign legal consultant in Brazil</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom News Section (Dark) */}
        <section className="bg-dark text-white py-5 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <h2 className="display-5 border-bottom pb-4 mb-4" style={{ fontFamily: 'serif' }}>News, Insights & Events</h2>
              </div>
              <div className="col-md-9 ps-md-5">
                <div className="mb-5 d-flex gap-4 border-bottom border-secondary pb-3">
                  {['Featured', 'News', 'Insights', 'Past Events'].map((tab, i) => (
                    <span key={i} className={`fw-bold text-uppercase small ${i === 0 ? 'text-white border-bottom border-white pb-3' : 'text-secondary'}`}>{tab}</span>
                  ))}
                </div>
                {[1, 2].map((item) => (
                  <div key={item} className="mb-5 border-bottom border-secondary pb-4">
                    <div className="small text-uppercase opacity-50 mb-2">September 11, 2024 · Press Release</div>
                    <div className="row">
                      <div className="col-md-10">
                        <h3 className="h4" style={{ color: gtGold }}>Greenberg Traurig Continues Strategic Growth in Latin America...</h3>
                      </div>
                      <div className="col-md-2 text-md-end opacity-50 small">2 min read</div>
                    </div>
                  </div>
                ))}
                <div className="text-center mt-5"><span style={{ color: gtSkyBlue }} className="fw-bold cursor-pointer">View More +</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // --- ORIGINAL LIST VIEW (Unchanged) ---
  return (
    <main className="bg-white overflow-hidden min-vh-100">
      
      {/* 1. TOP ALPHABET NAV */}
      <div className="container py-4 border-bottom">
        <div className="d-flex justify-content-between overflow-auto pb-2">
          {alphabet.map((char) => (
            <button 
              key={char} 
              onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
              className={`btn btn-link text-decoration-none fw-bold fs-3 px-2 border-0 ${slug === char.toLowerCase() ? 'text-warning' : 'text-dark'}`}
              style={{ fontFamily: 'serif', letterSpacing: '2px' }}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 2. RESULTS LIST SECTION */}
      <section className="container mt-5 bg-white">
        <div className="d-flex justify-content-between align-items-end border-bottom border-dark pb-3 mb-5">
          <div>
            <span className="display-5 fw-light" style={{ fontFamily: 'serif' }}>Results — </span>
            <span className="display-5 fw-bold" style={{ fontFamily: 'serif' }}>{filteredAttorneys.length}</span>
            <div className="mt-2 small text-uppercase">
              <span className="fw-bold">Search Criteria:</span>
              <span className="ms-2 text-warning fw-bold">{slug?.toUpperCase()}</span>
            </div>
          </div>
          <div className="text-uppercase small fw-bold">Sort By: <span className="text-secondary">Position | </span><span className="text-warning">Alphabetical</span></div>
        </div>

        <div className="pb-5">
          {filteredAttorneys.length > 0 ? (
            filteredAttorneys.map((attorney) => (
              <div key={attorney.id} className="row g-0 py-5 border-bottom align-items-start">
                <div className="col-auto">
                  <img 
                    src={attorney.img} 
                    alt={attorney.name} 
                    style={{ width: '160px', height: '180px', objectFit: 'cover', cursor: 'pointer' }} 
                    onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
                  />
                </div>
                <div className="col ps-4">
                  <h2 
                    className="text-warning mb-1" 
                    style={{ fontFamily: 'serif', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => setSelectedAttorney(attorney)} // Navigate to detail
                  >
                    {attorney.name}
                  </h2>
                  <div className="small fw-bold text-secondary mb-3 tracking-widest">{attorney.role}</div>
                  <div className="mb-1">
                    <a href={`mailto:${attorney.email}`} className="text-decoration-none text-primary small fw-bold">{attorney.email}</a>
                  </div>
                  <div className="text-dark small">{attorney.phone}</div>
                </div>
                <div className="col-auto text-end h-100 d-flex flex-column justify-content-between">
                  <div className="text-primary small fw-bold">{attorney.location}</div>
                  <div className="mt-5 pt-5">
                    <span className="border border-dark px-3 py-2 small fw-bold text-uppercase d-inline-block">
                        {attorney.practice}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-5 text-center text-muted h4">
                No professionals found starting with "{slug?.toUpperCase()}"
            </div>
          )}
        </div>
      </section>

      <div className="container pb-5">
         <button onClick={() => router.push('/attorneys')} className="btn btn-dark rounded-0 px-4 py-2">
            ← BACK TO SEARCH
         </button>
      </div>

    </main>
  );
}