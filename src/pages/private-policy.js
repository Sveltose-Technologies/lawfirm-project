// import React, { useEffect, useState } from "react";
// import { getAllPrivacyPolicy } from "../services/authService";

// const PrivacyNotice = () => {
//   const [sections, setSections] = useState([]);

//   useEffect(() => {
//     fetchPrivacyPolicy();
//   }, []);

//   const fetchPrivacyPolicy = async () => {
//     const response = await getAllPrivacyPolicy();
//     console.log("Privacy Policy Data:", response);

//     if (response?.success && response?.data) {
//       setSections(response.data);
//     }
//   };

//   return (
//     <div className="bg-light min-vh-100">
//       {/* HERO */}
//       <section
//         className="text-center py-5"
//         style={{ backgroundColor: "#c9a754", color: "#fff" }}
//       >
//         <h1 className="display-5 fw-bold pt-5">Privacy Notice</h1>
//         <p className="lead">
//           Your privacy matters. Learn how we handle your information.
//         </p>
//       </section>

//       {/* CONTENT */}
//       <main className="container py-5" style={{ maxWidth: "900px" }}>
//         {sections.length > 0 ? (
//           sections.map((section) => (
//             <div
//               key={section.id}
//               className="mb-4 p-4 border rounded shadow-sm bg-white"
//             >
//               <h4 className="fw-bold">{section.title}</h4>

//               {/* HTML CONTENT RENDER */}
//               <div
//                 className="text-secondary"
//                 dangerouslySetInnerHTML={{ __html: section.content }}
//               />
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No Privacy Policy Found</p>
//         )}

      
//       </main>
//     </div>
//   );
// };

// export default PrivacyNotice;
"use client";

import React, { useEffect, useState } from "react";
import { getAllPrivacyPolicy } from "../services/authService";

const PrivacyNotice = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const response = await getAllPrivacyPolicy();
      if (response?.success && response?.data) {
        // Agar data array nahi hai toh use array mein convert karein
        setSections(Array.isArray(response.data) ? response.data : [response.data]);
      }
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-vh-100 py-5">
      <main className="container" style={{ maxWidth: "1000px" }}>
        
        {/* --- PAGE HEADER --- */}
        <div className="mb-5 border-bottom pb-3">
         
        </div>

        {/* --- CONTENT AREA --- */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-2 text-muted">Loading Information...</p>
          </div>
        ) : sections.length > 0 ? (
          sections.map((section) => (
            <div key={section.id} className="mb-5">
              {/* SECTION TITLE */}
              <h3 className="fw-bold mb-3" style={{ color: "#002147", fontSize: "1.5rem" }}>
                {section.title}
              </h3>

              {/* HTML CONTENT RENDER WITH WRAPPING FIX */}
              <div
                className="privacy-content-wrapper"
                style={{
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#444",
                  textAlign: "justify",
                  wordWrap: "break-word",       // 👈 Text wrapping fix
                  overflowWrap: "break-word",   // 👈 Text wrapping fix
                  wordBreak: "normal"
                }}
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-5 bg-light rounded">
            <p className="text-muted">No Privacy Policy details available at the moment.</p>
          </div>
        )}
      </main>

      {/* --- INLINE STYLES TO FORCE WRAPPING --- */}
      <style jsx>{`
        .privacy-content-wrapper :global(p) {
          margin-bottom: 1.2rem;
          white-space: normal !important; /* 👈 Yeh f फालतू spaces aur single line problem solve karega */
        }
        .privacy-content-wrapper :global(ul), 
        .privacy-content-wrapper :global(ol) {
          margin-bottom: 1.5rem;
          padding-left: 1.2rem;
        }
        .privacy-content-wrapper :global(li) {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 768px) {
          .privacy-content-wrapper {
            font-size: 15px !important;
            text-align: left !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyNotice;