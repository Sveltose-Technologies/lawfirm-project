import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ClientHeader from "./ClientHeader";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [userData, setUserData] = useState({
    name: "User",
    email: "user@gmail.com",
  });

  useEffect(() => {
    const name = localStorage.getItem("userName") || "User";
    const email = localStorage.getItem("userEmail") || "user@gmail.com";
    setUserData({ name, email });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: "bi-grid", path: "/client-panel" },
    { name: "Attorney", icon: "bi-person", path: "/client-panel/attorneys" },
    {
      name: "Case Details",
      icon: "bi-clock-history",
      path: "/client-panel/cases",
    },
    {
      name: "Appointments",
      icon: "bi-calendar-event",
      path: "/client-panel/appointments",
    },
    {
      name: "Documents",
      icon: "bi-file-earmark-pdf",
      path: "/client-panel/document-management",
    },
    {
      name: "Transactions",
      icon: "bi-credit-card",
      path: "/client-panel/transaction-management",
    },
    { name: "Messages", icon: "bi-chat", path: "/client-panel/messages" },
    {
      name: "Profile Settings",
      icon: "bi-gear",
      path: "/client-panel/edit-profile",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
      <ClientHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />

      <div className="container py-4">
        <div className="row g-4">
          <aside
            className={`col-lg-3 ${showSidebar ? "sidebar-mobile-view" : "d-none d-lg-block"}`}>
            <div
              className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top"
              style={{ top: "90px" }}>
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "90px", height: "90px" }}>
                  <img
                    src="/assets/images/attorney1.png"
                    className="rounded-circle shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "3px solid #f8f9fa" }}
                    alt="user"
                  />
                </div>
                <h6 className="fw-bold mb-1 text-navy">{userData.name}</h6>
                <p className="text-muted mb-0 small">{userData.email}</p>
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
                  <div className="mt-4 pt-3 border-top">
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

          <main className="col-lg-9">
            <div className="bg-transparent">{children}</div>
          </main>
        </div>
      </div>

      {showSidebar && (
        <div
          className="overlay d-lg-none"
          onClick={() => setShowSidebar(false)}></div>
      )}

      <style jsx>{`
        .text-navy {
          color: #002147;
        }
        .sidebar-nav .nav-link {
          color: #444 !important;
          font-size: 14px;
          padding: 12px 18px;
          border-radius: 10px;
          transition: 0.3s;
          margin-bottom: 5px;
          font-weight: 500;
          text-decoration: none;
          display: flex;
          align-items: center;
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
        @media (max-width: 991px) {
          .sidebar-mobile-view {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            padding: 15px;
            z-index: 1050;
            display: block !important;
          }
          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            z-index: 1040;
          }
        }
      `}</style>
    </div>
  );
}
