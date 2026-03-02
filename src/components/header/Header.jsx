import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllHomeBanners,
  getAllLogoTypes,
  getImgUrl,
} from "../../services/authService";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoUrl, setLogoUrl] = useState(null);

  // Dropdown States
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    const fetchDynamicLogo = async () => {
      try {
        // 1. Types aur Banners dono ek saath mangwao
        const [typesRes, bannersRes] = await Promise.all([
          getAllLogoTypes(),
          getAllHomeBanners(),
        ]);

        const types = typesRes.data?.data || [];
        const allBanners = bannersRes.data?.data || [];

        // 2. DYNAMIC LOGIC: Pehle "logo" naam ka type dhundho (ID static nahi hai ab)
        const logoTypeObj = types.find((t) => t.type.toLowerCase() === "logo");

        if (logoTypeObj) {
          // 3. Ab banners mein se wahi image uthao jiski typeId is dynamic ID se match kare
          // Aur hum sabse latest (highest ID) wala logo uthayenge
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
  }, []);

  // --- Logic Functions ---
  const handleMouseEnter = (type) => {
    if (window.innerWidth > 1199) {
      if (type === "about") setMobileDropdownOpen(true);
      if (type === "lang") setLanguageDropdownOpen(true);
    }
  };

  const handleMouseLeave = (type) => {
    if (window.innerWidth > 1199) {
      if (type === "about") setMobileDropdownOpen(false);
      if (type === "lang") setLanguageDropdownOpen(false);
    }
  };

  const toggleDropdownMobile = (e, type) => {
    e.preventDefault();
    if (type === "about") setMobileDropdownOpen(!mobileDropdownOpen);
    if (type === "lang") setLanguageDropdownOpen(!languageDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
      setMobileDropdownOpen(false);
      setLanguageDropdownOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setMobileDropdownOpen(false);
        setLanguageDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => (router.pathname === path ? "active-link" : "");
  const isParentActive = (childPaths) =>
    childPaths.includes(router.pathname) ? "active-link" : "";

  // Hydration safety
  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        .navbar-brand {
          flex-shrink: 0 !important;
          min-width: 140px;
          margin-right: 20px;
        }
        .login-btn-item {
          flex-shrink: 0 !important;
          margin-left: 15px !important;
        }
        @media (max-width: 1199px) {
          .dropdown-menu.show {
            position: static !important;
            float: none !important;
            width: 100% !important;
            background: transparent !important;
            border: none !important;
            padding-left: 20px !important;
            display: block !important;
          }
          .dropdown-item {
            color: rgba(255, 255, 255, 0.8) !important;
          }
          .dropdown-item:hover {
            background: transparent !important;
            color: #fff !important;
          }
        }
        .navbar-nav {
          align-items: center;
        }
        @media (max-width: 1199px) {
          .navbar-nav {
            align-items: flex-start !important;
          }
          .login-btn-item {
            margin-left: 0 !important;
            margin-top: 10px;
          }
        }
      `}</style>

      <header
        className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
        <nav className="navbar navbar-expand-xl navbar-dark p-2">
          <div className="container-fluid px-3 px-lg-4">
            <Link href="/">
              <a className="navbar-brand p-0 m-0 d-flex align-items-center">
                <img
                  src={
                    logoUrl
                      ? getImgUrl(logoUrl)
                      : "/assets/images/brand-logo.png"
                  }
                  alt="Logo"
                  style={{
                    width: "160px", // Standard logo width
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </a>
            </Link>

            <button
              className="navbar-toggler shadow-none"
              type="button"
              onClick={() => setIsOpen(!isOpen)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="mainNav">
              <ul className="navbar-nav ms-auto align-items-xl-center">
                <li className="nav-item">
                  <Link href="/">
                    <a className={`nav-link ${isActive("/")}`}>Home</a>
                  </Link>
                </li>

                <li
                  className="nav-item dropdown"
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={() => handleMouseLeave("about")}>
                  <a
                    className={`nav-link dropdown-toggle ${isParentActive(["/our-firm", "/award", "/promoters"])}`}
                    href="#"
                    onClick={(e) => toggleDropdownMobile(e, "about")}>
                    About
                  </a>
                  <ul
                    className={`dropdown-menu ${mobileDropdownOpen ? "show" : ""}`}>
                    <li>
                      <Link href="/our-firm">
                        <a className="dropdown-item">Our Firm</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/award">
                        <a className="dropdown-item">Awards & Accolades</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/promoters">
                        <a className="dropdown-item">Promoters</a>
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
                    <a className={`nav-link ${isActive("/careers")}`}>
                      Careers
                    </a>
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
                  className="nav-item dropdown ms-xl-1"
                  onMouseEnter={() => handleMouseEnter("lang")}
                  onMouseLeave={() => handleMouseLeave("lang")}>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    onClick={(e) => toggleDropdownMobile(e, "lang")}>
                    <i className="fas fa-globe me-1"></i> EN
                  </a>
                  <ul
                    className={`dropdown-menu ${languageDropdownOpen ? "show" : ""}`}
                    style={{ right: 0, left: "auto" }}>
                    <li>
                      <button className="dropdown-item">English</button>
                    </li>
                    <li>
                      <button className="dropdown-item">Hindi (हिंदी)</button>
                    </li>
                    {/* ... (other languages) */}
                  </ul>
                </li>

                <li className="nav-item ms-xl-3">
                  <Link href="/login-signup">
                    <a className="btn btn-custom">Login/Signup</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="header-spacer"></div>
    </>
  );
}

export default Header;