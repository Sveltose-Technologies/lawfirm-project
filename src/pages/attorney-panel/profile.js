import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import AttorneyLayout from "../../components/layout/AttorneyLayout";
import {
  getAttorneylanguages,
  getUserProfile,
  updateAttorney,
} from "../../services/authService";
import { toast } from "react-toastify";

export default function EditProfile() {
  const [languages, setLanguages] = useState([]);
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    admission: "",
    language: "",
    phoneCell: "",
    phoneHome: "",
    phoneOffice: "",
    street: "",
    aptBlock: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    location: "",
    barCouncilIndiaNo: "",
    barCouncilStateNo: "",
    servicesOffered: "",
    education: "",
    experience: "",
    familyLawPractice: "",
    familyDetails: "",
    // File fields
    profileImage: null,
    resume: null,
    kycIdentity: null,
    kycAddress: null,
    barCouncilIndiaId: null,
    barCouncilStateId: null,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      try {
        const [langRes, profileRes] = await Promise.all([
          getAttorneylanguages(),
          getUserProfile(userId),
        ]);

        const langs = langRes?.data?.data || langRes?.data || [];
        setLanguages(langs);

        const attorney = profileRes?.attorney || profileRes?.data;
        setUserData(attorney);

        if (attorney) {
          setFormData((prev) => ({
            ...prev,
            firstName: attorney.firstName || "",
            lastName: attorney.lastName || "",
            email: attorney.email || "",
            dob: attorney.dob ? attorney.dob.split("T")[0] : "",
            admission: attorney.admission
              ? attorney.admission.split("T")[0]
              : "",
            language: attorney.language || "",
            phoneCell: attorney.phoneCell || "",
            phoneHome: attorney.phoneHome || "",
            phoneOffice: attorney.phoneOffice || "",
            street: attorney.street || "",
            aptBlock: attorney.aptBlock || "",
            city: attorney.city || "",
            state: attorney.state || "",
            zipCode: attorney.zipCode || "",
            country: attorney.country || "",
            barCouncilIndiaNo: attorney.barCouncilIndiaNo || "",
            barCouncilStateNo: attorney.barCouncilStateNo || "",
            servicesOffered: attorney.servicesOffered || "",
            education: attorney.education || "",
            experience: attorney.experience || "",
            familyLawPractice: attorney.familyLawPractice || "",
            familyDetails: attorney.familyDetails || "",
          }));
        }
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    };

    if (userId) fetchData();
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
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("User session not found");

    const payload = new FormData();

    // Append all text and file data
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await updateAttorney(userId, payload);
      if (response) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to update profile.");
    }
  };

  return (
    <AttorneyLayout>
      <div className="container-fluid px-0">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white w-100">
          <div className="mb-5">
            <h3 className="fw-bold text-navy" style={{ fontFamily: "serif" }}>
              Edit Profile
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal & Contact Section */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="p-4 rounded-4 border bg-white shadow-sm">
                  <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">
                    Personal & Contact Details
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">
                        Password (Leave blank to keep current)
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
                      <label className="form-label fw-bold small">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label fw-bold small">
                        Admission Date
                      </label>
                      <input
                        type="date"
                        name="admission"
                        className="form-control"
                        value={formData.admission}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Primary Language
                      </label>
                      <select
                        name="language"
                        className="form-select"
                        value={formData.language}
                        onChange={handleInputChange}>
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                          <option key={lang.id || lang.code} value={lang.name}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {/* Membership Side */}
              <div className="col-lg-5">
                <div
                  className="p-4 rounded-4 border h-100 shadow-sm"
                  style={{ backgroundColor: "#fcf6ef" }}>
                  <h5 className="fw-bold mb-4 text-navy">
                    Membership & Practice
                  </h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold small">
                      Services Offered
                    </label>
                    <input
                      type="text"
                      name="servicesOffered"
                      className="form-control"
                      value={formData.servicesOffered}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small">
                      Family Law Practice
                    </label>
                    <input
                      type="text"
                      name="familyLawPractice"
                      className="form-control"
                      value={formData.familyLawPractice}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              {/* KYC & Document Side */}
              <div className="col-lg-7">
                <div className="p-4 rounded-4 border bg-white shadow-sm h-100">
                  <h5 className="fw-bold text-navy mb-3">
                    Document Verification
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Profile Image
                      </label>
                      <input
                        type="file"
                        name="profileImage"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Resume/CV
                      </label>
                      <input
                        type="file"
                        name="resume"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Bar Council India ID
                      </label>
                      <input
                        type="file"
                        name="barCouncilIndiaId"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Bar Council State ID
                      </label>
                      <input
                        type="file"
                        name="barCouncilStateId"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        KYC Identity
                      </label>
                      <input
                        type="file"
                        name="kycIdentity"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        KYC Address Proof
                      </label>
                      <input
                        type="file"
                        name="kycAddress"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5 d-flex gap-3">
                    <button
                      type="submit"
                      className="btn btn-dark px-4 rounded-pill fw-bold w-100"
                      style={{ backgroundColor: "#002147" }}>
                      SAVE ALL CHANGES
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AttorneyLayout>
  );
}
