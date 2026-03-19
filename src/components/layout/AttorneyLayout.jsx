"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AttorneyHeader from "./AttorneyHeader";
import { getUserProfile, getImgUrl } from "../../services/authService";

export default function AttorneyLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  // States for dynamic user information
  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("");
  const [profileImg, setProfileImg] = useState("");

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
      try {
        // 1. Get Dynamic ID from "user" object (matches Header logic)
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser?.id;

        if (!userId) return;

        // 2. Fetch Dynamic Profile Data
        const response = await getUserProfile(userId);

        // 3. Mapping response.attorney (Singular based on your API logs)
        const attorneyData = response?.attorney || response?.data?.attorney;

        if (attorneyData) {
          const fullName =
            `${attorneyData.firstName || ""} ${attorneyData.lastName || ""}`.trim();
          setUserName(fullName || "Attorney");
          setUserEmail(attorneyData.email || "");

          // 4. Set Dynamic Profile Image
          const avatar = `https://ui-avatars.com/api/?name=${fullName || "User"}&background=eebb5d&color=000`;
          setProfileImg(
            attorneyData.profileImage
              ? getImgUrl(attorneyData.profileImage)
              : avatar,
          );
        }
      } catch (error) {
        console.error("Layout fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <AttorneyHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="container-fluid py-4 px-lg-5">
        <div className="row g-4">
          {/* Responsive Sidebar */}
          <aside
            className={`col-lg-3 ${showSidebar ? "d-block position-fixed start-0 top-0 vh-100 z-3 bg-white shadow" : "d-none d-lg-block"}`}
            style={showSidebar ? { width: "280px" } : {}}>
            <div
              className="card border-0 shadow-sm rounded-3 overflow-hidden sticky-top"
              style={{ top: "90px" }}>
              {/* Profile Section - ALL DYNAMIC */}
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "100px", height: "100px" }}>
                  <img
                    src={
                      profileImg ||
                      `https://ui-avatars.com/api/?name=User&background=eebb5d&color=000`
                    }
                    className="rounded-circle border border-2 border-warning shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", aspectRatio: "1/1" }}
                    alt="Profile"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${userName}&background=eebb5d&color=000`;
                    }}
                  />
                </div>
                <h6 className="fw-bold mb-1 text-dark text-capitalize text-truncate px-2">
                  {userName}
                </h6>
                <p className="text-muted mb-0 small text-truncate px-3">
                  {userEmail}
                </p>
              </div>

              {/* Navigation Menu */}
              <div className="p-3 bg-white">
                <nav className="nav flex-column gap-1">
                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.path} legacyBehavior>
                      <a
                        className={`nav-link border-0 rounded-2 py-2 px-3 d-flex align-items-center transition-all ${
                          router.pathname === item.path
                            ? "bg-light text-warning fw-bold"
                            : "text-dark"
                        }`}
                        onClick={() => setShowSidebar(false)}>
                        <i
                          className={`bi ${item.icon} me-3 ${router.pathname === item.path ? "text-warning" : "text-muted"}`}></i>
                        <span style={{ fontSize: "14px" }}>{item.name}</span>
                      </a>
                    </Link>
                  ))}

                  <div className="mt-3 pt-3 border-top">
                    <button
                      className="btn btn-link nav-link text-danger fw-bold border-0 bg-transparent w-100 text-start px-3 d-flex align-items-center"
                      onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-3"></i>
                      <span style={{ fontSize: "14px" }}>Logout</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-lg-9">
            <div className="animate__animated animate__fadeIn">{children}</div>
          </main>
        </div>
      </div>

      {/* Close sidebar overlay for mobile */}
      {showSidebar && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 bg-dark opacity-50 z-2 d-lg-none"
          onClick={() => setShowSidebar(false)}></div>
      )}

      <style jsx>{`
        .nav-link:hover {
          background-color: #f8f9fa !important;
          color: #cfab4a !important;
        }
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
