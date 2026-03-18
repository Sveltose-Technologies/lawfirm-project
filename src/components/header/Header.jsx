// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import React, { useEffect, useState } from "react";
// // import {
// //   getAllHomeBanners,
// //   getAllLogoTypes,
// //   getImgUrl,
// // } from "../../services/authService";

// // function Header() {
// //   const [isSticky, setIsSticky] = useState(false);
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [logoUrl, setLogoUrl] = useState(null);

// //   // Dropdown States
// //   const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
// //   const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

// //   const router = useRouter();

// //   useEffect(() => {
// //     setMounted(true);

// //     const fetchDynamicLogo = async () => {
// //       try {
// //         const [typesRes, bannersRes] = await Promise.all([
// //           getAllLogoTypes(),
// //           getAllHomeBanners(),
// //         ]);

// //         const types = typesRes.data?.data || [];
// //         const allBanners = bannersRes.data?.data || [];

// //         const logoTypeObj = types.find((t) => t.type.toLowerCase() === "logo");

// //         if (logoTypeObj) {
// //           const logoData = allBanners
// //             .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
// //             .sort((a, b) => b.id - a.id)[0];

// //           if (logoData) {
// //             setLogoUrl(logoData.image);
// //           }
// //         }
// //       } catch (err) {
// //         console.error("Dynamic Logo Fetch Error:", err);
// //       }
// //     };

// //     fetchDynamicLogo();
// //   }, []);

// //   // --- Logic Functions ---
// //   const handleMouseEnter = (type) => {
// //     if (window.innerWidth > 1199) {
// //       if (type === "about") setMobileDropdownOpen(true);
// //       if (type === "lang") setLanguageDropdownOpen(true);
// //     }
// //   };

// //   const handleMouseLeave = (type) => {
// //     if (window.innerWidth > 1199) {
// //       if (type === "about") setMobileDropdownOpen(false);
// //       if (type === "lang") setLanguageDropdownOpen(false);
// //     }
// //   };

// //   const toggleDropdownMobile = (e, type) => {
// //     e.preventDefault();
// //     if (type === "about") setMobileDropdownOpen(!mobileDropdownOpen);
// //     if (type === "lang") setLanguageDropdownOpen(!languageDropdownOpen);
// //   };

// //   useEffect(() => {
// //     const handleScroll = () => setIsSticky(window.scrollY >= 50);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     const handleRouteChange = () => {
// //       setIsOpen(false);
// //       setMobileDropdownOpen(false);
// //       setLanguageDropdownOpen(false);
// //     };
// //     router.events.on("routeChangeStart", handleRouteChange);
// //     return () => router.events.off("routeChangeStart", handleRouteChange);
// //   }, [router]);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (!event.target.closest(".dropdown")) {
// //         setMobileDropdownOpen(false);
// //         setLanguageDropdownOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const isActive = (path) => (router.pathname === path ? "active-link" : "");
// //   const isParentActive = (childPaths) =>
// //     childPaths.includes(router.pathname) ? "active-link" : "";

// //   // Hydration safety
// //   if (!mounted) return null;

// //   return (
// //     <>
// //       <style jsx global>{`
// //         .navbar-brand {
// //           flex-shrink: 0 !important;
// //           min-width: 140px;
// //           margin-right: 20px;
// //         }
// //         .login-btn-item {
// //           flex-shrink: 0 !important;
// //           margin-left: 15px !important;
// //         }
// //         @media (max-width: 1199px) {
// //           .dropdown-menu.show {
// //             position: static !important;
// //             float: none !important;
// //             width: 100% !important;
// //             background: transparent !important;
// //             border: none !important;
// //             padding-left: 20px !important;
// //             display: block !important;
// //           }
// //           .dropdown-item {
// //             color: rgba(255, 255, 255, 0.8) !important;
// //           }
// //           .dropdown-item:hover {
// //             background: transparent !important;
// //             color: #fff !important;
// //           }
// //         }
// //         .navbar-nav {
// //           align-items: center;
// //         }
// //         @media (max-width: 1199px) {
// //           .navbar-nav {
// //             align-items: flex-start !important;
// //           }
// //           .login-btn-item {
// //             margin-left: 0 !important;
// //             margin-top: 10px;
// //           }
// //         }
// //       `}</style>

// //       <header
// //         className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
// //         <nav className="navbar navbar-expand-xl navbar-dark p-2">
// //           <div className="container-fluid px-3 px-lg-4">
// //             <Link href="/">
// //               <a className="navbar-brand p-0 m-0 d-flex align-items-center">
// //                 <img
// //                   src={
// //                     logoUrl
// //                       ? getImgUrl(logoUrl)
// //                       : "/assets/images/brand-logo.png"
// //                   }
// //                   alt="Logo"
// //                   style={{
// //                     width: "160px", // Standard logo width
// //                     height: "50px",
// //                     objectFit: "contain",
// //                   }}
// //                 />
// //               </a>
// //             </Link>

// //             <button
// //               className="navbar-toggler shadow-none"
// //               type="button"
// //               onClick={() => setIsOpen(!isOpen)}>
// //               <span className="navbar-toggler-icon"></span>
// //             </button>

// //             <div
// //               className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
// //               id="mainNav">
// //               <ul className="navbar-nav ms-auto align-items-xl-center">
// //                 <li className="nav-item">
// //                   <Link href="/">
// //                     <a className={`nav-link ${isActive("/")}`}>Home</a>
// //                   </Link>
// //                 </li>

// //                 <li
// //                   className="nav-item dropdown"
// //                   onMouseEnter={() => handleMouseEnter("about")}
// //                   onMouseLeave={() => handleMouseLeave("about")}>
// //                   <a
// //                     className={`nav-link dropdown-toggle ${isParentActive(["/our-firm", "/award", "/promoters"])}`}
// //                     href="#"
// //                     onClick={(e) => toggleDropdownMobile(e, "about")}>
// //                     About
// //                   </a>
// //                   <ul
// //                     className={`dropdown-menu ${mobileDropdownOpen ? "show" : ""}`}>
// //                     <li>
// //                       <Link href="/our-firm">
// //                         <a className="dropdown-item">Our Firm</a>
// //                       </Link>
// //                     </li>
// //                     <li>
// //                       <Link href="/award">
// //                         <a className="dropdown-item">Awards & Accolades</a>
// //                       </Link>
// //                     </li>
// //                     <li>
// //                       <Link href="/promoters">
// //                         <a className="dropdown-item">Promoters</a>
// //                       </Link>
// //                     </li>
// //                   </ul>
// //                 </li>

// //                 <li className="nav-item">
// //                   <Link href="/attorneys">
// //                     <a className={`nav-link ${isActive("/attorneys")}`}>
// //                       Professionals
// //                     </a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/capability">
// //                     <a className={`nav-link ${isActive("/capability")}`}>
// //                       Capabilities
// //                     </a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/news">
// //                     <a className={`nav-link ${isActive("/news")}`}>News</a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/careers">
// //                     <a className={`nav-link ${isActive("/careers")}`}>
// //                       Careers
// //                     </a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/events">
// //                     <a className={`nav-link ${isActive("/events")}`}>Events</a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/location">
// //                     <a className={`nav-link ${isActive("/location")}`}>
// //                       Locations
// //                     </a>
// //                   </Link>
// //                 </li>
// //                 <li className="nav-item">
// //                   <Link href="/contact-us">
// //                     <a className={`nav-link ${isActive("/contact-us")}`}>
// //                       Contact Us
// //                     </a>
// //                   </Link>
// //                 </li>

// //                 <li
// //                   className="nav-item dropdown ms-xl-1"
// //                   onMouseEnter={() => handleMouseEnter("lang")}
// //                   onMouseLeave={() => handleMouseLeave("lang")}>
// //                   <a
// //                     className="nav-link dropdown-toggle"
// //                     href="#"
// //                     onClick={(e) => toggleDropdownMobile(e, "lang")}>
// //                     <i className="fas fa-globe me-1"></i> EN
// //                   </a>
// //                   <ul
// //                     className={`dropdown-menu ${languageDropdownOpen ? "show" : ""}`}
// //                     style={{ right: 0, left: "auto" }}>
// //                     <li>
// //                       <button className="dropdown-item">English</button>
// //                     </li>
// //                     <li>
// //                       <button className="dropdown-item">Hindi (हिंदी)</button>
// //                     </li>
// //                     {/* ... (other languages) */}
// //                   </ul>
// //                 </li>

// //                 <li className="nav-item ms-xl-3">
// //                   <Link href="/login-signup">
// //                     <a className="btn btn-custom">Login/Signup</a>
// //                   </Link>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </nav>
// //       </header>

// //       <div className="header-spacer"></div>
// //     </>
// //   );
// // }

// // export default Header;
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import {
//   getAllHomeBanners,
//   getAllLogoTypes,
//   getImgUrl,
// } from "../../services/authService";
// import * as authService from "../../services/authService";
// import {
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   NavItem,
//   UncontrolledDropdown,
// } from "reactstrap";
// import { toast } from "react-toastify";

// function Header() {
//   const [isSticky, setIsSticky] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [logoUrl, setLogoUrl] = useState(null);
//   const [adminImageStatus, setAdminImageStatus] = useState(false);
//   const [adminData, setAdminData] = useState(null);

//   // Dropdown States
//   const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
//   const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

//   const router = useRouter();

//   useEffect(() => {
//     const initHeader = async () => {
//       // 1. Get token synchronously (localStorage doesn't need await)
//       const token = localStorage.getItem("token");
//       console.log("token", token);

//       // 2. Only fetch profile if token exists
//       if (token) {
//         setAdminImageStatus(true);
//         try {
//           const data = await authService.getAdminProfile();
//           if (data) {
//             setAdminData(data);
//           }
//         } catch (error) {
//           console.error("Header Profile Fetch Error:", error);
//         }
//       }
//     };

//     initHeader();
//   }, [setAdminImageStatus]);

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logout Successful!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "colored", // or "light" to match your UI
//     });
//     setAdminImageStatus(false);
//     // router.push("/login-signup");
//   };

//   const profileImg = adminData?.profileImage
//     ? authService.getImgUrl(adminData.profileImage)
//     : `https://ui-avatars.com/api/?name=${adminData?.firstName || "Admin"}&background=eebb5d&color=fff`;
//   useEffect(() => {
//     setMounted(true);

//     const fetchDynamicLogo = async () => {
//       try {
//         const [typesRes, bannersRes] = await Promise.all([
//           getAllLogoTypes(),
//           getAllHomeBanners(),
//         ]);

//         const types = typesRes.data?.data || [];
//         const allBanners = bannersRes.data?.data || [];

//         const logoTypeObj = types.find((t) => t.type.toLowerCase() === "logo");

//         if (logoTypeObj) {
//           const logoData = allBanners
//             .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
//             .sort((a, b) => b.id - a.id)[0];

//           if (logoData) {
//             setLogoUrl(logoData.image);
//           }
//         }
//       } catch (err) {
//         console.error("Dynamic Logo Fetch Error:", err);
//       }
//     };

//     fetchDynamicLogo();
//   }, []);

//   // --- Logic Functions ---
//   const handleMouseEnter = (type) => {
//     if (window.innerWidth > 1199) {
//       if (type === "about") setMobileDropdownOpen(true);
//       if (type === "lang") setLanguageDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = (type) => {
//     if (window.innerWidth > 1199) {
//       if (type === "about") setMobileDropdownOpen(false);
//       if (type === "lang") setLanguageDropdownOpen(false);
//     }
//   };

//   const toggleDropdownMobile = (e, type) => {
//     e.preventDefault();
//     if (type === "about") setMobileDropdownOpen(!mobileDropdownOpen);
//     if (type === "lang") setLanguageDropdownOpen(!languageDropdownOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsSticky(window.scrollY >= 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const handleRouteChange = () => {
//       setIsOpen(false);
//       setMobileDropdownOpen(false);
//       setLanguageDropdownOpen(false);
//     };
//     router.events.on("routeChangeStart", handleRouteChange);
//     return () => router.events.off("routeChangeStart", handleRouteChange);
//   }, [router]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown")) {
//         setMobileDropdownOpen(false);
//         setLanguageDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const isActive = (path) => (router.pathname === path ? "active-link" : "");
//   const isParentActive = (childPaths) =>
//     childPaths.includes(router.pathname) ? "active-link" : "";

//   // Hydration safety
//   if (!mounted) return null;

//   return (
//     <>
//       <style jsx global>{`
//         .navbar-brand {
//           flex-shrink: 0 !important;
//           min-width: 140px;
//           margin-right: 20px;
//         }
//         .login-btn-item {
//           flex-shrink: 0 !important;
//           margin-left: 15px !important;
//         }
//         @media (max-width: 1199px) {
//           .dropdown-menu.show {
//             position: static !important;
//             float: none !important;
//             width: 100% !important;
//             background: transparent !important;
//             border: none !important;
//             padding-left: 20px !important;
//             display: block !important;
//           }
//           .dropdown-item {
//             color: rgba(255, 255, 255, 0.8) !important;
//           }
//           .dropdown-item:hover {
//             background: transparent !important;
//             color: #fff !important;
//           }
//         }
//         .navbar-nav {
//           align-items: center;
//         }
//         @media (max-width: 1199px) {
//           .navbar-nav {
//             align-items: flex-start !important;
//           }
//           .login-btn-item {
//             margin-left: 0 !important;
//             margin-top: 10px;
//           }
//         }
//       `}</style>

//       <header
//         className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
//         <nav className="navbar navbar-expand-xl navbar-dark p-2">
//           <div className="container-fluid px-3 px-lg-4">
//             <Link href="/">
//               <a className="navbar-brand p-0 m-0 d-flex align-items-center">
//                 <img
//                   src={
//                     logoUrl
//                       ? getImgUrl(logoUrl)
//                       : "/assets/images/brand-logo.png"
//                   }
//                   alt="Logo"
//                   style={{
//                     width: "160px", // Standard logo width
//                     height: "50px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </a>
//             </Link>

//             <button
//               className="navbar-toggler shadow-none"
//               type="button"
//               onClick={() => setIsOpen(!isOpen)}>
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div
//               className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
//               id="mainNav">
//               <ul className="navbar-nav ms-auto align-items-xl-center">
//                 <li className="nav-item">
//                   <Link href="/">
//                     <a className={`nav-link ${isActive("/")}`}>Home</a>
//                   </Link>
//                 </li>

//                 <li
//                   className="nav-item dropdown"
//                   onMouseEnter={() => handleMouseEnter("about")}
//                   onMouseLeave={() => handleMouseLeave("about")}>
//                   <a
//                     className={`nav-link dropdown-toggle ${isParentActive(["/our-firm", "/award", "/promoters"])}`}
//                     href="#"
//                     onClick={(e) => toggleDropdownMobile(e, "about")}>
//                     About
//                   </a>
//                   <ul
//                     className={`dropdown-menu ${mobileDropdownOpen ? "show" : ""}`}>
//                     <li>
//                       <Link href="/our-firm">
//                         <a className="dropdown-item">Our Firm</a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/award">
//                         <a className="dropdown-item">Awards & Accolades</a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/promoters">
//                         <a className="dropdown-item">Promoters</a>
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>

//                 <li className="nav-item">
//                   <Link href="/attorneys">
//                     <a className={`nav-link ${isActive("/attorneys")}`}>
//                       Professionals
//                     </a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/capability">
//                     <a className={`nav-link ${isActive("/capability")}`}>
//                       Capabilities
//                     </a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/news">
//                     <a className={`nav-link ${isActive("/news")}`}>News</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/careers">
//                     <a className={`nav-link ${isActive("/careers")}`}>
//                       Careers
//                     </a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/events">
//                     <a className={`nav-link ${isActive("/events")}`}>Events</a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/location">
//                     <a className={`nav-link ${isActive("/location")}`}>
//                       Locations
//                     </a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/contact-us">
//                     <a className={`nav-link ${isActive("/contact-us")}`}>
//                       Contact Us
//                     </a>
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link href="/admin-panel/messages">
//                     <i className="bi bi-chat-left-dots-fill fs-5 text-white"></i>
//                   </Link>
//                 </li>

//                 <li
//                   className="nav-item dropdown ms-xl-1"
//                   onMouseEnter={() => handleMouseEnter("lang")}
//                   onMouseLeave={() => handleMouseLeave("lang")}>
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     onClick={(e) => toggleDropdownMobile(e, "lang")}>
//                     <i className="fas fa-globe me-1"></i> EN
//                   </a>
//                   <ul
//                     className={`dropdown-menu ${languageDropdownOpen ? "show" : ""}`}
//                     style={{ right: 0, left: "auto" }}>
//                     <li>
//                       <button className="dropdown-item">English</button>
//                     </li>
//                     <li>
//                       <button className="dropdown-item">Hindi (हिंदी)</button>
//                     </li>
//                     {/* ... (other languages) */}
//                   </ul>
//                 </li>

//                 {adminImageStatus ? (
//                   <UncontrolledDropdown nav inNavbar>
//                     <DropdownToggle
//                       nav
//                       className="d-flex align-items-center gap-2 p-0">
//                       <img
//                         src={profileImg}
//                         className="rounded-circle border"
//                         width="38"
//                         height="38"
//                         style={{ objectFit: "cover" }}
//                         alt="profile"
//                       />
//                     </DropdownToggle>

//                     <DropdownMenu
//                       end
//                       className="shadow border-0 mt-2 rounded-3 bg-white"
//                       style={{ minWidth: "160px" }}>
//                       <DropdownItem
//                         tag={Link}
//                         href="/admin-panel/profile"
//                         className="text-dark d-flex align-items-center gap-2 py-2">
//                         {/* Wrap children in a single container to fix the error */}
//                         <span className="d-flex align-items-center gap-2">
//                           <i className="bi bi-speedometer2"></i>
//                           <span>Dashboard</span>
//                         </span>
//                       </DropdownItem>

//                       <DropdownItem divider className="my-1" />

//                       <DropdownItem
//                         onClick={handleLogout}
//                         className="text-danger d-flex align-items-center gap-2 py-2">
//                         <i className="bi bi-box-arrow-left"></i>
//                         <span>Logout</span>
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </UncontrolledDropdown>
//                 ) : (
//                   <NavItem className="ms-xl-3 list-unstyled">
//                     <li className="nav-item ms-xl-3">
//                       <Link href="/login-signup">
//                         <a className="btn btn-custom">Login/Signup</a>
//                       </Link>
//                     </li>
//                   </NavItem>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="header-spacer"></div>
//     </>
//   );
// }

// export default Header;

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllHomeBanners,
  getAllLogoTypes,
  getImgUrl,
} from "../../services/authService";
import * as authService from "../../services/authService";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  UncontrolledDropdown,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import { toast } from "react-toastify";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [adminData, setAdminData] = useState(null);

  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const initHeader = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await authService.getAdminProfile();
          if (data) {
            setAdminData(data);
          }
        } catch (error) {
          console.error("Header Profile Fetch Error:", error);
        }
      }
    };
    initHeader();
  }, []);

  useEffect(() => {
    setMounted(true);
    const fetchDynamicLogo = async () => {
      try {
        const [typesRes, bannersRes] = await Promise.all([
          authService.getAllLogoTypes(),
          authService.getAllHomeBanners(),
        ]);
        const types = typesRes.data?.data || [];
        const allBanners = bannersRes.data?.data || [];
        const logoTypeObj = types.find((t) => t.type.toLowerCase() === "logo");
        if (logoTypeObj) {
          const logoData = allBanners
            .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
            .sort((a, b) => b.id - a.id)[0];
          if (logoData) {
            setLogoUrl(logoData.image);
          }
        }
      } catch (err) {
        console.error("Dynamic Logo Fetch Error:", err);
      }
    };
    fetchDynamicLogo();

    const handleScroll = () => setIsSticky(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    setAdminData(null);
  };

  const isActive = (path) => (router.pathname === path ? "active-link" : "");

  if (!mounted) return null;

  const profileImg = adminData?.profileImage
    ? authService.getImgUrl(adminData.profileImage)
    : `https://ui-avatars.com/api/?name=${adminData?.firstName || "Admin"}&background=eebb5d&color=fff`;

  return (
    <>
      <style jsx global>{`
        .header-main {
          transition: all 0.3s ease;
        }
        .header-sticky {
          background: #1b1b22 !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        .nav-link {
          color: #fff !important;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }
        .active-link {
          color: #dea054 !important;
        }
        .dropdown-menu {
          background: #27272e;
          border: 1px solid #444;
        }
        .dropdown-item {
          color: #fff !important;
        }
        .dropdown-item:hover {
          background: #dea054 !important;
          color: #fff !important;
        }

        @media (max-width: 1199px) {
          .navbar-collapse {
            background: #1b1b22;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
          }
          .nav-item {
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            width: 100%;
          }
          .nav-link {
            padding: 12px 5px !important;
          }
        }
      `}</style>

      <header
        className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
        <Navbar expand="xl" dark className="p-2 container-fluid px-3 px-lg-4">
          <NavbarBrand tag={Link} href="/">
            <a className="p-0 m-0 d-flex align-items-center">
              <img
                src={
                  logoUrl
                    ? authService.getImgUrl(logoUrl)
                    : "/assets/images/brand-logo.png"
                }
                alt="Logo"
                style={{ width: "160px", height: "50px", objectFit: "contain" }}
              />
            </a>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} className="shadow-none border-0" />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto align-items-xl-center" navbar>
              <NavItem>
                <Link href="/">
                  <a className={`nav-link ${isActive("/")}`}>Home</a>
                </Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  className={
                    ["/our-firm", "/award", "/promoters"].includes(
                      router.pathname,
                    )
                      ? "active-link"
                      : ""
                  }>
                  About
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} href="/our-firm">
                    <a className="dropdown-item">Our Firm</a>
                  </DropdownItem>
                  <DropdownItem tag={Link} href="/award">
                    <a className="dropdown-item">Awards</a>
                  </DropdownItem>
                  <DropdownItem tag={Link} href="/promoters">
                    <a className="dropdown-item">Promoters</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <Link href="/attorneys">
                  <a className={`nav-link ${isActive("/attorneys")}`}>
                    Professionals
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/capability">
                  <a className={`nav-link ${isActive("/capability")}`}>
                    Capabilities
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/news">
                  <a className={`nav-link ${isActive("/news")}`}>News</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/careers">
                  <a className={`nav-link ${isActive("/careers")}`}>Careers</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/events">
                  <a className={`nav-link ${isActive("/events")}`}>Events</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/location">
                  <a className={`nav-link ${isActive("/location")}`}>
                    Locations
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/contact-us">
                  <a className={`nav-link ${isActive("/contact-us")}`}>
                    Contact Us
                  </a>
                </Link>
              </NavItem>

              {/* Chat Icon */}
              <NavItem className="px-xl-2">
                <Link href="/admin-panel/messages">
                  <a className="nav-link">
                    <i className="bi bi-chat-left-dots-fill fs-5"></i>
                  </a>
                </Link>
              </NavItem>

              {/* Language Selector */}
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fas fa-globe me-1"></i> EN
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>English</DropdownItem>
                  <DropdownItem>Hindi (हिंदी)</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              {/* Profile / Auth Section */}
              {adminData ? (
                <UncontrolledDropdown nav inNavbar className="ms-xl-3">
                  <DropdownToggle nav className="p-0">
                    <img
                      src={profileImg}
                      className="rounded-circle border"
                      width="38"
                      height="38"
                      style={{ objectFit: "cover" }}
                      alt="profile"
                    />
                  </DropdownToggle>
                  <DropdownMenu right className="shadow border-0 mt-2">
                    <DropdownItem tag={Link} href="/admin-panel/profile">
                      <span className="align-items-center gap-2 text-white ps-4">
                         Dashboard
                      </span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={handleLogout}
                      className="text-danger d-flex align-items-center gap-2">
                      <i className="bi bi-box-arrow-left"></i> Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem className="ms-xl-3">
                  <Link href="/login-signup">
                    <a className="btn btn-custom px-4">Login/Signup</a>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </header>

    </>
  );
}

export default Header;