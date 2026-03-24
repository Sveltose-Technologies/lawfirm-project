import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import ClientLayout from "../../components/layout/ClientLayout";
import {
  getAllLocationCities,
  getAllLocationCountries,
} from "../../services/authService";
import { toast } from "react-toastify";

export default function EditProfile() {
  const navyColor = "#002147";
  const goldColor = "#de9f57";
  const fileInputRef = useRef(null);

  // 1. All parameters included in state
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [profile, setProfile] = useState({
    firstName: "admin",
    lastName: "admin",
    email: "test@gmail.com",
    mobile: "9876543210",
    street: "MG Road",
    aptBlock: "B-12",
    city: "",
    state: "Madhya Pradesh",
    country: "",
    zipCode: "452001",
    countryCode: "+91",
    dob: "2001-05-15",
    password: "",
    currentPassword: "",
    termsAccepted: true,
    profileImage: "/assets/images/profilepic.png",
  });

  const [loading, setLoading] = useState(false);

  // 2. Handle Text Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle Image Upload & Preview
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

  // 4. API Integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const response = await fetch(
        `https://nodejs.nrislawfirm.com/client/update/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        },
      );

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const currentUserId = JSON.parse(userData).id;

      try {
        const [cityRes, countryRes] = await Promise.all([
          getAllLocationCities(),
          getAllLocationCountries(),
        ]);
        console.log("cityRes, countryRes", cityRes, countryRes);

        setCities(cityRes?.data || []);
        setCountries(countryRes?.data || []);
      } catch (error) {
        console.error("Load Error:", error);
        toast.error("Error loading data");
      }
    };
    loadInitialData();
  }, []);

  return (
    <ClientLayout>
      <div className="animate-fade">
        <div className="mb-4">
          <h4
            className="fw-bold mb-1"
            style={{ color: navyColor, fontSize: "20px" }}>
            Edit Profile
          </h4>
          <p className="text-muted small">
            Update your personal information and manage membership
          </p>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-12">
            <form
              onSubmit={handleSubmit}
              className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
              <h6 className="fw-bold mb-4" style={{ color: navyColor }}>
                Personal Information
              </h6>

              {/* Profile Pic Upload Section */}
              <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                <div className="position-relative">
                  <img
                    src={profile.profileImage}
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
                  <p className="text-muted x-small mb-0">
                    JPG, GIF or PNG. Max size 2MB
                  </p>
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                      className="form-control rounded-3 py-2 border-light-gray"
                      style={{ fontSize: "14px" }}
                      value={profile.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Added Missing Address Parameters */}
                <div className="col-md-8">
                  <label className="form-label small fw-bold text-muted">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    name="street"
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
                    value={profile.aptBlock}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    CITY
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
                    value={profile.city}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="col-md-4">
                  <label className="form-label small fw-bold">City</label>
                  <select
                    name="city"
                    className="form-select"
                    value={profile.city}
                    onChange={handleChange}>
                    <option value="">Select City</option>
                    {cities.map((ct) => (
                      <option key={ct.id} value={ct.id}>
                        {ct.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">
                    STATE
                  </label>
                  <input
                    type="text"
                    name="state"
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
                    value={profile.zipCode}
                    onChange={handleChange}
                  />
                </div>
                {/* <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    COUNTRY
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
                    value={profile.country}
                    onChange={handleChange}
                  />
                </div> */}
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Country</label>
                  <select
                    name="country"
                    className="form-select"
                    value={profile.country}
                    onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countries.map((cn) => (
                      <option key={cn.id} value={cn.countryName}>
                        {cn.countryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">
                    DATE OF BIRTH
                  </label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
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
                    className="form-control rounded-3 py-2 border-light-gray"
                    style={{ fontSize: "14px" }}
                    value={profile.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mt-4 text-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn text-white px-4 py-2 rounded-3 fw-bold shadow-sm"
                    style={{ backgroundColor: navyColor, fontSize: "14px" }}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>

         
        </div>
      </div>

      <style jsx>{`
        .border-light-gray {
          border-color: #f1f1f1 !important;
        }
        .x-small {
          font-size: 11px;
        }
        .form-control:focus {
          border-color: ${navyColor} !important;
          box-shadow: none;
        }
        .btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          transition: 0.2s;
        }
      `}</style>
    </ClientLayout>
  );
}
