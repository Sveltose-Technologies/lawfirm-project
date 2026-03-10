import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AttorneyLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // --- LOGOUT FUNCTION ---
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
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    setUserName(userName);
    setUserEmail(userEmail);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f4f7fa",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
      <div className="container py-5 flex-grow-1">
        <div className="row g-4 pt-5">
          {/* --- SIDEBAR --- */}
          <aside
            className={`col-lg-3 ${showSidebar ? "d-block" : "d-none d-lg-block"}`}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "120px", height: "120px" }}>
                  <img
                    src="/assets/images/attorney1.png"
                    className="rounded-circle shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "4px solid #f8f9fa" }}
                    alt="avatar"
                  />
                </div>
                <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>
                  {userName}
                </h5>
                <p className="text-muted mb-0 fs-6 small">{userEmail}</p>
              </div>
              <div className="p-3 bg-white">
                <nav className="nav flex-column sidebar-nav">
                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.path}>
                      <a
                        className={`nav-link ${router.pathname === item.path ? "active" : ""}`}>
                        <i className={`bi ${item.icon} me-3`}></i> {item.name}
                      </a>
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-top">
                    {/* Logout Link with onClick */}
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

          {/* --- CONTENT --- */}
          <main className="col-lg-9">{children}</main>
        </div>
      </div>

      <style jsx>{`
        .sidebar-nav .nav-link {
          color: #444 !important;
          font-size: 15px;
          padding: 12px 20px;
          border-radius: 10px;
          transition: 0.3s;
          margin-bottom: 5px;
          font-weight: 500;
          text-decoration: none;
          display: block;
        }
        .sidebar-nav .nav-link:hover {
          background: #f8f9fa;
          color: #de9f57 !important;
        }
        .sidebar-nav .nav-link.active {
          background: #fcf6ef;
          color: #de9f57 !important;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}