// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { getAllPromoters, IMG_URL } from "../../services/authService";

// export default function Promoters() {
//   const router = useRouter();
//   const [promoters, setPromoters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/[^\w ]+/g, "")
//       .replace(/ +/g, "-");

//   useEffect(() => {
//     getAllPromoters().then((res) => {
//       if (res?.success) setPromoters(res.data);
//       setLoading(false);
//     });
//   }, []);

//   const bannerImg = promoters[0]?.bannerImage
//     ? `${IMG_URL}/${promoters[0].bannerImage}`
//     : "/assets/images/promoter-banner.png";

//   if (loading)
//     return <div className="text-center py-5 fw-bold">Loading...</div>;

//   return (
//     <div className="bg-white">
//       <div
//         className="container-fluid p-0 d-flex align-items-center justify-content-center text-center"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`,
//           minHeight: "350px",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}>
//         <h1 className="text-white display-3 fw-bold">Our Promoters</h1>
//       </div>

//       <div className="container py-5">
//         <div className="row g-4">
//           {promoters.map((p) => (
//             <div className="col-lg-3 col-md-6" key={p.id}>
//               <div className="border border-dark p-1 mb-3">
//                 <img
//                   src={`${IMG_URL}/${p.personImage}`}
//                   className="img-fluid w-100"
//                   style={{
//                     height: "320px",
//                     objectFit: "cover",
//                     objectPosition: "top",
//                   }}
//                   alt={p.personName}
//                 />
//               </div>
//               <div className="text-center">
//                 <h5 className="fw-bold mb-0">{p.personName}</h5>
//                 <p className="text-muted small mb-3">{p.designation}</p>
//                 <button
//                   className="btn btn-dark rounded-0 px-4 w-100 fw-bold"
//                   style={{ backgroundColor: "#A35233", border: "none" }}
//                   onClick={() =>
//                     router.push(`/promoters/${createSlug(p.personName)}`)
//                   }>
//                   Know more
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllPromoters, IMG_URL } from "../../services/authService";

export default function Promoters() {
  const router = useRouter();
  const [promoters, setPromoters] = useState([]);
  const [loading, setLoading] = useState(true);

  const THEME_COLOR = "#A35233";

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  useEffect(() => {
    getAllPromoters().then((res) => {
      if (res?.success) setPromoters(res.data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-muted" role="status"></div>
      </div>
    );

  const bannerImg = promoters[0]?.bannerImage
    ? `${IMG_URL}/${promoters[0].bannerImage}`
    : "/assets/images/promoter-banner.png";

  return (
    <div className="bg-light min-vh-100">
      {/* Sleek Banner */}
      <div
        className="container-fluid p-0 d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bannerImg})`,
          height: "250px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <h3
          className="text-white fw-bold text-uppercase tracking-wider"
          style={{ fontSize: "2.5rem" }}>
          Our Promoters
        </h3>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          {promoters.map((p) => (
            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12" key={p.id}>
              <div className="promoter-card shadow-sm h-100 bg-white border-0 transition-hover">
                {/* Fixed Headshot Container */}
                <div
                  className="image-container bg-light"
                  style={{
                    height: "260px", // Reduced height for professional headshot look
                    width: "100%",
                    overflow: "hidden",
                  }}>
                  <img
                    src={`${IMG_URL}/${p.personImage}`}
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      imageRendering: "auto",
                    }}
                    alt={p.personName}
                  />
                </div>

                <div className="card-content p-3 text-center">
                  <h6
                    className="fw-bold mb-1 text-dark text-uppercase"
                    style={{ fontSize: "0.95rem" }}>
                    {p.personName}
                  </h6>
                  <p
                    className="text-muted mb-3"
                    style={{ fontSize: "0.8rem", height: "20px" }}>
                    {p.designation}
                  </p>

                  <button
                    className="btn btn-sm rounded-0 w-100 fw-bold py-2"
                    style={{
                      backgroundColor: THEME_COLOR,
                      color: "#fff",
                      border: "none",
                      fontSize: "0.75rem",
                      letterSpacing: "1px",
                    }}
                    onClick={() =>
                      router.push(`/promoters/${createSlug(p.personName)}`)
                    }>
                    VIEW PROFILE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .promoter-card {
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .promoter-card:hover {
          transform: translateY(-8px);
          shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .tracking-wider {
          letter-spacing: 3px;
        }
      `}</style>
    </div>
  );
}