// "use client";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import {
//   getAllHomeBanners,
//   getAllLogoTypes,
//   getImgUrl,
// } from "../../services/authService";
// import * as authService from "../../services/authService";
// import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
// import { toast } from "react-toastify";

// function Header() {
//   const [isSticky, setIsSticky] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [logoUrl, setLogoUrl] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [role, setRole] = useState(null);

//   const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
//   const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

//   const router = useRouter();

//   // Helper to apply your .active-link class
//   const isActive = (path) => (router.pathname === path ? "active-link" : "");

//   // Logic for About Dropdown Parent color
//   const isAboutActive = ["/our-firm", "/award", "/promoters"].includes(
//     router.pathname,
//   )
//     ? "active-link"
//     : "";

//   useEffect(() => {
//     const initHeader = async () => {
//       const token = localStorage.getItem("token");
//       const storedRole = localStorage.getItem("role");
//       const storedUser = localStorage.getItem("user");

//       setRole(storedRole);

//       if (token) {
//         setIsLoggedIn(true);
//         try {
//           let response;
//           if (storedRole === "admin") {
//             response = await authService.getAdminProfile();
//           } else {
//             const parsedUser = JSON.parse(storedUser);
//             response = await authService.getUserProfile(parsedUser?.id);
//           }

//           const data =
//             response?.admin ||
//             response?.attorney ||
//             response?.user ||
//             response?.data?.admin ||
//             response?.data?.attorney ||
//             response?.data?.user ||
//             response;

//           if (data) setUserData(data);
//         } catch (error) {
//           console.error("Profile Fetch Error:", error);
//         }
//       }
//     };
//     initHeader();
//   }, []);

//   const getDashboardLink = () => {
//     if (role === "admin") return "/admin-panel/";
//     if (role === "attorney") return "/attorney-panel/";
//     return "/client-panel/";
//   };

//   const getProfileImage = () => {
//     if (userData?.profileImage) {
//       return authService.getImgUrl(userData.profileImage);
//     }
//     const name = userData?.firstName || role || "User";
//     return `https://ui-avatars.com/api/?name=${name}&background=eebb5d&color=fff`;
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.success("Logout Successful!");
//     setIsLoggedIn(false);
//     router.push("/login-signup");
//   };

//   useEffect(() => {
//     setMounted(true);
//     const fetchDynamicLogo = async () => {
//       try {
//         const [typesRes, bannersRes] = await Promise.all([
//           getAllLogoTypes(),
//           getAllHomeBanners(),
//         ]);
//         const logoTypeObj = (typesRes.data?.data || []).find(
//           (t) => t.type.toLowerCase() === "logo",
//         );
//         if (logoTypeObj) {
//           const logoData = (bannersRes.data?.data || [])
//             .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
//             .sort((a, b) => b.id - a.id)[0];
//           if (logoData) setLogoUrl(logoData.image);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDynamicLogo();
//   }, []);

//   const handleMouseEnter = (type) => {
//     if (window.innerWidth > 1199)
//       type === "about"
//         ? setMobileDropdownOpen(true)
//         : setLanguageDropdownOpen(true);
//   };
//   const handleMouseLeave = (type) => {
//     if (window.innerWidth > 1199)
//       type === "about"
//         ? setMobileDropdownOpen(false)
//         : setLanguageDropdownOpen(false);
//   };
//   const toggleDropdownMobile = (e, type) => {
//     e.preventDefault();
//     type === "about"
//       ? setMobileDropdownOpen(!mobileDropdownOpen)
//       : setLanguageDropdownOpen(!languageDropdownOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => setIsSticky(window.scrollY >= 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       <header
//         className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
//         <nav className="navbar navbar-expand-xl navbar-dark p-2">
//           <div className="container-fluid px-3 px-lg-4">
//             <Link href="/">
//               <a className="navbar-brand">
//                 <img
//                   src={
//                     logoUrl
//                       ? getImgUrl(logoUrl)
//                       : "/assets/images/brand-logo.png"
//                   }
//                   alt="Logo"
//                   style={{
//                     width: "160px",
//                     height: "50px",
//                     objectFit: "contain",
//                   }}
//                 />
//               </a>
//             </Link>

//             <button
//               className="navbar-toggler"
//               type="button"
//               onClick={() => setIsOpen(!isOpen)}>
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
//               <ul className="navbar-nav ms-auto align-items-center">
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
//                     className={`nav-link dropdown-toggle ${isAboutActive}`}
//                     href="#"
//                     onClick={(e) => toggleDropdownMobile(e, "about")}>
//                     About
//                   </a>
//                   <ul
//                     className={`dropdown-menu ${mobileDropdownOpen ? "show" : ""}`}>
//                     <li>
//                       <Link href="/our-firm">
//                         <a className={`dropdown-item ${isActive("/our-firm")}`}>
//                           Our Firm
//                         </a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/award">
//                         <a className={`dropdown-item ${isActive("/award")}`}>
//                           Awards
//                         </a>
//                       </Link>
//                     </li>
//                     <li>
//                       <Link href="/promoters">
//                         <a
//                           className={`dropdown-item ${isActive("/promoters")}`}>
//                           Promoters
//                         </a>
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

//                 <li
//                   className="nav-item dropdown"
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
//                       <button className="dropdown-item border-0 bg-transparent">
//                         English
//                       </button>
//                     </li>
//                     <li>
//                       <button className="dropdown-item border-0 bg-transparent">
//                         Hindi (हिंदी)
//                       </button>
//                     </li>
//                   </ul>
//                 </li>

//                 {isLoggedIn ? (
//                   <UncontrolledDropdown nav inNavbar className="ms-xl-3">
//                     <DropdownToggle nav className="p-0 border-0 bg-transparent">
//                       <img
//                         src={getProfileImage()}
//                         className="rounded-circle border border-2 border-warning shadow-sm"
//                         width="40"
//                         height="40"
//                         style={{ objectFit: "cover", aspectRatio: "1/1" }}
//                         alt="profile"
//                       />
//                     </DropdownToggle>
//                     <DropdownMenu
//                       end
//                       className="profile-dropdown-menu shadow border-0 mt-2">
//                       <Link href={getDashboardLink()}>
//                         <a className="dropdown-item py-2">Dashboard</a>
//                       </Link>
//                       <div className="dropdown-divider"></div>
//                       <button
//                         onClick={handleLogout}
//                         className="dropdown-item text-danger py-2 border-0 bg-transparent w-100 text-start">
//                         Logout
//                       </button>
//                     </DropdownMenu>
//                   </UncontrolledDropdown>
//                 ) : (
//                   <li className="nav-item ms-xl-3">
//                     <Link href="/login-signup">
//                       <a className="btn btn-warning px-4 py-2">Login/Signup</a>
//                     </Link>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }
// export default Header;

"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllHomeBanners,
  getAllLogoTypes,
  getImgUrl,
} from "../../services/authService";
import * as authService from "../../services/authService";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { toast } from "react-toastify";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState(null);

  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const router = useRouter();

  // Auto-close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileDropdownOpen(false);
    setLanguageDropdownOpen(false);
  }, [router.pathname]);

  const isActive = (path) => (router.pathname === path ? "active-link" : "");
  const isAboutActive = ["/our-firm", "/award", "/promoters"].includes(
    router.pathname,
  )
    ? "active-link"
    : "";

  useEffect(() => {
    const initHeader = async () => {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");
      const storedUser = localStorage.getItem("user");
      setRole(storedRole);

      if (token) {
        setIsLoggedIn(true);
        try {
          let response;
          if (storedRole === "admin") {
            response = await authService.getAdminProfile();
          } else {
            const parsedUser = storedUser ? JSON.parse(storedUser) : null;
            response = await authService.getUserProfile(parsedUser?.id);
          }
          const data =
            response?.admin ||
            response?.attorney ||
            response?.user ||
            response?.data?.admin ||
            response?.data?.attorney ||
            response?.data?.user ||
            response;
          if (data) setUserData(data);
        } catch (error) {
          console.error("Profile Fetch Error:", error);
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
          getAllLogoTypes(),
          getAllHomeBanners(),
        ]);
        const logoTypeObj = (typesRes.data?.data || []).find(
          (t) => t.type.toLowerCase() === "logo",
        );
        if (logoTypeObj) {
          const logoData = (bannersRes.data?.data || [])
            .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
            .sort((a, b) => b.id - a.id)[0];
          if (logoData) setLogoUrl(logoData.image);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDynamicLogo();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    setIsLoggedIn(false);
    router.push("/login-signup");
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`fixed-top w-100 bg-black ${isSticky ? "shadow-lg" : ""}`}
      style={{ transition: "0.3s" }}>
      <nav className="navbar navbar-expand-xl navbar-dark p-2">
        <div className="container-fluid px-3 px-lg-4">
          <Link href="/">
            <a className="navbar-brand">
              <img
                src={
                  logoUrl ? getImgUrl(logoUrl) : "/assets/images/brand-logo.png"
                }
                alt="Logo"
                style={{ width: "160px", height: "50px", objectFit: "contain" }}
              />
            </a>
          </Link>

          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <span
                className="text-white fs-1"
                style={{ lineHeight: 0, display: "block", marginTop: "-5px" }}>
                &times;
              </span>
            ) : (
              <span className="navbar-toggler-icon"></span>
            )}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-center text-center text-xl-start">
              <li className="nav-item">
                <Link href="/">
                  <a className={`nav-link ${isActive("/")}`}>Home</a>
                </Link>
              </li>

              <li
                className="nav-item dropdown w-100 w-xl-auto"
                onMouseEnter={() =>
                  window.innerWidth > 1199 && setMobileDropdownOpen(true)
                }
                onMouseLeave={() =>
                  window.innerWidth > 1199 && setMobileDropdownOpen(false)
                }>
                <a
                  className={`nav-link dropdown-toggle ${isAboutActive}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileDropdownOpen(!mobileDropdownOpen);
                  }}>
                  About
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-dark border-0 shadow ${mobileDropdownOpen ? "show" : ""}`}>
                  <li>
                    <Link href="/our-firm">
                      <a className={`dropdown-item ${isActive("/our-firm")}`}>
                        Our Firm
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/award">
                      <a className={`dropdown-item ${isActive("/award")}`}>
                        Awards
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/promoters">
                      <a className={`dropdown-item ${isActive("/promoters")}`}>
                        Promoters
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link href="/attorneys">
                  <a className={`nav-link ${isActive("/attorneys")}`}>
                    Professionals
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/capability">
                  <a className={`nav-link ${isActive("/capability")}`}>
                    Capabilities
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/news">
                  <a className={`nav-link ${isActive("/news")}`}>News</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/careers">
                  <a className={`nav-link ${isActive("/careers")}`}>Careers</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/events">
                  <a className={`nav-link ${isActive("/events")}`}>Events</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/location">
                  <a className={`nav-link ${isActive("/location")}`}>
                    Locations
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact-us">
                  <a className={`nav-link ${isActive("/contact-us")}`}>
                    Contact Us
                  </a>
                </Link>
              </li>

              <li
                className="nav-item dropdown w-100 w-xl-auto"
                onMouseEnter={() =>
                  window.innerWidth > 1199 && setLanguageDropdownOpen(true)
                }
                onMouseLeave={() =>
                  window.innerWidth > 1199 && setLanguageDropdownOpen(false)
                }>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLanguageDropdownOpen(!languageDropdownOpen);
                  }}>
                  <i className="fas fa-globe me-1"></i> EN
                </a>
                <ul
                  className={`dropdown-menu dropdown-menu-dark dropdown-menu-end border-0 shadow ${languageDropdownOpen ? "show" : ""}`}>
                  <li>
                    <button className="dropdown-item border-0 bg-transparent w-100 text-center text-xl-start">
                      English
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item border-0 bg-transparent w-100 text-center text-xl-start">
                      Hindi (हिंदी)
                    </button>
                  </li>
                </ul>
              </li>

              {/* AUTH SECTION - FIXED POSITION AND SIZE */}
              {isLoggedIn ? (
                <li className="nav-item ms-xl-3 py-2 py-xl-0">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav className="p-0 border-0 bg-transparent">
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "inline-block",
                        }}>
                        <img
                          src={
                            userData?.profileImage
                              ? authService.getImgUrl(userData.profileImage)
                              : `https://ui-avatars.com/api/?name=${userData?.firstName || role || "User"}&background=eebb5d&color=fff`
                          }
                          className="rounded-circle border border-2 border-warning shadow-sm"
                          alt="profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    </DropdownToggle>
                    <DropdownMenu
                      end
                      className="dropdown-menu-dark border-0 shadow mt-2">
                      <Link
                        href={
                          role === "admin"
                            ? "/admin-panel/"
                            : role === "attorney"
                              ? "/attorney-panel/"
                              : "/client-panel/"
                        }>
                        <a className="dropdown-item py-2 text-center text-xl-start">
                          Dashboard
                        </a>
                      </Link>
                      <div className="dropdown-divider border-secondary"></div>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger py-2 border-0 bg-transparent w-100 text-center text-xl-start">
                        Logout
                      </button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </li>
              ) : (
                <li className="nav-item ms-xl-3 mt-2 mt-xl-0 pb-3 pb-xl-0 w-100 w-xl-auto">
                  <Link href="/login-signup">
                    <a className="btn btn-warning px-4 py-2 w-100 fw-bold">
                      Login/Signup
                    </a>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;