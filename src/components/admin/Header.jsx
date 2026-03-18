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
  NavItem,
  NavLink,
} from "reactstrap";
import * as authService from "../../services/authService";
import { toast } from "react-toastify";
 
const Header = ({ showMobmenu }) => {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
 
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
    toast.success("Logout Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored", 
    });
    router.push("/login-signup");
  };
 
  const profileImg = adminData?.profileImage
    ? authService.getImgUrl(adminData.profileImage)
    : `https://ui-avatars.com/api/?name=${adminData?.firstName || "Admin"}&background=eebb5d&color=fff`;
 
  return (
    <Navbar
      color="white"
      light
      expand="md"
      className="shadow-sm bg-white m-3 rounded-4 px-4 sticky-top"
    >
      <div className="d-flex align-items-center justify-content-between w-100">
        {/* Left Section */}
        <div className="d-flex align-items-center">
          <Button
            color="light"
            className="d-lg-none border-0 p-1 me-2"
            onClick={showMobmenu}
          >
            <i className="bi bi-list fs-3"></i>
          </Button>
 
          <NavbarBrand href="/" className="fw-bold fs-4 text-warning">
            Lawfirm
          </NavbarBrand>
        </div>
 
        {/* Right Section */}
        <Nav className="ms-auto align-items-center flex-row gap-3" navbar>
          {/* Message Icon */}
          <NavItem className="d-flex align-items-center">
            <Link href="/admin-panel/messages" passHref legacyBehavior>
              <NavLink className="text-dark p-0">
                <i className="bi bi-chat-left-dots-fill fs-5"></i>
              </NavLink>
            </Link>
          </NavItem>
 
          {/* Live Site Link */}
          {/* <NavLink className="text-dark d-flex align-items-center gap-2 p-0 fw-medium small">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 17l5-5-5-5v3H3v4h7v3z" />
              <path d="M14 3h7v18h-7v-2h5V5h-5V3z" />
            </svg>
            <span>Live Site</span>
          </NavLink> */}
          {/* <NavItem className="d-none d-md-flex align-items-center mx-2">
            <Link href="/" passHref legacyBehavior>
              <NavLink className="text-dark d-flex align-items-center gap-2 p-0 fw-medium small">
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span>Live Site</span>
              </NavLink>
            </Link>
          </NavItem> */}
          <NavItem className="d-none d-md-flex align-items-center mx-2">
            <Link href="/" passHref legacyBehavior>
              <NavLink
              
                className="text-dark d-flex align-items-center gap-2 p-0 fw-medium small"
              >
                <i className="bi bi-box-arrow-right fs-6"></i>
                <span>Live Site</span>
              </NavLink>
            </Link>
          </NavItem>
          {/* Language Dropdown */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle
              nav
              caret
              className="text-dark small border rounded px-2 py-1"
            >
              English
            </DropdownToggle>
            <DropdownMenu end className="shadow border-0">
              <DropdownItem>English</DropdownItem>
              <DropdownItem>Spanish</DropdownItem>
              <DropdownItem>French</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
 
          {/* Profile Dropdown */}
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav className="d-flex align-items-center gap-2 p-0">
              <div className="d-none d-sm-block text-end">
                <div
                  className="fw-bold text-dark small"
                  style={{ lineHeight: "1" }}
                >
                  {adminData
                    ? `${adminData.firstName} ${adminData.lastName}`
                    : "Admin"}
                </div>
                <small className="text-muted" style={{ fontSize: "10px" }}>
                  Super Admin
                </small>
              </div>
 
              <img
                src={profileImg}
                className="rounded-circle border"
                width="38"
                height="38"
                style={{ objectFit: "cover" }}
                alt="profile"
              />
            </DropdownToggle>
 
            <DropdownMenu
              end
              className="shadow border-0 mt-2 rounded-3 bg-white"
              style={{ minWidth: "150px" }}
            >
              <DropdownItem
                tag={Link}
                href="/admin-panel/profile"
                className="text-dark"
              >
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleLogout} className="text-danger">
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