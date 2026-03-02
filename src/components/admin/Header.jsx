// // import React from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/router";
// // import {
// //   Navbar,
// //   Nav,
// //   NavbarBrand,
// //   UncontrolledDropdown,
// //   DropdownToggle,
// //   DropdownMenu,
// //   DropdownItem,
// //   Button,
// // } from "reactstrap";

// // const Header = ({ showMobmenu }) => {
// //   const router = useRouter();

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     router.push("/login-signup");
// //   };

// //   return (
// //     <Navbar
// //       color="white"
// //       light
// //       expand="md"
// //       className="shadow-sm bg-white m-3 rounded-4 px-4 sticky-top">
// //       <div className="d-flex align-items-center justify-content-between w-100">
// //         <div className="d-flex align-items-center">
// //           <Button
// //             color="light"
// //             className="d-lg-none border-0 p-1 me-2"
// //             onClick={showMobmenu}>
// //             <i className="bi bi-list fs-3"></i>
// //           </Button>
// //           <NavbarBrand href="/" className="fw-bold fs-4 text-warning">
// //             Lawfirm
// //           </NavbarBrand>
// //         </div>

// //         <div className="d-flex align-items-center gap-2">
// //           <Nav className="ms-auto align-items-center flex-row" navbar>
// //             <UncontrolledDropdown nav inNavbar>
// //               <DropdownToggle
// //                 nav
// //                 className="d-flex align-items-center gap-2 p-0">
// //                 <div className="d-none d-sm-block text-end">
// //                   <div
// //                     className="fw-bold text-dark small"
// //                     style={{ lineHeight: "1" }}>
// //                     Admin
// //                   </div>
// //                   <small className="text-muted" style={{ fontSize: "10px" }}>
// //                     Super Admin
// //                   </small>
// //                 </div>
// //                 <img
// //                   src="https://ui-avatars.com/api/?name=Admin&background=eebb5d&color=fff"
// //                   className="rounded-circle border"
// //                   width="38"
// //                   height="38"
// //                   alt="profile"
// //                 />
// //               </DropdownToggle>
// //               <DropdownMenu end className="shadow border-0 mt-2 rounded-3">
// //                 <DropdownItem tag={Link} href="/profile">
// //                   Profile
// //                 </DropdownItem>
// //                 <DropdownItem divider />
// //                 <DropdownItem onClick={handleLogout} className="text-danger">
// //                   Logout
// //                 </DropdownItem>
// //               </DropdownMenu>
// //             </UncontrolledDropdown>
// //           </Nav>
// //         </div>
// //       </div>
// //     </Navbar>
// //   );
// // };

// // export default Header;

// "use client"
// import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import {
//   Navbar,
//   Nav,
//   NavbarBrand,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "reactstrap";

// const Header = ({ showMobmenu }) => {
//   const router = useRouter();

//   const handleLogout = () => {
//     localStorage.clear();
//     router.push("/login-signup");
//   };

//   return (
//     <Navbar
//       color="white"
//       light
//       expand="md"
//       className="shadow-sm bg-white m-3 rounded-4 px-4 sticky-top">
//       <div className="d-flex align-items-center justify-content-between w-100">
//         {/* Left */}
//         <div className="d-flex align-items-center">
//           <Button
//             color="light"
//             className="d-lg-none border-0 p-1 me-2"
//             onClick={showMobmenu}>
//             <i className="bi bi-list fs-3"></i>
//           </Button>

//           <NavbarBrand href="/" className="fw-bold fs-4 text-warning">
//             Lawfirm
//           </NavbarBrand>
//         </div>

//         {/* Right */}
//         <Nav className="ms-auto align-items-center flex-row" navbar>
//           <UncontrolledDropdown nav inNavbar>
//             <DropdownToggle nav className="d-flex align-items-center gap-2 p-0">
//               <div className="d-none d-sm-block text-end">
//                 <div
//                   className="fw-bold text-dark small"
//                   style={{ lineHeight: "1" }}>
//                   Admin
//                 </div>
//                 <small className="text-muted" style={{ fontSize: "10px" }}>
//                   Super Admin
//                 </small>
//               </div>

//               <img
//                 src="https://ui-avatars.com/api/?name=Admin&background=eebb5d&color=fff"
//                 className="rounded-circle border"
//                 width="38"
//                 height="38"
//                 alt="profile"
//               />
//             </DropdownToggle>

//             <DropdownMenu
//               end
//               className="shadow border-0 mt-2 rounded-3 bg-white text-center"
//               style={{ backgroundColor: "#ffffff", minWidth: "150px", textAlign:"center"}}>
//               <DropdownItem
//                 tag={Link}
//                 href="/admin-panel/profile"
//                 className="text-dark text-center">
//                 Profile
//               </DropdownItem>

//               <DropdownItem divider />

//               <DropdownItem
//                 onClick={handleLogout}
//                 className="text-danger text-center">
//                 Logout
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//         </Nav>
//       </div>
//     </Navbar>
//   );
// };

// export default Header;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Navbar,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import * as authService from "../../services/authService"; // Added

const Header = ({ showMobmenu }) => {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null); // Added state

  // Fetch Admin Data for Name and Image
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await authService.getAdminProfile();
        if (data) {
          setAdminData(data);
        }
      } catch (error) {
        console.error("Header Profile Fetch Error:", error);
      }
    };
    fetchAdmin();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login-signup");
  };

  // Resolve Image Path
  const profileImg = adminData?.profileImage
    ? authService.getImgUrl(adminData.profileImage)
    : `https://ui-avatars.com/api/?name=${adminData?.firstName || "Admin"}&background=eebb5d&color=fff`;

  return (
    <Navbar
      color="white"
      light
      expand="md"
      className="shadow-sm bg-white m-3 rounded-4 px-4 sticky-top">
      <div className="d-flex align-items-center justify-content-between w-100">
        {/* Left */}
        <div className="d-flex align-items-center">
          <Button
            color="light"
            className="d-lg-none border-0 p-1 me-2"
            onClick={showMobmenu}>
            <i className="bi bi-list fs-3"></i>
          </Button>

          <NavbarBrand href="/" className="fw-bold fs-4 text-warning">
            Lawfirm
          </NavbarBrand>
        </div>

        {/* Right */}
        <Nav className="ms-auto align-items-center flex-row" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav className="d-flex align-items-center gap-2 p-0">
              <div className="d-none d-sm-block text-end">
                <div
                  className="fw-bold text-dark small"
                  style={{ lineHeight: "1" }}>
                  {/* Dynamic Name */}
                  {adminData
                    ? `${adminData.firstName} ${adminData.lastName}`
                    : "Admin"}
                </div>
                <small className="text-muted" style={{ fontSize: "10px" }}>
                  Super Admin
                </small>
              </div>

              <img
                src={profileImg} // Dynamic Image
                className="rounded-circle border"
                width="38"
                height="38"
                style={{ objectFit: "cover" }} // To prevent stretching
                alt="profile"
              />
            </DropdownToggle>

            <DropdownMenu
              end
              className="shadow border-0 mt-2 rounded-3 bg-white text-center"
              style={{
                backgroundColor: "#ffffff",
                minWidth: "150px",
                textAlign: "center",
              }}>
              <DropdownItem
                tag={Link}
                href="/admin-panel/profile"
                className="text-dark text-center">
                Profile
              </DropdownItem>

              <DropdownItem divider />

              <DropdownItem
                onClick={handleLogout}
                className="text-danger text-center">
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;