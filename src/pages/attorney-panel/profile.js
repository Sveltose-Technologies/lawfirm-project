"use client";

import React, { useState, useEffect } from "react";
import AttorneyLayout from "../../components/layout/AttorneyLayout";
import {
  getAttorneylanguages,
  getUserProfile,
  updateAttorney,
  getAllCapabilityCategories,
  getAllLocationCities,
} from "../../services/authService";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    street: "",
    aptBlock: "",
    city: "",
    state: "",
    country: "",
    location: "",
    zipCode: "",
    phoneCell: "",
    phoneHome: "",
    phoneOffice: "",
    dob: "",
    admission: "",
    language: "",
    servicesOffered: "",
    education: "",
    experience: "",
    barCouncilIndiaNo: "",
    barCouncilStateNo: "",
    familyLawPractice: "",
    familyDetails: "",
    aboutus: "",
    categoryId: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    gmail: "",
    status: "active",
    profileImage: null,
    resume: null,
    kycIdentity: null,
    kycAddress: null,
    barCouncilIndiaId: null,
    barCouncilStateId: null,
  });

  useEffect(() => {
    const loadInitialData = async () => {
      // Correctly retrieve User ID from the stored 'user' object
      let user = null;
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          user = parsed.id;
        } catch (e) {
          console.error("Failed to parse user data", e);
        }
      }

      if (!user) {
        console.error("No User ID found in localStorage");
        return;
      }

      try {
        const [langRes, catRes, cityRes, profileRes] = await Promise.all([
          getAttorneylanguages(),
          getAllCapabilityCategories(),
          getAllLocationCities(),
          getUserProfile(userId),
        ]);

        // Set dropdown data based on API response structure
        setLanguages(langRes?.data || []);
        setCategories(catRes?.data || []);
        setCities(cityRes?.data || []);

        const attorney = profileRes?.attorney;
        if (attorney) {
          setFormData((prev) => ({
            ...prev,
            ...attorney,
            dob: attorney.dob ? attorney.dob.split("T")[0] : "",
            categoryId: attorney.categoryId?.toString() || "",
            city: attorney.city?.toString() || "",
            password: "",
            profileImage: null,
            resume: null,
            kycIdentity: null,
            kycAddress: null,
            barCouncilIndiaId: null,
            barCouncilStateId: null,
          }));
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let userId = null;
    const userData = localStorage.getItem("user");
    if (userData) userId = JSON.parse(userData).id;

    const payload = new FormData();
    const fileFields = [
      "profileImage",
      "resume",
      "kycIdentity",
      "kycAddress",
      "barCouncilIndiaId",
      "barCouncilStateId",
    ];

    Object.keys(formData).forEach((key) => {
      if (key === "password" && !formData[key]) return;

      if (fileFields.includes(key)) {
        if (formData[key] instanceof File) payload.append(key, formData[key]);
      } else if (["experience", "categoryId", "city"].includes(key)) {
        payload.append(key, parseInt(formData[key]) || 0);
      } else if (formData[key] !== null && formData[key] !== undefined) {
        payload.append(key, formData[key]);
      }
    });

    try {
      const res = await updateAttorney(userId, payload);
      if (res) toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttorneyLayout>
      <div className="container-fluid py-2">
        <div className="card border-0 shadow-sm rounded-0 p-3 p-md-4 bg-white">
          <div className="mb-4 border-bottom pb-3">
            <h4 className="fw-bold text-dark mb-1">
              Edit Professional Profile
            </h4>
            <p className="text-muted small">
              Update your firm records and account settings.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 1. BASIC INFORMATION */}
            <div className="row g-3 mb-5">
              <div className="col-12">
                <h6 className="fw-bold text-uppercase border-start border-4 border-warning ps-2">
                  Basic Information
                </h6>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control rounded-0"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control rounded-0"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Email</label>
                {/* Email is now editable */}
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-0"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-0"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category Dropdown - using categoryName from JSON */}
              <div className="col-md-4">
                <label className="form-label small fw-bold">Category</label>
                <select
                  name="categoryId"
                  className="form-select rounded-0"
                  value={formData.categoryId}
                  onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold">DOB</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control rounded-0"
                  value={formData.dob || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Language Dropdown */}
              <div className="col-md-4">
                <label className="form-label small fw-bold">Language</label>
                <select
                  name="language"
                  className="form-select rounded-0"
                  value={formData.language}
                  onChange={handleInputChange}>
                  <option value="">Select Language</option>
                  {languages.map((l) => (
                    <option key={l.id} value={l.name || l.languageName}>
                      {l.name || l.languageName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. CONTACT & LOCATION */}
            <div className="row g-3 mb-5">
              <div className="col-12">
                <h6 className="fw-bold text-uppercase border-start border-4 border-warning ps-2">
                  Contact & Location
                </h6>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Cell Phone</label>
                <input
                  type="text"
                  name="phoneCell"
                  className="form-control rounded-0"
                  value={formData.phoneCell || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  className="form-control rounded-0"
                  value={formData.street || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* City Dropdown - using cityName from JSON */}
              <div className="col-md-2">
                <label className="form-label small fw-bold">City</label>
                <select
                  name="city"
                  className="form-select rounded-0"
                  value={formData.city}
                  onChange={handleInputChange}>
                  <option value="">Select City</option>
                  {cities.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control rounded-0"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control rounded-0"
                  value={formData.country || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 3. PROFESSIONAL DETAILS */}
            <div className="row g-3 mb-5">
              <div className="col-12">
                <h6 className="fw-bold text-uppercase border-start border-4 border-warning ps-2">
                  Credentials
                </h6>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Admission (College)
                </label>
                <input
                  type="text"
                  name="admission"
                  className="form-control rounded-0"
                  value={formData.admission || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experience"
                  className="form-control rounded-0"
                  value={formData.experience || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">
                  Bio (About Us)
                </label>
                <textarea
                  name="aboutus"
                  className="form-control rounded-0"
                  rows="3"
                  value={formData.aboutus || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Education</label>
                <textarea
                  name="education"
                  className="form-control rounded-0"
                  rows="3"
                  value={formData.education || ""}
                  onChange={handleInputChange}></textarea>
              </div>
            </div>

            <div className="mt-5 d-flex gap-2">
              <button
                type="submit"
                className="btn btn-warning rounded-0 px-5 text-white"
                disabled={loading}>
                {loading ? "PROCESSING..." : "SUBMIT"}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary rounded-0 px-5"
                onClick={() => window.location.reload()}>
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </AttorneyLayout>
  );
}
