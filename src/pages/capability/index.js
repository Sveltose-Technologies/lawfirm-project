// // import React, { useEffect, useState } from "react";
// // import Link from "next/link";
// // import Head from "next/head";
// // import {
// //   getAllCapabilityCategories,
// //   getAllCapabilitySubCategories,
// // } from "../../services/authService";

// // function Capabilities() {
// //   const [categories, setCategories] = useState([]);
// //   const [subCategories, setSubCategories] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   // Changed to an array to support multiple expanded items
// //   const [openCategoryIds, setOpenCategoryIds] = useState([]);

// //   const createSlug = (text) => {
// //     if (!text) return "";
// //     return text
// //       .toLowerCase()
// //       .trim()
// //       .replace(/&/g, "and")
// //       .replace(/[^a-z0-9 -]/g, "")
// //       .replace(/\s+/g, "-")
// //       .replace(/-+/g, "-");
// //   };

// //   useEffect(() => {
// //     const fetchAllData = async () => {
// //       try {
// //         const [catResponse, subCatResponse] = await Promise.all([
// //           getAllCapabilityCategories(),
// //           getAllCapabilitySubCategories(),
// //         ]);

// //         if (catResponse?.success) {
// //           setCategories(catResponse.data);
// //         }
// //         if (subCatResponse?.success) {
// //           const subs = subCatResponse.data?.data || subCatResponse.data || [];
// //           setSubCategories(subs);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };
// //     fetchAllData();
// //   }, []);

// //   // Toggle specific category in the array
// //   const toggleCategory = (e, id) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setOpenCategoryIds((prev) =>
// //       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
// //     );
// //   };

// //   // Expand all categories
// //   const expandAll = () => {
// //     const allIds = filteredCategories.map((cat) => cat.id);
// //     setOpenCategoryIds(allIds);
// //   };

// //   // Collapse all categories
// //   const collapseAll = () => {
// //     setOpenCategoryIds([]);
// //   };

// //   const filteredCategories = categories.filter((cat) =>
// //     cat.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()),
// //   );

// //   const midPoint = Math.ceil(filteredCategories.length / 2);
// //   const leftColumn = filteredCategories.slice(0, midPoint);
// //   const rightColumn = filteredCategories.slice(midPoint);

// //   const CategoryItem = ({ item }) => {
// //     // Check if current ID exists in the open array
// //     const isExpanded = openCategoryIds.includes(item.id);
// //     const relevantSubs = subCategories.filter(
// //       (sub) => Number(sub.categoryId) === Number(item.id),
// //     );

// //     return (
// //       <div className="border-bottom py-3">
// //         <div className="d-flex justify-content-between align-items-center">
// //           <Link href={`/capability/${createSlug(item.categoryName)}`}>
// //             <a className="text-decoration-none">
// //               <h5
// //                 className="mb-0 fw-bold category-link-hover"
// //                 style={{ color: "#a67c33" }}>
// //                 {item.categoryName}
// //               </h5>
// //             </a>
// //           </Link>

// //           <div
// //             onClick={(e) => toggleCategory(e, item.id)}
// //             style={{ cursor: "pointer", padding: "0 10px" }}>
// //             <i
// //               className={`bi ${isExpanded ? "bi-dash" : "bi-plus"} fs-4`}
// //               style={{ color: "#00a3e0" }}></i>
// //           </div>
// //         </div>

// //         {isExpanded && (
// //           <div className="mt-3 ps-3">
// //             {relevantSubs.length > 0 ? (
// //               <ul className="list-unstyled">
// //                 {relevantSubs.map((sub) => (
// //                   <li key={sub.id} className="mb-2">
// //                     <Link
// //                       href={`/capability/area-detail/${createSlug(sub.subcategoryName)}`}>
// //                       <a className="text-decoration-none text-dark d-flex align-items-center">
// //                         <span className="me-2" style={{ color: "#be9144" }}>
// //                           •
// //                         </span>
// //                         <span className="hover-underline">
// //                           {sub.subcategoryName}
// //                         </span>
// //                       </a>
// //                     </Link>
// //                   </li>
// //                 ))}
// //               </ul>
// //             ) : (
// //               <p className="small text-muted ps-3">
// //                 No subcategories available.
// //               </p>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <Head>
// //         <title>Capabilities | GreenbergTraurig Style</title>
// //         <link
// //           rel="stylesheet"
// //           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
// //         />
// //       </Head>

// //       <div
// //         className="position-relative d-flex align-items-center justify-content-center text-center"
// //         style={{
// //           backgroundImage: "url(/assets/images/our-firm4.png)",
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           height: "400px",
// //         }}>
// //         <div
// //           className="position-absolute w-100 h-100"
// //           style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}></div>
// //         <div className="container position-relative">
// //           <h1
// //             className="display-2 fw-normal"
// //             style={{ fontFamily: "serif", color: "#000" }}>
// //             Capabilities
// //           </h1>
// //           <p
// //             className="mt-4 mb-0"
// //             style={{ fontSize: "1.1rem", color: "#000" }}>
// //             One firm. One team.
// //           </p>
// //           <p style={{ fontSize: "1.1rem", color: "#000" }}>
// //             Put our experience in your corner.
// //           </p>
// //         </div>
// //       </div>

// //       <div style={{ backgroundColor: "#be9144" }} className="py-5 shadow-sm">
// //         <div className="container">
// //           <div className="row">
// //             <div className="col-md-5">
// //               <div className="d-flex align-items-center border-bottom border-dark pb-1">
// //                 <input
// //                   type="text"
// //                   className="form-control bg-transparent border-0 shadow-none p-0 fs-4"
// //                   placeholder="Search Capabilities"
// //                   style={{ color: "#000", outline: "none" }}
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                 />
// //                 <i className="bi bi-search fs-4"></i>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="py-5 bg-white">
// //         <div className="container">
// //           <div className="d-flex justify-content-between align-items-center mb-5">
// //             <h2
// //               className="display-5 fw-normal"
// //               style={{ fontFamily: "serif", color: "#000" }}>
// //               Capabilities
// //             </h2>
// //             <div>
// //               {/* Added Expand All Button */}
// //               <button
// //                 className="btn rounded-0 px-4 py-2 text-uppercase fw-bold shadow-sm me-2"
// //                 style={{
// //                   backgroundColor: "#be9144",
// //                   color: "#000",
// //                   fontSize: "0.8rem",
// //                 }}
// //                 onClick={expandAll}>
// //                 Expand All
// //               </button>
// //               {/* Updated Collapse All Button */}
// //               <button
// //                 className="btn rounded-0 px-4 py-2 text-uppercase fw-bold shadow-sm"
// //                 style={{
// //                   backgroundColor: "#be9144",
// //                   color: "#000",
// //                   fontSize: "0.8rem",
// //                 }}
// //                 onClick={collapseAll}>
// //                 Collapse All
// //               </button>
// //             </div>
// //           </div>

// //           <div className="row g-5">
// //             <div className="col-lg-6">
// //               {leftColumn.map((item) => (
// //                 <CategoryItem key={item.id} item={item} />
// //               ))}
// //             </div>
// //             <div className="col-lg-6">
// //               {rightColumn.map((item) => (
// //                 <CategoryItem key={item.id} item={item} />
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <style
// //         dangerouslySetInnerHTML={{
// //           __html: `
// //         .hover-underline:hover { text-decoration: underline !important; color: #be9144 !important; }
// //         .category-link-hover:hover { color: #8d6b2c !important; text-decoration: underline !important; }
// //       `,
// //         }}
// //       />
// //     </>
// //   );
// // }

// // export default Capabilities;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Head from "next/head";
// import {
//   getAllCapabilityCategories,
//   getAllCapabilitySubCategories,
//   getAllCapabilities, // Added for Banner Data
//   getImgUrl, // Added for dynamic image path
// } from "../../services/authService";

// function Capabilities() {
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [capabilityHeader, setCapabilityHeader] = useState(null); // Dynamic Banner State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openCategoryIds, setOpenCategoryIds] = useState([]);

//   const createSlug = (text) => {
//     if (!text) return "";
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/&/g, "and")
//       .replace(/[^a-z0-9 -]/g, "")
//       .replace(/\s+/g, "-")
//       .replace(/-+/g, "-");
//   };

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         const [catResponse, subCatResponse, capHeaderResponse] =
//           await Promise.all([
//             getAllCapabilityCategories(),
//             getAllCapabilitySubCategories(),
//             getAllCapabilities(), // Fetch Banner Image and Text
//           ]);

//         if (catResponse?.success) {
//           setCategories(catResponse.data);
//         }
//         if (subCatResponse?.success) {
//           const subs = subCatResponse.data?.data || subCatResponse.data || [];
//           setSubCategories(subs);
//         }

//         // Handle Dynamic Header Content
//         if (capHeaderResponse?.status || capHeaderResponse?.success) {
//           const data = capHeaderResponse.data;
//           setCapabilityHeader(Array.isArray(data) ? data[0] : data);
//           console.log("Banner Content Loaded:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchAllData();
//   }, []);

//   const toggleCategory = (e, id) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setOpenCategoryIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
//     );
//   };

//   const expandAll = () => {
//     const allIds = filteredCategories.map((cat) => cat.id);
//     setOpenCategoryIds(allIds);
//   };

//   const collapseAll = () => {
//     setOpenCategoryIds([]);
//   };

//   const filteredCategories = categories.filter((cat) =>
//     cat.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const midPoint = Math.ceil(filteredCategories.length / 2);
//   const leftColumn = filteredCategories.slice(0, midPoint);
//   const rightColumn = filteredCategories.slice(midPoint);

//   // Dynamic Background Image Logic
//   const bannerBg = capabilityHeader?.bannerImage
//     ? getImgUrl(capabilityHeader.bannerImage)
//     : "/assets/images/our-firm4.png";

//   const CategoryItem = ({ item }) => {
//     const isExpanded = openCategoryIds.includes(item.id);
//     const relevantSubs = subCategories.filter(
//       (sub) => Number(sub.categoryId) === Number(item.id),
//     );

//     return (
//       <div className="border-bottom py-3">
//         <div className="d-flex justify-content-between align-items-center">
//           <Link href={`/capability/${createSlug(item.categoryName)}`}>
//             <a className="text-decoration-none">
//               <h5
//                 className="mb-0 fw-bold category-link-hover"
//                 style={{ color: "#a67c33" }}>
//                 {item.categoryName}
//               </h5>
//             </a>
//           </Link>

//           <div
//             onClick={(e) => toggleCategory(e, item.id)}
//             style={{ cursor: "pointer", padding: "0 10px" }}>
//             <i
//               className={`bi ${isExpanded ? "bi-dash" : "bi-plus"} fs-4`}
//               style={{ color: "#00a3e0" }}></i>
//           </div>
//         </div>

//         {isExpanded && (
//           <div className="mt-3 ps-3">
//             {relevantSubs.length > 0 ? (
//               <ul className="list-unstyled">
//                 {relevantSubs.map((sub) => (
//                   <li key={sub.id} className="mb-2">
//                     <Link
//                       href={`/capability/area-detail/${createSlug(sub.subcategoryName)}`}>
//                       <a className="text-decoration-none text-dark d-flex align-items-center">
//                         <span className="me-2" style={{ color: "#be9144" }}>
//                           •
//                         </span>
//                         <span className="hover-underline">
//                           {sub.subcategoryName}
//                         </span>
//                       </a>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="small text-muted ps-3">
//                 No subcategories available.
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       <Head>
//         <title>Capabilities | GreenbergTraurig Style</title>
//         <link
//           rel="stylesheet"
//           href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
//         />
//       </Head>

//       <div
//         className="position-relative d-flex align-items-center justify-content-center text-center"
//         style={{
//           backgroundImage: `url(${bannerBg})`, // Use dynamic banner here
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           height: "400px",
//         }}>
//         <div
//           className="position-absolute w-100 h-100"
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}></div>
//         <div className="container position-relative">
//           {/* Dynamic Banner Text Rendering */}
//           {capabilityHeader?.textEditor ? (
//             <div
//               className="dynamic-header-content"
//               style={{ color: "#000" }}
//               dangerouslySetInnerHTML={{ __html: capabilityHeader.textEditor }}
//             />
//           ) : (
//             <>
//               <h1
//                 className="display-2 fw-normal"
//                 style={{ fontFamily: "serif", color: "#000" }}>
//                 Capabilities
//               </h1>
//               <p
//                 className="mt-4 mb-0"
//                 style={{ fontSize: "1.1rem", color: "#000" }}>
//                 One firm. One team.
//               </p>
//               <p style={{ fontSize: "1.1rem", color: "#000" }}>
//                 Put our experience in your corner.
//               </p>
//             </>
//           )}
//         </div>
//       </div>

//       <div style={{ backgroundColor: "#be9144" }} className="py-5 shadow-sm">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-5">
//               <div className="d-flex align-items-center border-bottom border-dark pb-1">
//                 <input
//                   type="text"
//                   className="form-control bg-transparent border-0 shadow-none p-0 fs-4"
//                   placeholder="Search Capabilities"
//                   style={{ color: "#000", outline: "none" }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <i className="bi bi-search fs-4"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-5 bg-white">
//         <div className="container">
//           <div className="d-flex justify-content-between align-items-center mb-5">
//             <h2
//               className="display-5 fw-normal"
//               style={{ fontFamily: "serif", color: "#000" }}>
//               Capabilities
//             </h2>
//             <div>
//               <button
//                 className="btn rounded-0 px-4 py-2 text-uppercase fw-bold shadow-sm me-2"
//                 style={{
//                   backgroundColor: "#be9144",
//                   color: "#000",
//                   fontSize: "0.8rem",
//                 }}
//                 onClick={expandAll}>
//                 Expand All
//               </button>
//               <button
//                 className="btn rounded-0 px-4 py-2 text-uppercase fw-bold shadow-sm"
//                 style={{
//                   backgroundColor: "#be9144",
//                   color: "#000",
//                   fontSize: "0.8rem",
//                 }}
//                 onClick={collapseAll}>
//                 Collapse All
//               </button>
//             </div>
//           </div>

//           <div className="row g-5">
//             <div className="col-lg-6">
//               {leftColumn.map((item) => (
//                 <CategoryItem key={item.id} item={item} />
//               ))}
//             </div>
//             <div className="col-lg-6">
//               {rightColumn.map((item) => (
//                 <CategoryItem key={item.id} item={item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         .hover-underline:hover { text-decoration: underline !important; color: #be9144 !important; }
//         .category-link-hover:hover { color: #8d6b2c !important; text-decoration: underline !important; }
//         /* Style for Quill dynamic content inside banner */
//         .dynamic-header-content h1 { font-size: 4rem; font-family: serif; }
//         .dynamic-header-content p { font-size: 1.1rem; margin-top: 10px; }
//       `,
//         }}
//       />
//     </>
//   );
// }

// export default Capabilities;







import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  getAllCapabilityCategories,
  getAllCapabilitySubCategories,
  getAllCapabilities,
  getImgUrl,
} from "../../services/authService";

function Capabilities() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [capabilityHeader, setCapabilityHeader] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategoryIds, setOpenCategoryIds] = useState([]);

  const createSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

 useEffect(() => {
   const fetchAllData = async () => {
     // 1. Categories Fetch Karein (Ye API sahi chal rahi hai)
     try {
       const catResponse = await getAllCapabilityCategories();
       console.log("Categories Response:", catResponse);
       if (catResponse?.success) {
         setCategories(catResponse.data || []);
       }
     } catch (error) {
       console.error("Error fetching Categories:", error);
     }

     // 2. SubCategories Fetch Karein (Ye API bhi sahi chal rahi hai)
     try {
       const subCatResponse = await getAllCapabilitySubCategories();
       if (subCatResponse?.success) {
         // Console log ke mutabik check karein ki data kahan hai
         const subs = subCatResponse.data?.data || subCatResponse.data || [];
         setSubCategories(subs);
       }
     } catch (error) {
       console.error("Error fetching Subcategories:", error);
     }

     // 3. Banner/Capability Header Fetch Karein (Isme 404 aa raha hai)
     try {
       const capHeaderResponse = await getAllCapabilities();
       if (capHeaderResponse?.status || capHeaderResponse?.success) {
         const data = capHeaderResponse.data;
         setCapabilityHeader(Array.isArray(data) ? data[0] : data);
       }
     } catch (error) {
       // Is error ko sirf warn karein taaki pura page na ruke
       console.warn("Banner/Header API failed (404), using default banner.");
     }
   };

   fetchAllData();
 }, []);
  const toggleCategory = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const expandAll = () => {
    const allIds = filteredCategories.map((cat) => cat.id);
    setOpenCategoryIds(allIds);
  };

  const collapseAll = () => {
    setOpenCategoryIds([]);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const midPoint = Math.ceil(filteredCategories.length / 2);
  const leftColumn = filteredCategories.slice(0, midPoint);
  const rightColumn = filteredCategories.slice(midPoint);

  const bannerBg = capabilityHeader?.bannerImage
    ? getImgUrl(capabilityHeader.bannerImage)
    : "/assets/images/our-firm4.png";

  const CategoryItem = ({ item }) => {
    const isExpanded = openCategoryIds.includes(item.id);
    const relevantSubs = subCategories.filter(
      (sub) => Number(sub.categoryId) === Number(item.id),
    );

    return (
      <div className="border-bottom py-2">
        <div className="d-flex justify-content-between align-items-center">
          <Link href={`/capability/${createSlug(item.categoryName)}`}>
            <a className="text-decoration-none">
              <h5 className="mb-0 fw-bold" style={{ color: "#a67c33" }}>
                {item.categoryName}
              </h5>
            </a>
          </Link>
          <div
            onClick={(e) => toggleCategory(e, item.id)}
            className="cursor-pointer px-2">
            <i
              className={`bi ${isExpanded ? "bi-dash" : "bi-plus"} fs-4 text-primary`}></i>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-2 ps-3 animate__animated animate__fadeIn">
            {relevantSubs.length > 0 ? (
              <ul className="list-unstyled mb-2">
                {relevantSubs.map((sub) => (
                  <li key={sub.id} className="mb-1">
                    <Link
                      href={`/capability/area-detail/${createSlug(sub.subcategoryName)}`}>
                      <a className="text-decoration-none text-dark d-flex align-items-center small">
                        <span className="me-2" style={{ color: "#be9144" }}>
                          •
                        </span>
                        <span>{sub.subcategoryName}</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="small text-muted ps-3">
                No subcategories available.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Capabilities</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      {/* Universal Banner - Big Text Implementation */}
      <div
        className="universal-banner"
        style={{
          backgroundImage: `url(${bannerBg})`,
          minHeight: "300px",
          padding: "40px 0",
        }}>
        <div className="banner-overlay"></div>
        <div className="container banner-content text-center">
          {capabilityHeader?.textEditor ? (
            <div
              className="text-white capability-header-text"
              dangerouslySetInnerHTML={{ __html: capabilityHeader.textEditor }}
            />
          ) : (
            <>
              <h2 className="text-uppercase">Capabilities</h2>
              <p>Put our experience in your corner.</p>
            </>
          )}
        </div>
      </div>

      {/* Small Search Section */}
      <div style={{ backgroundColor: "#be9144" }} className="py-3 shadow-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-10">
              <div className="d-flex align-items-center border-bottom border-dark pb-1">
                <input
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none p-0 fs-5"
                  placeholder="Search Capabilities"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="bi bi-search fs-5"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 bg-white">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
            <h2 className="display-6 fw-bold text-dark">Capabilities</h2>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary-custom px-4"
                style={{ width: "auto", minWidth: "140px" }}
                onClick={expandAll}>
                Expand All
              </button>
              <button
                className="btn btn-primary-custom px-4"
                style={{ width: "auto", minWidth: "140px" }}
                onClick={collapseAll}>
                Collapse All
              </button>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              {leftColumn.map((item) => (
                <CategoryItem key={item.id} item={item} />
              ))}
            </div>
            <div className="col-lg-6">
              {rightColumn.map((item) => (
                <CategoryItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Capabilities;