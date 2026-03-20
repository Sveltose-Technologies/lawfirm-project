"use client";
import React, { useState, useRef, useEffect } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import * as authService from "../../services/authService"; // Import Service
import { toast } from "react-toastify"; // Optional but recommended

export default function EditProfile() {
  const navyColor = "#002147";
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    aptBlock: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    countryCode: "+91",
    dob: "",
    password: "",
    currentPassword: "",
    termsAccepted: true,
    profileImage: "/assets/images/profilepic.png",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 1. Load Profile Data on Mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
          const data = await authService.getClientProfile(user.id);
          // Map API data to state (handle potential nulls)
          setProfile((prev) => ({
            ...prev,
            ...data,
            dob: data.dob ? data.dob.split("T")[0] : "", // Format date for input
          }));
        }
      } catch (err) {
        console.error("Failed to load profile");
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size exceeds 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔥 2. Use the Service Method here
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      if (!userId) throw new Error("User session not found");

      await authService.updateClientProfile(userId, profile);

      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message || "An error occurred during update.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout>
      <div className="animate-fade">
        <div className="mb-4">
          <h4
            className="fw-bold mb-1"
            style={{ color: navyColor, fontSize: "20px" }}>
            Edit Profile
          </h4>
          <p className="text-muted small">Update your personal information</p>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h6 className="fw-bold mb-4" style={{ color: navyColor }}>
                Personal Information
              </h6>

              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="position-relative">
                  <img
                    src={
                      profile.profileImage || "/assets/images/placeholder.png"
                    }
                    className="rounded-circle border"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    alt="profile"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="btn btn-sm btn-dark rounded-circle position-absolute bottom-0 end-0 p-1"
                    style={{ width: "28px", height: "28px" }}>
                    <i
                      className="bi bi-camera-fill"
                      style={{ fontSize: "12px" }}></i>
                  </button>
                </div>
                <div className="ms-4">
                  <p className="mb-1 fw-bold small">Profile Picture</p>
               
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    PHONE NUMBER
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-light-gray small">
                      {profile.countryCode}
                    </span>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={profile.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <label className="form-label small fw-bold text-muted">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={profile.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    APT / BLOCK
                  </label>
                  <input
                    type="text"
                    name="aptBlock"
                    className="form-control"
                    value={profile.aptBlock}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    CITY
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    STATE
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={profile.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    ZIP CODE
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={profile.zipCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    COUNTRY
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={profile.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={profile.dob}
                    onChange={handleChange}
                  />
                </div>

                <hr className="my-4 opacity-50" />
                <h6
                  className="fw-bold mb-2"
                  style={{ color: navyColor, fontSize: "15px" }}>
                  Security Settings
                </h6>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    CURRENT PASSWORD
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="••••••••"
                    className="form-control"
                    value={profile.currentPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    NEW PASSWORD
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    className="form-control"
                    value={profile.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mt-4 text-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn text-white px-5 py-2 fw-bold"
                    style={{ backgroundColor: navyColor }}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          
        </div>
      </div>
    </ClientLayout>
  );
}
