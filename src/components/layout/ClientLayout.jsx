// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import ClientHeader from "./ClientHeader";
// import { getImgUrl } from "../../services/authService"; // Import helper

// export default function ClientLayout({ children }) {
//   const router = useRouter();
//   const [showSidebar, setShowSidebar] = useState(false);

//   // State for dynamic user data
//   const [userData, setUserData] = useState({
//     name: "User",
//     email: "user@gmail.com",
//     profileImage: "/assets/images/profilepic.png",
//   });
// const syncUserData = () => {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     try {
//       const user = JSON.parse(storedUser);
//       setUserData({
//         name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
//         email: user.email || "user@gmail.com",
//         // Yahan check karein ki image "null" (string) to nahi hai
//         profileImage:
//           user.profileImage && user.profileImage !== "null"
//             ? getImgUrl(user.profileImage)
//             : "/assets/images/profilepic.png",
//       });
//     } catch (error) {
//       console.error("Error parsing user data in layout", error);
//     }
//   }
// };

//   useEffect(() => {
//     // 1. Initial Load
//     syncUserData();

//     window.addEventListener("profileUpdated", syncUserData);

//     // 3. Listen for cross-tab storage changes
//     window.addEventListener("storage", syncUserData);

//     return () => {
//       window.removeEventListener("profileUpdated", syncUserData);
//       window.removeEventListener("storage", syncUserData);
//     };
//   }, []);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     if (confirm("Are you sure?")) {
//       localStorage.clear();
//       router.push("/");
//     }
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: "bi-grid", path: "/client-panel" },
//     { name: "Attorney", icon: "bi-person", path: "/client-panel/attorneys" },
//     {
//       name: "Case Details",
//       icon: "bi-clock-history",
//       path: "/client-panel/cases",
//     },
//     {
//       name: "Appointments",
//       icon: "bi-calendar-event",
//       path: "/client-panel/appointments",
//     },
//     {
//       name: "Documents",
//       icon: "bi-file-earmark-pdf",
//       path: "/client-panel/document-management",
//     },
//     {
//       name: "Transactions",
//       icon: "bi-credit-card",
//       path: "/client-panel/transaction-management",
//     },
//     { name: "Messages", icon: "bi-chat", path: "/client-panel/messages" },
//     {
//       name: "Profile Settings",
//       icon: "bi-gear",
//       path: "/client-panel/edit-profile",
//     },
//   ];

//   return (
//     <div style={{ backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
//       <ClientHeader onToggleSidebar={() => setShowSidebar(!showSidebar)} />

//       <div className="container py-4">
//         <div className="row g-4">
//           <aside
//             className={`col-lg-3 ${showSidebar ? "sidebar-mobile-view" : "d-none d-lg-block"}`}>
//             <div
//               className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top"
//               style={{ top: "90px" }}>
//               {/* DYNAMIC USER PROFILE SECTION */}
//               <div className="p-4 text-center border-bottom bg-white">
//                 <div
//                   className="mx-auto mb-3"
//                   style={{ width: "90px", height: "90px" }}>
//                   <img
//                     src={userData.profileImage}
//                     className="rounded-circle shadow-sm w-100 h-100"
//                     style={{ objectFit: "cover", border: "3px solid #f8f9fa" }}
//                     alt="user"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/profilepic.png";
//                     }}
//                   />
//                 </div>
//                 <h6 className="fw-bold mb-1 text-navy text-capitalize">
//                   {userData.name}
//                 </h6>
//                 <p
//                   className="text-muted mb-0 small"
//                   style={{ wordBreak: "break-all" }}>
//                   {userData.email}
//                 </p>
//               </div>

//               <div className="p-3 bg-white">
//                 <nav className="nav flex-column sidebar-nav">
//                   {menuItems.map((item, idx) => (
//                     <Link key={idx} href={item.path}>
//                       <a
//                         className={`nav-link ${router.pathname === item.path ? "active" : ""}`}
//                         onClick={() => setShowSidebar(false)}>
//                         <i className={`bi ${item.icon} me-3`}></i> {item.name}
//                       </a>
//                     </Link>
//                   ))}
//                   <div className="mt-4 pt-3 border-top">
//                     <a
//                       href="#"
//                       className="nav-link text-danger fw-bold"
//                       onClick={handleLogout}>
//                       <i className="bi bi-box-arrow-right me-3"></i> Logout
//                     </a>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </aside>

//           <main className="col-lg-9">
//             <div className="bg-transparent">{children}</div>
//           </main>
//         </div>
//       </div>

//       {showSidebar && (
//         <div
//           className="overlay d-lg-none"
//           onClick={() => setShowSidebar(false)}></div>
//       )}

//       <style jsx>{`
//         .text-navy {
//           color: #002147;
//         }
//         .sidebar-nav .nav-link {
//           color: #444 !important;
//           font-size: 14px;
//           padding: 12px 18px;
//           border-radius: 10px;
//           transition: 0.3s;
//           margin-bottom: 5px;
//           font-weight: 500;
//           text-decoration: none;
//           display: flex;
//           align-items: center;
//         }
//         .sidebar-nav .nav-link:hover {
//           background: #f8f9fa;
//           color: #de9f57 !important;
//         }
//         .sidebar-nav .nav-link.active {
//           background: #fcf6ef;
//           color: #de9f57 !important;
//           font-weight: bold;
//         }
//         @media (max-width: 991px) {
//           .sidebar-mobile-view {
//             position: fixed;
//             top: 70px;
//             left: 0;
//             width: 100%;
//             padding: 15px;
//             z-index: 1050;
//             display: block !important;
//           }
//           .overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background: rgba(0, 0, 0, 0.4);
//             z-index: 1040;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ClientHeader from "./ClientHeader";
import { getImgUrl } from "../../services/authService";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  // Set default to null to prevent "flicker"
  const [isProfileComplete, setIsProfileComplete] = useState(null);

  const [userData, setUserData] = useState({
    name: "User",
    email: "user@gmail.com",
    profileImage: "/assets/images/profilepic.png",
  });

  const syncUserData = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        // Logic 1: Has the user updated their profile?
        const isUpdated =
          user.isProfileComplete === true ||
          user.isProfileComplete === "true" ||
          (user.mobile && user.city);

        // Logic 2: Has the Admin activated the account?
        const isAdminActive = user.status === "active";

        // Access is ONLY allowed if Profile is Updated AND Admin set Status to Active
        const canAccessTabs = isUpdated && isAdminActive;

        setIsProfileComplete(canAccessTabs);

        const fullName =
          `${user.firstName || ""} ${user.lastName || ""}`.trim();
        setUserData({
          name: fullName || "User",
          email: user.email || "user@gmail.com",
          profileImage:
            user.profileImage && user.profileImage !== "null"
              ? getImgUrl(user.profileImage)
              : "/assets/images/profilepic.png",
        });

        // Forced Redirect: Only if they have NEVER updated the profile
        if (!isUpdated && router.pathname !== "/client-panel/edit-profile") {
          router.push("/client-panel/edit-profile");
        }
      } catch (error) {
        console.error("Error parsing user data in layout", error);
      }
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    syncUserData();
    window.addEventListener("profileUpdated", syncUserData);
    window.addEventListener("storage", syncUserData);
    return () => {
      window.removeEventListener("profileUpdated", syncUserData);
      window.removeEventListener("storage", syncUserData);
    };
  }, [router.pathname]);

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

  if (isProfileComplete === null) return null;

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
              {/* Profile Header Section */}
              <div className="p-4 text-center border-bottom bg-white">
                <div
                  className="mx-auto mb-3"
                  style={{ width: "90px", height: "90px" }}>
                  <img
                    src={userData.profileImage}
                    className="rounded-circle shadow-sm w-100 h-100"
                    style={{ objectFit: "cover", border: "3px solid #f8f9fa" }}
                    alt="user"
                  />
                </div>
                <h6 className="fw-bold mb-1 text-navy text-capitalize">
                  {userData.name}
                </h6>
                <p
                  className="text-muted mb-0 small"
                  style={{ wordBreak: "break-all" }}>
                  {userData.email}
                </p>

                {/* Status Badges */}
                <div className="mt-2">
                  {JSON.parse(localStorage.getItem("user"))?.status !==
                  "active" ? (
                    <span
                      className="badge bg-warning-subtle text-warning fw-bold"
                      style={{ fontSize: "10px" }}>
                      Wait for Admin Approval
                    </span>
                  ) : !isProfileComplete ? (
                    <span
                      className="badge bg-danger-subtle text-danger fw-bold"
                      style={{ fontSize: "10px" }}>
                      Please Update Profile
                    </span>
                  ) : (
                    <span
                      className="badge bg-success-subtle text-success fw-bold"
                      style={{ fontSize: "10px" }}>
                      Account Active
                    </span>
                  )}
                </div>
              </div>

              {/* Navigation Section */}
              <div className="p-3 bg-white">
                <nav className="nav flex-column sidebar-nav">
                  {menuItems.map((item, idx) => {
                    const isDisabled =
                      !isProfileComplete &&
                      item.path !== "/client-panel/edit-profile";

                    return (
                      <Link key={idx} href={isDisabled ? "#" : item.path}>
                        <a
                          className={`nav-link ${router.pathname === item.path ? "active" : ""} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                          onClick={(e) => {
                            if (isDisabled) {
                              e.preventDefault();
                              alert(
                                "Access Denied: Either your profile is incomplete or your account is waiting for admin activation.",
                              );
                              return;
                            }
                            setShowSidebar(false);
                          }}>
                          <i className={`bi ${item.icon} me-3`}></i>
                          {item.name}
                          {isDisabled && (
                            <i className="bi bi-lock-fill ms-auto small"></i>
                          )}
                        </a>
                      </Link>
                    );
                  })}
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
        .sidebar-nav .nav-link:hover:not(.opacity-50) {
          background: #f8f9fa;
          color: #de9f57 !important;
        }
        .sidebar-nav .nav-link.active {
          background: #fcf6ef;
          color: #de9f57 !important;
          font-weight: bold;
        }
        .cursor-not-allowed {
          cursor: not-allowed !important;
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