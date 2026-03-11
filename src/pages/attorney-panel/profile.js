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
  const [profileComplete, setProfileComplete] = useState(75);
  const [languages, setLanguages] = useState([]);
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);

  // Full parameter state
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
    // Files
    profileImage: null,
    resume: null,
    kycIdentity: null,
    kycAddress: null,
    barCouncilIndiaId: null,
    barCouncilStateId: null,
  });
  console.log("Alll user DATA", userData);

  // handle update

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    // 1. Initialize FormData
    const payload = new FormData();

    // 2. Append all fields to the PAYLOAD, not the state object
    Object.keys(formData).forEach((key) => {
      // Only append if there is a value
      if (formData[key] !== null && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    // Debugging: To see what's inside FormData, you must loop through it
    for (let pair of payload.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      // FIX: Pass 'payload' (FormData), NOT 'formData' (State Object)
      const response = await updateAttorney(userId, payload);

      // Some APIs return the status in response.data, some in response.status
      if (
        response.status === 200 ||
        response.data?.success ||
        response.success
      ) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(
        error?.response?.data?.message || "An error occurred during update.",
      );
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const fetchLanguages = async () => {
      try {
        const response = await getAttorneylanguages();
        // Accessing the nested data array from the API response
        const langData = response?.data?.data || response?.data || [];
        setLanguages(langData);
      } catch (error) {
        console.error("Error fetching languages", error);
      }
    };
    const getuserInfo = async () => {
      try {
        const response = await getUserProfile(userId);
        const attorney = response?.attorney;
        setUserData(attorney);

        // Populate the form fields with fetched data
        if (attorney) {
          setFormData((prev) => ({
            ...prev,
            firstName: attorney.firstName || "",
            lastName: attorney.lastName || "",
            email: attorney.email || "",
            dob: attorney.dob ? attorney.dob.split("T")[0] : "", // Formats date for <input type="date">
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
            barCouncilIndiaNo: attorney.barCouncilIndiaNo || "",
            barCouncilStateNo: attorney.barCouncilStateNo || "",
            servicesOffered: attorney.servicesOffered || "",
            education: attorney.education || "",
            experience: attorney.experience || "",
            familyLawPractice: attorney.familyLawPractice || "",
          }));
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchLanguages();
    getuserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AttorneyLayout>
      <Head>
        <title>Lawstick | Edit Profile</title>
      </Head>
      <div className="container-fluid px-0">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white w-100">
          <div className="mb-5">
            <h3
              className="fw-bold mb-1"
              style={{
                fontFamily: "serif",
                color: "#002147",
                fontSize: "26px",
              }}>
              Edit Profile
            </h3>
            <p className="text-muted" style={{ fontSize: "15px" }}>
              Complete your professional profile and verification
            </p>
          </div>

          {/* 1. TOP SECTION: Personal, Contact & Professional (Full Width) */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="p-4 rounded-4 border bg-white shadow-sm">
                <h5 className="fw-bold mb-4 text-navy border-bottom pb-2">
                  Personal & Contact Details
                </h5>
                <div className="row g-3">
                  {/* Row 1: Basic Identity */}
                  <div className="col-md-3">
                    <label className="form-label fw-bold small">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control rounded-3"
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
                      className="form-control rounded-3"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold small">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-3"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-bold small">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control rounded-3"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Row 2: Dates & Language */}
                  <div className="col-md-3">
                    <label className="form-label fw-bold small">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      className="form-control rounded-3"
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
                      className="form-control rounded-3"
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
                      className="form-select rounded-3"
                      value={formData.language}
                      onChange={handleInputChange}>
                      <option value="">Select Language</option>
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name} {lang.local ? `(${lang.local})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 3: Phones */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Cell Phone
                    </label>
                    <input
                      type="text"
                      name="phoneCell"
                      className="form-control rounded-3"
                      value={formData.phoneCell}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Home Phone
                    </label>
                    <input
                      type="text"
                      name="phoneHome"
                      className="form-control rounded-3"
                      value={formData.phoneHome}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Office Phone
                    </label>
                    <input
                      type="text"
                      name="phoneOffice"
                      className="form-control rounded-3"
                      value={formData.phoneOffice}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Row 4: Address */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      className="form-control rounded-3"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold small">
                      Apt/Block
                    </label>
                    <input
                      type="text"
                      name="aptBlock"
                      className="form-control rounded-3"
                      value={formData.aptBlock}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold small">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control rounded-3"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold small">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control rounded-3"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label fw-bold small">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      className="form-control rounded-3"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Row 5: Professional Numbers */}
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Bar Council India No.
                    </label>
                    <input
                      type="text"
                      name="barCouncilIndiaNo"
                      className="form-control rounded-3"
                      value={formData.barCouncilIndiaNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Bar Council State No.
                    </label>
                    <input
                      type="text"
                      name="barCouncilStateNo"
                      className="form-control rounded-3"
                      value={formData.barCouncilStateNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-bold small">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      className="form-control rounded-3"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-bold small">
                      Education & Qualifications
                    </label>
                    <textarea
                      name="education"
                      className="form-control rounded-3"
                      rows="2"
                      value={formData.education}
                      onChange={handleInputChange}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. BOTTOM SECTION: Membership (Left) and KYC/Files (Right) */}
          <div className="row g-4">
            {/* Membership Side */}
            <div className="col-lg-5">
              <div
                className="p-4 rounded-4 border h-100 shadow-sm"
                style={{ backgroundColor: "#fcf6ef" }}>
                <h5 className="fw-bold mb-4 text-navy">
                  Membership & Practice
                </h5>
                <div
                  className="card border-0 shadow rounded-4 p-4 mb-4 text-white"
                  style={{ background: "#002147" }}>
                  <p className="small mb-1 opacity-75">Current Plan</p>
                  <h4 className="fw-bold">Premium Gold Membership</h4>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <small>Expiry: 31st Dec 2026</small>
                    <span className="badge bg-success rounded-pill">
                      ACTIVE
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small">
                    Services Offered
                  </label>
                  <input
                    type="text"
                    name="servicesOffered"
                    className="form-control"
                    placeholder="e.g. Criminal, Civil"
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
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  className="btn btn-dark w-100 fw-bold rounded-pill py-2"
                  style={{ backgroundColor: "#de9f57", border: "none" }}>
                  RENEW PLAN
                </button>
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
                      name="profileImage" // Must match state key
                      className="form-control"
                      onChange={handleFileChange} // Added this
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
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">
                      Bar Council State ID
                    </label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">
                      KYC Identity (Govt ID)
                    </label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold small">
                      KYC Address Proof
                    </label>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <div className="mt-5 d-flex gap-3">
                  <button
                    className="btn btn-dark px-4 rounded-pill fw-bold w-100"
                    style={{ backgroundColor: "#002147" }}>
                    SUBMIT KYC
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-outline-dark px-4 rounded-pill fw-bold w-100">
                    SAVE ALL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AttorneyLayout>
  );
}
