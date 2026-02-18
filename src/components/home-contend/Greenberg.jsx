// import Link from "next/link";
// import React from "react";

// export default function Greenberg() {
//   return (
//     <div className="alumni-section py-5 bg-white">
//       <div className="container">
        
//         <div className="row g-0 shadow-lg bg-light-gray" style={{ borderRadius: '4px', overflow: 'hidden' }}>
          
//           <div className="col-lg-6 order-1 order-lg-1">
//             <div style={{ height: "100%", minHeight: "500px" }}>
//               <img
//                 src="/assets/images/banner-img5.png"
//                 alt="Greenberg Traurig Alumni Network"
//                 className="img-fluid w-100 h-100"
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           </div>

//           <div className="col-lg-6 order-2 order-lg-2 d-flex align-items-center p-5">
//             <div>
              
//               {/* FIX: ' ki jagah &apos; use kiya */}
//               <h2 className="display-5 fw-bold mb-4 font-serif text-primary-blue">
//                 Greenberg Traurig&apos;s <br /> Alumni Network
//               </h2>

//               {/* FIX: ' ki jagah &apos; use kiya */}
//               <p className="mb-4 text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
//                 Connection and collaboration are at the heart of Greenberg Traurig&apos;s core values. Each GT attorney — no matter whether presently here or previously with the firm — is an important part of our history and our future. 
//               </p>
              
//               <p className="mb-5 text-secondary fw-bold" style={{ fontSize: '1.05rem' }}>
//                 One firm; one team; we stay connected.
//               </p>

//               <Link href="/insights">
//                 <a className="btn-premium">
//                   GT ALUMNI NETWORK
//                 </a>
//               </Link>

//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function Greenberg() {
  
  // Click rokne ke liye function
  const handleDeadClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="alumni-section py-5 bg-white">
      <div className="container px-3">
        
        {/* =========================================
            SECTION: ALUMNI NETWORK CARD
        ========================================= */}
        <div className="row g-0 card-shadow bg-light">
          
          <div className="col-lg-6 order-1 order-lg-1">
            <div className="h-100">
              <img
                src="/assets/images/banner-img5.png"
                alt="Greenberg Traurig Alumni Network"
                className="img-cover"
              />
            </div>
          </div>

          <div className="col-lg-6 order-2 order-lg-2 d-flex align-items-center p-4 p-lg-5">
            <div>
              <h2 className="mb-4 font-serif text-blue">
                Greenberg Traurig&apos;s <br /> Alumni Network
              </h2>

              <p className="mb-4 text-secondary">
                Connection and collaboration are at the heart of Greenberg Traurig&apos;s core values. Each GT attorney — no matter whether presently here or previously with the firm — is an important part of our history and our future. 
              </p>
              
              <p className="mb-5 text-secondary fw-bold">
                One firm; one team; we stay connected.
              </p>

              {/* Dead Link with preventDefault */}
              <a href="#" onClick={handleDeadClick} className="btn-premium">
                  GT ALUMNI NETWORK
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}