"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Navbar,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  NavItem,
  NavLink,
} from "reactstrap";
import * as authService from "../../services/authService";
import { toast } from "react-toastify";

export default function AttorneyHeader({ onToggleSidebar }) {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [role, setRole] = useState(null);

  const fallbackImg =
    "https://ui-avatars.com/api/?name=Attorney&background=eebb5d&color=fff";

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);

      if (!userId) return;

      try {
        const response = await authService.getUserProfile(userId);
        // Mapping data based on your JSON structure
        const attorneyData =
          response?.attorney ||
          response?.data?.attorney ||
          (response?.attorneys && response.attorneys[0]);

        if (attorneyData) {
          setUserData(attorneyData);
        }
      } catch (error) {
        console.error("Error loading header profile:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDynamicLogo = async () => {
      try {
        const [typesRes, bannersRes] = await Promise.all([getAllHomeBanners()]);

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
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    router.push("/login-signup");
  };

  // Dynamic Profile Link Logic
  const getProfilePath = () => {
    if (role === "attorney") return "/attorney-panel/";
    return "/client-panel/profile";
  };

  const profileImg = userData?.profileImage
    ? authService.getImgUrl(userData.profileImage)
    : `https://ui-avatars.com/api/?name=${userData?.firstName || "Attorney"}&background=eebb5d&color=fff`;

  return (
    <>
      <style jsx global>{`
        .panel-header .dropdown-menu {
          border-radius: 12px;
          border: none;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
          padding: 10px;
          min-width: 180px;
        }
        .panel-header .dropdown-item {
          border-radius: 8px;
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: center; /* Centers text in dropdown */
          gap: 10px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .panel-header .dropdown-item:hover {
          background-color: #fff9ef !important;
          color: #eebb5d !important;
        }
      `}</style>

      <Navbar
        color="white"
        light
        expand="md"
        className="shadow-sm bg-white m-3 rounded-4 px-4 sticky-top panel-header"
        style={{ height: "70px" }}>
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Left: Sidebar Toggle & Title */}
          <div className="d-flex align-items-center">
            <Button
              color="light"
              className="d-lg-none border-0 p-1 me-2"
              onClick={onToggleSidebar}>
              <i className="bi bi-list fs-3"></i>
            </Button>
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
                    width: "160px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </a>
            </Link>
          </div>

          {/* Right Section */}
          <Nav className="ms-auto align-items-center flex-row gap-3" navbar>
            {/* Live Site Link */}
            {/* <NavItem className="d-none d-md-flex align-items-center mx-2">
              <Link href="/" passHref legacyBehavior>
                <NavLink className="text-dark d-flex align-items-center gap-2 p-0 fw-medium small">
                  <i className="bi bi-globe fs-6 text-primary"></i>
                  <span>Live Site</span>
                </NavLink>
              </Link>
            </NavItem> */}

            {/* Message Icon */}
            <NavItem className="d-flex align-items-center">
              <Link href="/attorney-panel/messages" passHref legacyBehavior>
                <NavLink className="text-dark p-0">
                  <i className="bi bi-chat-left-dots-fill fs-5"></i>
                </NavLink>
              </Link>
            </NavItem>

            {/* Profile Dropdown */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                nav
                className="d-flex align-items-center gap-2 p-0 ms-2">
                <div className="d-none d-md-block text-end">
                  <div
                    className="fw-bold text-dark small"
                    style={{ lineHeight: "1.2" }}>
                    {userData
                      ? `${userData.firstName} ${userData.lastName || ""}`
                      : "Attorney"}
                  </div>
                  <small
                    className="text-muted text-capitalize"
                    style={{ fontSize: "11px" }}>
                    {role || "Attorney"}
                  </small>
                </div>

                <img
                  src={profileImg}
                  className="rounded-circle border border-2 border-warning shadow-sm"
                  width="42"
                  height="42"
                  style={{ objectFit: "cover" }}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = fallbackImg;
                  }}
                />
              </DropdownToggle>

              <DropdownMenu end className="mt-2">
                <Link href={getProfilePath()} passHref legacyBehavior>
                  <DropdownItem tag="a" className="text-white">
                    <i className="bi bi-person-circle fs-5"></i>
                    <span>Dashboard</span>
                  </DropdownItem>
                </Link>

                <DropdownItem divider />

                <button
                  onClick={handleLogout}
                  className="dropdown-item text-danger border-0 bg-transparent w-100">
                  <i className="bi bi-box-arrow-left fs-5"></i>
                  <span>Logout</span>
                </button>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </div>
      </Navbar>
    </>
  );
}
