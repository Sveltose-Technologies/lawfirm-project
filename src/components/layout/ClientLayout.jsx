import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

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
      name: "Document Management",
      icon: "bi-calendar-event",
      path: "/client-panel/document-management",
    },
    {
      name: "Transaction Management",
      icon: "bi-calendar-event",
      path: "/client-panel/transaction-management",
    },
    {
      name: "Messages",
      icon: "bi-calendar-event",
      path: "/client-panel/messages",
    },
    {
      name: "Edit profile",
      icon: "bi-calendar-event",
      path: "/client-panel/edit-profile",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
      {/* --- MOBILE HEADER (Sirf '=' button right side me) --- */}
      <div className="d-lg-none p-2 bg-white border-bottom sticky-top d-flex justify-content-end align-items-center">
        <button
          className="btn border-0"
          onClick={() => setShowSidebar(!showSidebar)}>
          <i
            className={`bi ${showSidebar ? "bi-x-lg" : "bi-list"} fs-1 text-dark`}></i>
        </button>
      </div>

      <div className="container py-lg-5 py-3">
        <div className="row g-4 pt-5">
          {/* --- SIDEBAR --- */}
          {/* Mobile par logic: agar showSidebar true hai tabhi dikhega, desktop par hamesha dikhega */}
          <aside
            className={`col-lg-3 ${showSidebar ? "sidebar-mobile-view" : "d-none d-lg-block"}`}>
            <div
              className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top"
              style={{ top: "20px" }}>
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "100px", height: "100px" }}>
                  <img
                    src="/assets/images/attorney1.png"
                    className="rounded-circle shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "3px solid #f8f9fa" }}
                    alt="user"
                  />
                </div>
                <h5
                  className="fw-bold mb-1"
                  style={{ color: "#002147", fontSize: "18px" }}>
                  John
                </h5>
                <p className="text-muted mb-0 small">user@gmail.com</p>
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
            {/* Background overlay: Mobile pe sidebar ke piche click karne par band ho jaye */}
            {showSidebar && (
              <div
                className="overlay d-lg-none"
                onClick={() => setShowSidebar(false)}></div>
            )}
          </aside>

          {/* --- CONTENT --- */}
          <main className="col-lg-9">
            <div className="bg-transparent">{children}</div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .sidebar-nav .nav-link {
          color: #444 !important;
          font-size: 15px;
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
            top: 60px; /* Header ke niche se start hoga */
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
            background: rgba(0, 0, 0, 0.2);
            z-index: 1040;
          }
        }
      `}</style>
    </div>
  );
}
