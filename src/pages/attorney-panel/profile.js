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
    admission: "", // Isme ab College ka naam aayega
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
    const userId = localStorage.getItem("userId");

    const loadData = async () => {
      try {
        const [langRes, catRes, cityRes, profileRes] = await Promise.all([
          getAttorneylanguages(),
          getAllCapabilityCategories(),
          getAllLocationCities(),
          getUserProfile(userId),
        ]);

        setLanguages(langRes?.data?.data || langRes?.data || []);
        setCategories(catRes?.data || catRes || []);
        setCities(cityRes?.data || cityRes || []);

        const attorney = profileRes?.attorney;
        if (attorney) {
          setFormData((prev) => ({
            ...prev,
            ...attorney,
            // DOB date hai isliye split zaroori hai
            dob: attorney.dob ? attorney.dob.split("T")[0] : "",

            // Admission ab string (College Name) hai, isliye split nahi karenge
            admission: attorney.admission || "",

            phoneCell: attorney.phoneCell || "",
            phoneHome: attorney.phoneHome || "",
            phoneOffice: attorney.phoneOffice || "",
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
        console.error("Initialization Error:", error);
      }
    };

    loadData();
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
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "password" && !formData[key]) return;

      // Numeric Fields logic
      if (
        key === "familyLawPractice" ||
        key === "experience" ||
        key === "categoryId" ||
        key === "city"
      ) {
        const val = parseInt(formData[key]);
        payload.append(key, isNaN(val) ? 0 : val);
      }
      // File logic
      else if (formData[key] instanceof File) {
        payload.append(key, formData[key]);
      }
      // Text logic (Admission College Name isme chala jayega)
      else if (formData[key] !== null && formData[key] !== undefined) {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await updateAttorney(userId, payload);
      if (response.status === 200 || response.data?.success) {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        "Server Error";
      toast.error(`Error: ${errorMsg}`);
    }
  };

  return (
    <AttorneyLayout>
      <div className="container-fluid py-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="mb-4">
            <h3 className="fw-bold text-navy" style={{ color: "#002147" }}>
              Edit Professional Profile
            </h3>
            <p className="text-muted small">
              All fields below are synchronized with your attorney records.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* 1. PERSONAL & ACCOUNT SECTION */}
            <div className="row g-3 mb-5 border-bottom pb-4">
              <div className="col-12">
                <h5 className="fw-bold">Basic Information</h5>
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
                <label className="form-label small fw-bold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-bold">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Leave blank to keep current"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Specialization Category
                </label>
                <select
                  name="categoryId"
                  className="form-select"
                  value={formData.categoryId || ""}
                  onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="form-control"
                  value={formData.dob || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Language</label>
                <select
                  name="language"
                  className="form-select"
                  value={formData.language || ""}
                  onChange={handleInputChange}>
                  <option value="">Select Language</option>
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. CONTACT & LOCATION SECTION */}
            <div className="row g-3 mb-5 border-bottom pb-4">
              <div className="col-12">
                <h5 className="fw-bold">Contact & Location</h5>
              </div>
              <div className="col-md-4">
                <label className="form-label small">Cell Phone</label>
                <input
                  type="text"
                  name="phoneCell"
                  className="form-control"
                  value={formData.phoneCell || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Home Phone</label>
                <input
                  type="text"
                  name="phoneHome"
                  className="form-control"
                  value={formData.phoneHome || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Office Phone</label>
                <input
                  type="text"
                  name="phoneOffice"
                  className="form-control"
                  value={formData.phoneOffice || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">Street Address</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.street || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label small">Apt/Block</label>
                <input
                  type="text"
                  name="aptBlock"
                  className="form-control"
                  value={formData.aptBlock || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">City</label>
                <select
                  name="city"
                  className="form-select"
                  value={formData.city || ""}
                  onChange={handleInputChange}>
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.state || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={formData.country || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className="form-control"
                  value={formData.zipCode || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Location (Area)</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 3. PROFESSIONAL DETAILS SECTION */}
            <div className="row g-3 mb-5 border-bottom pb-4">
              <div className="col-12">
                <h5 className="fw-bold">Professional Credentials</h5>
              </div>
              <div className="col-md-3">
                {/* Yahan maine Admission ko Text kar diya hai */}
                <label className="form-label small">
                  Admission (College/University)
                </label>
                <input
                  type="text"
                  name="admission"
                  className="form-control"
                  placeholder="Enter College Name"
                  value={formData.admission || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  value={formData.experience || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">
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
              <div className="col-md-3">
                <label className="form-label small">
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
              <div className="col-md-6">
                <label className="form-label small">Education</label>
                <textarea
                  name="education"
                  className="form-control"
                  rows="2"
                  value={formData.education || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-6">
                <label className="form-label small">About Us / Bio</label>
                <textarea
                  name="aboutus"
                  className="form-control"
                  rows="2"
                  value={formData.aboutus || ""}
                  onChange={handleInputChange}></textarea>
              </div>
              <div className="col-md-4">
                <label className="form-label small">Services Offered</label>
                <input
                  type="text"
                  name="servicesOffered"
                  className="form-control"
                  value={formData.servicesOffered || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">
                  Family Law Practice (Numbers only)
                </label>
                <input
                  type="number"
                  name="familyLawPractice"
                  className="form-control"
                  value={formData.familyLawPractice || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label small">Family Details</label>
                <input
                  type="text"
                  name="familyDetails"
                  className="form-control"
                  value={formData.familyDetails || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 4. SOCIAL MEDIA SECTION */}
            <div className="row g-3 mb-5 border-bottom pb-4">
              <div className="col-12">
                <h5 className="fw-bold">Social Media & Identity</h5>
              </div>
              <div className="col-md-3">
                <label className="form-label small">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  className="form-control"
                  value={formData.linkedin || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Twitter URL</label>
                <input
                  type="text"
                  name="twitter"
                  className="form-control"
                  value={formData.twitter || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Facebook URL</label>
                <input
                  type="text"
                  name="facebook"
                  className="form-control"
                  value={formData.facebook || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label small">Gmail Handle</label>
                <input
                  type="text"
                  name="gmail"
                  className="form-control"
                  value={formData.gmail || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 5. FILES SECTION */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <h5 className="fw-bold">Verification Documents</h5>
              </div>
              {[
                { label: "Profile Image", name: "profileImage" },
                { label: "Resume/CV", name: "resume" },
                { label: "KYC Identity (Govt ID)", name: "kycIdentity" },
                { label: "KYC Address Proof", name: "kycAddress" },
                {
                  label: "Bar Council India ID Card",
                  name: "barCouncilIndiaId",
                },
                {
                  label: "Bar Council State ID Card",
                  name: "barCouncilStateId",
                },
              ].map((file) => (
                <div className="col-md-4" key={file.name}>
                  <label className="form-label small fw-bold">
                    {file.label}
                  </label>
                  <input
                    type="file"
                    name={file.name}
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-bold rounded-pill"
                style={{ backgroundColor: "#002147", border: "none" }}>
                SAVE ALL CHANGES
              </button>
            </div>
          </form>
        </div>
      </div>
    </AttorneyLayout>
  );
}
