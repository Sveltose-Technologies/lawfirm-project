import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUserProfile, getImgUrl } from "../../services/authService";

export default function AttorneyHeader({ onToggleSidebar }) {
  const router = useRouter();
  const fallbackImg =
    "https://ui-avatars.com/api/?name=Attorney&background=eebb5d&color=000";

  const [profileImg, setProfileImg] = useState(fallbackImg);
  const [adminName, setAdminName] = useState("Attorney");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await getUserProfile(userId);
        const attorneyData = response?.attorney || response?.data?.attorney;

        if (attorneyData) {
          if (attorneyData.profileImage) {
            setProfileImg(getImgUrl(attorneyData.profileImage));
          }
          if (attorneyData.firstName) {
            setAdminName(
              `${attorneyData.firstName} ${attorneyData.lastName || ""}`,
            );
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
            <h5 className="mb-0 fw-bold d-none d-sm-block text-dark">
              ATTORNEY PANEL
            </h5>
          </div>

          <div className="d-flex align-items-center gap-4">
            <Link href="/attorney-panel/messages">
              <a className="text-dark fs-4 pt-1">
                <i className="bi bi-chat-left-text"></i>
              </a>
            </Link>

            <div className="profile-dropdown-container">
              <div
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}>
                <span className="small d-none d-md-inline fw-bold text-muted">
                  {adminName}
                </span>
                <img
                  src={profileImg}
                  className="rounded-circle border"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                  alt="profile"
                  onError={(e) => {
                    e.target.src = fallbackImg;
                  }}
                />
              </div>

              <div className="profile-hover-menu shadow-lg border-0">
                <Link href="/attorney-panel/profile">
                  <a className="dropdown-item py-2 px-3">My Profile</a>
                </Link>
                <button
                  className="dropdown-item py-2 px-3 text-danger fw-bold"
                  onClick={handleLogout}>
                  Logout
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
          width: 160px;
          background: white;
          display: none;
          z-index: 1050;
          border: 1px solid #eee;
        }
        .profile-dropdown-container:hover .profile-hover-menu {
          display: block;
        }
        .dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 15px;
          color: #212529;
          text-decoration: none;
          font-size: 14px;
        }
        .dropdown-item:hover {
          background-color: #fdf8ef;
          color: #eebb5d;
        }
      `}</style>
    </header>
  );
}
