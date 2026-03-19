"use client";

import React, { useState, useEffect } from "react";
import AttorneyLayout from "../../components/layout/AttorneyLayout";
import {
  getAttorneylanguages,
  getUserProfile,
  updateAttorney,
  getAllCapabilityCategories,
  getAllLocationCities,
  getAllLocationCountries,
} from "../../services/authService";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attorneyId, setAttorneyId] = useState(null);

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
    familyLawPractice: "false",
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
      const userData = localStorage.getItem("user");
      if (!userData) return;
      const currentUserId = JSON.parse(userData).id;

      try {
        const [langRes, catRes, cityRes, countryRes, profileRes] =
          await Promise.all([
            getAttorneylanguages(),
            getAllCapabilityCategories(),
            getAllLocationCities(),
            getAllLocationCountries(),
            getUserProfile(currentUserId),
          ]);

        setLanguages(langRes?.data || []);
        setCategories(catRes?.data || []);
        setCities(cityRes?.data || []);
        setCountries(countryRes?.data || []);

        const attorney =
          profileRes?.attorney ||
          profileRes?.attorneys?.[0] ||
          profileRes?.data?.attorney;

        if (attorney) {
          setAttorneyId(attorney.id); // Dynamic ID from backend
          setFormData({
            firstName: attorney.firstName || "",
            lastName: attorney.lastName || "",
            email: attorney.email || "",
            password: "",
            street: attorney.street || "",
            aptBlock: attorney.aptBlock || "",
            city: attorney.city?.toString() || "",
            state: attorney.state || "",
            country: attorney.country || "",
            zipCode: attorney.zipCode || "",
            phoneCell: attorney.phoneCell || "",
            phoneHome: attorney.phoneHome || "",
            phoneOffice: attorney.phoneOffice || "",
            dob: attorney.dob ? attorney.dob.split("T")[0] : "",
            admission: attorney.admission || "",
            language: attorney.language || "",
            servicesOffered: attorney.servicesOffered || "",
            education: attorney.education || "",
            experience: attorney.experience || "",
            barCouncilIndiaNo: attorney.barCouncilIndiaNo || "",
            barCouncilStateNo: attorney.barCouncilStateNo || "",
            familyLawPractice:
              attorney.familyLawPractice?.toString() || "false",
            familyDetails: attorney.familyDetails || "",
            aboutus: attorney.aboutus || "",
            categoryId: attorney.categoryId?.toString() || "",
            linkedin: attorney.linkedin || "",
            twitter: attorney.twitter || "",
            facebook: attorney.facebook || "",
            gmail: attorney.gmail || "",
            status: attorney.status || "active",
            profileImage: null,
            resume: null,
            kycIdentity: null,
            kycAddress: null,
            barCouncilIndiaId: null,
            barCouncilStateId: null,
          });
        }
      } catch (error) {
        console.error("Load Error:", error);
        toast.error("Error loading data");
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

    const finalUpdateId =
      attorneyId || JSON.parse(localStorage.getItem("user")).id;

    if (!finalUpdateId) {
      toast.error("ID not found");
      setLoading(false);
      return;
    }

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
      // 1. Skip password if empty
      if (key === "password" && !formData[key]) return;

      // 2. Handle Files
      if (fileFields.includes(key)) {
        if (formData[key] instanceof File) {
          payload.append(key, formData[key]);
        }
      }
      // 3. Handle Regular Fields
      else {
        let value = formData[key];

        // Fix for 500 error: If ID fields are empty strings, don't send them or send null
        if (
          (key === "categoryId" || key === "city" || key === "country") &&
          (value === "" || value === null)
        ) {
          return;
        }

        payload.append(key, value === null ? "" : value);
      }
    });

    try {
      console.log("Submitting update for dynamic ID:", finalUpdateId);
      const res = await updateAttorney(finalUpdateId, payload);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Server Error (500) during update",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AttorneyLayout>
      <div className="container-fluid py-2">
        <div className="card border-0 shadow-sm p-4 bg-white">
          <h4 className="fw-bold mb-4">Edit Full Professional Profile</h4>

          <form onSubmit={handleSubmit}>
            {/* 1. BASIC INFO */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h6 className="text-primary fw-bold">1. Basic Details</h6>
                <hr />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">
                  Password (Leave blank to keep same)
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">DOB</label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Language</label>
                <select
                  name="language"
                  className="form-select"
                  value={formData.language}
                  onChange={handleInputChange}>
                  <option value="">Select</option>
                  {languages.map((l) => (
                    <option key={l.id} value={l.languageName || l.name}>
                      {l.languageName || l.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Category</label>
                <select
                  name="categoryId"
                  className="form-select"
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
              <div className="col-md-3">
                <label className="form-label small fw-bold">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* 2. CONTACT & ADDRESS */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h6 className="text-primary fw-bold">2. Contact & Address</h6>
                <hr />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Phone (Cell)</label>
                <input
                  type="text"
                  name="phoneCell"
                  className="form-control"
                  value={formData.phoneCell || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Phone (Home)</label>
                <input
                  type="text"
                  name="phoneHome"
                  className="form-control"
                  value={formData.phoneHome || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Phone (Office)
                </label>
                <input
                  type="text"
                  name="phoneOffice"
                  className="form-control"
                  value={formData.phoneOffice || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Street</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.street || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Apt/Block</label>
                <input
                  type="text"
                  name="aptBlock"
                  className="form-control"
                  value={formData.aptBlock || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">City</label>
                <select
                  name="city"
                  className="form-select"
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
              <div className="col-md-4">
                <label className="form-label small fw-bold">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Country</label>
                <select
                  name="country"
                  className="form-select"
                  value={formData.country}
                  onChange={handleInputChange}>
                  <option value="">Select Country</option>
                  {countries.map((cn) => (
                    <option key={cn.id} value={cn.countryName}>
                      {cn.countryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-control"
                  value={formData.zipCode || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 3. PROFESSIONAL EXPERIENCE */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h6 className="text-primary fw-bold">
                  3. Professional Credentials
                </h6>
                <hr />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Bar Council India No.
                </label>
                <input
                  type="text"
                  name="barCouncilIndiaNo"
                  className="form-control"
                  value={formData.barCouncilIndiaNo || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Bar Council State No.
                </label>
                <input
                  type="text"
                  name="barCouncilStateNo"
                  className="form-control"
                  value={formData.barCouncilStateNo || ""}
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
                  className="form-control"
                  value={formData.experience || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">
                  Admission (College/Univ)
                </label>
                <input
                  type="text"
                  name="admission"
                  className="form-control"
                  value={formData.admission || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">
                  Family Law Practice?
                </label>
                <select
                  name="familyLawPractice"
                  className="form-select"
                  value={formData.familyLawPractice}
                  onChange={handleInputChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
              <div className="col-md-12">
                <label className="form-label small fw-bold">
                  Bio / About Us
                </label>
                <textarea
                  name="aboutus"
                  className="form-control"
                  rows="2"
                  value={formData.aboutus || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">
                  Education Details
                </label>
                <textarea
                  name="education"
                  className="form-control"
                  rows="2"
                  value={formData.education || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">
                  Services Offered
                </label>
                <textarea
                  name="servicesOffered"
                  className="form-control"
                  rows="2"
                  value={formData.servicesOffered || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-12">
                <label className="form-label small fw-bold">
                  Family Details (If applicable)
                </label>
                <textarea
                  name="familyDetails"
                  className="form-control"
                  rows="2"
                  value={formData.familyDetails || ""}
                  onChange={handleInputChange}></textarea>
              </div>
            </div>

            {/* 4. SOCIAL MEDIA */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h6 className="text-primary fw-bold">4. Social Links</h6>
                <hr />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  className="form-control"
                  value={formData.linkedin || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Twitter</label>
                <input
                  type="text"
                  name="twitter"
                  className="form-control"
                  value={formData.twitter || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  className="form-control"
                  value={formData.facebook || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Gmail/Google</label>
                <input
                  type="text"
                  name="gmail"
                  className="form-control"
                  value={formData.gmail || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 5. DOCUMENTS & IMAGES */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h6 className="text-primary fw-bold">5. Documents Upload</h6>
                <hr />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Profile Image
                </label>
                <input
                  type="file"
                  name="profileImage"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Resume (PDF)</label>
                <input
                  type="file"
                  name="resume"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">KYC Identity</label>
                <input
                  type="file"
                  name="kycIdentity"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  KYC Address Proof
                </label>
                <input
                  type="file"
                  name="kycAddress"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Bar Council India ID Card
                </label>
                <input
                  type="file"
                  name="barCouncilIndiaId"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Bar Council State ID Card
                </label>
                <input
                  type="file"
                  name="barCouncilStateId"
                  className="form-control"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-warning px-5 fw-bold"
                disabled={loading}>
                {loading ? "SAVING..." : "UPDATE PROFILE"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AttorneyLayout>
  );
}
