import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AttorneyHeader from "./AttorneyHeader";
import { getUserProfile } from "../../services/authService"; // Ensure path is correct

export default function AttorneyLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  // Dynamic States
  const [userName, setUserName] = useState("Attorney");
  const [userEmail, setUserEmail] = useState("");
  const [profileImg, setProfileImg] = useState("/assets/images/attorney1.png");

  // Image URL Helper Logic
  const getImgUrl = (path) => {
    if (!path) return "/assets/images/attorney1.png";
    let normalizedPath = path.toString().replace(/\\/g, "/");
    if (
      normalizedPath.startsWith("http://") ||
      normalizedPath.startsWith("https://")
    ) {
      return normalizedPath;
    }
    return normalizedPath;
  };

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
        const attorney = response?.attorney;

        if (attorney) {
          setUserName(`${attorney.firstName} ${attorney.lastName || ""}`);
          setUserEmail(attorney.email || "");
          if (attorney.profileImage) {
            setProfileImg(getImgUrl(attorney.profileImage));
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
              className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top"
              style={{ top: "90px" }}>
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "100px", height: "100px" }}>
                  <img
                    src={profileImg} // DYNAMIC IMAGE
                    className="rounded-circle shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "4px solid #f8f9fa" }}
                    alt="avatar"
                    onError={(e) => {
                      e.target.src = "/assets/images/attorney1.png";
                    }}
                  />
                </div>
                <h6 className="fw-bold mb-1 text-navy">{userName}</h6>{" "}
                {/* DYNAMIC NAME */}
                <p className="text-muted mb-0 small">{userEmail}</p>{" "}
                {/* DYNAMIC EMAIL */}
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
        /* ... existing styles ... */
        .text-navy {
          color: #002147;
        }
        .sidebar-nav .nav-link {
          color: #444 !important;
          font-size: 14px;
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
        @media (max-width: 991px) {
          .sidebar-open {
            position: fixed;
            top: 0;
            left: 0;
            width: 280px;
            height: 100vh;
            z-index: 1060;
            overflow-y: auto;
            background: white;
            padding: 15px;
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
