import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ClientHeader({ onToggleSidebar }) {
  const router = useRouter();


  useEffect(() => {
    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) setProfileImg(savedImg);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      localStorage.clear();
      router.push("/");
    }
  };

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
            <h5
              className="mb-0 fw-bold d-none d-sm-block"
              style={{ color: "#002147" }}>
              CLIENT PORTAL
            </h5>
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
                  src={profileImg}
                  className="rounded-circle border shadow-sm"
                  style={{ width: "42px", height: "42px", objectFit: "cover" }}
                  alt="user"
                />
              </div>

              <div className="profile-hover-menu shadow-lg border-0 rounded-3">
                <div className="p-3 border-bottom bg-light rounded-top">
                  <span className="small fw-bold text-muted">User Menu</span>
                </div>
                <Link href="/client-panel/edit-profile">
                  <a className="dropdown-item py-2 px-3">
                    <i className="bi bi-gear me-2"></i> Settings
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
