// import React, { useState, useEffect, useMemo } from "react";
// import { useRouter } from "next/router";
// import { getAllAwards, IMG_URL } from "../../services/authService";

// function AwardDetail() {
//   const router = useRouter();
//   const { slug } = router.query;

//   const [award, setAward] = useState(null);
//   const [allData, setAllData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const createSlug = (text) => {
//     if (!text) return "";
//     return text
//       .toLowerCase()
//       .trim()
//       .replace(/[^\w ]+/g, "")
//       .replace(/ +/g, "-");
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAllAwards();
//         if (res?.success) {
//           const data = res.data || [];
//           setAllData(data);
//           const found = data.find(
//             (item) => createSlug(item.awardTitle) === slug,
//           );
//           setAward(found);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (slug) fetchData();
//   }, [slug]);

//   const otherAwards = useMemo(() => {
//     return allData
//       .filter((item) => createSlug(item.awardTitle) !== slug)
//       .slice(0, 3);
//   }, [allData, slug]);

//   if (loading)
//     return (
//       <div className="text-center py-5 my-5 fw-bold fs-4">
//         Loading Detail...
//       </div>
//     );
//   if (!award)
//     return (
//       <div className="container py-5 text-center">
//         <h1>Award Not Found</h1>
//         <button
//           className="btn btn-dark mt-3"
//           onClick={() => router.push("/award")}>
//           Back to List
//         </button>
//       </div>
//     );

//   const detailImg = award.bannerImage
//     ? `${IMG_URL}/${award.bannerImage}`
//     : "/assets/images/our-firm4.png";

//   return (
//     <div className="bg-light min-vh-100 pb-5">
//       {/* Banner */}
//       <div
//         className="position-relative d-flex align-items-center"
//         style={{ height: "350px", backgroundColor: "#0a1c38" }}>
//         <div
//           className="position-absolute top-0 start-0 w-100 h-100"
//           style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1 }}></div>
//         <img
//           src={detailImg}
//           className="position-absolute w-100 h-100"
//           style={{ objectFit: "cover", zIndex: 0 }}
//           alt="Banner"
//         />

//         <div className="container position-relative" style={{ zIndex: 2 }}>
//           <button
//             onClick={() => router.push("/award")}
//             className="btn text-white px-4 mb-4 shadow-sm border-0"
//             style={{ backgroundColor: "#de9f57" }}>
//             &larr; Back to Recognition List
//           </button>
//           <h1
//             className="text-white display-4 fw-bold m-0 text-break"
//             style={{ fontFamily: "serif" }}>
//             {award.awardTitle}
//           </h1>
//           <div
//             className="badge p-2 text-uppercase text-white mt-3"
//             style={{
//               backgroundColor: "#003366",
//               borderLeft: "4px solid #de9f57",
//             }}>
//             Official Recognition
//           </div>
//         </div>
//       </div>

//       {/* Main Content strictly BELOW banner */}
//       <div className="container py-5">
//         <div className="row g-4">
//           {/* Left Column: Overview */}
//           <div className="col-lg-8">
//             <div
//               className="p-4 p-md-5 bg-white shadow-sm rounded border-top border-4"
//               style={{ borderColor: "#003366" }}>
//               <h3
//                 className="fw-bold mb-4 pb-2 border-bottom text-dark"
//                 style={{ fontFamily: "serif" }}>
//                 Award Overview
//               </h3>

//               {/* FIXED SPACING: Words will look normal (align left) */}
//               <div
//                 className="text-dark lh-lg fs-5"
//                 style={{
//                   textAlign: "left",
//                   wordWrap: "break-word",
//                   overflowWrap: "break-word",
//                 }}
//                 dangerouslySetInnerHTML={{ __html: award.details }}
//               />
//             </div>
//           </div>

//           {/* Right Column: Key Details */}
//           <div className="col-lg-4">
//             <div className="card shadow-sm border-0 h-100">
//               <div className="card-body p-4">
//                 <h5
//                   className="fw-bold mb-4 border-bottom pb-2"
//                   style={{ color: "#003366", fontFamily: "serif" }}>
//                   Award Metadata
//                 </h5>

//                 <div className="mb-4">
//                   <label
//                     className="fw-bold text-uppercase d-block small mb-1"
//                     style={{ color: "#de9f57" }}>
//                     Honoree
//                   </label>
//                   <p className="fw-bold fs-5 mb-0 text-dark">
//                     {award.personName}
//                   </p>
//                 </div>

//                 <div className="mb-4">
//                   <label
//                     className="fw-bold text-uppercase d-block small mb-1"
//                     style={{ color: "#de9f57" }}>
//                     Issuing Body
//                   </label>
//                   <p className="fw-semibold text-dark mb-0">
//                     {award.organization}
//                   </p>
//                 </div>

//                 <div className="mb-0 pt-3 border-top">
//                   <label
//                     className="fw-bold text-uppercase d-block small mb-1"
//                     style={{ color: "#de9f57" }}>
//                     Year Conferred
//                   </label>
//                   <p
//                     className="fw-bold fs-1 mb-0"
//                     style={{ color: "#003366", fontFamily: "serif" }}>
//                     {award.year}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Related Awards Section */}
//         {otherAwards.length > 0 && (
//           <div className="mt-5 pt-4">
//             <h2
//               className="fw-bold mb-4"
//               style={{ color: "#003366", fontFamily: "serif" }}>
//               More Recent Accolades
//             </h2>
//             <div className="row g-4">
//               {otherAwards.map((item) => (
//                 <div className="col-md-4" key={item.id}>
//                   <div
//                     className="card shadow-sm border-0 h-100 overflow-hidden"
//                     onClick={() =>
//                       router.push(`/award/${createSlug(item.awardTitle)}`)
//                     }
//                     style={{ cursor: "pointer" }}>
//                     <img
//                       src={
//                         item.bannerImage
//                           ? `${IMG_URL}/${item.bannerImage}`
//                           : "/assets/images/our-firm4.png"
//                       }
//                       className="w-100"
//                       style={{ height: "200px", objectFit: "cover" }}
//                       alt="award"
//                     />
//                     <div className="card-body">
//                       <small
//                         className="fw-bold text-uppercase d-block mb-1"
//                         style={{ color: "#de9f57" }}>
//                         {item.organization}
//                       </small>
//                       <h6
//                         className="fw-bold text-dark mb-3"
//                         style={{ fontFamily: "serif" }}>
//                         {item.awardTitle}
//                       </h6>
//                       <span
//                         className="fw-bold small text-uppercase"
//                         style={{ color: "#003366" }}>
//                         Read Profile &rarr;
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AwardDetail;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllAwards, IMG_URL } from "../../services/authService";

export default function AwardDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);

  const createSlug = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      try {
        const res = await getAllAwards();
        if (res?.success) {
          const found = res.data.find(
            (item) => createSlug(item.awardTitle) === slug,
          );
          setAward(found);
        }
      } catch (error) {
        console.error("Error fetching award details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, router.isReady]);

  if (loading)
    return <div className="text-center py-5 fw-bold">Loading...</div>;
  if (!award)
    return (
      <div className="container py-5 text-center">
        <h2>Award not found</h2>
        <button
          className="btn btn-dark mt-3"
          onClick={() => router.push("/award")}>
          Back to List
        </button>
      </div>
    );

  const bannerImg = award.bannerImage
    ? `${IMG_URL}/${award.bannerImage}`
    : "/assets/images/our-firm4.png";

  return (
    <div className="bg-light min-vh-100">
      <div
        className="position-relative d-flex align-items-center"
        style={{
          height: "350px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bannerImg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container text-white">
          <button
            onClick={() => router.push("/award")}
            className="btn btn-sm text-white mb-4 px-3"
            style={{ backgroundColor: "#A35233" }}>
            &larr; BACK TO LIST
          </button>
          <h1 className="display-4 fw-bold">{award.awardTitle}</h1>
          <p className="lead">
            {award.organization} | {award.year}
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="bg-white p-4 p-md-5 shadow-sm border-top border-4"
              style={{ borderColor: "#0a1c38" }}>
              <h3 className="fw-bold mb-4 border-bottom pb-2">
                Award Overview
              </h3>
              <div
                className="text-dark lh-lg fs-5"
                style={{ textAlign: "left", wordWrap: "break-word" }}
                dangerouslySetInnerHTML={{ __html: award.details }}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 text-uppercase small border-bottom pb-2">
                  Information
                </h5>
                <div className="mb-3">
                  <label className="text-muted d-block small fw-bold">
                    RECIPIENT
                  </label>
                  <p className="fw-bold mb-0">{award.personName}</p>
                </div>
                <div className="mb-3">
                  <label className="text-muted d-block small fw-bold">
                    ORGANIZATION
                  </label>
                  <p className="fw-semibold mb-0">{award.organization}</p>
                </div>
                <div className="mb-0">
                  <label className="text-muted d-block small fw-bold">
                    YEAR
                  </label>
                  <p className="fw-bold fs-2 mb-0" style={{ color: "#0a1c38" }}>
                    {award.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}