// // // import React, { useState, useEffect } from "react";
// // // import { useRouter } from "next/router";
// // // import { getAllAwards, IMG_URL } from "../../services/authService";

// // // function AwardsList() {
// // //   const router = useRouter();
// // //   const [allAwards, setAllAwards] = useState([]);
// // //   const [filteredData, setFilteredData] = useState([]);
// // //   const [uniqueYears, setUniqueYears] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [filters, setFilters] = useState({
// // //     presenter: "",
// // //     recipient: "",
// // //     year: "",
// // //   });

// // //   // Slug generator function
// // //   const createSlug = (text) => {
// // //     return text
// // //       .toLowerCase()
// // //       .trim()
// // //       .replace(/[^\w ]+/g, "")
// // //       .replace(/ +/g, "-");
// // //   };

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await getAllAwards();
// // //         if (res?.success) {
// // //           const data = res.data || [];
// // //           setAllAwards(data);
// // //           setFilteredData(data);
// // //           const years = data
// // //             .map((item) => item.year)
// // //             .filter((y) => y)
// // //             .sort((a, b) => b - a);
// // //           setUniqueYears([...new Set(years)]);
// // //         }
// // //       } catch (error) {
// // //         console.error(error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, []);

// // //   const handleSearch = (e) => {
// // //     if (e) e.preventDefault();
// // //     const results = allAwards.filter((item) => {
// // //       const matchP = (item.organization || "")
// // //         .toLowerCase()
// // //         .includes(filters.presenter.toLowerCase());
// // //       const matchR = (item.personName || "")
// // //         .toLowerCase()
// // //         .includes(filters.recipient.toLowerCase());
// // //       const matchY =
// // //         filters.year === ""
// // //           ? true
// // //           : (item.year || "").toString() === filters.year;
// // //       return matchP && matchR && matchY;
// // //     });
// // //     setFilteredData(results);
// // //   };

// // //   if (loading)
// // //     return <div className="text-center py-5 my-5 fw-bold fs-4">Loading...</div>;

// // //   const listBanner =
// // //     allAwards.length > 0 && allAwards[0].bannerImage
// // //       ? `${IMG_URL}/${allAwards[0].bannerImage}`
// // //       : "/assets/images/our-firm4.png";

// // //   return (
// // //     <div className="bg-light min-vh-100">
// // //       {/* List Banner */}
// // //       <div
// // //         className="position-relative d-flex align-items-center justify-content-center text-center py-5"
// // //         style={{
// // //           minHeight: "350px",
// // //           backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${listBanner}')`,
// // //           backgroundSize: "cover",
// // //           backgroundPosition: "center",
// // //         }}>
// // //         <div className="container position-relative" style={{ zIndex: 2 }}>
// // //           <h1
// // //             className="text-white mb-2 fw-bold display-4"
// // //             style={{ fontFamily: "serif" }}>
// // //             Awards & Accolades
// // //           </h1>
// // //           <p
// // //             className="text-uppercase fw-bold m-0"
// // //             style={{ color: "#de9f57", letterSpacing: "2px" }}>
// // //             Excellence in Legal Practice
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="container py-5">
// // //         {/* Filter Card */}
// // //         <div className="card shadow-sm border-0 mb-5 p-3">
// // //           <form onSubmit={handleSearch} className="row g-3">
// // //             <div className="col-md-3">
// // //               <label className="small fw-bold text-secondary">
// // //                 Organization
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control shadow-none"
// // //                 placeholder="Search Org..."
// // //                 value={filters.presenter}
// // //                 onChange={(e) =>
// // //                   setFilters({ ...filters, presenter: e.target.value })
// // //                 }
// // //               />
// // //             </div>
// // //             <div className="col-md-3">
// // //               <label className="small fw-bold text-secondary">Recipient</label>
// // //               <input
// // //                 type="text"
// // //                 className="form-control shadow-none"
// // //                 placeholder="Search Name..."
// // //                 value={filters.recipient}
// // //                 onChange={(e) =>
// // //                   setFilters({ ...filters, recipient: e.target.value })
// // //                 }
// // //               />
// // //             </div>
// // //             <div className="col-md-3">
// // //               <label className="small fw-bold text-secondary">Year</label>
// // //               <select
// // //                 className="form-select shadow-none"
// // //                 value={filters.year}
// // //                 onChange={(e) =>
// // //                   setFilters({ ...filters, year: e.target.value })
// // //                 }>
// // //                 <option value="">All Years</option>
// // //                 {uniqueYears.map((y, i) => (
// // //                   <option key={i} value={y}>
// // //                     {y}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //             </div>
// // //             <div className="col-md-3 d-flex align-items-end gap-2">
// // //               <button
// // //                 type="submit"
// // //                 className="btn text-white w-100 fw-bold shadow-sm"
// // //                 style={{ backgroundColor: "#003366" }}>
// // //                 SEARCH
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => {
// // //                   setFilters({ presenter: "", recipient: "", year: "" });
// // //                   setFilteredData(allAwards);
// // //                 }}
// // //                 className="btn btn-outline-secondary w-100">
// // //                 RESET
// // //               </button>
// // //             </div>
// // //           </form>
// // //         </div>

// // //         {/* Table List */}
// // //         <div className="table-responsive shadow-sm bg-white rounded">
// // //           <table className="table table-hover align-middle mb-0">
// // //             <thead
// // //               className="text-white text-uppercase small"
// // //               style={{ backgroundColor: "#003366" }}>
// // //               <tr>
// // //                 <th className="py-3 ps-4">Year</th>
// // //                 <th className="py-3">Issuing Body</th>
// // //                 <th className="py-3">Recognition Title</th>
// // //                 <th className="py-3 text-center">Action</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {filteredData.map((row) => (
// // //                 <tr key={row.id}>
// // //                   <td
// // //                     className="ps-4 fw-bold fs-5"
// // //                     style={{ color: "#003366", fontFamily: "serif" }}>
// // //                     {row.year}
// // //                   </td>
// // //                   <td className="fw-semibold">{row.organization}</td>
// // //                   <td>{row.awardTitle}</td>
// // //                   <td className="text-center">
// // //                     <button
// // //                       onClick={() =>
// // //                         router.push(`/award/${createSlug(row.awardTitle)}`)
// // //                       }
// // //                       className="btn btn-outline-dark btn-sm px-4 fw-bold rounded-0">
// // //                       VIEW
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default AwardsList;

// // import React, { useState, useEffect } from "react";
// // import { useRouter } from "next/router";
// // import { getAllAwards, IMG_URL } from "../../services/authService";

// // function AwardsAccolades() {
// //   const router = useRouter();
// //   const [allAwards, setAllAwards] = useState([]);
// //   const [filteredData, setFilteredData] = useState([]);
// //   const [uniqueYears, setUniqueYears] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [filters, setFilters] = useState({
// //     presenter: "",
// //     recipient: "",
// //     year: "",
// //   });

// //   const createSlug = (text) => {
// //     if (!text) return "";
// //     return text
// //       .toLowerCase()
// //       .trim()
// //       .replace(/[^\w ]+/g, "")
// //       .replace(/ +/g, "-");
// //   };

// //   const stripHtml = (html) => {
// //     if (!html) return "";
// //     // 1. Tags hatane ke liye (Regex)
// //     let text = html.replace(/<[^>]*>?/gm, "");

// //     // 2. HTML Entities (&nbsp;, &amp; etc) ko decode karne ke liye
// //     if (typeof window !== "undefined") {
// //       const doc = new DOMParser().parseFromString(text, "text/html");
// //       return doc.body.textContent || "";
// //     }
// //     return text;
// //   };
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await getAllAwards();
// //         if (res && res.success) {
// //           const data = res.data || [];
// //           setAllAwards(data);
// //           setFilteredData(data);

// //           const years = data
// //             .map((item) => item.year)
// //             .filter((year) => year)
// //             .sort((a, b) => b - a);

// //           const uniqueY = [...new Set(years)];
// //           setUniqueYears(uniqueY);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching awards:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFilters({ ...filters, [name]: value });
// //   };

// //   const handleSearch = (e) => {
// //     if (e) e.preventDefault();
// //     const results = allAwards.filter((item) => {
// //       const matchPresenter = (item.organization || "")
// //         .toLowerCase()
// //         .includes(filters.presenter.toLowerCase().trim());
// //       const matchRecipient = (item.personName || "")
// //         .toLowerCase()
// //         .includes(filters.recipient.toLowerCase().trim());
// //       const matchYear =
// //         filters.year === ""
// //           ? true
// //           : (item.year || "").toString() === filters.year;
// //       return matchPresenter && matchRecipient && matchYear;
// //     });
// //     setFilteredData(results);
// //   };

// //   const handleReset = () => {
// //     setFilters({ presenter: "", recipient: "", year: "" });
// //     setFilteredData(allAwards);
// //   };

// //   if (loading)
// //     return <div className="p-5 text-center fw-bold">Loading Awards...</div>;

// //   const bannerImg =
// //     allAwards.length > 0 && allAwards[0].bannerImage
// //       ? `${IMG_URL}/${allAwards[0].bannerImage}`
// //       : "/assets/images/our-firm4.png";

// //   return (
// //     <div className="bg-light min-vh-100">
// //       <div
// //         className="inner-banner-section"
// //         style={{
// //           backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${bannerImg}')`,
// //           padding: "100px 0",
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           textAlign: "center",
// //         }}>
// //         <div className="container">
// //           <h1 className="text-white display-4 fw-bold">Awards & Accolades</h1>
// //           <p className="text-white lead">
// //             Recognizing Excellence in Legal Practice
// //           </p>
// //         </div>
// //       </div>

// //       <div className="container py-5">
// //         <div className="card shadow-sm border-0 mb-5 p-4">
// //           <form onSubmit={handleSearch}>
// //             <div className="row g-3">
// //               <div className="col-md-3">
// //                 <label className="form-label fw-bold small text-muted">
// //                   Organization
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   name="presenter"
// //                   value={filters.presenter}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="col-md-3">
// //                 <label className="form-label fw-bold small text-muted">
// //                   Person Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   className="form-control"
// //                   name="recipient"
// //                   value={filters.recipient}
// //                   onChange={handleInputChange}
// //                 />
// //               </div>
// //               <div className="col-md-3">
// //                 <label className="form-label fw-bold small text-muted">
// //                   Year
// //                 </label>
// //                 <select
// //                   className="form-select"
// //                   name="year"
// //                   value={filters.year}
// //                   onChange={handleInputChange}>
// //                   <option value="">All Years</option>
// //                   {uniqueYears.map((year, index) => (
// //                     <option key={index} value={year}>
// //                       {year}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //               <div className="col-md-3 d-flex align-items-end">
// //                 <button type="submit" className="btn btn-dark w-50 me-2">
// //                   Search
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={handleReset}
// //                   className="btn btn-outline-secondary w-50">
// //                   Reset
// //                 </button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>

// //         <div className="table-responsive shadow-sm rounded bg-white">
// //           <table className="table table-hover align-middle mb-0 border">
// //             <thead
// //               className="text-white"
// //               style={{ backgroundColor: "#0a1c38" }}>
// //               <tr>
// //                 <th className="py-3 ps-3">Year</th>
// //                 <th className="py-3">Organization</th>
// //                 <th className="py-3">Award Title</th>
// //                 <th className="py-3">Recipient</th>
// //                 <th className="py-3">Summary</th>
// //                 <th className="py-3 text-center">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredData.length > 0 ? (
// //                 filteredData.map((row) => (
// //                   <tr key={row.id}>
// //                     <td className="ps-3 fw-bold text-primary">{row.year}</td>
// //                     <td>{row.organization}</td>
// //                     <td>
// //                       <span className="badge bg-light text-dark border p-2">
// //                         {row.awardTitle}
// //                       </span>
// //                     </td>
// //                     <td>{row.personName}</td>
// //                     <td className="small text-muted">
// //                       <div
// //                         className="text-truncate"
// //                         style={{ maxWidth: "250px" }}>
// //                         {/* Is line ko change karein */}
// //                         {stripHtml(row.details)}
// //                       </div>
// //                     </td>
// //                     <td className="text-center">
// //                       <button
// //                         className="btn btn-sm btn-outline-dark px-3 fw-bold rounded-0"
// //                         onClick={() =>
// //                           router.push(`/award/${createSlug(row.awardTitle)}`)
// //                         }>
// //                         VIEW
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="6" className="text-center py-5">
// //                     No records found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AwardsAccolades;

// import React, { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/router";
// import * as authService from "../../services/authService"; // Using * to avoid undefined errors

// function AwardsAccolades() {
//   const router = useRouter();
//   const [allAwards, setAllAwards] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [uniqueYears, setUniqueYears] = useState([]);

//   // Custom Dropdown States
//   const [orgSuggestions, setOrgSuggestions] = useState([]);
//   const [nameSuggestions, setNameSuggestions] = useState([]);
//   const [showOrgList, setShowOrgList] = useState(false);
//   const [showNameList, setShowNameList] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     presenter: "",
//     recipient: "",
//     year: "",
//   });

//   const orgRef = useRef(null);
//   const nameRef = useRef(null);

//   // HTML Entities (&nbsp; etc) ko saaf karne ka sahi tarika
//   const stripHtml = (html) => {
//     if (!html) return "";
//     if (typeof window !== "undefined") {
//       const doc = new DOMParser().parseFromString(html, "text/html");
//       const plainText = doc.body.textContent || "";
//       // &nbsp; ko normal space se replace karna aur extra spaces hatana
//       return plainText
//         .replace(/\u00a0/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
//     }
//     return html.replace(/<[^>]*>?/gm, "");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await authService.getAllAwards();
//         if (res && res.success) {
//           const data = res.data || [];
//           setAllAwards(data);
//           setFilteredData(data);
//           setUniqueYears([
//             ...new Set(
//               data
//                 .map((item) => item.year)
//                 .filter((y) => y)
//                 .sort((a, b) => b - a),
//             ),
//           ]);
//           setOrgSuggestions([
//             ...new Set(data.map((item) => item.organization).filter((o) => o)),
//           ]);
//           setNameSuggestions([
//             ...new Set(data.map((item) => item.personName).filter((n) => n)),
//           ]);
//         }
//       } catch (error) {
//         console.error("Error fetching awards:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();

//     const handleClickOutside = (event) => {
//       if (orgRef.current && !orgRef.current.contains(event.target))
//         setShowOrgList(false);
//       if (nameRef.current && !nameRef.current.contains(event.target))
//         setShowNameList(false);
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//     if (name === "presenter") setShowOrgList(true);
//     if (name === "recipient") setShowNameList(true);
//   };

//   const selectSuggestion = (name, value) => {
//     setFilters({ ...filters, [name]: value });
//     setShowOrgList(false);
//     setShowNameList(false);
//   };

//   const handleSearch = (e) => {
//     if (e) e.preventDefault();
//     const results = allAwards.filter((item) => {
//       const matchPresenter = (item.organization || "")
//         .toLowerCase()
//         .includes(filters.presenter.toLowerCase().trim());
//       const matchRecipient = (item.personName || "")
//         .toLowerCase()
//         .includes(filters.recipient.toLowerCase().trim());
//       const matchYear =
//         filters.year === ""
//           ? true
//           : (item.year || "").toString() === filters.year;
//       return matchPresenter && matchRecipient && matchYear;
//     });
//     setFilteredData(results);
//     setShowOrgList(false);
//     setShowNameList(false);
//   };

//   const handleReset = () => {
//     setFilters({ presenter: "", recipient: "", year: "" });
//     setFilteredData(allAwards);
//   };

//   const createSlug = (text) => {
//     if (!text) return "";
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w ]+/g, "")
//       .replace(/ +/g, "-");
//   };

//   if (loading)
//     return <div className="p-5 text-center fw-bold">Loading Awards...</div>;

//   const bannerImg =
//     allAwards.length > 0 && allAwards[0].bannerImage
//       ? `${authService.IMG_URL}/${allAwards[0].bannerImage}`
//       : "/assets/images/our-firm4.png";

//   return (
//     <div className="bg-light min-vh-100">
//       {/* BANNER SECTION - Fixed to not cut the image */}
//       <div
//         className="inner-banner-section"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${bannerImg}')`,
//           padding: "120px 0",
//           backgroundSize: "100% 100%", // Puri image fit karne ke liye
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           textAlign: "center",
//           minHeight: "350px",
//           display: "flex",
//           alignItems: "center",
//         }}>
//         <div className="container w-100">
//           <h1 className="text-white display-4 fw-bold">Awards & Accolades</h1>
//           <p className="text-white lead">
//             Recognizing Excellence in Legal Practice
//           </p>
//         </div>
//       </div>

//       <div className="container py-5">
//         {/* Search Bar with Custom Dropdowns */}
//         <div
//           className="card shadow-sm border-0 mb-5 p-4"
//           style={{ overflow: "visible" }}>
//           <form onSubmit={handleSearch}>
//             <div className="row g-3">
//               <div className="col-md-3 position-relative" ref={orgRef}>
//                 <label className="form-label fw-bold small text-muted">
//                   Organization
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="presenter"
//                   value={filters.presenter}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowOrgList(true)}
//                   autoComplete="off"
//                   placeholder="Type to search..."
//                 />
//                 {showOrgList && filters.presenter && (
//                   <ul
//                     className="list-group position-absolute w-100 shadow"
//                     style={{
//                       zIndex: 1000,
//                       maxHeight: "200px",
//                       overflowY: "auto",
//                     }}>
//                     {orgSuggestions
//                       .filter((o) =>
//                         o
//                           .toLowerCase()
//                           .includes(filters.presenter.toLowerCase()),
//                       )
//                       .map((org, i) => (
//                         <li
//                           key={i}
//                           className="list-group-item list-group-item-action small"
//                           style={{ cursor: "pointer" }}
//                           onClick={() => selectSuggestion("presenter", org)}>
//                           {org}
//                         </li>
//                       ))}
//                   </ul>
//                 )}
//               </div>

//               <div className="col-md-3 position-relative" ref={nameRef}>
//                 <label className="form-label fw-bold small text-muted">
//                   Person Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   name="recipient"
//                   value={filters.recipient}
//                   onChange={handleInputChange}
//                   onFocus={() => setShowNameList(true)}
//                   autoComplete="off"
//                   placeholder="Type to search..."
//                 />
//                 {showNameList && filters.recipient && (
//                   <ul
//                     className="list-group position-absolute w-100 shadow"
//                     style={{
//                       zIndex: 1000,
//                       maxHeight: "200px",
//                       overflowY: "auto",
//                     }}>
//                     {nameSuggestions
//                       .filter((n) =>
//                         n
//                           .toLowerCase()
//                           .includes(filters.recipient.toLowerCase()),
//                       )
//                       .map((name, i) => (
//                         <li
//                           key={i}
//                           className="list-group-item list-group-item-action small"
//                           style={{ cursor: "pointer" }}
//                           onClick={() => selectSuggestion("recipient", name)}>
//                           {name}
//                         </li>
//                       ))}
//                   </ul>
//                 )}
//               </div>

//               <div className="col-md-3">
//                 <label className="form-label fw-bold small text-muted">
//                   Year
//                 </label>
//                 <select
//                   className="form-select"
//                   name="year"
//                   value={filters.year}
//                   onChange={handleInputChange}>
//                   <option value="">All Years</option>
//                   {uniqueYears.map((year, index) => (
//                     <option key={index} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="col-md-3 d-flex align-items-end">
//                 <button type="submit" className="btn btn-dark w-50 me-2">
//                   Search
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleReset}
//                   className="btn btn-outline-secondary w-50">
//                   Reset
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>

//         {/* Table Section */}
//         <div className="table-responsive shadow-sm rounded bg-white">
//           <table className="table table-hover align-middle mb-0 border">
//             <thead
//               className="text-white"
//               style={{ backgroundColor: "#0a1c38" }}>
//               <tr>
//                 <th className="py-3 ps-3">Year</th>
//                 <th className="py-3">Organization</th>
//                 <th className="py-3">Award Title</th>
//                 <th className="py-3">Recipient</th>
//                 <th className="py-3">Summary</th>
//                 <th className="py-3 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((row) => (
//                   <tr key={row.id}>
//                     <td className="ps-3 fw-bold text-primary">{row.year}</td>
//                     <td>{row.organization}</td>
//                     <td>
//                       <span className="badge bg-light text-dark border p-2">
//                         {row.awardTitle}
//                       </span>
//                     </td>
//                     <td>{row.personName}</td>
//                     <td className="small text-muted">
//                       <div
//                         className="text-truncate"
//                         style={{ maxWidth: "250px" }}>
//                         {/* CLEAN ENGLISH TEXT HERE */}
//                         {stripHtml(row.details)}
//                       </div>
//                     </td>
//                     <td className="text-center">
//                       <button
//                         className="btn btn-sm btn-outline-dark px-3 fw-bold rounded-0"
//                         onClick={() =>
//                           router.push(`/award/${createSlug(row.awardTitle)}`)
//                         }>
//                         VIEW
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="text-center py-5">
//                     No records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AwardsAccolades;

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import * as authService from "../../services/authService";

function AwardsAccolades() {
  const router = useRouter();
  const [allAwards, setAllAwards] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueYears, setUniqueYears] = useState([]);

  const [orgSuggestions, setOrgSuggestions] = useState([]);
  const [nameSuggestions, setNameSuggestions] = useState([]);
  const [showOrgList, setShowOrgList] = useState(false);
  const [showNameList, setShowNameList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    presenter: "",
    recipient: "",
    year: "",
  });

  const orgRef = useRef(null);
  const nameRef = useRef(null);

  const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const plainText = doc.body.textContent || "";
      return plainText
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }
    return html.replace(/<[^>]*>?/gm, "");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await authService.getAllAwards();
        if (res && res.success) {
          const data = res.data || [];
          setAllAwards(data);
          setFilteredData(data);
          setUniqueYears([
            ...new Set(
              data
                .map((item) => item.year)
                .filter((y) => y)
                .sort((a, b) => b - a),
            ),
          ]);
          setOrgSuggestions([
            ...new Set(data.map((item) => item.organization).filter((o) => o)),
          ]);
          setNameSuggestions([
            ...new Set(data.map((item) => item.personName).filter((n) => n)),
          ]);
        }
      } catch (error) {
        console.error("Error fetching awards:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const handleClickOutside = (event) => {
      if (orgRef.current && !orgRef.current.contains(event.target))
        setShowOrgList(false);
      if (nameRef.current && !nameRef.current.contains(event.target))
        setShowNameList(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    if (name === "presenter") setShowOrgList(true);
    if (name === "recipient") setShowNameList(true);
  };

  const selectSuggestion = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setShowOrgList(false);
    setShowNameList(false);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const results = allAwards.filter((item) => {
      const matchPresenter = (item.organization || "")
        .toLowerCase()
        .includes(filters.presenter.toLowerCase().trim());
      const matchRecipient = (item.personName || "")
        .toLowerCase()
        .includes(filters.recipient.toLowerCase().trim());
      const matchYear =
        filters.year === ""
          ? true
          : (item.year || "").toString() === filters.year;
      return matchPresenter && matchRecipient && matchYear;
    });
    setFilteredData(results);
    setShowOrgList(false);
    setShowNameList(false);
  };

  const handleReset = () => {
    setFilters({ presenter: "", recipient: "", year: "" });
    setFilteredData(allAwards);
  };

  const createSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  if (loading)
    return <div className="p-5 text-center fw-bold">Loading Awards...</div>;

  const bannerImg =
    allAwards.length > 0 && allAwards[0].bannerImage
      ? `${authService.IMG_URL}/${allAwards[0].bannerImage}`
      : "/assets/images/our-firm4.png";

  return (
    <div className="bg-light-gray min-vh-100">
      {/* Dynamic Banner Section */}
      <div
        className="universal-banner"
        style={{ backgroundImage: `url('${bannerImg}')` }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content">
          <h1 className="text-white display-4">Awards & Accolades</h1>
          <p className="text-white lead">
            Recognizing Excellence in Legal Practice
          </p>
        </div>
      </div>

      <div className="container py-5">
        {/* Responsive Search Bar */}
        <div className="card shadow-sm border-0 mb-5 p-4 overflow-visible">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-3 position-relative" ref={orgRef}>
                <label className="form-label fw-bold small text-muted">
                  Organization
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="presenter"
                  value={filters.presenter}
                  onChange={handleInputChange}
                  onFocus={() => setShowOrgList(true)}
                  autoComplete="off"
                  placeholder="Type to search..."
                />
                {showOrgList && filters.presenter && (
                  <ul className="list-group position-absolute shadow suggestion-list">
                    {orgSuggestions
                      .filter((o) =>
                        o
                          .toLowerCase()
                          .includes(filters.presenter.toLowerCase()),
                      )
                      .map((org, i) => (
                        <li
                          key={i}
                          className="list-group-item list-group-item-action small cursor-pointer"
                          onClick={() => selectSuggestion("presenter", org)}>
                          {org}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div className="col-md-3 position-relative" ref={nameRef}>
                <label className="form-label fw-bold small text-muted">
                  Person Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="recipient"
                  value={filters.recipient}
                  onChange={handleInputChange}
                  onFocus={() => setShowNameList(true)}
                  autoComplete="off"
                  placeholder="Type to search..."
                />
                {showNameList && filters.recipient && (
                  <ul className="list-group position-absolute shadow suggestion-list">
                    {nameSuggestions
                      .filter((n) =>
                        n
                          .toLowerCase()
                          .includes(filters.recipient.toLowerCase()),
                      )
                      .map((name, i) => (
                        <li
                          key={i}
                          className="list-group-item list-group-item-action small cursor-pointer"
                          onClick={() => selectSuggestion("recipient", name)}>
                          {name}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold small text-muted">
                  Year
                </label>
                <select
                  className="form-select"
                  name="year"
                  value={filters.year}
                  onChange={handleInputChange}>
                  <option value="">All Years</option>
                  {uniqueYears.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-dark w-50 me-2">
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline-secondary w-50">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Responsive Table Section */}
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className="table table-hover align-middle mb-0 border">
            <thead className="table-dark-custom">
              <tr>
                <th className="py-3 ps-3">Year</th>
                <th className="py-3">Organization</th>
                <th className="py-3">Award Title</th>
                <th className="py-3">Recipient</th>
                <th className="py-3">Summary</th>
                <th className="py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row.id}>
                    <td className="ps-3 fw-bold text-blue">{row.year}</td>
                    <td>{row.organization}</td>
                    <td>
                      <span className="badge bg-light text-dark border p-2">
                        {row.awardTitle}
                      </span>
                    </td>
                    <td>{row.personName}</td>
                    <td className="small text-muted">
                      <div className="text-truncate table-summary-width">
                        {stripHtml(row.details)}
                      </div>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-dark px-3 fw-bold rounded-0"
                        onClick={() =>
                          router.push(`/award/${createSlug(row.awardTitle)}`)
                        }>
                        VIEW
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AwardsAccolades;