import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUserProfile } from "../../services/authService"; // Ensure this path is correct
// Import your getImgUrl helper or define it if it's in a utility file
// import { getImgUrl } from "../../utils/helpers";

export default function AttorneyHeader({ onToggleSidebar }) {
  const router = useRouter();

  // Default fallback image
  const [profileImg, setProfileImg] = useState("/assets/images/attorney1.png");
  const [adminName, setAdminName] = useState("Attorney");

  // Your provided helper function
  const getImgUrl = (path) => {
    if (!path) return "/assets/images/attorney1.png";
    let normalizedPath = path.toString().replace(/\\/g, "/");
    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
    ) {
      return normalizedPath;
    }
    // Add your IMG_URL base here if needed, otherwise return as is for Cloudinary
    return normalizedPath;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await getUserProfile(userId);
        // Accessing the attorney object from your provided JSON structure
        const attorney = response?.attorney;

        if (attorney) {
          if (attorney.profileImage) {
            setProfileImg(getImgUrl(attorney.profileImage));
          }
          if (attorney.firstName) {
            setAdminName(`${attorney.firstName} ${attorney.lastName || ""}`);
          }
        }
      } catch (error) {
        console.error("Error loading header profile:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <header
      className="bg-white border-bottom sticky-top"
      style={{ zIndex: 1040, height: "70px" }}>
      <div className="container-fluid h-100 px-4">
        <div className="d-flex justify-content-between align-items-center h-100">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-light d-lg-none me-3"
              onClick={onToggleSidebar}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <h5
              className="mb-0 fw-bold d-none d-sm-block"
              style={{ color: "#002147" }}>
              ATTORNEY PANEL
            </h5>
          </div>

          <div className="d-flex align-items-center gap-4">
            <Link href="/attorney-panel/messages">
              <a className="text-dark fs-4 position-relative pt-1">
                <i className="bi bi-chat-left-text"></i>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "10px", marginTop: "5px" }}>
                  2
                </span>
              </a>
            </Link>

            <div className="profile-dropdown-container">
              <div
                className="profile-trigger d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}>
                <span className="small d-none d-md-inline fw-bold text-muted">
                  {adminName}
                </span>
                <img
                  src={profileImg}
                  className="rounded-circle border shadow-sm"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = "/assets/images/attorney1.png";
                  }}
                />
              </div>

              <div className="profile-hover-menu shadow-lg border-0 rounded-3">
                <div className="p-3 border-bottom bg-light rounded-top">
                  <span className="small fw-bold text-muted">
                    Account Settings
                  </span>
                </div>
                <Link href="/attorney-panel/profile">
                  <a className="dropdown-item py-2 px-3">
                    <i className="bi bi-person me-2"></i> My Profile
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
          width: 200px;
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
          clear: both;
          font-weight: 400;
          color: #212529;
          text-align: inherit;
          text-decoration: none;
          white-space: nowrap;
          background-color: transparent;
          border: 0;
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
