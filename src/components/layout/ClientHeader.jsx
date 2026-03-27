


import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllHomeBanners, getImgUrl } from "../../services/authService"; // Added getImgUrl

export default function ClientHeader({ onToggleSidebar }) {
  const router = useRouter();
  const [profileImg, setProfileImg] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);

const loadProfileImage = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      // "null" string aur undefined ka check add kiya
      if (user.profileImage && user.profileImage !== "null") {
        setProfileImg(getImgUrl(user.profileImage));
      } else {
        setProfileImg("/assets/images/profilepic.png");
      }
    } catch (error) {
      console.error("Error parsing user data", error);
      setProfileImg("/assets/images/profilepic.png");
    }
  }
};

  useEffect(() => {
    // 1. Initial load
    loadProfileImage();

    // 2. Listen for custom event 'profileUpdated'
    window.addEventListener("profileUpdated", loadProfileImage);

    // 3. Listen for native storage changes (optional, for multiple tabs)
    window.addEventListener("storage", loadProfileImage);

    return () => {
      window.removeEventListener("profileUpdated", loadProfileImage);
      window.removeEventListener("storage", loadProfileImage);
    };
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchDynamicLogo = async () => {
      try {
        const response = await getAllHomeBanners();
        // Fixed: destructuring was incorrect in your snippet
        const types = response.data?.data || [];
        const allBanners = response.data?.data || [];

        const logoTypeObj = types.find((t) => t.type?.toLowerCase() === "logo");
        if (logoTypeObj) {
          const logoData = allBanners
            .filter((b) => Number(b.typeId) === Number(logoTypeObj.id))
            .sort((a, b) => b.id - a.id)[0];

          if (logoData) setLogoUrl(logoData.image);
        }
      } catch (err) {
        console.error("Dynamic Logo Fetch Error:", err);
      }
    };
    fetchDynamicLogo();
  }, []);

  return (
    <header
      className="bg-white border-bottom sticky-top"
      style={{ zIndex: 1040, height: "70px" }}>
      <div className="container h-100">
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-light d-lg-none me-2"
              onClick={onToggleSidebar}>
              <i className="bi bi-list fs-3"></i>
            </button>
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

          <div className="d-flex align-items-center gap-4">
            <Link href="/client-panel/messages">
              <a className="text-dark fs-4 pt-1">
                <i className="bi bi-chat-dots"></i>
              </a>
            </Link>

            <div className="profile-dropdown-container">
              <div className="profile-trigger" style={{ cursor: "pointer" }}>
                <img
                  src={profileImg || "/assets/images/profilepic.png"}
                  className="rounded-circle border shadow-sm"
                  style={{ width: "42px", height: "42px", objectFit: "cover" }}
                  alt="user"
                  onError={(e) => {
                    e.target.src = "/assets/images/profilepic.png";
                  }}
                />
              </div>

              <div className="profile-hover-menu shadow-lg border-0 rounded-3">
                <div className="p-3 border-bottom bg-light rounded-top">
                  <span className="small fw-bold text-muted">User Menu</span>
                </div>
                <Link href="/client-panel/">
                  <a className="dropdown-item py-2 px-3">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                  </a>
                </Link>
                <div className="dropdown-divider m-0"></div>
                <button
                  className="dropdown-item py-2 px-3 text-danger fw-bold"
                  onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .profile-dropdown-container {
          position: relative;
          padding: 10px 0;
        }
        .profile-hover-menu {
          position: absolute;
          top: 100%;
          right: 0;
          width: 180px;
          background: white;
          display: none;
          z-index: 1050;
        }
        .profile-dropdown-container:hover .profile-hover-menu {
          display: block;
        }
        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: #212529;
          font-size: 14px;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
          color: #de9f57;
        }
      `}</style>
    </header>
  );
}