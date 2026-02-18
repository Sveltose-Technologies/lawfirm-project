



// // // // // import React, { useState, useMemo } from "react";
// // // // // import Link from "next/link";
// // // // // import Head from "next/head";

// // // // // // --- PREMIUM REALISTIC DATA ---
// // // // // export const attorneysData = [
// // // // //   {
// // // // //     id: 1,
// // // // //     name: "Caroline K. Abbott",
// // // // //     role: "Senior Partner",
// // // // //     phone: "+1 202.530.8593",
// // // // //     email: "caroline.abbott@corelaw.com",
// // // // //     location: "Washington, D.C.",
// // // // //     category: "Corporate",
// // // // //     rating: 5,
// // // // //     hourlyRate: 850,
// // // // //     image: "/assets/images/attorney1.png",
// // // // //     languages: ["English", "French"],
// // // // //     admissions: ["New York", "Washington, D.C.", "Supreme Court of the U.S."],
// // // // //     education: [
// // // // //         "J.D., Harvard Law School, magna cum laude (2010)", 
// // // // //         "B.A., Yale University, with distinction (2007)"
// // // // //     ],
// // // // //     awards: [
// // // // //         "Chambers USA: Top Ranked in Corporate M&A (2022-2024)",
// // // // //         "The Legal 500: Leading Lawyer",
// // // // //         "Dealmaker of the Year, American Lawyer"
// // // // //     ],
// // // // //     bio: [
// // // // //         "Caroline K. Abbott is a preeminent corporate lawyer with over 15 years of experience advising Fortune 500 companies, private equity firms, and investment banks on their most complex and high-stakes transactions. Her practice encompasses domestic and cross-border mergers and acquisitions, hostile takeovers, shareholder activism defense, and corporate governance matters.",
// // // // //         "Recognized as a strategic advisor who 'sees around corners,' Caroline has led deal teams in transactions totaling over $50 billion in value across the technology, healthcare, and energy sectors. Her deep understanding of regulatory frameworks allows her to navigate antitrust hurdles and foreign investment reviews seamlessly.",
// // // // //         "Prior to joining Core Law, Caroline served as a judicial law clerk for the Honorable Justice Elena Kagan at the Supreme Court of the United States. She is a frequent speaker at international legal forums and serves on the board of the Global Women in Law Initiative."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Advised a leading Tech Giant in its $12.5 billion acquisition of an AI semiconductor startup, navigating complex antitrust scrutiny in the U.S. and E.U.",
// // // // //         "Represented a global pharmaceutical company in a $4 billion cross-border merger with a Swiss biotech firm.",
// // // // //         "Guided a renewable energy consortium through its $800 million Initial Public Offering (IPO) on the NASDAQ.",
// // // // //         "Successfully defended a Fortune 100 board of directors against a hostile takeover bid by an activist hedge fund."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 2,
// // // // //     name: "Jacob M. Abdo",
// // // // //     role: "Partner",
// // // // //     phone: "+1 612.259.9681",
// // // // //     email: "jake.abdo@corelaw.com",
// // // // //     location: "Minneapolis",
// // // // //     category: "Intellectual Property",
// // // // //     rating: 5,
// // // // //     hourlyRate: 650,
// // // // //     image: "/assets/images/attorney2.png",
// // // // //     admissions: ["Minnesota", "California", "USPTO"],
// // // // //     languages: ["English"],
// // // // //     education: [
// // // // //         "J.D., Stanford Law School (2012)", 
// // // // //         "M.S., Electrical Engineering, MIT (2009)"
// // // // //     ],
// // // // //     awards: ["IP Star, Managing IP Magazine", "Top 40 Under 40, Daily Journal"],
// // // // //     bio: [
// // // // //         "Jacob M. Abdo is a leading intellectual property litigator known for his ability to explain complex technical concepts to juries and judges. With a background in electrical engineering from MIT, Jacob specializes in high-stakes patent litigation involving semiconductors, software, and telecommunications technologies.",
// // // // //         "He has successfully represented clients in federal district courts across the country, the U.S. Court of Appeals for the Federal Circuit, and the International Trade Commission (ITC). Beyond litigation, Jacob advises technology companies on IP portfolio strategy, licensing agreements, and risk management.",
// // // // //         "Jacob is also dedicated to pro bono work, regularly representing inventors from underrepresented communities in securing patent protection for their innovations."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Secured a $120 million jury verdict for a software client in a patent infringement suit against a major competitor.",
// // // // //         "Successfully defended a smartphone manufacturer in an ITC investigation, resulting in a finding of no violation.",
// // // // //         "Negotiated a global cross-licensing agreement between two telecommunications giants, resolving multi-jurisdictional litigation.",
// // // // //         " invalidated a key competitor's patent through Inter Partes Review (IPR) proceedings at the USPTO."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 3,
// // // // //     name: "Darren J. Abernethy",
// // // // //     role: "Shareholder",
// // // // //     phone: "+1 415.655.1261",
// // // // //     email: "darren.a@corelaw.com",
// // // // //     location: "San Francisco",
// // // // //     category: "Data Privacy",
// // // // //     rating: 5,
// // // // //     hourlyRate: 725,
// // // // //     image: "/assets/images/attorney3.png",
// // // // //     admissions: ["California", "New York", "IAPP Certified"],
// // // // //     languages: ["English", "Spanish"],
// // // // //     education: ["J.D., UC Berkeley School of Law", "B.A., UCLA"],
// // // // //     awards: ["Cybersecurity Lawyer of the Year (2023)", "Legal 500: Next Generation Partner"],
// // // // //     bio: [
// // // // //         "Darren J. Abernethy is a recognized authority on data privacy, cybersecurity, and digital assets. He advises global technology companies, financial institutions, and retailers on compliance with the GDPR, CCPA, and emerging AI regulations.",
// // // // //         "Darren helps clients navigate data breach response, regulatory investigations, and privacy-by-design product development. He has served as lead counsel for companies facing investigations by the FTC and European data protection authorities.",
// // // // //         "A prolific writer, Darren's articles on AI ethics and biometric data privacy have been featured in major legal publications. He also serves as an adjunct professor of Privacy Law at UC Berkeley."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Led the global GDPR compliance program for a multinational social media platform with over 500 million users.",
// // // // //         "Managed the incident response and regulatory reporting for a Fortune 500 retailer following a massive ransomware attack.",
// // // // //         "Defended a fintech company in a class-action lawsuit alleging violations of biometric privacy laws.",
// // // // //         "Advising a generative AI startup on data scraping legality and copyright issues."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 4,
// // // // //     name: "Charles J. Abrams",
// // // // //     role: "Senior Counsel",
// // // // //     phone: "+1 561.650.7984",
// // // // //     email: "charles.abrams@corelaw.com",
// // // // //     location: "West Palm Beach",
// // // // //     category: "Real Estate",
// // // // //     rating: 4,
// // // // //     hourlyRate: 550,
// // // // //     image: "/assets/images/attorney4.png",
// // // // //     admissions: ["Florida", "New York"],
// // // // //     languages: ["English", "Hebrew"],
// // // // //     education: ["J.D., University of Florida", "M.B.A., Kellogg School of Management"],
// // // // //     awards: ["Best Lawyers in America: Real Estate", "Florida Super Lawyers"],
// // // // //     bio: [
// // // // //         "Charles J. Abrams brings over two decades of experience in commercial real estate law. He represents developers, REITs, private equity funds, and lenders in the acquisition, disposition, financing, and development of premier properties.",
// // // // //         "His portfolio includes luxury hospitality projects, mixed-use urban developments, and industrial logistics centers. Charles is known for his pragmatic approach to closing deals and his ability to structure complex joint ventures.",
// // // // //         "Before entering private practice, Charles worked as General Counsel for a major real estate development firm in Miami."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Closed a $450 million acquisition and financing of a luxury resort portfolio in South Florida.",
// // // // //         "Structured a joint venture for the development of a 60-story mixed-use tower in Miami.",
// // // // //         "Negotiated lease agreements for over 2 million square feet of industrial space for a global logistics company.",
// // // // //         "Represented a lender in a $200 million construction loan for a high-end residential project."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 5,
// // // // //     name: "Ejim Peter Achi",
// // // // //     role: "Partner",
// // // // //     phone: "+1 212.801.6963",
// // // // //     email: "ejim.achi@corelaw.com",
// // // // //     location: "New York",
// // // // //     category: "Corporate",
// // // // //     rating: 5,
// // // // //     hourlyRate: 950,
// // // // //     image: "/assets/images/attorney5.png",
// // // // //     admissions: ["New York", "New Jersey"],
// // // // //     languages: ["English", "Igbo"],
// // // // //     education: ["J.D., Columbia Law School", "B.A., University of Pennsylvania"],
// // // // //     awards: ["Top 100 Black Lawyers", "Legal 500: Private Equity"],
// // // // //     bio: [
// // // // //         "Ejim Peter Achi is a powerhouse in the private equity sector, representing sponsors and their portfolio companies in leveraged buyouts, growth equity investments, and exit transactions.",
// // // // //         "With a reputation for efficiency and commercial awareness, Ejim has guided clients through transactions across the manufacturing, healthcare, and consumer retail sectors. He frequently advises boards on fiduciary duties during sale processes.",
// // // // //         "Ejim is a mentor to young attorneys and actively participates in initiatives to improve diversity within the legal profession."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Advised a private equity firm on its $2.3 billion take-private acquisition of a publicly traded healthcare company.",
// // // // //         "Represented a portfolio company in its strategic add-on acquisition of a European competitor.",
// // // // //         "Structured the recapitalization of a family-owned manufacturing business by a growth equity fund.",
// // // // //         "Counsel to a consortium of investors in the distressed acquisition of a retail chain."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 6,
// // // // //     name: "Ashia D. Adams",
// // // // //     role: "Associate",
// // // // //     phone: "+44 203 349 8800",
// // // // //     email: "ashia.adams@corelaw.com",
// // // // //     location: "London",
// // // // //     category: "Real Estate",
// // // // //     rating: 4,
// // // // //     hourlyRate: 500,
// // // // //     image: "/assets/images/attorney6.png",
// // // // //     admissions: ["England & Wales"],
// // // // //     languages: ["English", "German"],
// // // // //     education: ["LLB, Oxford University", "LPC, BPP Law School"],
// // // // //     awards: ["Rising Star: Real Estate (UK)", "Women in Law Awards: Shortlisted"],
// // // // //     bio: [
// // // // //         "Ashia D. Adams is a key member of the firm's London Real Estate practice. She focuses on cross-border property transactions, advising international investors on incoming capital flows into the UK and European markets.",
// // // // //         "Her expertise covers commercial leasing, property finance, and asset management. Ashia is particularly skilled in handling the real estate aspects of large corporate M&A deals.",
// // // // //         "Fluent in German, she often acts as a bridge for clients in the DACH region investing in London real estate."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Assisted a sovereign wealth fund in the £300 million acquisition of a landmark office building in the City of London.",
// // // // //         "Advised a German pension fund on the financing of a logistics portfolio across the UK.",
// // // // //         "Negotiated the headquarters lease for a major fintech unicorn in London's Shoreditch district.",
// // // // //         "Handled real estate due diligence for a pan-European hotel chain acquisition."
// // // // //     ]
// // // // //   },
// // // // //   {
// // // // //     id: 7,
// // // // //     name: "Bianca Z. Bailey",
// // // // //     role: "Senior Associate",
// // // // //     phone: "+1 310.555.0192",
// // // // //     email: "bianca.bailey@corelaw.com",
// // // // //     location: "Los Angeles",
// // // // //     category: "Litigation",
// // // // //     rating: 5,
// // // // //     hourlyRate: 450,
// // // // //     image: "/assets/images/attorney7.png",
// // // // //     admissions: ["California", "Nevada"],
// // // // //     languages: ["English", "Spanish", "Italian"],
// // // // //     education: ["J.D., UCLA School of Law", "B.A., USC"],
// // // // //     awards: ["Ones to Watch: Commercial Litigation", "Super Lawyers: Rising Star"],
// // // // //     bio: [
// // // // //         "Bianca Z. Bailey is a tenacious litigator specializing in complex commercial disputes, entertainment law, and white-collar defense. She represents studios, production companies, and high-net-worth individuals in contract disputes and intellectual property claims.",
// // // // //         "Known for her meticulous preparation and courtroom presence, Bianca has secured favorable outcomes in both state and federal courts. She also has significant experience in arbitration and mediation proceedings.",
// // // // //         "Bianca maintains an active pro bono practice, representing artists and musicians in copyright disputes."
// // // // //     ],
// // // // //     experience: [
// // // // //         "Obtained a summary judgment dismissal for a major film studio in a copyright infringement lawsuit.",
// // // // //         "Represented a streaming service in a breach of contract dispute with a content distributor.",
// // // // //         "Secured a favorable settlement for a celebrity client in a defamation case.",
// // // // //         "Defended a tech executive in a white-collar investigation, resulting in no charges filed."
// // // // //     ]
// // // // //   }
// // // // // ];

// // // // // export default function AttorneysPage() {
// // // // //   // --- STATE ---
// // // // //   const [searchTerm, setSearchTerm] = useState("");
// // // // //   const [selectedLetter, setSelectedLetter] = useState("All");
// // // // //   const [showMobileFilters, setShowMobileFilters] = useState(false);

// // // // //   // Filters State
// // // // //   const [filters, setFilters] = useState({
// // // // //     category: "All",
// // // // //     location: "All",
// // // // //     rating: "All",
// // // // //     price: "All",
// // // // //     admissions: "All",
// // // // //     language: "All",
// // // // //   });

// // // // //   // --- LOGIC ---
// // // // //   const categories = ["All", ...new Set(attorneysData.map((a) => a.category))].sort();
// // // // //   const locations = ["All", ...new Set(attorneysData.map((a) => a.location))].sort();
// // // // //   const uniqueAdmissions = ["All", ...new Set(attorneysData.flatMap((a) => a.admissions || []))].sort();
// // // // //   const uniqueLanguages = ["All", ...new Set(attorneysData.flatMap((a) => a.languages || []))].sort();
// // // // //   const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// // // // //   // --- FILTER LOGIC ---
// // // // //   const filteredData = useMemo(() => {
// // // // //     return attorneysData
// // // // //       .filter((attorney) => {
// // // // //         if (searchTerm && !attorney.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
// // // // //         if (selectedLetter !== "All" && !attorney.name.startsWith(selectedLetter)) return false;
// // // // //         if (filters.category !== "All" && attorney.category !== filters.category) return false;
// // // // //         if (filters.location !== "All" && attorney.location !== filters.location) return false;
// // // // //         if (filters.admissions !== "All" && !attorney.admissions?.includes(filters.admissions)) return false;
// // // // //         if (filters.language !== "All" && !attorney.languages?.includes(filters.language)) return false;
// // // // //         if (filters.rating !== "All" && attorney.rating < parseInt(filters.rating)) return false;
// // // // //         if (filters.price !== "All") {
// // // // //           if (filters.price === "low" && attorney.hourlyRate > 300) return false;
// // // // //           if (filters.price === "mid" && (attorney.hourlyRate <= 300 || attorney.hourlyRate > 600)) return false;
// // // // //           if (filters.price === "high" && attorney.hourlyRate <= 600) return false;
// // // // //         }
// // // // //         return true;
// // // // //       })
// // // // //       .sort((a, b) => a.name.localeCompare(b.name));
// // // // //   }, [searchTerm, selectedLetter, filters]);

// // // // //   const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
// // // // //   const handleReset = () => {
// // // // //     setSearchTerm(""); setSelectedLetter("All");
// // // // //     setFilters({ category: "All", location: "All", rating: "All", price: "All", admissions: "All", language: "All" });
// // // // //   };

// // // // //   return (
// // // // //     <>
// // // // //       <Head><title>Our Professionals | Core Law</title></Head>

// // // // //       {/* HERO */}
// // // // //       <div className="section-hero">
// // // // //         <div className="container text-center text-lg-start">
// // // // //           <h5 className="text-uppercase fw-bold mb-2 section-subtitle">Our Team</h5>
// // // // //           <h1 className="display-4 fw-bold font-serif">Find a Professional</h1>
// // // // //           <p className="lead opacity-75">World-class legal talent delivering exceptional results.</p>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="py-5 section-main">
// // // // //         <div className="container">
// // // // //           <div className="row">
// // // // //             {/* MOBILE FILTER BUTTON */}
// // // // //             <div className="col-12 d-lg-none mb-3">
// // // // //               <button className="btn btn-navy w-100 d-flex justify-content-between align-items-center" onClick={() => setShowMobileFilters(!showMobileFilters)}>
// // // // //                 <span><i className="bi bi-funnel-fill me-2"></i>Filter Results</span>
// // // // //                 <i className={`bi bi-chevron-${showMobileFilters ? "up" : "down"}`}></i>
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* SIDEBAR */}
// // // // //             <div className={`col-lg-3 mb-5 pe-lg-4 ${showMobileFilters ? "d-block" : "d-none d-lg-block"}`}>
// // // // //               <div className="bg-white p-4 shadow-sm rounded-3 border-0">
// // // // //                 <div className="mb-4">
// // // // //                   <label className="fw-bold small text-muted mb-2 ls-1">SEARCH NAME</label>
// // // // //                   <input type="text" className="form-control form-control-lg bg-light border-0" placeholder="e.g. Caroline" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // // //                 </div>
// // // // //                 <hr className="text-muted opacity-25 my-4" />
                
// // // // //                 {/* Filters */}
// // // // //                 <div className="mb-3">
// // // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Practise Area</label>
// // // // //                   <select className="form-select border-0 bg-light" value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
// // // // //                     {categories.map((x) => <option key={x} value={x}>{x}</option>)}
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 <div className="mb-3">
// // // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Location</label>
// // // // //                   <select className="form-select border-0 bg-light" value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)}>
// // // // //                     {locations.map((x) => <option key={x} value={x}>{x}</option>)}
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 <div className="mb-3">
// // // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Admissions</label>
// // // // //                   <select className="form-select border-0 bg-light" value={filters.admissions} onChange={(e) => handleFilterChange("admissions", e.target.value)}>
// // // // //                     {uniqueAdmissions.map((x) => <option key={x} value={x}>{x}</option>)}
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 <div className="mb-3">
// // // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Language</label>
// // // // //                   <select className="form-select border-0 bg-light" value={filters.language} onChange={(e) => handleFilterChange("language", e.target.value)}>
// // // // //                     {uniqueLanguages.map((x) => <option key={x} value={x}>{x}</option>)}
// // // // //                   </select>
// // // // //                 </div>
// // // // //                  <div className="mb-3">
// // // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Hourly Rate</label>
// // // // //                   <select className="form-select border-0 bg-light" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)}>
// // // // //                     <option value="All">Any</option><option value="low">Economy (&lt;$300)</option><option value="mid">Standard</option><option value="high">Premium (&gt;$600)</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //                 <button onClick={handleReset} className="btn btn-outline-danger w-100 mt-3">Reset Filters</button>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* RESULTS LIST */}
// // // // //             <div className="col-lg-9">
// // // // //               {/* Alphabet Scroller */}
// // // // //               <div className="bg-white p-3 shadow-sm rounded-3 border-0 mb-4 d-flex gap-2 overflow-auto alphabet-scroll">
// // // // //                 <span onClick={() => setSelectedLetter("All")} className={`alphabet-item ${selectedLetter === "All" ? "active" : ""}`}>All</span>
// // // // //                 {alphabet.map((l) => (<span key={l} onClick={() => setSelectedLetter(l)} className={`alphabet-item ${selectedLetter === l ? "active" : ""}`}>{l}</span>))}
// // // // //               </div>

// // // // //               {/* Cards */}
// // // // //               <div className="d-flex flex-column gap-3">
// // // // //                 {filteredData.length > 0 ? (
// // // // //                   filteredData.map((attorney) => (
// // // // //                     <div key={attorney.id} className="card border-0 shadow-sm rounded-3 p-4 hover-card">
// // // // //                       <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
                        
// // // // //                         {/* IMAGE (Square & Top Aligned) */}
// // // // //                         <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 text-center">
// // // // //                           <Link href={`/attorneys/${attorney.id}`}>
// // // // //                             <a>
// // // // //                               <img 
// // // // //                                 src={attorney.image} 
// // // // //                                 alt={attorney.name} 
// // // // //                                 className="shadow-sm rounded" 
// // // // //                                 style={{ width: "130px", height: "150px", objectFit: "cover", objectPosition: "top center" }} 
// // // // //                               />
// // // // //                             </a>
// // // // //                           </Link>
// // // // //                           <div className="mt-2 text-warning small">{[...Array(5)].map((_, i) => <i key={i} className={`bi bi-star${i < attorney.rating ? "-fill" : ""}`}></i>)}</div>
// // // // //                         </div>

// // // // //                         {/* CONTENT */}
// // // // //                         <div className="flex-grow-1 text-center text-md-start w-100">
// // // // //                           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
// // // // //                             <div>
// // // // //                               {/* BIG NAME (fs-2) */}
// // // // //                               <h3 className="fw-bold text-navy mb-1 hover-gold fs-2">
// // // // //                                 <Link href={`/attorneys/${attorney.id}`}>
// // // // //                                   <a className="text-decoration-none text-navy">{attorney.name}</a>
// // // // //                                 </Link>
// // // // //                               </h3>
// // // // //                               <div className="text-gold fw-bold text-uppercase ls-1 small mb-2 mb-md-0">{attorney.role}</div>
// // // // //                             </div>
// // // // //                             <div className="d-none d-md-block text-end">
// // // // //                               <span className="fs-5 fw-bold text-success">${attorney.hourlyRate}<span className="fs-6 text-muted fw-normal">/hr</span></span>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           <hr className="opacity-10 my-2" />

// // // // //                           {/* DETAILS GRID (Responsive Fix) */}
// // // // //                           <div className="row mt-3 gy-2 text-dark">
// // // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-geo-alt-fill"></i></div>
// // // // //                               <span className="fs-6 align-self-center">{attorney.location}</span>
// // // // //                             </div>
// // // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-briefcase-fill"></i></div>
// // // // //                               <span className="fs-6 align-self-center">{attorney.category}</span>
// // // // //                             </div>
// // // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-telephone-fill"></i></div>
// // // // //                               <span className="fs-6 align-self-center">{attorney.phone}</span>
// // // // //                             </div>
// // // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-translate"></i></div>
// // // // //                               <span className="fs-6 align-self-center text-truncate">{attorney.languages?.join(", ")}</span>
// // // // //                             </div>
// // // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-envelope-fill"></i></div>
// // // // //                               <span className="fs-6 align-self-center text-break">{attorney.email}</span>
// // // // //                             </div>
// // // // //                           </div>
                          
// // // // //                           <div className="d-md-none mt-3 pt-2 border-top">
// // // // //                             <span className="fw-bold text-success fs-5">${attorney.hourlyRate}/hr</span>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   ))
// // // // //                 ) : (
// // // // //                   <div className="alert alert-light text-center border py-5"><h4>No matches found.</h4><button onClick={handleReset} className="btn btn-link text-gold">Clear Filters</button></div>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       <style jsx>{`
// // // // //         .text-navy { color: #002855; }
// // // // //         .btn-navy { background-color: #002855; color: white; }
// // // // //         .text-gold { color: #de9f57; }
// // // // //         .ls-1 { letter-spacing: 1px; }
// // // // //         .section-hero { background-color: #002855; padding: 80px 0 50px 0; color: #ffffff; }
// // // // //         .section-main { background-color: #f4f6f8; }
// // // // //         .hover-card { transition: transform 0.2s ease; }
// // // // //         .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 40, 85, 0.08) !important; }
// // // // //         a.text-navy:hover { color: #de9f57 !important; transition: 0.2s; }
// // // // //         .alphabet-scroll::-webkit-scrollbar { height: 4px; }
// // // // //         .alphabet-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
// // // // //         .alphabet-item { min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; color: #002855; border-radius: 50%; background: #f8f9fa; transition: 0.2s; }
// // // // //         .alphabet-item:hover, .alphabet-item.active { background-color: #002855; color: #de9f57; }
// // // // //       `}</style>
// // // // //     </>
// // // // //   );
// // // // // }


// // // // import React, { useState, useMemo } from "react";
// // // // import Link from "next/link";
// // // // import Head from "next/head";

// // // // // --- PREMIUM REALISTIC DATA ---
// // // // export const attorneysData = [
// // // //   {
// // // //     id: 1,
// // // //     name: "Caroline K. Abbott",
// // // //     role: "Senior Partner",
// // // //     phone: "+1 202.530.8593",
// // // //     email: "caroline.abbott@corelaw.com",
// // // //     location: "Washington, D.C.",
// // // //     category: "Corporate",
// // // //     rating: 5,
// // // //     hourlyRate: 850,
// // // //     image: "/assets/images/attorney1.png",
// // // //     languages: ["English", "French"],
// // // //     admissions: ["New York", "Washington, D.C.", "Supreme Court of the U.S."],
// // // //     education: ["J.D., Harvard Law School", "B.A., Yale University"],
// // // //     bio: "Caroline K. Abbott is a preeminent corporate lawyer with over 15 years of experience advising Fortune 500 companies."
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     name: "Jacob M. Abdo",
// // // //     role: "Partner",
// // // //     phone: "+1 612.259.9681",
// // // //     email: "jake.abdo@corelaw.com",
// // // //     location: "Minneapolis",
// // // //     category: "Intellectual Property",
// // // //     rating: 5,
// // // //     hourlyRate: 650,
// // // //     image: "/assets/images/attorney2.png",
// // // //     admissions: ["Minnesota", "California", "USPTO"],
// // // //     languages: ["English"],
// // // //     bio: "Jacob M. Abdo is a leading intellectual property litigator known for his ability to explain complex technical concepts."
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     name: "Darren J. Abernethy",
// // // //     role: "Shareholder",
// // // //     phone: "+1 415.655.1261",
// // // //     email: "darren.a@corelaw.com",
// // // //     location: "San Francisco",
// // // //     category: "Data Privacy",
// // // //     rating: 5,
// // // //     hourlyRate: 725,
// // // //     image: "/assets/images/attorney3.png",
// // // //     admissions: ["California", "New York", "IAPP Certified"],
// // // //     languages: ["English", "Spanish"],
// // // //     bio: "Darren J. Abernethy is a recognized authority on data privacy, cybersecurity, and digital assets."
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     name: "Charles J. Abrams",
// // // //     role: "Senior Counsel",
// // // //     phone: "+1 561.650.7984",
// // // //     email: "charles.abrams@corelaw.com",
// // // //     location: "West Palm Beach",
// // // //     category: "Real Estate",
// // // //     rating: 4,
// // // //     hourlyRate: 550,
// // // //     image: "/assets/images/attorney4.png",
// // // //     admissions: ["Florida", "New York"],
// // // //     languages: ["English", "Hebrew"],
// // // //     bio: "Charles J. Abrams brings over two decades of experience in commercial real estate law."
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     name: "Ejim Peter Achi",
// // // //     role: "Partner",
// // // //     phone: "+1 212.801.6963",
// // // //     email: "ejim.achi@corelaw.com",
// // // //     location: "New York",
// // // //     category: "Corporate",
// // // //     rating: 5,
// // // //     hourlyRate: 950,
// // // //     image: "/assets/images/attorney5.png",
// // // //     admissions: ["New York", "New Jersey"],
// // // //     languages: ["English", "Igbo"],
// // // //     bio: "Ejim Peter Achi is a powerhouse in the private equity sector, representing sponsors and their portfolio companies."
// // // //   },
// // // //   {
// // // //     id: 6,
// // // //     name: "Ashia D. Adams",
// // // //     role: "Associate",
// // // //     phone: "+44 203 349 8800",
// // // //     email: "ashia.adams@corelaw.com",
// // // //     location: "London",
// // // //     category: "Real Estate",
// // // //     rating: 4,
// // // //     hourlyRate: 500,
// // // //     image: "/assets/images/attorney6.png",
// // // //     admissions: ["England & Wales"],
// // // //     languages: ["English", "German"],
// // // //     bio: "Ashia D. Adams is a key member of the firm's London Real Estate practice focusing on cross-border transactions."
// // // //   },
// // // //   {
// // // //     id: 7,
// // // //     name: "Bianca Z. Bailey",
// // // //     role: "Senior Associate",
// // // //     phone: "+1 310.555.0192",
// // // //     email: "bianca.bailey@corelaw.com",
// // // //     location: "Los Angeles",
// // // //     category: "Litigation",
// // // //     rating: 5,
// // // //     hourlyRate: 450,
// // // //     image: "/assets/images/attorney7.png",
// // // //     admissions: ["California", "Nevada"],
// // // //     languages: ["English", "Spanish", "Italian"],
// // // //     bio: "Bianca Z. Bailey is a tenacious litigator specializing in complex commercial disputes and entertainment law."
// // // //   }
// // // // ];

// // // // export default function AttorneysPage() {
// // // //   // --- STATE ---
// // // //   const [searchTerm, setSearchTerm] = useState("");
// // // //   const [selectedLetter, setSelectedLetter] = useState("All");
// // // //   const [showMobileFilters, setShowMobileFilters] = useState(false);

// // // //   // Filters State
// // // //   const [filters, setFilters] = useState({
// // // //     category: "All",
// // // //     location: "All",
// // // //     rating: "All",
// // // //     price: "All",
// // // //     admissions: "All",
// // // //     language: "All",
// // // //   });

// // // //   // --- LOGIC ---
// // // //   const categories = ["All", ...new Set(attorneysData.map((a) => a.category))].sort();
// // // //   const locations = ["All", ...new Set(attorneysData.map((a) => a.location))].sort();
// // // //   const uniqueAdmissions = ["All", ...new Set(attorneysData.flatMap((a) => a.admissions || []))].sort();
// // // //   const uniqueLanguages = ["All", ...new Set(attorneysData.flatMap((a) => a.languages || []))].sort();
// // // //   const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// // // //   // --- FILTER LOGIC ---
// // // //   const filteredData = useMemo(() => {
// // // //     return attorneysData
// // // //       .filter((attorney) => {
// // // //         if (searchTerm && !attorney.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
// // // //         if (selectedLetter !== "All" && !attorney.name.startsWith(selectedLetter)) return false;
// // // //         if (filters.category !== "All" && attorney.category !== filters.category) return false;
// // // //         if (filters.location !== "All" && attorney.location !== filters.location) return false;
// // // //         if (filters.admissions !== "All" && !attorney.admissions?.includes(filters.admissions)) return false;
// // // //         if (filters.language !== "All" && !attorney.languages?.includes(filters.language)) return false;
// // // //         if (filters.rating !== "All" && attorney.rating < parseInt(filters.rating)) return false;
// // // //         if (filters.price !== "All") {
// // // //           if (filters.price === "low" && attorney.hourlyRate > 300) return false;
// // // //           if (filters.price === "mid" && (attorney.hourlyRate <= 300 || attorney.hourlyRate > 600)) return false;
// // // //           if (filters.price === "high" && attorney.hourlyRate <= 600) return false;
// // // //         }
// // // //         return true;
// // // //       })
// // // //       .sort((a, b) => a.name.localeCompare(b.name));
// // // //   }, [searchTerm, selectedLetter, filters]);

// // // //   const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
// // // //   const handleReset = () => {
// // // //     setSearchTerm(""); setSelectedLetter("All");
// // // //     setFilters({ category: "All", location: "All", rating: "All", price: "All", admissions: "All", language: "All" });
// // // //   };

// // // //   return (
// // // //     <>
// // // //       <Head><title>Our Professionals | Core Law</title></Head>

// // // //       {/* =========================================
// // // //           HERO SECTION (Updated Font & Size)
// // // //       ========================================= */}
// // // //       <div className="section-hero">
// // // //         <div className="container text-center text-lg-start">
// // // //           <h5 className="text-uppercase fw-bold mb-2 section-subtitle text-gold letter-spacing-2">
// // // //             Our Team
// // // //           </h5>
// // // //           <h1 className="display-3 fw-bold font-serif text-white mb-3">
// // // //             Find a Professional
// // // //           </h1>
// // // //           <p className="lead opacity-75 text-white-50">
// // // //             World-class legal talent delivering exceptional results.
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="py-5 section-main">
// // // //         <div className="container">
// // // //           <div className="row">
            
// // // //             {/* MOBILE FILTER BUTTON */}
// // // //             <div className="col-12 d-lg-none mb-3">
// // // //               <button className="btn btn-navy w-100 d-flex justify-content-between align-items-center" onClick={() => setShowMobileFilters(!showMobileFilters)}>
// // // //                 <span><i className="bi bi-funnel-fill me-2"></i>Filter Results</span>
// // // //                 <i className={`bi bi-chevron-${showMobileFilters ? "up" : "down"}`}></i>
// // // //               </button>
// // // //             </div>

// // // //             {/* =========================================
// // // //                 SIDEBAR FILTERS
// // // //             ========================================= */}
// // // //             <div className={`col-lg-3 mb-5 pe-lg-4 ${showMobileFilters ? "d-block" : "d-none d-lg-block"}`}>
// // // //               <div className="bg-white p-4 shadow-sm rounded-3 border-0">
                
// // // //                 {/* Search Name (Small Label) */}
// // // //                 <div className="mb-4">
// // // //                   <label className="fw-bold text-muted mb-2 ls-1" style={{ fontSize: '0.75rem' }}>
// // // //                     SEARCH NAME
// // // //                   </label>
// // // //                   <input type="text" className=" border-0" placeholder="e.g. Caroline" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // // //                 </div>
                
// // // //                 <hr className="text-muted opacity-25 my-4" />
                
// // // //                 {/* Category Filter */}
// // // //                 <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Practice Area</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
// // // //                     {categories.map((x) => <option key={x} value={x}>{x}</option>)}
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Rating Filter (Added) */}
// // // //                 <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Rating</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.rating} onChange={(e) => handleFilterChange("rating", e.target.value)}>
// // // //                     <option value="All">All Ratings</option>
// // // //                     <option value="5">5 Stars</option>
// // // //                     <option value="4">4+ Stars</option>
// // // //                     <option value="3">3+ Stars</option>
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Location Filter */}
// // // //                 <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Location</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)}>
// // // //                     {locations.map((x) => <option key={x} value={x}>{x}</option>)}
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Hourly Rate */}
// // // //                 <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Hourly Rate</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)}>
// // // //                     <option value="All">Any</option><option value="low">Economy (&lt;$300)</option><option value="mid">Standard</option><option value="high">Premium (&gt;$600)</option>
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Admissions */}
// // // //                  <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Admissions</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.admissions} onChange={(e) => handleFilterChange("admissions", e.target.value)}>
// // // //                     {uniqueAdmissions.map((x) => <option key={x} value={x}>{x}</option>)}
// // // //                   </select>
// // // //                 </div>

// // // //                 {/* Language */}
// // // //                  <div className="mb-3">
// // // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Language</label>
// // // //                   <select className="form-select border-0 bg-light" value={filters.language} onChange={(e) => handleFilterChange("language", e.target.value)}>
// // // //                     {uniqueLanguages.map((x) => <option key={x} value={x}>{x}</option>)}
// // // //                   </select>
// // // //                 </div>

// // // //                 <button onClick={handleReset} className="btn btn-outline-danger w-100 mt-3">Reset Filters</button>
// // // //               </div>
// // // //             </div>

// // // //             {/* =========================================
// // // //                 RESULTS LIST
// // // //             ========================================= */}
// // // //             <div className="col-lg-9">
// // // //               {/* Alphabet Scroller */}
// // // //               <div className="bg-white p-3 shadow-sm rounded-3 border-0 mb-4 d-flex gap-2 overflow-auto alphabet-scroll">
// // // //                 <span onClick={() => setSelectedLetter("All")} className={`alphabet-item ${selectedLetter === "All" ? "active" : ""}`}>All</span>
// // // //                 {alphabet.map((l) => (<span key={l} onClick={() => setSelectedLetter(l)} className={`alphabet-item ${selectedLetter === l ? "active" : ""}`}>{l}</span>))}
// // // //               </div>

// // // //               {/* Cards */}
// // // //               <div className="d-flex flex-column gap-3">
// // // //                 {filteredData.length > 0 ? (
// // // //                   filteredData.map((attorney) => (
// // // //                     <div key={attorney.id} className="card border-0 shadow-sm rounded-3 p-4 hover-card">
// // // //                       <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
                        
// // // //                         {/* IMAGE (Square & Top Aligned) */}
// // // //                         <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 text-center">
// // // //                           <Link href={`/attorneys/${attorney.id}`}>
// // // //                             <a>
// // // //                               <img 
// // // //                                 src={attorney.image} 
// // // //                                 alt={attorney.name} 
// // // //                                 className="shadow-sm rounded" 
// // // //                                 style={{ width: "130px", height: "150px", objectFit: "cover", objectPosition: "top center" }} 
// // // //                               />
// // // //                             </a>
// // // //                           </Link>
// // // //                           {/* Rating Stars */}
// // // //                           <div className="mt-2 text-warning small">
// // // //                             {[...Array(5)].map((_, i) => <i key={i} className={`bi bi-star${i < attorney.rating ? "-fill" : ""}`}></i>)}
// // // //                           </div>
// // // //                         </div>

// // // //                         {/* CONTENT */}
// // // //                         <div className="flex-grow-1 text-center text-md-start w-100">
// // // //                           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
// // // //                             <div>
// // // //                               {/* BIG NAME */}
// // // //                               <h3 className="fw-bold text-navy mb-1 hover-gold font-serif" style={{ fontSize: '1.75rem' }}>
// // // //                                 <Link href={`/attorneys/${attorney.id}`}>
// // // //                                   <a className="text-decoration-none text-navy">{attorney.name}</a>
// // // //                                 </Link>
// // // //                               </h3>
// // // //                               <div className="text-gold fw-bold text-uppercase ls-1 small mb-2 mb-md-0">{attorney.role}</div>
// // // //                             </div>
// // // //                             <div className="d-none d-md-block text-end">
// // // //                               <span className="fs-5 fw-bold text-success">${attorney.hourlyRate}<span className="fs-6 text-muted fw-normal">/hr</span></span>
// // // //                             </div>
// // // //                           </div>
// // // //                           <hr className="opacity-10 my-2" />

// // // //                           {/* DETAILS GRID */}
// // // //                           <div className="row mt-3 gy-2 text-dark">
                            
// // // //                             {/* Location */}
// // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-geo-alt-fill"></i></div>
// // // //                               <span className="fs-6 align-self-center">{attorney.location}</span>
// // // //                             </div>

// // // //                             {/* Category (Added) */}
// // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-briefcase-fill"></i></div>
// // // //                               <span className="fs-6 align-self-center">{attorney.category}</span>
// // // //                             </div>

// // // //                             {/* Phone */}
// // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-telephone-fill"></i></div>
// // // //                               <span className="fs-6 align-self-center">{attorney.phone}</span>
// // // //                             </div>
                            
// // // //                             {/* Languages */}
// // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-translate"></i></div>
// // // //                               <span className="fs-6 align-self-center text-truncate">{attorney.languages?.join(", ")}</span>
// // // //                             </div>
                            
// // // //                             {/* Email */}
// // // //                             <div className="col-12 col-md-6 d-flex align-items-start">
// // // //                               <div className="text-gold fs-5 me-2" style={{ width: "24px", textAlign: "center" }}><i className="bi bi-envelope-fill"></i></div>
// // // //                               <span className="fs-6 align-self-center text-break">{attorney.email}</span>
// // // //                             </div>

// // // //                           </div>
                          
// // // //                           {/* Mobile Price */}
// // // //                           <div className="d-md-none mt-3 pt-2 border-top">
// // // //                             <span className="fw-bold text-success fs-5">${attorney.hourlyRate}/hr</span>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))
// // // //                 ) : (
// // // //                   <div className="alert alert-light text-center border py-5"><h4>No matches found.</h4><button onClick={handleReset} className="btn btn-link text-gold">Clear Filters</button></div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <style jsx>{`
// // // //         /* COLORS & FONTS */
// // // //         .font-serif { font-family: "Times New Roman", Times, serif; }
// // // //         .text-navy { color: #002855; }
// // // //         .btn-navy { background-color: #002855; color: white; }
// // // //         .text-gold { color: #de9f57; }
// // // //         .ls-1 { letter-spacing: 1px; }
// // // //         .letter-spacing-2 { letter-spacing: 2px; }
        
// // // //         /* HEADER */
// // // //         .section-hero { background-color: #002855; padding: 80px 0 50px 0; color: #ffffff; }
// // // //         .section-main { background-color: #f4f6f8; }
        
// // // //         /* CARD HOVER */
// // // //         .hover-card { transition: transform 0.2s ease; }
// // // //         .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 40, 85, 0.08) !important; }
// // // //         a.text-navy:hover { color: #de9f57 !important; transition: 0.2s; }
        
// // // //         /* SCROLLER */
// // // //         .alphabet-scroll::-webkit-scrollbar { height: 4px; }
// // // //         .alphabet-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
// // // //         .alphabet-item { min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; color: #002855; border-radius: 50%; background: #f8f9fa; transition: 0.2s; }
// // // //         .alphabet-item:hover, .alphabet-item.active { background-color: #002855; color: #de9f57; }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // }

// // // import React, { useState, useMemo } from "react";
// // // import Link from "next/link";
// // // import Head from "next/head";

// // // // --- PREMIUM REALISTIC DATA WITH SLUGS ---
// // // export const attorneysData = [
// // //   {
// // //     id: 1,
// // //     slug: "caroline-k-abbott",
// // //     name: "Caroline K. Abbott",
// // //     role: "Senior Partner",
// // //     phone: "+1 202.530.8593",
// // //     email: "caroline.abbott@corelaw.com",
// // //     location: "Washington, D.C.",
// // //     category: "Corporate",
// // //     rating: 5,
// // //     hourlyRate: 850,
// // //     image: "/assets/images/attorney1.png",
// // //     languages: ["English", "French"],
// // //     admissions: ["New York", "Washington, D.C.", "Supreme Court of the U.S."],
// // //     education: ["J.D., Harvard Law School", "B.A., Yale University"],
// // //     bio: ["Caroline K. Abbott is a preeminent corporate lawyer with over 15 years of experience advising Fortune 500 companies.", "She specializes in cross-border mergers and acquisitions."]
// // //   },
// // //   {
// // //     id: 2,
// // //     slug: "jacob-m-abdo",
// // //     name: "Jacob M. Abdo",
// // //     role: "Partner",
// // //     phone: "+1 612.259.9681",
// // //     email: "jake.abdo@corelaw.com",
// // //     location: "Minneapolis",
// // //     category: "Intellectual Property",
// // //     rating: 5,
// // //     hourlyRate: 650,
// // //     image: "/assets/images/attorney2.png",
// // //     admissions: ["Minnesota", "California", "USPTO"],
// // //     languages: ["English"],
// // //     bio: ["Jacob M. Abdo is a leading intellectual property litigator known for his ability to explain complex technical concepts."]
// // //   },
// // //   {
// // //     id: 3,
// // //     slug: "darren-j-abernethy",
// // //     name: "Darren J. Abernethy",
// // //     role: "Shareholder",
// // //     phone: "+1 415.655.1261",
// // //     email: "darren.a@corelaw.com",
// // //     location: "San Francisco",
// // //     category: "Data Privacy",
// // //     rating: 5,
// // //     hourlyRate: 725,
// // //     image: "/assets/images/attorney3.png",
// // //     admissions: ["California", "New York", "IAPP Certified"],
// // //     languages: ["English", "Spanish"],
// // //     bio: ["Darren J. Abernethy is a recognized authority on data privacy, cybersecurity, and digital assets."]
// // //   },
// // //   {
// // //     id: 4,
// // //     slug: "charles-j-abrams",
// // //     name: "Charles J. Abrams",
// // //     role: "Senior Counsel",
// // //     phone: "+1 561.650.7984",
// // //     email: "charles.abrams@corelaw.com",
// // //     location: "West Palm Beach",
// // //     category: "Real Estate",
// // //     rating: 4,
// // //     hourlyRate: 550,
// // //     image: "/assets/images/attorney4.png",
// // //     admissions: ["Florida", "New York"],
// // //     languages: ["English", "Hebrew"],
// // //     bio: ["Charles J. Abrams brings over two decades of experience in commercial real estate law."]
// // //   },
// // //   {
// // //     id: 5,
// // //     slug: "ejim-peter-achi",
// // //     name: "Ejim Peter Achi",
// // //     role: "Partner",
// // //     phone: "+1 212.801.6963",
// // //     email: "ejim.achi@corelaw.com",
// // //     location: "New York",
// // //     category: "Corporate",
// // //     rating: 5,
// // //     hourlyRate: 950,
// // //     image: "/assets/images/attorney5.png",
// // //     admissions: ["New York", "New Jersey"],
// // //     languages: ["English", "Igbo"],
// // //     bio: ["Ejim Peter Achi is a powerhouse in the private equity sector, representing sponsors and their portfolio companies."]
// // //   },
// // //   {
// // //     id: 6,
// // //     slug: "ashia-d-adams",
// // //     name: "Ashia D. Adams",
// // //     role: "Associate",
// // //     phone: "+44 203 349 8800",
// // //     email: "ashia.adams@corelaw.com",
// // //     location: "London",
// // //     category: "Real Estate",
// // //     rating: 4,
// // //     hourlyRate: 500,
// // //     image: "/assets/images/attorney6.png",
// // //     admissions: ["England & Wales"],
// // //     languages: ["English", "German"],
// // //     bio: ["Ashia D. Adams is a key member of the firm's London Real Estate practice focusing on cross-border transactions."]
// // //   },
// // //   {
// // //     id: 7,
// // //     slug: "bianca-z-bailey",
// // //     name: "Bianca Z. Bailey",
// // //     role: "Senior Associate",
// // //     phone: "+1 310.555.0192",
// // //     email: "bianca.bailey@corelaw.com",
// // //     location: "Los Angeles",
// // //     category: "Litigation",
// // //     rating: 5,
// // //     hourlyRate: 450,
// // //     image: "/assets/images/attorney7.png",
// // //     admissions: ["California", "Nevada"],
// // //     languages: ["English", "Spanish", "Italian"],
// // //     bio: ["Bianca Z. Bailey is a tenacious litigator specializing in complex commercial disputes and entertainment law."]
// // //   }
// // // ];

// // // export default function AttorneysPage() {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedLetter, setSelectedLetter] = useState("All");
// // //   const [showMobileFilters, setShowMobileFilters] = useState(false);
// // //   const [filters, setFilters] = useState({ category: "All", location: "All", rating: "All", price: "All", admissions: "All", language: "All" });

// // //   const categories = ["All", ...new Set(attorneysData.map((a) => a.category))].sort();
// // //   const locations = ["All", ...new Set(attorneysData.map((a) => a.location))].sort();
// // //   const uniqueAdmissions = ["All", ...new Set(attorneysData.flatMap((a) => a.admissions || []))].sort();
// // //   const uniqueLanguages = ["All", ...new Set(attorneysData.flatMap((a) => a.languages || []))].sort();
// // //   const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// // //   const filteredData = useMemo(() => {
// // //     return attorneysData
// // //       .filter((attorney) => {
// // //         if (searchTerm && !attorney.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
// // //         if (selectedLetter !== "All" && !attorney.name.startsWith(selectedLetter)) return false;
// // //         if (filters.category !== "All" && attorney.category !== filters.category) return false;
// // //         if (filters.location !== "All" && attorney.location !== filters.location) return false;
// // //         if (filters.admissions !== "All" && !attorney.admissions?.includes(filters.admissions)) return false;
// // //         if (filters.language !== "All" && !attorney.languages?.includes(filters.language)) return false;
// // //         if (filters.rating !== "All" && attorney.rating < parseInt(filters.rating)) return false;
// // //         if (filters.price !== "All") {
// // //           if (filters.price === "low" && attorney.hourlyRate > 300) return false;
// // //           if (filters.price === "mid" && (attorney.hourlyRate <= 300 || attorney.hourlyRate > 600)) return false;
// // //           if (filters.price === "high" && attorney.hourlyRate <= 600) return false;
// // //         }
// // //         return true;
// // //       })
// // //       .sort((a, b) => a.name.localeCompare(b.name));
// // //   }, [searchTerm, selectedLetter, filters]);

// // //   const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
// // //   const handleReset = () => {
// // //     setSearchTerm(""); setSelectedLetter("All");
// // //     setFilters({ category: "All", location: "All", rating: "All", price: "All", admissions: "All", language: "All" });
// // //   };

// // //   return (
// // //     <>
// // //       <Head><title>Our Professionals | Core Law</title></Head>
// // //       <div className="section-hero">
// // //         <div className="container text-center text-lg-start">
// // //           <h5 className="text-uppercase fw-bold mb-2 section-subtitle text-gold letter-spacing-2">Our Team</h5>
// // //           <h1 className="display-3 fw-bold font-serif text-white mb-3">Find a Professional</h1>
// // //           <p className="lead opacity-75 text-white-50">World-class legal talent delivering exceptional results.</p>
// // //         </div>
// // //       </div>

// // //       <div className="py-5 section-main">
// // //         <div className="container">
// // //           <div className="row">
// // //             <div className={`col-lg-3 mb-5 pe-lg-4 ${showMobileFilters ? "d-block" : "d-none d-lg-block"}`}>
// // //               <div className="bg-white p-4 shadow-sm rounded-3 border-0">
// // //                 <div className="mb-4">
// // //                   <label className="fw-bold text-muted mb-2 ls-1" style={{ fontSize: '0.75rem' }}>SEARCH NAME</label>
// // //                   <input type="text" className="form-control border-0 bg-light" placeholder="e.g. Caroline" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //                 </div>
// // //                 <hr className="text-muted opacity-25 my-4" />
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Practice Area</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
// // //                     {categories.map((x) => <option key={x} value={x}>{x}</option>)}
// // //                   </select>
// // //                 </div>
// // //                 <button onClick={handleReset} className="btn btn-outline-danger w-100 mt-3">Reset Filters</button>
// // //               </div>
// // //             </div>

// // //             <div className="col-lg-9">
// // //               <div className="bg-white p-3 shadow-sm rounded-3 border-0 mb-4 d-flex gap-2 overflow-auto alphabet-scroll">
// // //                 <span onClick={() => setSelectedLetter("All")} className={`alphabet-item ${selectedLetter === "All" ? "active" : ""}`}>All</span>
// // //                 {alphabet.map((l) => (<span key={l} onClick={() => setSelectedLetter(l)} className={`alphabet-item ${selectedLetter === l ? "active" : ""}`}>{l}</span>))}
// // //               </div>

// // //               <div className="d-flex flex-column gap-3">
// // //                 {filteredData.map((attorney) => (
// // //                     <div key={attorney.id} className="card border-0 shadow-sm rounded-3 p-4 hover-card">
// // //                       <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
// // //                         <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 text-center">
// // //                           {/* UPDATED: Link using attorney.slug */}
// // //                           <Link href={`/attorneys/${attorney.slug}`}>
// // //                             <a>
// // //                               <img src={attorney.image} alt={attorney.name} className="shadow-sm rounded" style={{ width: "130px", height: "150px", objectFit: "cover", objectPosition: "top center" }} />
// // //                             </a>
// // //                           </Link>
// // //                           <div className="mt-2 text-warning small">
// // //                             {[...Array(5)].map((_, i) => <i key={i} className={`bi bi-star${i < attorney.rating ? "-fill" : ""}`}></i>)}
// // //                           </div>
// // //                         </div>

// // //                         <div className="flex-grow-1 text-center text-md-start w-100">
// // //                           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
// // //                             <div>
// // //                               <h3 className="fw-bold text-navy mb-1 hover-gold font-serif" style={{ fontSize: '1.75rem' }}>
// // //                                 {/* UPDATED: Link using attorney.slug */}
// // //                                 <Link href={`/attorneys/${attorney.slug}`}>
// // //                                   <a className="text-decoration-none text-navy">{attorney.name}</a>
// // //                                 </Link>
// // //                               </h3>
// // //                               <div className="text-gold fw-bold text-uppercase ls-1 small mb-2 mb-md-0">{attorney.role}</div>
// // //                             </div>
// // //                             <div className="d-none d-md-block text-end">
// // //                               <span className="fs-5 fw-bold text-success">${attorney.hourlyRate}<span className="fs-6 text-muted fw-normal">/hr</span></span>
// // //                             </div>
// // //                           </div>
// // //                           <hr className="opacity-10 my-2" />
// // //                           <div className="row mt-3 gy-2 text-dark">
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-geo-alt-fill text-gold me-2"></i><span>{attorney.location}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-briefcase-fill text-gold me-2"></i><span>{attorney.category}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-telephone-fill text-gold me-2"></i><span>{attorney.phone}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-envelope-fill text-gold me-2"></i><span>{attorney.email}</span></div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <style jsx>{`
// // //         .font-serif { font-family: "Times New Roman", Times, serif; }
// // //         .text-navy { color: #002855; }
// // //         .text-gold { color: #de9f57; }
// // //         .section-hero { background-color: #002855; padding: 80px 0 50px 0; color: #ffffff; }
// // //         .section-main { background-color: #f4f6f8; }
// // //         .hover-card { transition: transform 0.2s ease; }
// // //         .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 40, 85, 0.08) !important; }
// // //         a.text-navy:hover { color: #de9f57 !important; }
// // //         .alphabet-item { min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; border-radius: 50%; background: #f8f9fa; transition: 0.2s; }
// // //         .alphabet-item.active { background-color: #002855; color: #de9f57; }
// // //       `}</style>
// // //     </>
// // //   );
// // // }

// // // import React, { useState, useMemo } from "react";
// // // import Link from "next/link";
// // // import Head from "next/head";

// // // // --- PREMIUM REALISTIC DATA WITH SLUGS ---
// // // export const attorneysData = [
// // //   {
// // //     id: 1,
// // //     slug: "caroline-k-abbott",
// // //     name: "Caroline K. Abbott",
// // //     role: "Senior Partner",
// // //     phone: "+1 202.530.8593",
// // //     email: "caroline.abbott@corelaw.com",
// // //     location: "Washington, D.C.",
// // //     category: "Corporate",
// // //     rating: 5,
// // //     hourlyRate: 850,
// // //     image: "/assets/images/attorney1.png",
// // //     languages: ["English", "French"],
// // //     admissions: ["New York", "Washington, D.C.", "Supreme Court of the U.S."],
// // //     education: ["J.D., Harvard Law School", "B.A., Yale University"],
// // //     bio: ["Caroline K. Abbott is a preeminent corporate lawyer with over 15 years of experience advising Fortune 500 companies."]
// // //   },
// // //   {
// // //     id: 2,
// // //     slug: "jacob-m-abdo",
// // //     name: "Jacob M. Abdo",
// // //     role: "Partner",
// // //     phone: "+1 612.259.9681",
// // //     email: "jake.abdo@corelaw.com",
// // //     location: "Minneapolis",
// // //     category: "Intellectual Property",
// // //     rating: 5,
// // //     hourlyRate: 650,
// // //     image: "/assets/images/attorney2.png",
// // //     admissions: ["Minnesota", "California", "USPTO"],
// // //     languages: ["English"],
// // //     bio: ["Jacob M. Abdo is a leading intellectual property litigator known for his ability to explain complex technical concepts."]
// // //   },
// // //   {
// // //     id: 3,
// // //     slug: "darren-j-abernethy",
// // //     name: "Darren J. Abernethy",
// // //     role: "Shareholder",
// // //     phone: "+1 415.655.1261",
// // //     email: "darren.a@corelaw.com",
// // //     location: "San Francisco",
// // //     category: "Data Privacy",
// // //     rating: 5,
// // //     hourlyRate: 725,
// // //     image: "/assets/images/attorney3.png",
// // //     admissions: ["California", "New York", "IAPP Certified"],
// // //     languages: ["English", "Spanish"],
// // //     bio: ["Darren J. Abernethy is a recognized authority on data privacy, cybersecurity, and digital assets."]
// // //   },
// // //   {
// // //     id: 4,
// // //     slug: "charles-j-abrams",
// // //     name: "Charles J. Abrams",
// // //     role: "Senior Counsel",
// // //     phone: "+1 561.650.7984",
// // //     email: "charles.abrams@corelaw.com",
// // //     location: "West Palm Beach",
// // //     category: "Real Estate",
// // //     rating: 4,
// // //     hourlyRate: 550,
// // //     image: "/assets/images/attorney4.png",
// // //     admissions: ["Florida", "New York"],
// // //     languages: ["English", "Hebrew"],
// // //     bio: ["Charles J. Abrams brings over two decades of experience in commercial real estate law."]
// // //   },
// // //   {
// // //     id: 5,
// // //     slug: "ejim-peter-achi",
// // //     name: "Ejim Peter Achi",
// // //     role: "Partner",
// // //     phone: "+1 212.801.6963",
// // //     email: "ejim.achi@corelaw.com",
// // //     location: "New York",
// // //     category: "Corporate",
// // //     rating: 5,
// // //     hourlyRate: 950,
// // //     image: "/assets/images/attorney5.png",
// // //     admissions: ["New York", "New Jersey"],
// // //     languages: ["English", "Igbo"],
// // //     bio: ["Ejim Peter Achi is a powerhouse in the private equity sector, representing sponsors and their portfolio companies."]
// // //   },
// // //   {
// // //     id: 6,
// // //     slug: "ashia-d-adams",
// // //     name: "Ashia D. Adams",
// // //     role: "Associate",
// // //     phone: "+44 203 349 8800",
// // //     email: "ashia.adams@corelaw.com",
// // //     location: "London",
// // //     category: "Real Estate",
// // //     rating: 4,
// // //     hourlyRate: 500,
// // //     image: "/assets/images/attorney6.png",
// // //     admissions: ["England & Wales"],
// // //     languages: ["English", "German"],
// // //     bio: ["Ashia D. Adams is a key member of the firm's London Real Estate practice focusing on cross-border transactions."]
// // //   },
// // //   {
// // //     id: 7,
// // //     slug: "bianca-z-bailey",
// // //     name: "Bianca Z. Bailey",
// // //     role: "Senior Associate",
// // //     phone: "+1 310.555.0192",
// // //     email: "bianca.bailey@corelaw.com",
// // //     location: "Los Angeles",
// // //     category: "Litigation",
// // //     rating: 5,
// // //     hourlyRate: 450,
// // //     image: "/assets/images/attorney7.png",
// // //     admissions: ["California", "Nevada"],
// // //     languages: ["English", "Spanish", "Italian"],
// // //     bio: ["Bianca Z. Bailey is a tenacious litigator specializing in complex commercial disputes and entertainment law."]
// // //   }
// // // ];

// // // export default function AttorneysPage() {
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedLetter, setSelectedLetter] = useState("All");
// // //   const [showMobileFilters, setShowMobileFilters] = useState(false);

// // //   const [filters, setFilters] = useState({
// // //     category: "All",
// // //     location: "All",
// // //     rating: "All",
// // //     price: "All",
// // //     admissions: "All",
// // //     language: "All",
// // //   });

// // //   const categories = ["All", ...new Set(attorneysData.map((a) => a.category))].sort();
// // //   const locations = ["All", ...new Set(attorneysData.map((a) => a.location))].sort();
// // //   const uniqueAdmissions = ["All", ...new Set(attorneysData.flatMap((a) => a.admissions || []))].sort();
// // //   const uniqueLanguages = ["All", ...new Set(attorneysData.flatMap((a) => a.languages || []))].sort();
// // //   const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

// // //   const filteredData = useMemo(() => {
// // //     return attorneysData
// // //       .filter((attorney) => {
// // //         if (searchTerm && !attorney.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
// // //         if (selectedLetter !== "All" && !attorney.name.startsWith(selectedLetter)) return false;
// // //         if (filters.category !== "All" && attorney.category !== filters.category) return false;
// // //         if (filters.location !== "All" && attorney.location !== filters.location) return false;
// // //         if (filters.admissions !== "All" && !attorney.admissions?.includes(filters.admissions)) return false;
// // //         if (filters.language !== "All" && !attorney.languages?.includes(filters.language)) return false;
// // //         if (filters.rating !== "All" && attorney.rating < parseInt(filters.rating)) return false;
// // //         if (filters.price !== "All") {
// // //           if (filters.price === "low" && attorney.hourlyRate > 300) return false;
// // //           if (filters.price === "mid" && (attorney.hourlyRate <= 300 || attorney.hourlyRate > 600)) return false;
// // //           if (filters.price === "high" && attorney.hourlyRate <= 600) return false;
// // //         }
// // //         return true;
// // //       })
// // //       .sort((a, b) => a.name.localeCompare(b.name));
// // //   }, [searchTerm, selectedLetter, filters]);

// // //   const handleFilterChange = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
// // //   const handleReset = () => {
// // //     setSearchTerm(""); setSelectedLetter("All");
// // //     setFilters({ category: "All", location: "All", rating: "All", price: "All", admissions: "All", language: "All" });
// // //   };

// // //   return (
// // //     <>
// // //       <Head><title>Our Professionals | Core Law</title></Head>

// // //       <div className="section-hero">
// // //         <div className="container text-center text-lg-start">
// // //           <h5 className="text-uppercase fw-bold mb-2 section-subtitle text-gold letter-spacing-2">Our Team</h5>
// // //           <h1 className="display-3 fw-bold font-serif text-white mb-3">Find a Professional</h1>
// // //           <p className="lead opacity-75 text-white-50">World-class legal talent delivering exceptional results.</p>
// // //         </div>
// // //       </div>

// // //       <div className="py-5 section-main">
// // //         <div className="container">
// // //           <div className="row">
// // //             <div className="col-12 d-lg-none mb-3">
// // //               <button className="btn btn-navy w-100 d-flex justify-content-between align-items-center" onClick={() => setShowMobileFilters(!showMobileFilters)}>
// // //                 <span><i className="bi bi-funnel-fill me-2"></i>Filter Results</span>
// // //                 <i className={`bi bi-chevron-${showMobileFilters ? "up" : "down"}`}></i>
// // //               </button>
// // //             </div>

// // //             <div className={`col-lg-3 mb-5 pe-lg-4 ${showMobileFilters ? "d-block" : "d-none d-lg-block"}`}>
// // //               <div className="bg-white p-4 shadow-sm rounded-3 border-0">
// // //                 <div className="mb-4">
// // //                   <label className="fw-bold text-muted mb-2 ls-1" style={{ fontSize: '0.75rem' }}>SEARCH NAME</label>
// // //                   <input type="text" className="form-control border-0 bg-light" placeholder="e.g. Caroline" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
// // //                 </div>
// // //                 <hr className="text-muted opacity-25 my-4" />
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Practice Area</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.category} onChange={(e) => handleFilterChange("category", e.target.value)}>
// // //                     {categories.map((x) => <option key={x} value={x}>{x}</option>)}
// // //                   </select>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Rating</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.rating} onChange={(e) => handleFilterChange("rating", e.target.value)}>
// // //                     <option value="All">All Ratings</option>
// // //                     <option value="5">5 Stars</option>
// // //                     <option value="4">4+ Stars</option>
// // //                     <option value="3">3+ Stars</option>
// // //                   </select>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Location</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.location} onChange={(e) => handleFilterChange("location", e.target.value)}>
// // //                     {locations.map((x) => <option key={x} value={x}>{x}</option>)}
// // //                   </select>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Hourly Rate</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.price} onChange={(e) => handleFilterChange("price", e.target.value)}>
// // //                     <option value="All">Any</option><option value="low">Economy (&lt;$300)</option><option value="mid">Standard</option><option value="high">Premium (&gt;$600)</option>
// // //                   </select>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Admissions</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.admissions} onChange={(e) => handleFilterChange("admissions", e.target.value)}>
// // //                     {uniqueAdmissions.map((x) => <option key={x} value={x}>{x}</option>)}
// // //                   </select>
// // //                 </div>
// // //                 <div className="mb-3">
// // //                   <label className="fw-bold small text-muted mb-2 text-uppercase ls-1">Language</label>
// // //                   <select className="form-select border-0 bg-light" value={filters.language} onChange={(e) => handleFilterChange("language", e.target.value)}>
// // //                     {uniqueLanguages.map((x) => <option key={x} value={x}>{x}</option>)}
// // //                   </select>
// // //                 </div>
// // //                 <button onClick={handleReset} className="btn btn-outline-danger w-100 mt-3">Reset Filters</button>
// // //               </div>
// // //             </div>

// // //             <div className="col-lg-9">
// // //               <div className="bg-white p-3 shadow-sm rounded-3 border-0 mb-4 d-flex gap-2 overflow-auto alphabet-scroll">
// // //                 <span onClick={() => setSelectedLetter("All")} className={`alphabet-item ${selectedLetter === "All" ? "active" : ""}`}>All</span>
// // //                 {alphabet.map((l) => (<span key={l} onClick={() => setSelectedLetter(l)} className={`alphabet-item ${selectedLetter === l ? "active" : ""}`}>{l}</span>))}
// // //               </div>

// // //               <div className="d-flex flex-column gap-3">
// // //                 {filteredData.length > 0 ? (
// // //                   filteredData.map((attorney) => (
// // //                     <div key={attorney.id} className="card border-0 shadow-sm rounded-3 p-4 hover-card">
// // //                       <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start">
// // //                         <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 text-center">
// // //                           <Link href={`/attorneys/${attorney.slug}`}>
// // //                             <a>
// // //                               <img src={attorney.image} alt={attorney.name} className="shadow-sm rounded" style={{ width: "130px", height: "150px", objectFit: "cover", objectPosition: "top center" }} />
// // //                             </a>
// // //                           </Link>
// // //                           <div className="mt-2 text-warning small">
// // //                             {[...Array(5)].map((_, i) => <i key={i} className={`bi bi-star${i < attorney.rating ? "-fill" : ""}`}></i>)}
// // //                           </div>
// // //                         </div>

// // //                         <div className="flex-grow-1 text-center text-md-start w-100">
// // //                           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
// // //                             <div>
// // //                               <h3 className="fw-bold text-navy mb-1 hover-gold font-serif" style={{ fontSize: '1.75rem' }}>
// // //                                 <Link href={`/attorneys/${attorney.slug}`}>
// // //                                   <a className="text-decoration-none text-navy">{attorney.name}</a>
// // //                                 </Link>
// // //                               </h3>
// // //                               <div className="text-gold fw-bold text-uppercase ls-1 small mb-2 mb-md-0">{attorney.role}</div>
// // //                             </div>
// // //                             <div className="d-none d-md-block text-end">
// // //                               <span className="fs-5 fw-bold text-success">${attorney.hourlyRate}<span className="fs-6 text-muted fw-normal">/hr</span></span>
// // //                             </div>
// // //                           </div>
// // //                           <hr className="opacity-10 my-2" />
// // //                           <div className="row mt-3 gy-2 text-dark">
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-geo-alt-fill text-gold me-2"></i><span>{attorney.location}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-briefcase-fill text-gold me-2"></i><span>{attorney.category}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-telephone-fill text-gold me-2"></i><span>{attorney.phone}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-translate text-gold me-2"></i><span>{attorney.languages?.join(", ")}</span></div>
// // //                             <div className="col-12 col-md-6 d-flex align-items-start"><i className="bi bi-envelope-fill text-gold me-2"></i><span className="text-break">{attorney.email}</span></div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))
// // //                 ) : (
// // //                   <div className="alert alert-light text-center border py-5"><h4>No matches found.</h4><button onClick={handleReset} className="btn btn-link text-gold">Clear Filters</button></div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //       <style jsx>{`
// // //         .font-serif { font-family: "Times New Roman", Times, serif; }
// // //         .text-navy { color: #002855; }
// // //         .text-gold { color: #de9f57; }
// // //         .section-hero { background-color: #002855; padding: 80px 0 50px 0; color: #ffffff; }
// // //         .section-main { background-color: #f4f6f8; }
// // //         .hover-card { transition: transform 0.2s ease; }
// // //         .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0, 40, 85, 0.08) !important; }
// // //         a.text-navy:hover { color: #de9f57 !important; transition: 0.2s; }
// // //         .alphabet-scroll::-webkit-scrollbar { height: 4px; }
// // //         .alphabet-item { min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; color: #002855; border-radius: 50%; background: #f8f9fa; }
// // //         .alphabet-item.active { background-color: #002855; color: #de9f57; }
// // //       `}</style>
// // //     </>
// // //   );
// // // }


// // import React, { useState } from 'react';

// // export default function ProfessionalsPage() {
// //   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
// //   // Initialize as null so no dropdown shows by default
// //   const [activeFilter, setActiveFilter] = useState(null);

// //   const gtGold = "#c5a353";
// //   const gtDark = "#222222"; // Darker color as seen in the screenshot
// //   const gtBlue = "#5baed5";

// //   const filters = ["Capability", "Location", "Admission", "Education", "Language"];

// //   return (
// //     <main className="bg-white overflow-hidden">
      
// //       {/* 1. HERO SECTION */}
// //       <section 
// //         className="position-relative d-flex align-items-center justify-content-center text-center" 
// //         style={{ 
// //           backgroundImage: "url('https://www.gtlaw.com/-/media/images/backgrounds/hero-professionals.jpg')", 
// //           backgroundSize: 'cover', 
// //           backgroundPosition: 'center', 
// //           height: '350px' 
// //         }}
// //       >
// //         <div className="container mt-5">
// //           <p className="h4 fw-normal mb-1">One firm. One team.</p>
// //           <p className="h4 fw-normal">Put our experience in your corner.</p>
// //         </div>
// //       </section>

// //       {/* 2. SEARCH & FILTER SECTION */}
// //       <section className="container-fluid g-0" style={{ backgroundColor: gtGold }}>
// //         <div className="row g-0">
          
// //           {/* Left: Search Bar Area */}
// //           <div className="col-lg-5 p-4 p-md-5">
// //             <h2 className="mb-4 d-flex align-items-center border-bottom border-dark pb-2">
// //               <input 
// //                 type="text" 
// //                 className="form-control bg-transparent border-0 fs-3 p-0 shadow-none text-dark fw-light" 
// //                 placeholder="Search Professionals By Name" 
// //               />
// //               <i className="bi bi-search fs-3"></i>
// //             </h2>
// //             <div className="d-flex gap-4">
// //               <div className="form-check">
// //                 <input className="form-check-input border-dark bg-dark" type="radio" name="stype" defaultChecked id="name" />
// //                 <label className="form-check-label fw-bold" htmlFor="name">Search By Name</label>
// //               </div>
// //               <div className="form-check">
// //                 <input className="form-check-input border-dark" type="radio" name="stype" id="keyword" />
// //                 <label className="form-check-label fw-bold" htmlFor="keyword">Search By Keyword</label>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right: Filter Links (Dark Section) */}
// //           <div 
// //             className="col-lg-7 p-4 p-md-5 d-flex align-items-center"
// //             style={{ 
// //               backgroundColor: gtDark, 
// //               clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
// //               marginLeft: '-60px'
// //             }}
// //           >
// //             <div className="ps-5 ms-4">
// //                 <p className="text-white fw-bold fs-4 mb-3">Filter Professionals by:</p>
// //                 <div className="d-flex flex-wrap gap-x-4 gap-y-2">
// //                 {filters.map((item) => (
// //                     <button 
// //                         key={item}
// //                         onClick={() => setActiveFilter(item)}
// //                         className={`btn btn-link text-decoration-none fw-bold fs-5 p-0 d-flex align-items-center ${activeFilter === item ? 'text-warning' : 'text-white'}`}
// //                     >
// //                     {item} 
// //                     {/* Dynamic Icon Change on Click */}
// //                     <i className={`bi bi-chevron-${activeFilter === item ? 'down' : 'right'} ms-2 fs-6 opacity-75`}></i>
// //                     </button>
// //                 ))}
// //                 </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* 3. DYNAMIC DROPDOWN (Shown only when a filter is clicked) */}
// //       {activeFilter && (
// //         <section className="container mt-5 animate__animated animate__fadeInDown">
// //             <div className="p-1" style={{ border: `1px solid ${gtGold}` }}>
// //                 <select className="form-select border-0 shadow-none fs-5 py-2 rounded-0 bg-light">
// //                     <option>Select a {activeFilter}</option>
// //                     <option>Option 1</option>
// //                     <option>Option 2</option>
// //                     <option>Option 3</option>
// //                 </select>
// //             </div>
// //         </section>
// //       )}

// //       {/* 4. ALPHABET NAVIGATION */}
// //       <div className="container py-5 mt-4">
// //         <div className="d-flex justify-content-between overflow-auto pb-2">
// //           {alphabet.map((char) => (
// //             <a 
// //               key={char} 
// //               href="#" 
// //               className="text-decoration-none text-dark fw-bold fs-3 px-1" 
// //               style={{ fontFamily: 'serif', letterSpacing: '2px' }}
// //             >
// //               {char}
// //             </a>
// //           ))}
// //         </div>
// //       </div>

// //       {/* 5. STATS BOX (Bottom portion seen in image) */}
// //       <section className="container mb-5 shadow p-0 overflow-hidden">
// //         <div className="row g-0">
// //           <div className="col-md-4 p-5 text-center text-white" style={{ backgroundColor: gtBlue }}>
// //             <div className="display-2 fw-bold">51</div>
// //             <p className="h5 fw-normal">Offices Worldwide</p>
// //           </div>
// //           <div className="col-md-8 p-5 text-center text-white bg-dark">
// //              <div className="display-2 fw-bold">800+</div>
// //              <p className="h5 fw-normal">Chambers Rankings Globally</p>
// //           </div>
// //         </div>
// //       </section>

// //     </main>
// //   );
// // }

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// export default function AttorneysPage() {
//   const router = useRouter();
//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
//   const [activeFilter, setActiveFilter] = useState(null);

//   const gtGold = "#c5a353";
//   const gtDark = "#222222"; 
//   const gtBlue = "#5baed5";

//   const filters = ["Capability", "Location", "Admission", "Education", "Language"];

//   return (
//     <main className="bg-white overflow-hidden">
      
//       {/* 1. HERO SECTION */}
//       <section 
//         className="position-relative d-flex align-items-center justify-content-center text-center" 
//         style={{ 
//           backgroundImage: "url('https://www.gtlaw.com/-/media/images/backgrounds/hero-professionals.jpg')", 
//           backgroundSize: 'cover', 
//           backgroundPosition: 'center', 
//           height: '350px' 
//         }}
//       >
//         <div className="container mt-5">
//           <p className="h4 fw-normal mb-1">One firm. One team.</p>
//           <p className="h4 fw-normal">Put our experience in your corner.</p>
//         </div>
//       </section>

//       {/* 2. SEARCH & FILTER SECTION */}
//       <section className="container-fluid g-0" style={{ backgroundColor: gtGold }}>
//         <div className="row g-0">
//           <div className="col-lg-5 p-4 p-md-5">
//             <h2 className="mb-4 d-flex align-items-center border-bottom border-dark pb-2">
//               <input 
//                 type="text" 
//                 className="form-control bg-transparent border-0 fs-3 p-0 shadow-none text-dark fw-light" 
//                 placeholder="Search Professionals By Name" 
//               />
//               <i className="bi bi-search fs-3"></i>
//             </h2>
//             <div className="d-flex gap-4">
//               <div className="form-check">
//                 <input className="form-check-input border-dark bg-dark" type="radio" name="stype" defaultChecked id="name" />
//                 <label className="form-check-label fw-bold" htmlFor="name">Search By Name</label>
//               </div>
//               <div className="form-check">
//                 <input className="form-check-input border-dark" type="radio" name="stype" id="keyword" />
//                 <label className="form-check-label fw-bold" htmlFor="keyword">Search By Keyword</label>
//               </div>
//             </div>
//           </div>

//           <div 
//             className="col-lg-7 p-4 p-md-5 d-flex align-items-center"
//             style={{ 
//               backgroundColor: gtDark, 
//               clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
//               marginLeft: '-60px'
//             }}
//           >
//             <div className="ps-5 ms-4">
//                 <p className="text-white fw-bold fs-4 mb-3">Filter Professionals by:</p>
//                 <div className="d-flex flex-wrap gap-x-4 gap-y-2">
//                 {filters.map((item) => (
//                     <button 
//                         key={item}
//                         onClick={() => setActiveFilter(item)}
//                         className={`btn btn-link text-decoration-none fw-bold fs-5 p-0 d-flex align-items-center ${activeFilter === item ? 'text-warning' : 'text-white'}`}
//                     >
//                     {item} 
//                     <i className={`bi bi-chevron-${activeFilter === item ? 'down' : 'right'} ms-2 fs-6 opacity-75`}></i>
//                     </button>
//                 ))}
//                 </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. ALPHABET NAVIGATION (Redirects to [slug].js) */}
//       <div className="container py-5 mt-4">
//         <div className="d-flex justify-content-between overflow-auto pb-2 border-bottom">
//           {alphabet.map((char) => (
//             <button 
//               key={char} 
//               onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
//               className="btn btn-link text-decoration-none text-dark fw-bold fs-3 px-1 border-0" 
//               style={{ fontFamily: 'serif', letterSpacing: '2px' }}
//             >
//               {char}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 4. STATS BOX */}
//       <section className="container mb-5 shadow p-0 overflow-hidden">
//         <div className="row g-0">
//           <div className="col-md-4 p-5 text-center text-white" style={{ backgroundColor: gtBlue }}>
//             <div className="display-2 fw-bold">51</div>
//             <p className="h5 fw-normal">Offices Worldwide</p>
//           </div>
//           <div className="col-md-8 p-5 text-center text-white bg-dark">
//              <div className="display-2 fw-bold">800+</div>
//              <p className="h5 fw-normal">Chambers Rankings Globally</p>
//           </div>
//         </div>
//       </section>

//     </main>
//   );
// }

import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AttorneysPage() {
  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  const [activeFilter, setActiveFilter] = useState(null);

  const gtGold = "#c5a353";
  const gtDark = "#222222"; 
  const gtBlue = "#5baed5";

  const filters = ["Capability", "Location", "Admission", "Education", "Language"];

  return (
    <main className="bg-white overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section 
        className="position-relative d-flex align-items-center justify-content-center text-center" 
        style={{ 
          backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEA8QEBIPEBAQDxAPEBUVFhUPEBUPFRUXFxUVFRUYHSggGBolGxUVITEhJSkrLi8uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHSUvLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAACAwABBAUGB//EAEQQAAEDAgQCCAMGBAQDCQAAAAEAAhEDIQQSMUEiUQUGEzJhcYGRQqGxFFLB0fDxIzNi4RYlQ1MVc5IHFzVEcpOiwtL/xAAZAQEBAQEBAQAAAAAAAAAAAAABAAIDBAX/xAAlEQEAAwACAwABBAMBAAAAAAAAAQIRAxITITEEQVFhcRQiUiP/2gAMAwEAAhEDEQA/AMNjFK1qu1qYavuPhLBqQakGpgIIgK8JAK4CmhAV4SDUgEIMqvlThXAURDVcBMBXDVEQ1XDUwFcBCEBINSDUg1RENSASAVmxnIkTlaYm8S68I04uGphqQakAg4IakGpBqYCCIakGpBqQajSIakGpAJhqCACQamGpBqCAakGphqQaggGq+VSAK4ajSjyqxap8qtlVqY+RUp8qpGrHDtapA1Xa1SBq9bx4AakAmArhqDgwrwkAkAohCQCQCQCCACuGpgK4CtQhquGphqQag4AakGphqQag4AakGphqQarTgBqAA7Q3uaYt4Bxv81kBqwP+I0/tPYWz5Y79ObjN/LzZjYC+VYtOY3WPrODUw1INTDU6yAakGphqQarTghqQamGq4agiGpAJhqQajSAakGphqQas6QDUg1MNSDUaQDUgEw1INRpDKqyqUNV8qNOIcqpTZVStWOEa1MBINSyr168mBCQCYar5UasANVwE8qQarTgBqQakGpZVacANSATDVcNQsENSDUg1INRpwQ1XDUw1IBGnADUgEw1INVpABc+cMPtIq5aefPipdlGfgqYZrbxNmuO+k+vSGAJNgLnyWiD29nnmSz7Q58A5oeylUByjWzV5fyb5Ef29H49dmf6b4NTDVVI5gHDQgEeqkDV6NcMENSASDUw1WkA1INTDUg1GkQ1INTDUg1Z04AakGphqQajTgBqQamGpBqNOAGpBqYakGo04jDUsqYallRpxFlVKXKqRqxwgakGpgJAL168uAGq4amAkAjTgBquGqTKkGq1YjDVcNUmVINVqxGGq4apQ1XDUacRhqQapA1INVpxGGpBqkDUg1GrEYakGqQNV3QASSAACSTYADUlGnHI9d+nHUGihS7RtV4a/MGtczJcFsnc+S4vC4Wtin8RLyLk1CXRfx2mF1PXHpHCPa406jX1C2AWhxvbLxd0jXRc70R0s7Dh2Wmyo50CXy5sQWkFoI5zr7rw8nJa25H8Pdx8da5rtegziMOaTHjtKVXJfMTkkCDfSSdNLLqg1cd0J0o4MoCrDmhoeLQQ0GSQ429CRtddhg67arQ9swZFxBst/j3tkxZj8ilYmJqYamGphqQavTrzYAakGqQNSDUacANSDUw1INRpwA1INTDUg1Z04AakGpgJBqNOAGq4CYakGo04AakGpgK4ajTgZVSkyqkascCAkAkAkAvXrzYICYCuAkAjVggJgK4amArTggJAJAJBqNWAAkGphqQarTgBqQCYakGo04IakGpBqYajVgBqh6QpzRrDnSqD3aVlhqxulMU2hRqVXNL2tAlosSHODY+aJn01Ee3kdbo13ZudDoD4uZNpWdgeizUYHZc0Pa0gCL5ovFz7qXH9aC2jVY3C0mioXOBc8mo0kFoMECYzTEXWpwnSdcU3sbWdTY45iGFtMl2oNiDtt+C+fEXmP2fQmaRL0BvQxZSptc0wabDe9iLT9430/Nbzq9h8lEiSeNxknMbgbrkOr2OqCi0iq88REuc5wIzO17Sdo0Ersegsc6rna4MBbB4RlmTu2TC3w7FvbHNk09NkGphiYCQavXrx4AakGphqYajTiMNSDVIGpBqNOIw1INUgarhqNOIw1INUgarhqNOIw1INUmVINWdOIg1IBSBqvlRpxHlVKTKrq1Y8+ASAVALmesfWv7JUdSFMOcGtdJNiCOQ9V6Ozh1dQAmAtI3ps8IgFxZQJ2Gaq4CPQSVk0+m2bgixIvMjtOzb/1Fc456ungu2gCYCxcNj6dR2VpM8W33XZT859lmgLcckT8Ymkx9hYBIBIBIBXYdRDUw1XATDVdj1ENSDUw1INR2WAGphqYakGq7HADVpuuzf8AL8VOmRk/+41b8NWm66t/y/FRrkbG187d0TJiHiOLackhh1aNJE7bfqVNhnhpzEB40IIgTFtCCIMG2seJCjxLXROa8t0DKhGv9V7RY/giwfeJF9Iv4GJFvFcnZ2/V100GHKG8R7uYZbn4nk5R7ldf1RaM9SNCydIHe2JufNcX1aaOwYQLB77kRBEE8TiQNdgT8l2fU69V+t6JPxHR4Hedr6CFzif9nS0f6OqDUg1MNSDV27PPgBqQamGphqOxxGGpBqYamGo7HEYakGphqQajTgBquGp5UgEdjgAK8JgK8I04ICvCUK8I7HBhUlCpGrHnQK8z64uFXHPmwZkojaYvJneXH2C9Ia5eZY458dUOk4qOWj414fqvRE64zGOlGGpB8APbD8OARVmC0OB75PwxE6IUcKzgyvq2GG1DXiO1daw9ecrID/4lnT/G58qJM/zDuf1orYZh/hyCbYduhOjHO+4VymsOsWll9XKGWs2Xlw7FouwtPfqGZnc3/ZdaAuW6vt42GP8ASpbR8Lj90c/3XTZgNbJjKi22SgJgKMFMFXcdDDUw1EFMFHc9CDUw1FpTaVd10INTDVYFIFXddFw1aXrwP8uxh5UZ5fEFvAVpevH/AIbjf+Q76hHc9XgWKfwmOf4qehTLmkgOMEaAnW8mfJRVquVpIIJDgRIJGvJJmIJgmOWkCBH3fNbndEO06rS2jGV0h9TuhjzcDxJ32G/t23U6pOIcCHA/Zz3g8Os5m7gPkFxPVGrOHcJJ/iPtL40aO60X05rueqbS3EmxE03fAGbDmcx0Xnm2Wd4jauxDUwFcJBa7ufUQ1MNVwrhHc9VgEgFcBKFdl1EBIBXAV0dz1WhXhXVI7LqqFeFSpHeD1XhUqlVKO66qV1aVSO66vLWvXmvR3HjGkb1y6w/qJ2H4rvX4gBrjyBPsFwPVps4qlae8dM3wn+h30Xr45+uXLXMde8kZzxf+Zd8Z7rQ3dpUWKrNpXfDQKmWSIuKFhenrfT91TqctcYF6eJ+H71UD/a/X9Oi03XXOGMFMAE16pmALNa1u7G7/ALKDb9G9YsNRGcmf5TQA2XRDWkyGRaXHXb30/SvS+PxrjlqNw9BtQdm1glzntIczOTroDsPBcq1tW1+Ha49Fvuiqb+yAJEmo4g5tCAB+azb03X3LuOguslQhlPFhoqkuAewENcBEEtEwbx+S6lrl5jgWVO2pZnA8TI4ptmEr0QVguFrY7149hnNcmHLBbWCYrBZ8jXhlnByYcsEVkxWWfI14ZZ4cmHLAFZMVkeU+GWeHLT9dHf5djf8AkP8ABZgrrmuvfTLaeGrUXC9ei9rCDJB3JbrA1kclV5NtAtw5WZePY4NDDE3APfad/AWudEaJMAgTF4jW4N4uqxLuAgHNfmeYtcBOhUzDjIEANFgZAA3/ALr268eOv6r4sdi8E3LyAP4p+4BYW2/Vl3XVZw+1NI+LtPgDBAad5JXmHRYAaYg8ZNw3cCd/n9F23VzGmnWoGGjiykDIIa4ZdBfSfZeXlnJ16uKO0Y9RD0g5c11h6y08DTp1KgLhUqtpAAxchxk+HD81yf8A3uMJDW4LEEk5bvptvy3XKs2tGxDU0iJyXqYckHrW0cYHNa77zQ73ErSdFdOZ8fjqBIysFE0/MNh/zI9liOSZ3P0anizNdeHJBy4Xp3rLWo9JdH4Zj2to1mvdWBaC4xOWHHScpC6r7UieXMUcMy2OZVnWu+1K32pYnnPgls86tnWt+1q32tZnnPgls+0VZ1qzi1X2tZ88nwS2naKu0XE4TrrRNerQrPpsIrup0SJLXMAmXO0B281D0L16Ziar2Gn2bW031M2fOTl1AaGjaT6Lcxy5M459a7mu77RXXEM6+4Mic79THA64mx9Rf1VI/wDX/mV0r+8PP8ZiopVL/wCm/wChWj6plv2gFxaA2m83LI2+8Y5rDxLiGOOcHaJdOoHLxn0WnGLINswklkgkazPovtVyIeC2zL0OjjaDmtAqUS4toNAzU5zOrcQA1kWt4haPra2nWdQZ21NhZUxJfcENDqoANTKJaBl5G2nJcmMaBlMESMwvBEH+yVTGDimTEZrk2deEL2yW4Oi3MXYhg4Q64IzBxEZbX53i0+S3fRjcP2MDENEBzjY5iM4ENgXOvoCuaq4oAuG4AH0H4rM6Jx7Gh0jvFjR5mfDxCxaNj63Wcn43mDq0qdUmpVNMU3scAWauaQWg20MrsD03SDS4vaGgAkm1jpY33C4bFdLU21TSIl+aOd5gXUvSfSQovLS0uOUm3g2YXOaxLrF5h2zOnKRjjF4Im1iCQb7QFKOmKf32jzMH2XD9I4w0nBobmJbrEjQ+PgsTG4pxeWwQGOcAb32nyRHHWW/NaHoo6cpf7jPcK/8Ax6l/uM915zhasuLTex87KN+LE3gBvAAINhadt5PqmOGkjz3h6V/iGj/uM90v8SUR/qN+a8xc/UlxEHLoBPpFkRimiMxgze+vK+2qf8ei/wArkenu60UB8c+QcfwXF9NdMtrYnEkxUDqDmUSZz0opSckacRdM8ytOcS0g5dbamYF/AeGyWIgNtAJGsJrw1r7hi/Pe2a11YwCcs85BgmW+O6VKtHFDWGDGsSW6jWCNj4KN7C4PMySTNj4E7eCVJzovmBi+sRH0lbc27wOJORxzNiSBAywAIAuP1ZbKl0s9kRDoMCwJuPCDud1osFwhwJiHQdRBgWWXVDiNrafgudq1n661vaPiTrV1kq4w06dTK0UTmETxOLWgyPePNahwINKpN3uBIkG41gHbxWLjqhc9xOtuXIck6tQFtEA3bJP/AFAp6RERELvM2mZd+z/tCrU2sb2LHAANs4zlAgTyKw8L0y6hi6mIAl1Vr6xEkxngx5DMfb24N1Obyf0VuOiBkDmkm8xy4hA+avDSI9QJ572n3P8AToesvWQVsThq4aWuoEtIn+oRt4rpP8ei/BF+f9l5l0oIkuJLz3tIBEREKR2IhpeJkknINGg6nTT8kTwcc56aj8jkjfb0p3XrXhFvFecdM9MYmrXqO7atJfiWgBziA0E5QPADL7BYbMYZ0kSD4Ryv4IdoA9zmgAdq4Nm8BwZ4prxUp7rDNua9/Vpbbqv03XoYqlVc+o8CnUbDy4tkyN/IFdV071sqVmhjH9nleDLHOBIgggkajRcBhcQ4upgtZoWyJkHLrrfb3K2OIs46kXIgZZnTXxlPStp7THseS1Y6xPp0eM634mpSNJz28dnOAyuyQLAg66+6x6/WPEllOmarop1O1a+XB5cJgF24ubFc40TI/iAjWQR6eKJfG5nzH/2CY46R8gTy8k/bMzF4h1RznG5JzfNR/aCBYx3hIMWP6KxDXI0B5C1iIG6oVjpGtoNoP6BW3OdTta43DSR5KywziHfqFSQkxfSDTwNEhwzTpEHSFrxNrjV520jS3isfC98+AP1UkjKJBHA8+9ig/qvUzWsDwjnrdKqTxWB4mgfOVG8NkCSLMHyEfVZVCqGvcTD5c9sE2BIIt4iZ8wESYQYlxlwI3gXiRmF4/Wiyujnd0Fp4qjR38oBlg03108PFYlcGTeZcLxYCTaVn9EsfmZy7biOQG00/ii26JMM2rWqmuQGNy9rBcXXjPExPK6yeku07UhoaQLSZJ7oj5ysRtJ5rtJrGO1HBIEjtJiM17W0U3SAZ25moRxiG3gSGtiItt7rDafpNr+0GUgNi8gEm3MhYmLflfUcSBFSoG9wWkfdM+91P0mKf2gEzmlsf/Ac/ELD6QDQ55IcJq1I4dXTPPTxUlYfEgBzrztMxEW+axe0GtpJzQY8yFei0OAHFvmuIiBECxGhnX03ifQy3zgNEzYzPkNlqPTM+4ZFau1zSDDDlHdFnEXgjbe6hyybzYB3np+yxi4S0k3mOdvVT9tvpAgTe37rWsshzQYILyYPgA2dL6rKxJ4G+X4LEp1M73BxiBFomAZGv1Ules0RbMIaPVMCfaBpN+6PTbhSa8SA8ts4tcADLQA6fA6bSo31tO8LEwJjXz/UlXpVheZEfK58UE6rxHDZue0zoQI03hbY4gzEnU/RazClpdsRc766LJfV4mkE87W3At6LMtQ1mLq5nkxlMAQPARPnZZGCeAx0ui85c5YDAGoBv7TZZOJbSfGazgdc3FHKIgC61QdlBEEOO4cRY+A9VTGwonJZD6wkiR3nG5k6zqYKyKeMhrQNTE790z9QFih0kk3gOc7RpJ+noFZju55vHJbhiW16w4drQHNJcX5y4mI2jT1WD0e573tY4xLbTZu0STp5rL6TeXMZHP/8Aa1rq8tF5gt8TOgv5lZj41aPbc4xjKN3EtFocIewvyhwyvaPHTaPRaU4trnkkvaHPDpkTIEGfMqHFPc/vAm/LL+tlZpGUMIA/qn3MR+KckTLOpl8s4nEZvugAiw1m+91RrmBLiMsADkCdJjxWAabNqnLffndT4fD5iAKsZrd7bxv4qiuKban7Y5YA4jmJOl9jy5pDFC0iQDxWLhBHn4BQ0azqbCBlcHWOpPPYD5rGdiN7DS1/zRGtTFc/ls8QW6NsAJgAA7wfH56rGNaRdhBIvM/koqVVrC4nK7hLQDxcV4MW91IzEU3tIc1rIBghpJzRp3vndO4x9RB83sqWPBN7NnYGw91StOBhfjPh/dSnNFiDwfPN+ShoHhd7fJSPymRBbZg8puApJHE54gHiaPorMLSWyCJqGPO11dv8zvWzmR66KqWaWTHxE/h9FBC/KbjSZOs6Gfqtp0RTbno3E9qS0SZPpljbcjRax7jaWmZ02sPLxW26G79Hhd8RmGho/mbxO3MahZlqDwVai7ENDQ4vzgzFtZ3P4LLxLx9oP8OZe2XaDvNHLbX0UHR1ao6qwGmGtkSZk90nSecbKd7ahrAyA3ONhfj5xysstJcU95xBADcudgm85eCTrb4vYLUdIZg85gDL6hHDlEGI013MraVwDiRLzOdsNn+pu21wtXUdTBkU+0JqO0zMgWExJnTVNYVpCjX1kBxM8ydD+6gr4kjzERbYaaKbHUKetMu3kGIj2kLDbQc50XgHKfAStdWIt6VTcTI8j/dZWGY0sdmEjMYjWYG86abFQFuVwNskxpDjHMDxWfhiMs6iTuRabJTDxFQseAMw4JM94GTM28FO5ogE20PLcXWDjA57iWtJGUCwkATufZZdThAAIBsTBBEnXuyqFK5ayRcxkdGo3t8J8fZXNKJuRPP33jmli6JaGOLiWua/a4Ij8/ksQ1zOXhN7aazzb6boLLpCASCNDFud1k0iSMziCTB0I115DZYged4PCNzpGlzP6KbapjuNbcWBmLE6zNvElGlNWIDXf+hx2aNPBat7s0Abz4rNc4mRJMgggD9HdCixrG31cYJifSOSas2ZvQwpZmdu1uXjzFwIGhi++yw6mHc0MLhALzHqAfoFMcWOz7NrgCGlriQRA8LLO6udFiu1+aoTladCHNl0ZXRHgbrcsROMLGPmkIvefS9/mtfSqjtAHc4IiR4T4grN6T4HVKUmGPLJPCYzATZa2hUcX5eJ0vBJuXWJObxNzcrHx0n227a4boWjTmPxT7bxbpIvrHusYOGoeNDE3F/Uqxp7S07afm1aYZDqkmbaxqI9oRyt+4Dc7AqJjQCCcrgO82Q2Ra0gg3QbTdsJiNLyfdSZeFpNLoghpuYDQRAIsZtM/JaTEQXvDQAMzoE6CTaVsqbXS0Br9dL6aREIimA6qHtDjMQDZu/qdt0NQwgXAA5oMkHZwvHzzK1JxPd4iTJkQdbb7rYtLBMAiRGv9lE+gz+r3MjyMlWLWBVqkklwubmZn6qk6+EcHEDiFoM7R5KkEKQOUxqTr7KaTOx4mD5XKpUtMjSe0v0vxH1AKdFncgmA13rqqVIgo+KQJaXAmTG4y+C2vQ7YdT4WD+HUIMHNPFodhdUqWZahl9GUqvaML35mh0kAQO6Rt4mdEabaf2icxLy/x0zl0ac59ldUstJM7TigA2+cS61uLy8Fq6mJaHNa6RabS65cRq4lUqWoZn4kqucyxDHTA8joR/dY1RrXGSTTkjiAzEeQn8VZUusuMMkYOgBepVqbwBk95KTQHEMYDSbBuOIk+p8FSpWLZQnHPaBSBdlBc2fUyY33U2FwjuzDWOAaZmWh19DBlUqTX3OK3qNLB03Hs2y0hznjc2yyZaRCxKuE7HiqgSQMl8xGuuo+qpUsS3AYbFBzoh7Rl0zAifIAeKmxNRzSTJiRG4NnTI9ldUr7C+SxmkxNhIg7nXXlv8lbD8VNsbGTN7hXVLMGfhtpOOci4yF3eIsL7roupzyO0n7jeR0VKkxPvBMemo6XwxqVq5EZXVJHPUbLTFppuc0iSDG2k+seipUq0etNZ94mcZ91YlUqQVxU5E7H90zWd5HfxMz5eFuSpUor08Q4H+wU1LV0m8yefqrKlQJWqm2pEQbKRUqSGSxgIB8PpZUqVKL/2Q==')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          height: '350px' 
        }}
      >
        <div className="container mt-5">
          <p className="h4 fw-normal mb-1">One firm. One team.</p>
          <p className="h4 fw-normal">Put our experience in your corner.</p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section className="container-fluid g-0" style={{ backgroundColor: gtGold }}>
        <div className="row g-0">
          <div className="col-lg-5 p-4 p-md-5">
            <h2 className="mb-4 d-flex align-items-center border-bottom border-dark pb-2">
              <input 
                type="text" 
                className="form-control bg-transparent border-0 fs-3 p-0 shadow-none text-dark fw-light" 
                placeholder="Search Professionals By Name" 
              />
              <i className="bi bi-search fs-3"></i>
            </h2>
            <div className="d-flex gap-4">
              <div className="form-check">
                <input className="form-check-input border-dark bg-dark" type="radio" name="stype" defaultChecked id="name" />
                <label className="form-check-label fw-bold" htmlFor="name">Search By Name</label>
              </div>
              <div className="form-check">
                <input className="form-check-input border-dark" type="radio" name="stype" id="keyword" />
                <label className="form-check-label fw-bold" htmlFor="keyword">Search By Keyword</label>
              </div>
            </div>
          </div>

          <div 
            className="col-lg-7 p-4 p-md-5 d-flex align-items-center"
            style={{ 
              backgroundColor: gtDark, 
              clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0% 100%)',
              marginLeft: '-60px'
            }}
          >
            <div className="ps-5 ms-4">
                <p className="text-white fw-bold fs-4 mb-3">Filter Professionals by:</p>
                <div className="d-flex flex-wrap gap-x-4 gap-y-2">
                {filters.map((item) => (
                    <button 
                        key={item}
                        onClick={() => setActiveFilter(item)}
                        className={`btn btn-link text-decoration-none fw-bold fs-5 p-0 d-flex align-items-center ${activeFilter === item ? 'text-warning' : 'text-white'}`}
                    >
                    {item} 
                    <i className={`bi bi-chevron-${activeFilter === item ? 'down' : 'right'} ms-2 fs-6 opacity-75`}></i>
                    </button>
                ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SELECT DROPDOWN (ONLY SHOWS ON CLICK) */}
      {activeFilter && (
        <section className="container mt-5">
            <div className="p-1" style={{ border: `1px solid ${gtGold}` }}>
                <select className="form-select border-0 shadow-none fs-5 py-2 rounded-0 bg-light">
                    <option defaultValue>Select a {activeFilter}</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                </select>
            </div>
        </section>
      )}

      {/* 3. ALPHABET NAVIGATION (Redirects to [slug].js) */}
      <div className="container py-5 mt-4">
        <div className="d-flex justify-content-between overflow-auto pb-2 border-bottom">
          {alphabet.map((char) => (
            <button 
              key={char} 
              onClick={() => router.push(`/attorneys/${char.toLowerCase()}`)}
              className="btn btn-link text-decoration-none text-dark fw-bold fs-3 px-1 border-0" 
              style={{ fontFamily: 'serif', letterSpacing: '2px' }}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 4. STATS BOX */}
      <section className="container mb-5 shadow p-0 overflow-hidden">
        <div className="row g-0">
          <div className="col-md-4 p-5 text-center text-white" style={{ backgroundColor: gtBlue }}>
            <div className="display-2 fw-bold">51</div>
            <p className="h5 fw-normal">Offices Worldwide</p>
          </div>
          <div className="col-md-8 p-5 text-center text-white bg-dark">
             <div className="display-2 fw-bold">800+</div>
             <p className="h5 fw-normal">Chambers Rankings Globally</p>
          </div>
        </div>
      </section>

    </main>
  );
}