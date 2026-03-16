"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AttorneyHeader from "./AttorneyHeader";
import { getUserProfile, getImgUrl } from "../../services/authService";

export default function AttorneyLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const [userName, setUserName] = useState("Attorney");
  const [userEmail, setUserEmail] = useState("");
  // प्रोफेशनल प्लेसहोल्डर इमेज
  const [profileImg, setProfileImg] = useState(
    "https://ui-avatars.com/api/?name=Attorney&background=eebb5d&color=000",
  );

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      sessionStorage.clear();
      router.push("/");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid-fill", path: "/attorney-panel" },
    {
      name: "Appointments",
      icon: "bi-calendar-check",
      path: "/attorney-panel/appointments",
    },
    {
      name: "Client Management",
      icon: "bi-people-fill",
      path: "/attorney-panel/clients",
    },
    {
      name: "Case Details",
      icon: "bi-clock-history",
      path: "/attorney-panel/cases",
    },
    {
      name: "Messages",
      icon: "bi-chat-dots-fill",
      path: "/attorney-panel/messages",
    },
    {
      name: "Ticket Management",
      icon: "bi-ticket-perforated-fill",
      path: "/attorney-panel/tickets",
    },
    {
      name: "Edit Profile",
      icon: "bi-person-bounding-box",
      path: "/attorney-panel/profile",
    },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await getUserProfile(userId);
        // यहाँ चेक करें कि response.attorney मौजूद है या नहीं
        const attorneyData = response?.attorney || response?.data?.attorney;

        if (attorneyData) {
          setUserName(
            `${attorneyData.firstName} ${attorneyData.lastName || ""}`,
          );
          setUserEmail(attorneyData.email || "");
          if (attorneyData.profileImage) {
            setProfileImg(getImgUrl(attorneyData.profileImage));
          }
        }
      } catch (error) {
        console.error("Layout fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
      <AttorneyHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="container-fluid py-4 px-lg-5">
        <div className="row g-4">
          <aside
            className={`col-lg-3 ${showSidebar ? "sidebar-open" : "d-none d-lg-block"}`}>
            <div
              className="card border-0 shadow-sm rounded-0 overflow-hidden sticky-top"
              style={{ top: "90px" }}>
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "100px", height: "100px" }}>
                  <img
                    src={profileImg}
                    className="shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "2px solid #eebb5d" }}
                    alt="avatar"
                    onError={(e) => {
                      e.target.src =
                        "https://ui-avatars.com/api/?name=User&background=eebb5d&color=000";
                    }}
                  />
                </div>
                <h6 className="fw-bold mb-1" style={{ color: "#000" }}>
                  {userName}
                </h6>
                <p className="text-muted mb-0 small">{userEmail}</p>
              </div>

              <div className="p-3 bg-white">
                <nav className="nav flex-column sidebar-nav">
                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.path}>
                      <a
                        className={`nav-link ${router.pathname === item.path ? "active" : ""}`}
                        onClick={() => setShowSidebar(false)}>
                        <i className={`bi ${item.icon} me-3`}></i> {item.name}
                      </a>
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-top">
                    <a
                      href="#"
                      className="nav-link text-danger fw-bold"
                      onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-3"></i> Logout
                    </a>
                  </div>
                </nav>
              </div>
            </div>
          </aside>

          <main className="col-lg-9">{children}</main>
        </div>
      </div>

      {showSidebar && (
        <div
          className="sidebar-overlay d-lg-none"
          onClick={() => setShowSidebar(false)}></div>
      )}

      <style jsx>{`
        .sidebar-nav .nav-link {
          color: #444 !important;
          font-size: 14px;
          padding: 12px 20px;
          transition: 0.3s;
          margin-bottom: 5px;
          font-weight: 500;
          text-decoration: none;
          display: block;
        }
        .sidebar-nav .nav-link:hover {
          background: #f8f9fa;
          color: #eebb5d !important;
        }
        .sidebar-nav .nav-link.active {
          background: #fdf8ef;
          color: #eebb5d !important;
          font-weight: bold;
          border-left: 4px solid #eebb5d;
        }
        @media (max-width: 991px) {
          .sidebar-open {
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            z-index: 1060;
            background: white;
          }
          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1050;
          }
        }
      `}</style>
    </div>
  );
}
