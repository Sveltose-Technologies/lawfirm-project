// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import * as authService from "../services/authService";
// function Footer() {
//   const router = useRouter();
//   const [socialLinks, setSocialLinks] = useState(null);
// const [cities, setCities] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const [socialRes, cityRes] = await Promise.all([
//         getAllSocialMedia(),
//         authService.getAllLocationCities(), // 👈 ye add karo
//       ]);

//       if (socialRes?.success && socialRes.data?.length > 0) {
//         setSocialLinks(socialRes.data[0]);
//       }

//       const allCities = cityRes?.data || cityRes || [];
//       setCities(Array.isArray(allCities) ? allCities : []);
//     } catch (error) {
//       console.error("Footer Data Error:", error);
//     }
//   };

//   fetchData();
// }, []);
//   // Active Link Helper
//   const isActive = (path) => {
//     return router.pathname === path ? "text-warning" : "";
//   };

//   // Fetch Social Media Data
//   useEffect(() => {
//     const fetchSocial = async () => {
//       try {
//         const res = await getAllSocialMedia();
//         if (res?.success && res.data?.length > 0) {
//           setSocialLinks(res.data[0]);
//           console.log("Footer Social Links Loaded:", res.data[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching social links for footer:", error);
//       }
//     };
//     fetchSocial();
//   }, []);
// const createSlug = (text) =>
//   text
//     ?.toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "");
//   return (
//     <>
//       <footer className="footer-section pt-5">
//         <div className="footer-top">
//           <div className="container-xl container-lg-fluid container">
//             <div className="row gy-5">
//               {/* Column 1: About & Global Presence */}
//               <div className="col-lg-3 col-md-6">
//                 <div className="footer-about">
//                   <img
//                     src="/assets/images/brand-logo.png"
//                     alt="NRIS Law Firm"
//                   />
//                   <p>
//                     NRIS LAW FIRM
//                     <br />
//                     Attorney Advertising.
//                     <br />
//                     All rights reserved.
//                   </p>
//                   <ul className="footer-social gap-4">
//                     <li>
//                       <a
//                         href={socialLinks?.facebookUrl || "#"}
//                         target="_blank"
//                         rel="noreferrer">
//                         <i className="bx bxl-facebook" />
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href={socialLinks?.twitterUrl || "#"}
//                         target="_blank"
//                         rel="noreferrer">
//                         <i className="bx bxl-twitter" />
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href={socialLinks?.instagramUrl || "#"}
//                         target="_blank"
//                         rel="noreferrer">
//                         <i className="bx bxl-instagram" />
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href={socialLinks?.linkedinUrl || "#"}
//                         target="_blank"
//                         rel="noreferrer">
//                         <i className="bx bxl-linkedin" />
//                       </a>
//                     </li>
//                   </ul>

//                   <div className="open-hour">
//                     <h6>Global Presence</h6>
//                     <ul className="list-unstyled p-0 m-0 d-flex flex-wrap gap-2">
//                       {cities.map((city, index) => (
//                         <li key={city.id}>
//                           <Link href={`/location/${createSlug(city.cityName)}`}>
//                             <a className="text-white text-decoration-none hover-gold">
//                               {city.cityName}
//                               {index < cities.length - 1 ? "," : ""}
//                             </a>
//                           </Link>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Column 2: Important Links */}
//               <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
//                 <div className="footer-item">
//                   <h4>Important Links</h4>
//                   <ul className="link-list">
//                     <li>
//                       <Link href="/attorneys">
//                         <a className={`footer-link`}>Professionals</a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/capability">
//                         <a className={`footer-link`}>Capabilities</a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/news">
//                         <a className={`footer-link`}>News</a>
//                       </Link>
//                     </li>
//                     {/* <li>
//                       <Link href="/faq">
//                         <a className={`footer-link`}>FAQ</a>
//                       </Link>
//                     </li> */}
//                     <li>
//                       <Link href="/contact">
//                         <a className={`footer-link`}>Contact Us</a>
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Column 3: Contact Us */}
//               <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
//                 <div className="footer-item">
//                   <h4>Contact Us</h4>
//                   <ul className="contact-list">
//                     <li>
//                       <div className="icon">
//                         <svg
//                           width={23}
//                           height={23}
//                           viewBox="0 0 23 23"
//                           xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_169_19583)">
//                             <path d="M18.1771 14.2474C17.7063 13.7571 17.1383 13.495 16.5364 13.495C15.9393 13.495 15.3665 13.7523 14.8762 14.2425L13.3422 15.7716C13.216 15.7037 13.0898 15.6406 12.9684 15.5775C12.7937 15.4901 12.6286 15.4076 12.4879 15.3202C11.051 14.4076 9.74519 13.2183 8.49278 11.6795C7.88599 10.9125 7.47823 10.2669 7.18212 9.61153C7.58017 9.24745 7.9491 8.86882 8.30832 8.50475C8.44424 8.36882 8.58016 8.22805 8.71608 8.09213C9.73548 7.07272 9.73548 5.75235 8.71608 4.73295L7.39085 3.40772C7.24037 3.25724 7.08503 3.1019 6.9394 2.94656C6.64814 2.6456 6.34232 2.33492 6.02679 2.04366C5.55592 1.57765 4.99282 1.33008 4.4006 1.33008C3.80837 1.33008 3.23556 1.57765 2.75013 2.04366C2.74528 2.04852 2.74528 2.04852 2.74043 2.05337L1.08996 3.7184C0.46861 4.33975 0.114245 5.09702 0.0365763 5.97565C-0.079927 7.39311 0.337543 8.71348 0.657928 9.57755C1.44433 11.6989 2.61907 13.6649 4.37147 15.7716C6.49766 18.3104 9.05588 20.3153 11.9782 21.7279C13.0947 22.257 14.5849 22.8832 16.25 22.99C16.3519 22.9949 16.4587 22.9997 16.5558 22.9997C17.6771 22.9997 18.6189 22.5968 19.3567 21.7958C19.3616 21.7861 19.3713 21.7813 19.3761 21.7716C19.6286 21.4657 19.9198 21.1891 20.2256 20.8929C20.4344 20.6939 20.648 20.4852 20.8567 20.2667C21.3373 19.7667 21.5897 19.1842 21.5897 18.5871C21.5897 17.9852 21.3324 17.4075 20.8421 16.9221L18.1771 14.2474ZM19.915 19.359C19.9101 19.359 19.9101 19.3638 19.915 19.359C19.7256 19.5629 19.5315 19.7473 19.3227 19.9512C19.0072 20.2522 18.6868 20.5677 18.3859 20.9221C17.8956 21.4463 17.3179 21.6939 16.5606 21.6939C16.4878 21.6939 16.4102 21.6939 16.3373 21.689C14.8956 21.5968 13.5558 21.0337 12.551 20.5531C9.80344 19.2231 7.39085 17.3347 5.38602 14.9416C3.7307 12.9464 2.62392 11.1018 1.89092 9.12124C1.43947 7.91252 1.27442 6.97078 1.34724 6.08245C1.39578 5.51449 1.61423 5.04362 2.01713 4.64072L3.67245 2.9854C3.91031 2.7621 4.16274 2.64074 4.41031 2.64074C4.71613 2.64074 4.9637 2.82521 5.11904 2.98054C5.12389 2.9854 5.12874 2.99025 5.1336 2.99511C5.42971 3.2718 5.71126 3.55821 6.00737 3.86403C6.15786 4.01937 6.31319 4.1747 6.46853 4.3349L7.79376 5.66012C8.30832 6.17468 8.30832 6.6504 7.79376 7.16496C7.65298 7.30573 7.51706 7.44651 7.37629 7.58243C6.96853 7.9999 6.58018 8.38824 6.15786 8.76688C6.14815 8.77659 6.13844 8.78144 6.13359 8.79115C5.71611 9.20862 5.79378 9.61638 5.88116 9.89308C5.88602 9.90764 5.89087 9.9222 5.89572 9.93677C6.24038 10.7717 6.72581 11.5581 7.46367 12.495L7.46852 12.4998C8.80831 14.1503 10.2209 15.4367 11.7791 16.4221C11.9782 16.5483 12.1821 16.6503 12.3762 16.7474C12.551 16.8347 12.716 16.9173 12.8568 17.0046C12.8762 17.0143 12.8956 17.0289 12.9151 17.0386C13.0801 17.1211 13.2354 17.16 13.3956 17.16C13.7985 17.16 14.051 16.9076 14.1335 16.825L15.7937 15.1649C15.9587 14.9998 16.2208 14.8008 16.5267 14.8008C16.8276 14.8008 17.0752 14.9901 17.2257 15.1551C17.2305 15.16 17.2305 15.16 17.2354 15.1649L19.9101 17.8396C20.4101 18.3347 20.4101 18.8444 19.915 19.359Z" />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_169_19583">
//                               <rect width={23} height={23} fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="text">
//                         <a href="#">Contact Us</a>
//                         <a href="#" className="mb-0">
//                           Global Offices
//                         </a>
//                       </div>
//                     </li>
//                     {/* ... other contact list items ... */}
//                     <li>
//                       <div className="icon">
//                         <svg
//                           width={23}
//                           height={23}
//                           viewBox="0 0 23 23"
//                           xmlns="http://www.w3.org/2000/svg">
//                           <g clipPath="url(#clip0_169_19592)">
//                             <path d="M20.7988 2.91992H2.11134C0.922305 2.91992 -0.0449219 3.88715 -0.0449219 5.07619V18.0137C-0.0449219 19.2027 0.922305 20.1699 2.11134 20.1699H20.7988C21.9879 20.1699 22.9551 19.2027 22.9551 18.0137V5.07619C22.9551 3.88715 21.9879 2.91992 20.7988 2.91992ZM20.7988 4.35742C20.8965 4.35742 20.9894 4.37768 21.0743 4.41306L11.4551 12.7501L1.83581 4.41306C1.92074 4.37772 2.01364 4.35742 2.11129 4.35742H20.7988ZM20.7988 18.7324H2.11134C1.71477 18.7324 1.39257 18.4103 1.39257 18.0136V5.93179L10.9841 14.2444C11.1196 14.3616 11.2873 14.4199 11.4551 14.4199C11.6228 14.4199 11.7906 14.3617 11.9261 14.2444L21.5176 5.93179V18.0137C21.5175 18.4103 21.1954 18.7324 20.7988 18.7324Z" />
//                           </g>
//                           <defs>
//                             <clipPath id="clip0_169_19592">
//                               <rect width={23} height={23} fill="white" />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </div>
//                       <div className="text">
//                         <a href="#">Alumni Network</a>
//                         <a href="#" className="mb-0">
//                           info@nrislawfirm.com
//                         </a>
//                       </div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Column 4: Office Highlights */}
//               <div className="col-lg-3 col-md-6 d-flex justify-content-lg-end">
//                 <div className="footer-item">
//                   <h4>Office Highlights</h4>
//                   <ul className="recent-caselist">
//                     <li>
//                       <div className="image">
//                         <img
//                           src="/assets/images/blog/recent-case2.png"
//                           alt="image"
//                         />
//                       </div>
//                       <div className="text">
//                         <span>Europe</span>
//                         <h5>
//                           <Link href="#">
//                             <a>Berlin Office</a>
//                           </Link>
//                         </h5>
//                       </div>
//                     </li>
//                     <li>
//                       <div className="image">
//                         <img
//                           src="/assets/images/blog/recent-case2.png"
//                           alt="image"
//                         />
//                       </div>
//                       <div className="text">
//                         <span>Asia</span>
//                         <h5>
//                           <Link href="#">
//                             <a>Seoul Office</a>
//                           </Link>
//                         </h5>
//                       </div>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="container mt-4">
//           <div className="footer-bottom pt-4 pb-3">
//             <div className="row d-flex align-items-center g-3">
//               <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center text-lg-start text-center">
//                 <p className="mb-0">
//                   ©2025 NRIS LAW FIRM LLP All rights reserved.
//                 </p>
//               </div>
//               <div className="col-lg-4 d-flex justify-content-center align-items-center">
//                 <ul className="f-bottom-list d-flex justify-content-center align-items-center mb-0">
//                   <li>
//                     <Link href="/term-condition">Terms of Use</Link>
//                     <span className="mx-2">|</span>
//                   </li>
//                   <li>
//                     <Link href="/private-policy">Privacy Notice</Link>
//                     <span className="mx-2">|</span>
//                   </li>
//                   <li>
//                     <Link href="#">Cookie Settings</Link>
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-lg-4 d-flex justify-content-lg-end justify-content-center text-lg-end text-center">
//                 <p className="mb-0">
//                   Powered by <Link href="#">Cintrox</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }

// export default Footer;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as authService from "../services/authService";

function Footer() {
  const router = useRouter();
  const [socialLinks, setSocialLinks] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [socialRes, cityRes] = await Promise.all([
          authService.getAllSocialMedia(),
          authService.getAllLocationCities(),
        ]);

        // Social Media
        if (socialRes?.success && socialRes?.data?.length > 0) {
          setSocialLinks(socialRes.data[0]);
        }

        // Cities (safe parsing)
        const allCities = cityRes?.data?.data || cityRes?.data || cityRes || [];

        setCities(Array.isArray(allCities) ? allCities : []);
      } catch (error) {
        console.error("Footer Data Error:", error);
      }
    };

    fetchData();
  }, []);

  const createSlug = (text) =>
    text
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  return (
    <>
      <footer className="footer-section pt-5">
        <div className="footer-top">
          <div className="container-xl container-lg-fluid container">
            <div className="row gy-5">
              {/* Column 1 */}
              <div className="col-lg-3 col-md-6">
                <div className="footer-about">
                  <img
                    src="/assets/images/brand-logo.png"
                    alt="NRIS Law Firm"
                  />
                  <p>
                    NRIS LAW FIRM
                    <br />
                    Attorney Advertising.
                    <br />
                    All rights reserved.
                  </p>

                  <ul className="footer-social gap-4">
                    <li>
                      <a
                        href={socialLinks?.facebookUrl || "#"}
                        target="_blank"
                        rel="noreferrer">
                        <i className="bx bxl-facebook" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={socialLinks?.twitterUrl || "#"}
                        target="_blank"
                        rel="noreferrer">
                        <i className="bx bxl-twitter" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={socialLinks?.instagramUrl || "#"}
                        target="_blank"
                        rel="noreferrer">
                        <i className="bx bxl-instagram" />
                      </a>
                    </li>
                    <li>
                      <a
                        href={socialLinks?.linkedinUrl || "#"}
                        target="_blank"
                        rel="noreferrer">
                        <i className="bx bxl-linkedin" />
                      </a>
                    </li>
                  </ul>

                  <div className="open-hour">
                    <h6>Global Presence</h6>
                    <ul className="list-unstyled p-0 m-0 d-flex flex-wrap gap-2">
                      {cities.map((city, index) => (
                        <li key={city.id || city._id}>
                          <Link href={`/location/${createSlug(city.cityName)}`}>
                            <a className="text-white text-decoration-none hover-gold">
                              {city.cityName}
                              {index < cities.length - 1 ? "," : ""}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h4>Important Links</h4>
                  <ul className="link-list">
                    <li>
                      <Link href="/attorneys">
                        <a className="footer-link">Professionals</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/capability">
                        <a className="footer-link">Capabilities</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/news">
                        <a className="footer-link">News</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        <a className="footer-link">Contact Us</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3 */}
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-center">
                <div className="footer-item">
                  <h4>Contact Us</h4>
                  <ul className="contact-list">
                    <li>
                      <div className="text">
                        <a href="#">Contact Us</a>
                        <a href="#" className="mb-0">
                          Global Offices
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="text">
                        <a href="#">Alumni Network</a>
                        <a href="#" className="mb-0">
                          info@nrislawfirm.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 4 */}
              <div className="col-lg-3 col-md-6 d-flex justify-content-lg-end">
                <div className="footer-item">
                  <h4>Office Highlights</h4>
                  <ul className="recent-caselist">
                    <li>
                      <div className="image">
                        <img
                          src="/assets/images/blog/recent-case2.png"
                          alt="image"
                        />
                      </div>
                      <div className="text">
                        <span>Europe</span>
                        <h5>
                          <Link href="#">
                            <a>Berlin Office</a>
                          </Link>
                        </h5>
                      </div>
                    </li>
                    <li>
                      <div className="image">
                        <img
                          src="/assets/images/blog/recent-case2.png"
                          alt="image"
                        />
                      </div>
                      <div className="text">
                        <span>Asia</span>
                        <h5>
                          <Link href="#">
                            <a>Seoul Office</a>
                          </Link>
                        </h5>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-4">
          <div className="footer-bottom pt-4 pb-3">
            <div className="row d-flex align-items-center g-3">
              <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center text-lg-start text-center">
                <p className="mb-0">
                  ©2025 NRIS LAW FIRM LLP All rights reserved.
                </p>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <ul className="f-bottom-list d-flex justify-content-center align-items-center mb-0">
                  <li>
                    <Link href="/term-condition">Terms of Use</Link>
                    <span className="mx-2">|</span>
                  </li>
                  <li>
                    <Link href="/private-policy">Privacy Notice</Link>
                    <span className="mx-2">|</span>
                  </li>
                  <li>
                    <Link href="#">Cookie Settings</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 d-flex justify-content-lg-end justify-content-center text-lg-end text-center">
                <p className="mb-0">
                  Powered by <Link href="#">Cintrox</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;