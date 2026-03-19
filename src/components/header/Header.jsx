"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getAllHomeBanners,
  getAllLogoTypes,
  getImgUrl,
  getUserProfile,
  getAdminProfile,
} from "../../services/authService";
import * as authService from "../../services/authService";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  UncontrolledDropdown,
} from "reactstrap";
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

  // 1. Fetch correct profile based on role (Admin vs Attorney/User)
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
            const parsedUser = JSON.parse(storedUser);
            response = await authService.getUserProfile(parsedUser?.id);
          }

          // CORRECT MAPPING for all 3 roles
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

  const getDashboardLink = () => {
    if (role === "admin") return "/admin-panel/";
    if (role === "attorney") return "/attorney-panel/";
    return "/client-panel/";
  };

  // CORRECT IMAGE LOGIC
  const getProfileImage = () => {
    if (userData?.profileImage) {
      return authService.getImgUrl(userData.profileImage);
    }
    const name = userData?.firstName || role || "User";
    return `https://ui-avatars.com/api/?name=${name}&background=eebb5d&color=fff`;
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    setIsLoggedIn(false);
    router.push("/login-signup");
  };

  // Keep Logo Fetching
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

  // Sticky & Dropdown logic (NOT CHANGED)
  const handleMouseEnter = (type) => {
    if (window.innerWidth > 1199)
      type === "about"
        ? setMobileDropdownOpen(true)
        : setLanguageDropdownOpen(true);
  };
  const handleMouseLeave = (type) => {
    if (window.innerWidth > 1199)
      type === "about"
        ? setMobileDropdownOpen(false)
        : setLanguageDropdownOpen(false);
  };
  const toggleDropdownMobile = (e, type) => {
    e.preventDefault();
    type === "about"
      ? setMobileDropdownOpen(!mobileDropdownOpen)
      : setLanguageDropdownOpen(!languageDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header
        className={`fixed-top w-100 header-main ${isSticky ? "header-sticky" : "header-normal"}`}>
        <nav className="navbar navbar-expand-xl navbar-dark p-2">
          <div className="container-fluid px-3 px-lg-4">
            <Link href="/">
              <a className="navbar-brand">
                <img
                  src={
                    logoUrl
                      ? getImgUrl(logoUrl)
                      : "/assets/images/brand-logo.png"
                  }
                  alt="Logo"
                  style={{
                    width: "160px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </a>
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsOpen(!isOpen)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <Link href="/">
                    <a className="nav-link">Home</a>
                  </Link>
                </li>

                {/* ABOUT DROPDOWN */}
                <li
                  className="nav-item dropdown"
                  onMouseEnter={() => handleMouseEnter("about")}
                  onMouseLeave={() => handleMouseLeave("about")}>
                  <a
                    className="nav-link dropdown-toggle"
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
                        <a className="dropdown-item">Awards</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/promoters">
                        <a className="dropdown-item">Promoters</a>
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* ALL YOUR MENU ITEMS PRESERVED */}
                <li className="nav-item">
                  <Link href="/attorneys">
                    <a className="nav-link">Professionals</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/capability">
                    <a className="nav-link">Capabilities</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/news">
                    <a className="nav-link">News</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/careers">
                    <a className="nav-link">Careers</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/events">
                    <a className="nav-link">Events</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/location">
                    <a className="nav-link">Locations</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact-us">
                    <a className="nav-link">Contact Us</a>
                  </Link>
                </li>

                {/* LANGUAGE DROPDOWN */}
                <li
                  className="nav-item dropdown"
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
                  </ul>
                </li>

                {/* DYNAMIC PROFILE IMAGE SECTION */}
                {isLoggedIn ? (
                  <UncontrolledDropdown nav inNavbar className="ms-xl-3">
                    <DropdownToggle nav className="p-0 border-0 bg-transparent">
                      <img
                        src={getProfileImage()}
                        className="rounded-circle border border-2 border-warning shadow-sm"
                        width="40"
                        height="40"
                        style={{ objectFit: "cover", aspectRatio: "1/1" }}
                        alt="profile"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${role}&background=eebb5d&color=fff`;
                        }}
                      />
                    </DropdownToggle>
                    <DropdownMenu
                      end
                      className="profile-dropdown-menu shadow border-0 mt-2">
                      <Link href={getDashboardLink()}>
                        <a className="dropdown-item py-2">
                          <i className="bi bi-speedometer2 me-2 text-warning"></i>{" "}
                          Dashboard
                        </a>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger py-2 border-0 bg-transparent w-100 text-start">
                        <i className="bi bi-box-arrow-left me-2"></i> Logout
                      </button>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : (
                  <li className="nav-item ms-xl-3">
                    <Link href="/login-signup">
                      <a className="btn btn-warning px-4 py-2">Login/Signup</a>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="header-spacer" style={{ height: "75px" }}></div>
    </>
  );
}
export default Header;
