


// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// export default function ClientLayout({ children }) {
//   const router = useRouter();
//   const [showSidebar, setShowSidebar] = useState(false);

//   const handleLogout = (e) => {
//     e.preventDefault();
//     if (confirm("Are you sure?")) {
//       localStorage.clear();
//       router.push('/');
//     }
//   };

//   const menuItems = [
//     { name: 'Dashboard', icon: 'bi-grid', path: '/client-panel' },
//     { name: 'Attorney', icon: 'bi-person', path: '/client-panel/attorneys' },
//     { name: 'Case Details', icon: 'bi-clock-history', path: '/client-panel/cases' },
//     { name: 'Appointments', icon: 'bi-calendar-event', path: '/client-panel/appointments' },
//     // { name: 'Files', icon: 'bi-folder', path: '/client-panel/files' },
//     // { name: 'Message', icon: 'bi-chat-left-text', path: '/client-panel/messages' },
//   //  { name: 'Edit Profile', icon: 'bi-person-gear', path: '/client-panel/edit-profile' },
//   ];

//   return (
//     <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh'}}>
//       {/* Mobile Toggle Button */}
//       <div className="d-lg-none p-3 bg-white border-bottom sticky-top d-flex justify-content-between align-items-center pt-5">
//         <img src="/assets/images/attorney1.png"  height="30" alt="logo" />
//         <button className="btn border-0" onClick={() => setShowSidebar(!showSidebar)}>
//           <i className={`bi ${showSidebar ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
//         </button>
//       </div>

//       <div className="container py-lg-5 py-3 pt-5">
//         <div className="row g-4 pt-5">
//           {/* --- SIDEBAR --- */}
//           <aside className={`col-lg-3 ${showSidebar ? 'd-block' : 'd-none d-lg-block'}`}>
//             <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '20px' }}>
//               <div className="p-4 text-center border-bottom bg-white">
//                 <div className="mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
//                     <img src="/assets/images/attorney1.png" className="rounded-circle shadow-sm w-100 h-100" style={{ objectFit: 'cover', border: '3px solid #f8f9fa' }} alt="user" />
//                 </div>
//                 <h5 className="fw-bold mb-1" style={{color: '#002147', fontSize: '18px'}}>John</h5>
//                 <p className="text-muted mb-0 small">user@gmail.com</p>
//               </div>
//               <div className="p-3 bg-white">
//                 <nav className="nav flex-column sidebar-nav">
//                   {menuItems.map((item, idx) => (
//                     <Link key={idx} href={item.path}>
//                       <a className={`nav-link ${router.pathname === item.path ? 'active' : ''}`}>
//                         <i className={`bi ${item.icon} me-3`}></i> {item.name}
//                       </a>
//                     </Link>
//                   ))}
//                   <div className="mt-4 pt-3 border-top">
//                     {/* <Link href="/client-panel/help"><a className="nav-link"><i className="bi bi-info-circle me-3"></i> Help & Info</a></Link> */}
//                     <a href="#" className="nav-link text-danger fw-bold" onClick={handleLogout}>
//                       <i className="bi bi-box-arrow-right me-3"></i> Logout
//                     </a>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </aside>

//           {/* --- CONTENT --- */}
//           <main className="col-lg-9">
//             <div className="bg-transparent">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>

//       <style jsx>{`
//         .sidebar-nav .nav-link { 
//           color: #444 !important; font-size: 15px; padding: 12px 18px; 
//           border-radius: 10px; transition: 0.3s; margin-bottom: 5px; font-weight: 500; text-decoration: none; display: flex; align-items: center;
//         }
//         .sidebar-nav .nav-link:hover { background: #f8f9fa; color: #de9f57 !important; }
//         .sidebar-nav .nav-link.active { background: #fcf6ef; color: #de9f57 !important; font-weight: bold; }
//         @media (max-width: 991px) {
//            aside { position: fixed; top: 70px; left: 0; width: 100%; z-index: 1000; height: calc(100vh - 70px); overflow-y: auto; background: #f4f7fa; padding: 15px; }
//         }
//       `}</style>
//     </div>
//   );
// }



import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ClientLayout({ children }) {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    if (confirm("Are you sure?")) {
      localStorage.clear();
      router.push('/');
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: 'bi-grid', path: '/client-panel' },
    { name: 'Attorney', icon: 'bi-person', path: '/client-panel/attorneys' },
    { name: 'Case Details', icon: 'bi-clock-history', path: '/client-panel/cases' },
    { name: 'Appointments', icon: 'bi-calendar-event', path: '/client-panel/appointments' },
        { name: 'Document Management', icon: 'bi-calendar-event', path: '/client-panel/document-management' },
    { name: 'Transaction Management', icon: 'bi-calendar-event', path: '/client-panel/transaction-management' },
    { name: 'Messages', icon: 'bi-calendar-event', path: '/client-panel/messages' },
    { name: 'Edit profile', icon: 'bi-calendar-event', path: '/client-panel/edit-profile' },

  ];

  return (
    <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh'}}>
      
      {/* --- MOBILE HEADER (Sirf '=' button right side me) --- */}
      <div className="d-lg-none p-2 bg-white border-bottom sticky-top d-flex justify-content-end align-items-center">
        <button className="btn border-0" onClick={() => setShowSidebar(!showSidebar)}>
          <i className={`bi ${showSidebar ? 'bi-x-lg' : 'bi-list'} fs-1 text-dark`}></i>
        </button>
      </div>

      <div className="container py-lg-5 py-3">
        <div className="row g-4 pt-5">
          
          {/* --- SIDEBAR --- */}
          {/* Mobile par logic: agar showSidebar true hai tabhi dikhega, desktop par hamesha dikhega */}
          <aside className={`col-lg-3 ${showSidebar ? 'sidebar-mobile-view' : 'd-none d-lg-block'}`}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '20px' }}>
              <div className="p-4 text-center border-bottom bg-white">
                <div className="mx-auto mb-3" style={{ width: '100px', height: '100px' }}>
                    <img src="/assets/images/attorney1.png" className="rounded-circle shadow-sm w-100 h-100" style={{ objectFit: 'cover', border: '3px solid #f8f9fa' }} alt="user" />
                </div>
                <h5 className="fw-bold mb-1" style={{color: '#002147', fontSize: '18px'}}>John</h5>
                <p className="text-muted mb-0 small">user@gmail.com</p>
              </div>
              <div className="p-3 bg-white">
                <nav className="nav flex-column sidebar-nav">
                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.path}>
                      <a className={`nav-link ${router.pathname === item.path ? 'active' : ''}`} onClick={() => setShowSidebar(false)}>
                        <i className={`bi ${item.icon} me-3`}></i> {item.name}
                      </a>
                    </Link>
                  ))}
                  <div className="mt-4 pt-3 border-top">
                    <a href="#" className="nav-link text-danger fw-bold" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-3"></i> Logout
                    </a>
                  </div>
                </nav>
              </div>
            </div>
            {/* Background overlay: Mobile pe sidebar ke piche click karne par band ho jaye */}
            {showSidebar && <div className="overlay d-lg-none" onClick={() => setShowSidebar(false)}></div>}
          </aside>

          {/* --- CONTENT --- */}
          <main className="col-lg-9">
            <div className="bg-transparent">
              {children}
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .sidebar-nav .nav-link { 
          color: #444 !important; font-size: 15px; padding: 12px 18px; 
          border-radius: 10px; transition: 0.3s; margin-bottom: 5px; font-weight: 500; text-decoration: none; display: flex; align-items: center;
        }
        .sidebar-nav .nav-link:hover { background: #f8f9fa; color: #de9f57 !important; }
        .sidebar-nav .nav-link.active { background: #fcf6ef; color: #de9f57 !important; font-weight: bold; }
        
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
             background: rgba(0,0,0,0.2);
             z-index: 1040;
           }
        }
      `}</style>
    </div>
  );
}




// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// export default function ClientLayout({ children }) {
//   const router = useRouter();
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [profileDropdown, setProfileDropdown] = useState(false);

//   // Logout Logic
//   const handleLogout = (e) => {
//     e.preventDefault();
//     if (confirm("Are you sure?")) {
//       localStorage.clear();
//       router.push('/');
//     }
//   };

//   // Dropdown ko bahar click karne par band karne ke liye
//   useEffect(() => {
//     const closeDropdown = () => setProfileDropdown(false);
//     if (profileDropdown) {
//       window.addEventListener('click', closeDropdown);
//     }
//     return () => window.removeEventListener('click', closeDropdown);
//   }, [profileDropdown]);

//   const menuItems = [
//     { name: 'Dashboard', icon: 'bi-grid', path: '/client-panel' },
//     { name: 'Attorney', icon: 'bi-person', path: '/client-panel/attorneys' },
//     { name: 'Case Details', icon: 'bi-clock-history', path: '/client-panel/cases' },
//     { name: 'Appointments', icon: 'bi-calendar-event', path: '/client-panel/appointments' },
//     { name: 'Document Management', icon: 'bi-file-earmark-text', path: '/client-panel/document-management' },
//     { name: 'Transaction Management', icon: 'bi-credit-card', path: '/client-panel/transaction-management' },
//     { name: 'Messages', icon: 'bi-chat-dots', path: '/client-panel/messages' },
//     { name: 'Edit profile', icon: 'bi-pencil-square', path: '/client-panel/edit-profile' },
//   ];

//   return (
//     <div style={{ backgroundColor: '#f4f7fa', minHeight: '100vh' }}>
      
//       {/* --- DASHBOARD HEADER --- */}
//       <header className="fixed-top bg-white border-bottom shadow-sm" style={{ zindex: 1060 }}>
//         <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
          
//           {/* Left: Logo & Mobile Toggle */}
//           <div className="d-flex align-items-center">
//             <button className="btn border-0 d-lg-none me-2" onClick={(e) => { e.stopPropagation(); setShowSidebar(!showSidebar); }}>
//               <i className="bi bi-list fs-2"></i>
//             </button>
//             <Link href="/">
//               <a className="navbar-brand">
//                 <img src="/assets/images/brand-logo.png" alt="Logo" width="40" height="35" />
//               </a>
//             </Link>
//           </div>

//           {/* Right: Profile Dropdown */}
//           <div className="position-relative">
//             <div 
//               className="d-flex align-items-center cursor-pointer p-1 rounded-pill hover-bg" 
//               style={{ cursor: 'pointer' }}
//               onClick={(e) => { e.stopPropagation(); setProfileDropdown(!profileDropdown); }}
//             >
//               <span className="me-2 fw-bold d-none d-md-inline" style={{ color: '#002147' }}>John</span>
//               <img 
//                 src="/assets/images/attorney1.png" 
//                 className="rounded-circle shadow-sm" 
//                 style={{ width: '35px', height: '35px', objectFit: 'cover', border: '2px solid #de9f57' }} 
//                 alt="user" 
//               />
//               <i className="bi bi-chevron-down ms-1 small"></i>
//             </div>

//             {/* Dropdown Menu */}
//             {profileDropdown && (
//               <div className="position-absolute end-0 mt-2 bg-white shadow-lg rounded-3 border py-2" style={{ width: '180px', zIndex: 1000 }}>
//                 <Link href="/client-panel">
//                   <a className="dropdown-item py-2 px-3 d-flex align-items-center">
//                     <i className="bi bi-speedometer2 me-2"></i> Dashboard
//                   </a>
//                 </Link>
//                 <hr className="my-1" />
//                 <a href="#" className="dropdown-item py-2 px-3 text-danger d-flex align-items-center" onClick={handleLogout}>
//                   <i className="bi bi-box-arrow-right me-2"></i> Logout
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Spacer for fixed header */}
//       <div style={{ height: '70px' }}></div>

//       <div className="container py-lg-4 py-3">
//         <div className="row g-4">
          
//           {/* --- SIDEBAR --- */}
//           <aside className={`col-lg-3 ${showSidebar ? 'sidebar-mobile-view' : 'd-none d-lg-block'}`}>
//             <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '90px' }}>
//               <div className="p-4 text-center border-bottom bg-white d-none d-lg-block">
//                 <div className="mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
//                     <img src="/assets/images/attorney1.png" className="rounded-circle shadow-sm w-100 h-100" style={{ objectFit: 'cover', border: '3px solid #f8f9fa' }} alt="user" />
//                 </div>
//                 <h5 className="fw-bold mb-1" style={{ color: '#002147', fontSize: '17px' }}>John</h5>
//                 <p className="text-muted mb-0 small">user@gmail.com</p>
//               </div>
//               <div className="p-3 bg-white">
//                 <nav className="nav flex-column sidebar-nav">
//                   {menuItems.map((item, idx) => (
//                     <Link key={idx} href={item.path}>
//                       <a className={`nav-link ${router.pathname === item.path ? 'active' : ''}`} onClick={() => setShowSidebar(false)}>
//                         <i className={`bi ${item.icon} me-3`}></i> {item.name}
//                       </a>
//                     </Link>
//                   ))}
//                   <div className="mt-4 pt-3 border-top d-lg-none">
//                     <a href="#" className="nav-link text-danger fw-bold" onClick={handleLogout}>
//                       <i className="bi bi-box-arrow-right me-3"></i> Logout
//                     </a>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//             {showSidebar && <div className="overlay d-lg-none" onClick={() => setShowSidebar(false)}></div>}
//           </aside>

//           {/* --- CONTENT --- */}
//           <main className="col-lg-9">
//             <div className="bg-transparent">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>

//       <style jsx>{`
//         .sidebar-nav .nav-link { 
//           color: #444 !important; font-size: 15px; padding: 12px 18px; 
//           border-radius: 10px; transition: 0.3s; margin-bottom: 5px; font-weight: 500; text-decoration: none; display: flex; align-items: center;
//         }
//         .sidebar-nav .nav-link:hover { background: #f8f9fa; color: #de9f57 !important; }
//         .sidebar-nav .nav-link.active { background: #fcf6ef; color: #de9f57 !important; font-weight: bold; }
        
//         .dropdown-item { font-size: 14px; color: #333; transition: 0.2s; cursor: pointer; text-decoration: none; }
//         .dropdown-item:hover { background-color: #f8f9fa; color: #de9f57; }
//         .hover-bg:hover { background-color: #f8f9fa; }

//         @media (max-width: 991px) {
//            .sidebar-mobile-view { 
//              position: fixed; 
//              top: 60px; 
//              left: 0; 
//              width: 280px; 
//              height: 100vh;
//              z-index: 1050;
//              display: block !important;
//              background: white;
//              box-shadow: 5px 0 15px rgba(0,0,0,0.1);
//            }
//            .overlay {
//              position: fixed;
//              top: 0;
//              left: 0;
//              width: 100%;
//              height: 100%;
//              background: rgba(0,0,0,0.4);
//              z-index: 1040;
//            }
//         }
//       `}</style>
//     </div>
//   );
// }