// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { getAllPromoters, IMG_URL } from "../../services/authService";

// export default function PromoterDetail() {
//   const router = useRouter();
//   const { slug } = router.query;
//   const [person, setPerson] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createSlug = (text) =>
//     text
//       ?.toLowerCase()
//       .trim()
//       .replace(/[^\w ]+/g, "")
//       .replace(/ +/g, "-");

//   useEffect(() => {
//     if (!router.isReady) return;
//     getAllPromoters().then((res) => {
//       if (res?.success) {
//         const found = res.data.find(
//           (item) => createSlug(item.personName) === slug,
//         );
//         setPerson(found);
//       }
//       setLoading(false);
//     });
//   }, [slug, router.isReady]);

//   if (loading)
//     return (
//       <div className="text-center py-5 fw-bold fs-4">Loading Profile...</div>
//     );
//   if (!person)
//     return (
//       <div className="container py-5 text-center">
//         <h2>Not Found</h2>
//       </div>
//     );

//   const bannerImg = person.bannerImage
//     ? `${IMG_URL}/${person.bannerImage}`
//     : "/assets/images/promoter-banner.png";

//   return (
//     <div className="bg-white">
//       <div
//         className="container-fluid p-0 d-flex align-items-center justify-content-center text-center px-3"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bannerImg})`,
//           minHeight: "300px",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}>
//         <div className="container">
//           <button
//             className="btn btn-outline-light btn-sm mb-3 px-4 rounded-pill"
//             onClick={() => router.push("/promoters")}>
//             &larr; BACK
//           </button>
//           <h1 className="text-white display-4 fw-bold">{person.personName}</h1>
//         </div>
//       </div>

//       <div className="container py-5">
//         <div className="row g-5">
//           <div className="col-lg-4">
//             <div className="border border-dark p-2 shadow-sm">
//               <img
//                 src={`${IMG_URL}/${person.personImage}`}
//                 className="img-fluid w-100"
//                 style={{ maxHeight: "500px", objectFit: "contain" }}
//                 alt={person.personName}
//               />
//             </div>
//           </div>
//           <div className="col-lg-8">
//             <h2
//               className="fw-bold mb-3 border-bottom pb-2"
//               style={{ color: "#A35233" }}>
//               Biography
//             </h2>
//             {/* API se biography (specialization) show karne ke liye */}
//             <div
//               className="text-dark lh-lg fs-5 text-start text-break"
//               dangerouslySetInnerHTML={{ __html: person.specialization }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllPromoters, IMG_URL } from "../../services/authService";

export default function PromoterDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const THEME_COLOR = "#A35233";

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");

  useEffect(() => {
    if (!router.isReady) return;
    getAllPromoters().then((res) => {
      if (res?.success) {
        const found = res.data.find(
          (item) => createSlug(item.personName) === slug,
        );
        setPerson(found);
      }
      setLoading(false);
    });
  }, [slug, router.isReady]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
        <div className="spinner-border text-muted" role="status"></div>
      </div>
    );

  if (!person)
    return (
      <div className="container py-5 text-center vh-100 d-flex flex-column justify-content-center">
        <h2 className="fw-bold">Profile Not Found</h2>
        <button
          className="btn btn-dark mt-3 rounded-0 px-4 mx-auto"
          onClick={() => router.push("/promoters")}>
          BACK TO PROMOTERS
        </button>
      </div>
    );

  const bannerImg = person.bannerImage
    ? `${IMG_URL}/${person.bannerImage}`
    : "/assets/images/promoter-banner.png";

  return (
    <div className="bg-white">
      {/* Banner Section - Content starts below this */}
      <div
        className="container-fluid p-0 d-flex align-items-center justify-content-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bannerImg})`,
          height: "250px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="container">
          <h3
            className="text-white fw-bold text-uppercase tracking-wider m-0"
            style={{ fontSize: "2.5rem" }}>
            {person.personName}
          </h3>
          <p className="text-white-50 text-uppercase small mt-2 tracking-widest">
            {person.designation}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-5">
        <div className="row g-5">
          {/* Left Column: Fixed Profile Image */}
          <div className="col-lg-4">
            <div className="p-1 border bg-light shadow-sm">
              <div
                className="overflow-hidden bg-white"
                style={{ height: "420px", width: "100%" }}>
                <img
                  src={`${IMG_URL}/${person.personImage}`}
                  className="w-100 h-100"
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                  alt={person.personName}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-outline-dark rounded-0 w-100 fw-bold py-2"
                onClick={() => router.push("/promoters")}
                style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
                &larr; BACK TO TEAM
              </button>
            </div>
          </div>

          {/* Right Column: Biography Details */}
          <div className="col-lg-8">
            <div className="pb-3 mb-4 border-bottom">
              <h3
                className="fw-bold text-uppercase"
                style={{ color: THEME_COLOR, fontSize: "1.75rem" }}>
                Biography
              </h3>
            </div>

            <div
              className="biography-text text-dark fs-5 lh-lg"
              style={{ textAlign: "justify", wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{ __html: person.specialization }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .tracking-wider {
          letter-spacing: 3px;
        }
        .tracking-widest {
          letter-spacing: 5px;
        }
        .biography-text :global(p) {
          margin-bottom: 1.5rem;
          color: #333;
        }
        .biography-text :global(ul) {
          margin-bottom: 1.5rem;
        }
        @media (max-width: 991px) {
          .biography-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}