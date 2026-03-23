// import React, { useEffect, useState, useMemo } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import {
//   getAttorneylanguages,
//   getAllAttorneys,
//   getAllCapabilityCategories,
//   getAllLocationCities,
//   getAllAdmissions,
//   getAllEducations,
//   getImgUrl,
//   getAllProfessionals,
// } from "../../services/authService";

// export default function AttorneysPage() {
//   const router = useRouter();
//   const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

//   // --- Data States ---
//   const [attorneys, setAttorneys] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [admissions, setAdmissions] = useState([]);
//   const [educations, setEducations] = useState([]);
//   const [bannerData, setBannerData] = useState(null);

//   // --- Filter States ---
//   const [selectedLetter, setSelectedLetter] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchType, setSearchType] = useState("name");
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [filterValue, setFilterValue] = useState("");
//   const [limit, setLimit] = useState(5);

//   const gtGold = "#cfab4a";
//   const gtDark = "#1a1a1a";
//   const gtBlue = "#5baed5";

//   // Slug helpers...
//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/&/g, "and")
//       .replace(/[^a-z0-9 -]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-") || "";
//   const createNameSlug = (fname, lname) => {
//     if (!fname) return "";
//     const name = `${fname} ${lname || ""}`;
//     return name
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w\s-]/g, "")
//       .replace(/[\s_-]+/g, "-")
//       .replace(/^-+|-+$/g, "");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [attRes, catRes, cityRes, langRes, admRes, eduRes, profRes] =
//           await Promise.all([
//             getAllAttorneys(),
//             getAllCapabilityCategories(),
//             getAllLocationCities(),
//             getAttorneylanguages(),
//             getAllAdmissions(),
//             getAllEducations(),
//             getAllProfessionals(),
//           ]);
//         setAttorneys(attRes?.attorneys || attRes?.data || []);
//         setCategories(catRes?.data || []);
//         setCities(cityRes?.data || []);
//         setLanguages(langRes?.data?.data || langRes?.data || []);
//         setAdmissions(
//           (admRes?.data || admRes || []).filter((a) => a.admission !== null),
//         );
//         setEducations(
//           (eduRes?.data || eduRes || []).filter((e) => e.education !== null),
//         );

//         const profData = profRes?.data || profRes || [];
//         if (profData.length > 0) setBannerData(profData[0]);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//  const filteredAttorneys = useMemo(() => {
//    return attorneys.filter((attr) => {
//      // 1. Fix: Added .trim() to handle leading spaces in names like " Daniel "
//      const firstName = attr?.firstName?.trim() || "";
//      const lastName = attr?.lastName?.trim() || "";

//      const matchesLetter =
//        !selectedLetter ||
//        firstName.toUpperCase().startsWith(selectedLetter.toUpperCase());

//      const fullName = `${firstName} ${lastName}`.toLowerCase();

//      const matchesSearch =
//        searchQuery === "" ||
//        (searchType === "name"
//          ? fullName.includes(searchQuery.toLowerCase())
//          : fullName.includes(searchQuery.toLowerCase()) ||
//            (
//              cities.find((c) => String(c.id) === String(attr.city))?.cityName ||
//              ""
//            )
//              .toLowerCase()
//              .includes(searchQuery.toLowerCase()) ||
//            (
//              categories.find((c) => String(c.id) === String(attr.categoryId))
//                ?.categoryName || ""
//            )
//              .toLowerCase()
//              .includes(searchQuery.toLowerCase()));

//      const matchesDropdown =
//        !filterValue ||
//        (activeFilter === "Capability" &&
//          String(attr.categoryId) === String(filterValue)) ||
//        (activeFilter === "Location" &&
//          String(attr.city) === String(filterValue)) ||
//        (activeFilter === "Language" && attr.language === filterValue) ||
//        (activeFilter === "Admission" && attr.admission === filterValue) ||
//        (activeFilter === "Education" && attr.education === filterValue);

//      return matchesLetter && matchesSearch && matchesDropdown;
//    });
//  }, [
//    attorneys,
//    selectedLetter,
//    searchQuery,
//    searchType,
//    activeFilter,
//    filterValue,
//    cities,
//    categories,
//  ]);

//   return (
//     <main className="bg-white min-vh-100">
//       {/* 1. HERO SECTION (DYNAMIC FROM BACKEND) */}
//       <section
//         className="position-relative d-flex align-items-center justify-content-center text-center text-white"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${
//             getImgUrl(bannerData?.bannerImage) ||
//             "/assets/images/attorney-banner.jpg"
//           })`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "450px",
//         }}>
//         <div className="container">
//           {/* textEditor handling from backend */}
//           <div
//             className="banner-heading"
//             style={{
//               fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
//               fontWeight: "400",
//               fontFamily: "serif",
//               color: "white",
//             }}
//             dangerouslySetInnerHTML={{
//               __html: bannerData?.textEditor || bannerData?.texteditor,
//             }}
//           />
//         </div>
//       </section>

//       {/* 2. SEARCH & DYNAMIC FILTERS SECTION */}
//       <section style={{ backgroundColor: gtDark, overflow: "hidden" }}>
//         <div className="row g-0 flex-column flex-lg-row">
//           {/* Left Gold Search Section */}
//           <div
//             className="col-lg-6 py-5 px-4 px-md-5 position-relative"
//             style={{
//               backgroundColor: gtGold,
//               zIndex: 10,
//               clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
//             }}>
//             <div
//               style={{
//                 maxWidth: "500px",
//                 marginLeft: "auto",
//                 marginRight: "50px",
//               }}>
//               <div className="d-flex align-items-center border-bottom border-dark border-2 pb-1 mb-4">
//                 <input
//                   type="text"
//                   className="form-control bg-transparent border-0 fs-2 p-0 shadow-none custom-placeholder"
//                   placeholder="Search Professionals By Name"
//                   style={{ fontFamily: "serif", color: "#000" }}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <i className="bi bi-search fs-3 text-dark ms-2"></i>
//               </div>
//               <div className="d-flex gap-4">
//                 <label className="d-flex align-items-center cursor-pointer small fw-bold text-dark">
//                   <input
//                     type="radio"
//                     name="stype"
//                     className="me-2 accent-black"
//                     checked={searchType === "name"}
//                     onChange={() => setSearchType("name")}
//                   />
//                   Search By Name
//                 </label>
//                 <label className="d-flex align-items-center cursor-pointer small fw-bold text-dark">
//                   <input
//                     type="radio"
//                     name="stype"
//                     className="me-2 accent-black"
//                     checked={searchType === "keyword"}
//                     onChange={() => setSearchType("keyword")}
//                   />
//                   Search By Keyword
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Right Dark Filter Section (ALIGNED FIX) */}
//           <div
//             className="col-lg-6 py-5 px-4 px-md-5 text-white d-flex align-items-center"
//             style={{
//               backgroundColor: gtDark,
//               marginLeft: "-5%", // Margin reduced to pull content right
//               paddingLeft: "10%", // Balanced padding
//             }}>
//             <div className="w-100 ps-lg-4">
//               {" "}
//               {/* Added extra padding start for desktop */}
//               <p
//                 className="fw-normal mb-4 opacity-75"
//                 style={{ fontSize: "19px" }}>
//                 Filter Professionals by:
//               </p>
//               <div
//                 className="d-flex flex-wrap gap-x-5 gap-y-3"
//                 style={{ columnGap: "45px" }}>
//                 {[
//                   "Capability",
//                   "Location",
//                   "Admission",
//                   "Education",
//                   "Language",
//                 ].map((f) => (
//                   <div
//                     key={f}
//                     className={`cursor-pointer d-flex align-items-center ${activeFilter === f ? "text-warning" : "text-white"}`}
//                     style={{ fontSize: "18px", fontWeight: "500" }}
//                     onClick={() => {
//                       setActiveFilter(f);
//                       setFilterValue("");
//                     }}>
//                     <span>{f}</span>
//                     <i
//                       className="bi bi-chevron-right small ms-2"
//                       style={{ color: gtGold, fontWeight: "bold" }}></i>
//                   </div>
//                 ))}
//               </div>
//               {activeFilter && (
//                 <div
//                   className="mt-4 animate__animated animate__fadeIn"
//                   style={{ maxWidth: "380px" }}>
//                   <select
//                     className="form-select bg-dark text-white border-secondary rounded-0 shadow-none py-2"
//                     value={filterValue}
//                     onChange={(e) => setFilterValue(e.target.value)}>
//                     <option value="">Select {activeFilter}</option>
//                     {activeFilter === "Capability" &&
//                       categories.map((c) => (
//                         <option key={c.id} value={c.id}>
//                           {c.categoryName}
//                         </option>
//                       ))}
//                     {activeFilter === "Location" &&
//                       cities.map((city) => (
//                         <option key={city.id} value={city.id}>
//                           {city.cityName}
//                         </option>
//                       ))}
//                     {activeFilter === "Language" &&
//                       languages.map((l) => (
//                         <option key={l.code} value={l.code}>
//                           {l.name}
//                         </option>
//                       ))}
//                     {activeFilter === "Admission" &&
//                       admissions.map((a, i) => (
//                         <option key={i} value={a.admission}>
//                           {a.admission}
//                         </option>
//                       ))}
//                     {activeFilter === "Education" &&
//                       educations.map((e, i) => (
//                         <option key={i} value={e.education}>
//                           {e.education}
//                         </option>
//                       ))}
//                   </select>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. ALPHABET BAR */}
//       <div
//         className="bg-white border-bottom sticky-top shadow-sm"
//         style={{ top: "0", zIndex: 100 }}>
//         <div className="container py-3 d-flex justify-content-center overflow-auto">
//           {alphabet.map((char) => (
//             <button
//               key={char}
//               onClick={() => {
//                 setSelectedLetter(char);
//                 setLimit(5);
//               }}
//               className={`btn btn-link text-decoration-none fw-bold fs-4 px-2 ${selectedLetter === char ? "text-warning" : "text-dark"}`}
//               style={{ fontFamily: "serif" }}>
//               {char}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 4. RESULTS LIST - UPDATED IMAGE STYLE */}
//       {(selectedLetter || searchQuery || filterValue) && (
//         <section
//           className="py-5"
//           style={{ backgroundColor: "#111", minHeight: "600px" }}>
//           <div className="container">
//             {/* Results Header Bar */}
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-4 mb-5">
//               <div className="d-flex align-items-baseline">
//                 <h1
//                   className="text-white fw-light mb-0"
//                   style={{ fontFamily: "serif" }}>
//                   Results <span className="mx-2">—</span>{" "}
//                   <span className="fw-bold" style={{ fontSize: "3rem" }}>
//                     {filteredAttorneys.length}
//                   </span>
//                 </h1>
//               </div>

//               {/* Search Criteria (Dynamic) */}
//               <div className="text-center text-md-start my-3 my-md-0">
//                 <p
//                   className="small text-uppercase fw-bold text-white mb-1"
//                   style={{ letterSpacing: "1px", fontSize: "11px" }}>
//                   Search Criteria:
//                 </p>
//                 <span className="text-warning fw-bold">
//                   {selectedLetter || searchQuery || "All"}{" "}
//                   <span className="ms-1 text-white opacity-50">x</span>
//                 </span>
//               </div>

//               {/* Sort By Section */}
//               <div className="text-md-end">
//                 <p
//                   className="small text-uppercase fw-bold text-white mb-1"
//                   style={{ letterSpacing: "1px", fontSize: "11px" }}>
//                   Sort By:
//                 </p>
//                 <div className="small">
//                   <span className="cursor-pointer text-warning">Position</span>
//                   <span className="mx-2 text-white opacity-25">|</span>
//                   <span className="cursor-pointer text-warning fw-bold">
//                     Alphabetical
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Attorney Rows */}
//             <div className="row">
//               {filteredAttorneys.slice(0, limit).map((attr) => {
//                 const cityObj = cities.find(
//                   (c) => String(c.id) === String(attr.city),
//                 );
//                 const catObj = categories.find(
//                   (c) => String(c.id) === String(attr.categoryId),
//                 );
//                 const attorneySlug = createNameSlug(
//                   attr.firstName,
//                   attr.lastName,
//                 );

//                 return (
//                   <div
//                     key={attr.id}
//                     className="col-12 mb-2 border-bottom border-secondary border-opacity-10 pb-4 pt-4 result-row-hover">
//                     <div className="row g-4 position-relative">
//                       {/* Left: Image with no background (cut-out style) */}
//                       <div className="col-md-2 text-center">
//                         <Link href={`/attorneys/${attorneySlug}`}>
//                           <img
//                             src={getImgUrl(attr.profileImage)}
//                             className="img-fluid"
//                             style={{
//                               maxHeight: "220px",
//                               width: "auto",
//                               filter:
//                                 "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))",
//                               cursor: "pointer",
//                             }}
//                             alt={attr.firstName}
//                           />
//                         </Link>
//                       </div>

//                       {/* Center: Details */}
//                       <div className="col-md-7 ps-md-4 d-flex flex-column justify-content-center">
//                         <Link
//                           href={`/attorneys/${attorneySlug}`}
//                           className="text-decoration-none">
//                           <h4
//                             className="mb-1"
//                             style={{
//                               color: gtGold,
//                               fontFamily: "serif",
//                               fontSize: "2rem",
//                             }}>
//                             {attr.firstName} {attr.lastName}
//                           </h4>
//                         </Link>
//                         <p
//                           className="text-white text-uppercase fw-bold mb-3"
//                           style={{ fontSize: "10px", letterSpacing: "1.5px" }}>
//                           {attr.servicesOffered || "SHAREHOLDER"}
//                         </p>

//                         <div className="mt-2">
//                           <a
//                             href={`mailto:${attr.email}`}
//                             className="d-block text-decoration-none mb-1 fs-6"
//                             style={{ color: gtBlue }}>
//                             {attr.email}
//                           </a>
//                           {attr.phoneCell && (
//                             <div
//                               className="text-info mt-2 fs-6"
//                               style={{ opacity: 0.9 }}>
//                               {attr.phoneCell}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       {/* Right: Location & Capability Tag */}
//                       <div className="col-md-3 d-flex flex-column justify-content-between text-md-end pt-2">
//                         {/* Top Right: Location (Now Clickable) */}
//                         <div
//                           className="text-info small fw-bold text-uppercase"
//                           style={{ letterSpacing: "0.5px" }}>
//                           {cityObj ? (
//                             <Link
//                               href={`/location/${createSlug(cityObj.cityName)}`}>
//                               <a className="text-info text-decoration-none cursor-pointer hover-underline">
//                                 {cityObj.cityName}
//                               </a>
//                             </Link>
//                           ) : (
//                             "Global Office"
//                           )}
//                         </div>

//                         {/* Bottom Right: Tag with Blue Border */}
//                         <div className="mt-auto pb-2">
//                           <Link
//                             href={`/capability/${createSlug(catObj?.categoryName)}`}>
//                             <a
//                               className="d-inline-block px-3 py-2 text-white text-uppercase fw-bold text-decoration-none"
//                               style={{
//                                 fontSize: "11px",
//                                 border: `1.5px solid ${gtBlue}`,
//                                 letterSpacing: "1px",
//                               }}>
//                               {catObj?.categoryName ||
//                                 "ENTERTAINMENT, MEDIA & SPORTS"}
//                             </a>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination / Load More */}
//             {limit < filteredAttorneys.length && (
//               <div className="text-center mt-5">
//                 <button
//                   className="btn btn-outline-warning px-5 py-2 text-uppercase fw-bold rounded-0"
//                   onClick={() => setLimit(limit + 5)}
//                   style={{ letterSpacing: "1px" }}>
//                   Load More Results
//                 </button>
//               </div>
//             )}
//           </div>

//         </section>
//       )}

//       <style jsx>{`
//         .result-row-hover {
//           transition: background 0.3s ease;
//         }
//         .result-row-hover:hover {
//           background-color: #1a1a1a;
//         }
//         @media (max-width: 768px) {
//           .text-md-end {
//             text-align: left !important;
//           }
//           .mt-auto {
//             margin-top: 1.5rem !important;
//           }
//         }
//         .custom-placeholder::placeholder {
//           color: #000000 !important;
//           opacity: 1;
//         }
//         .accent-black {
//           accent-color: #000;
//           width: 18px;
//           height: 18px;
//         }
//         .cursor-pointer {
//           cursor: pointer;
//           transition: 0.2s;
//         }
//         .cursor-pointer:hover {
//           opacity: 0.7;
//         }

//         @media (max-width: 991px) {
//           section div.col-lg-6 {
//             clip-path: none !important;
//             margin-left: 0 !important;
//             padding: 2rem !important;
//           }
//           div[style*="marginLeft: -5%"] {
//             margin-left: 0 !important;
//             padding-left: 2rem !important;
//           }
//         }
//       `}</style>
//     </main>
//   );
// }
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  getAttorneylanguages,
  getAllAttorneys,
  getAllCapabilityCategories,
  getAllLocationCities,
  getAllAdmissions,
  getAllEducations,
  getImgUrl,
  getAllProfessionals,
} from "../../services/authService";

export default function AttorneysPage() {
  const router = useRouter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // --- Data States ---
  const [attorneys, setAttorneys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [bannerData, setBannerData] = useState(null);

  // --- Filter States ---
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(5);

  // Slug helpers - UNCHANGED
  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "";

  const createNameSlug = (fname, lname) => {
    if (!fname) return "";
    const name = `${fname} ${lname || ""}`;
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, catRes, cityRes, langRes, admRes, eduRes, profRes] =
          await Promise.all([
            getAllAttorneys(),
            getAllCapabilityCategories(),
            getAllLocationCities(),
            getAttorneylanguages(),
            getAllAdmissions(),
            getAllEducations(),
            getAllProfessionals(),
          ]);
        setAttorneys(attRes?.attorneys || attRes?.data || []);
        setCategories(catRes?.data || []);
        setCities(cityRes?.data || []);
        setLanguages(langRes?.data?.data || langRes?.data || []);
        setAdmissions(
          (admRes?.data || admRes || []).filter((a) => a.admission !== null),
        );
        setEducations(
          (eduRes?.data || eduRes || []).filter((e) => e.education !== null),
        );
        const profData = profRes?.data || profRes || [];
        if (profData.length > 0) setBannerData(profData[0]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredAttorneys = useMemo(() => {
    return attorneys.filter((attr) => {
      const firstName = attr?.firstName?.trim() || "";
      const lastName = attr?.lastName?.trim() || "";
      const matchesLetter =
        !selectedLetter ||
        firstName.toUpperCase().startsWith(selectedLetter.toUpperCase());
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        (searchType === "name"
          ? fullName.includes(searchQuery.toLowerCase())
          : fullName.includes(searchQuery.toLowerCase()) ||
            (
              cities.find((c) => String(c.id) === String(attr.city))
                ?.cityName || ""
            )
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (
              categories.find((c) => String(c.id) === String(attr.categoryId))
                ?.categoryName || ""
            )
              .toLowerCase()
              .includes(searchQuery.toLowerCase()));

      const matchesDropdown =
        !filterValue ||
        (activeFilter === "Capability" &&
          String(attr.categoryId) === String(filterValue)) ||
        (activeFilter === "Location" &&
          String(attr.city) === String(filterValue)) ||
        (activeFilter === "Language" && attr.language === filterValue) ||
        (activeFilter === "Admission" && attr.admission === filterValue) ||
        (activeFilter === "Education" && attr.education === filterValue);

      return matchesLetter && matchesSearch && matchesDropdown;
    });
  }, [
    attorneys,
    selectedLetter,
    searchQuery,
    searchType,
    activeFilter,
    filterValue,
    cities,
    categories,
  ]);

  return (
    <main className="bg-white min-vh-100 mt-5 pt-3">
      {/* 1. HERO SECTION - Using Global .universal-banner */}
      <section
        className="universal-banner"
        style={{
          backgroundImage: `url(${getImgUrl(bannerData?.bannerImage) || "/assets/images/attorney-banner.jpg"})`,
        }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content text-center">
          <div
            className="font-serif text-white display-2 fw-bold"
            dangerouslySetInnerHTML={{
              __html: bannerData?.textEditor || bannerData?.texteditor,
            }}
          />
        </div>
      </section>

      {/* 2. SEARCH & DYNAMIC FILTERS SECTION */}
      <section className="bg-dark overflow-hidden">
        <div className="row g-0">
          {/* Left Side: Using Global .capability-search-bar (Gold) */}
          <div className="col-lg-6 py-5 px-4 px-md-5 capability-search-bar">
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
              <div className="d-flex align-items-center border-bottom border-dark border-2 pb-1 mb-4">
                <input
                  type="text"
                  className="form-control bg-transparent border-0 fs-2 p-0 shadow-none font-serif text-dark"
                  placeholder="Search Professionals By Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="bi bi-search fs-3 text-dark ms-2"></i>
              </div>
              <div className="d-flex gap-4">
                <label className="d-flex align-items-center cursor-pointer small fw-bold text-dark">
                  <input
                    type="radio"
                    name="stype"
                    className="me-2"
                    checked={searchType === "name"}
                    onChange={() => setSearchType("name")}
                  />
                  Search By Name
                </label>
                <label className="d-flex align-items-center cursor-pointer small fw-bold text-dark">
                  <input
                    type="radio"
                    name="stype"
                    className="me-2"
                    checked={searchType === "keyword"}
                    onChange={() => setSearchType("keyword")}
                  />
                  Search By Keyword
                </label>
              </div>
            </div>
          </div>

          {/* Right Side: Dark Filter Section */}
          <div className="col-lg-6 py-5 px-4 px-md-5 text-white d-flex align-items-center bg-dark">
            <div className="w-100 ps-lg-4">
              <p className="fw-normal mb-4 opacity-75 fs-5">
                Filter Professionals by:
              </p>
              <div className="d-flex flex-wrap gap-4">
                {[
                  "Capability",
                  "Location",
                  "Admission",
                  "Education",
                  "Language",
                ].map((f) => (
                  <div
                    key={f}
                    className={`cursor-pointer d-flex align-items-center fs-5 fw-bold ${activeFilter === f ? "text-gold" : "text-white"}`}
                    onClick={() => {
                      setActiveFilter(f);
                      setFilterValue("");
                    }}>
                    <span>{f}</span>
                    <i className="bi bi-chevron-right small ms-2 text-gold"></i>
                  </div>
                ))}
              </div>
              {activeFilter && (
                <div className="mt-4" style={{ maxWidth: "380px" }}>
                  <select
                    className="form-select bg-dark text-white border-secondary rounded-0 shadow-none py-2"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}>
                    <option value="">Select {activeFilter}</option>
                    {activeFilter === "Capability" &&
                      categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.categoryName}
                        </option>
                      ))}
                    {activeFilter === "Location" &&
                      cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    {activeFilter === "Language" &&
                      languages.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.name}
                        </option>
                      ))}
                    {activeFilter === "Admission" &&
                      admissions.map((a, i) => (
                        <option key={i} value={a.admission}>
                          {a.admission}
                        </option>
                      ))}
                    {activeFilter === "Education" &&
                      educations.map((e, i) => (
                        <option key={i} value={e.education}>
                          {e.education}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALPHABET BAR */}
      <div
        className="bg-white border-bottom sticky-top shadow-sm"
        style={{ zIndex: 1000, top: "60px" }}>
        <div className="container py-3 d-flex justify-content-center overflow-auto">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => {
                setSelectedLetter(char);
                setLimit(5);
              }}
              className={`btn btn-link text-decoration-none fw-bold fs-4 px-2 font-serif ${selectedLetter === char ? "text-gold" : "text-dark"}`}>
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* 4. RESULTS LIST */}
      {(selectedLetter || searchQuery || filterValue) && (
        <section className="py-5 bg-dark">
          <div className="container">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-4 mb-5">
              <div className="d-flex align-items-baseline">
                <h1 className="text-white fw-light mb-0 font-serif">
                  Results <span className="mx-2">—</span>{" "}
                  <span className="fw-bold display-3">
                    {filteredAttorneys.length}
                  </span>
                </h1>
              </div>
              <div className="text-center text-md-start my-3 my-md-0">
                <p className="small text-uppercase fw-bold text-white mb-1 tracking-wider">
                  Search Criteria:
                </p>
                <span className="text-gold fw-bold">
                  {selectedLetter || searchQuery || "All"}
                </span>
              </div>
              <div className="text-md-end text-white">
                <p className="small text-uppercase fw-bold mb-1 tracking-wider">
                  Sort By:
                </p>
                <div className="small">
                  <span className="text-gold cursor-pointer">Alphabetical</span>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="row">
              {filteredAttorneys.slice(0, limit).map((attr) => {
                const cityObj = cities.find(
                  (c) => String(c.id) === String(attr.city),
                );
                const catObj = categories.find(
                  (c) => String(c.id) === String(attr.categoryId),
                );
                const attorneySlug = createNameSlug(
                  attr.firstName,
                  attr.lastName,
                );

                return (
                  <div
                    key={attr.id}
                    className="col-12 mb-2 border-bottom border-secondary border-opacity-10 pb-4 pt-4">
                    <div className="row g-4 align-items-center">
                      <div className="col-md-2 text-center">
                        <Link href={`/attorneys/${attorneySlug}`}>
                          <img
                            src={getImgUrl(attr.profileImage)}
                            className="img-fluid rounded shadow-sm"
                            style={{ maxHeight: "200px" }}
                            alt={attr.firstName}
                          />
                        </Link>
                      </div>
                      <div className="col-md-7 ps-md-4">
                        <Link
                          href={`/attorneys/${attorneySlug}`}
                          className="text-decoration-none">
                          <h4 className="mb-1 text-gold font-serif display-6">
                            {attr.firstName} {attr.lastName}
                          </h4>
                        </Link>
                        <p className="text-white text-uppercase fw-bold mb-3 small tracking-wider">
                          {attr.servicesOffered || "SHAREHOLDER"}
                        </p>
                        <div className="mt-2">
                          <a
                            href={`mailto:${attr.email}`}
                            className="text-white text-decoration-none d-block mb-1">
                            {attr.email}
                          </a>
                          {attr.phoneCell && (
                            <div className="text-gold small">
                              {attr.phoneCell}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3 text-md-end">
                        <div className="text-white small fw-bold text-uppercase mb-3">
                          {cityObj ? cityObj.cityName : "Global Office"}
                        </div>
                        <Link
                          href={`/capability/${createSlug(catObj?.categoryName)}`}
                          className="btn btn-outline-light btn-sm rounded-0 text-uppercase fw-bold">
                          {catObj?.categoryName || "Expertise"}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {limit < filteredAttorneys.length && (
              <div className="text-center mt-5">
                <button
                  className="btn btn-gold-custom text-uppercase"
                  onClick={() => setLimit(limit + 5)}>
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}