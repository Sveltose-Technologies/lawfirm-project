import React, { useState, useRef, useEffect, useMemo } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import {
  getAllLocationCities,
  getAllLocationCountries,
  updateClientProfile,
  getClientById,
  getImgUrl,
} from "../../services/authService";
import { toast } from "react-toastify";

export default function EditProfile() {
  const navyColor = "#002147";
  const fileInputRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
    countryCode: "",
    dob: "",
    password: "",
   
    kycIdentity: "",
    kycAddress: "",
    profileImage: "",
    termsAccepted: false,
  });

  const [uploadFiles, setUploadFiles] = useState({
    profileImage: null,
    kycIdentity: null,
    kycAddress: null,
  });

  const [previews, setPreviews] = useState({
    profileImage: "/assets/images/profilepic.png",
  });

  // Filter cities based on selected country ID
  const filteredCities = useMemo(() => {
    if (!profile.country || countries.length === 0) return [];
    const selectedCountryObj = countries.find(
      (c) => c.countryName === profile.country,
    );
    if (!selectedCountryObj) return [];
    return cities.filter(
      (city) => Number(city.countryId) === Number(selectedCountryObj.id),
    );
  }, [profile.country, cities, countries]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cityRes, countryRes] = await Promise.all([
          getAllLocationCities(),
          getAllLocationCountries(),
        ]);
        setCities(cityRes?.data || cityRes || []);
        setCountries(countryRes?.data || countryRes || []);

        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData?.id) {
          const res = await getClientById(userData.id);
          const serverData = res.client || res.data || res;

          if (serverData) {
            setProfile({
              ...serverData,
              dob: serverData.dob ? serverData.dob.split("T")[0] : "",
              password: "",
              status: serverData.status || "active",
            });

            if (serverData.profileImage) {
              setPreviews({ profileImage: getImgUrl(serverData.profileImage) });
            }
          }
        }
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setUploadFiles((prev) => ({ ...prev, [name]: file }));
      if (name === "profileImage") {
        setPreviews({ profileImage: URL.createObjectURL(file) });
      }
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!isLoaded) return;
  //   setLoading(true);

  //   try {
  //     const userData = JSON.parse(localStorage.getItem("user"));
  //     const formData = new FormData();

  //     // List of all 18 parameters to ensure none are missed
  //     const fields = [
  //       "firstName",
  //       "lastName",
  //       "email",
  //       "mobile",
  //       "street",
  //       "aptBlock",
  //       "city",
  //       "state",
  //       "country",
  //       "zipCode",
  //       "countryCode",
  //       "dob",
  //       "status",
  //       "termsAccepted",
  //     ];

  //     fields.forEach((key) => {
  //       const value = profile[key];
  //       if (
  //         value !== null &&
  //         value !== undefined &&
  //         value !== "" &&
  //         value !== "null"
  //       ) {
  //         if (key === "termsAccepted") {
  //           formData.append(key, value ? "1" : "0");
  //         } else {
  //           formData.append(key, value.toString().trim());
  //         }
  //       }
  //     });

  //     if (profile.password) formData.append("password", profile.password);

  //     // Append files only if they are newly selected
  //     if (uploadFiles.profileImage instanceof File)
  //       formData.append("profileImage", uploadFiles.profileImage);
  //     if (uploadFiles.kycIdentity instanceof File)
  //       formData.append("kycIdentity", uploadFiles.kycIdentity);
  //     if (uploadFiles.kycAddress instanceof File)
  //       formData.append("kycAddress", uploadFiles.kycAddress);

  //     const result = await updateClientProfile(userData.id, formData);

  //     if (result) {
  //       const updated = result.client || result.data || result;
  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({ ...userData, ...updated }),
  //       );
  //       window.dispatchEvent(new Event("profileUpdated"));
  //       toast.success("Profile updated successfully!");

  //       setProfile((prev) => ({
  //         ...prev,
  //         ...updated,
  //         dob: updated.dob ? updated.dob.split("T")[0] : "",
  //         password: "",
  //       }));

  //       if (updated.profileImage)
  //         setPreviews({ profileImage: getImgUrl(updated.profileImage) });
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update profile.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    // 1. Basic Validation
    if (!profile.termsAccepted) {
      return toast.error("Please confirm that the information is correct.");
    }

    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();

      // 2. Prepare all 14+ text fields
      const fields = [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "street",
        "aptBlock",
        "city",
        "state",
        "country",
        "zipCode",
        "countryCode",
        "dob",
        "status",
      ];

      fields.forEach((key) => {
        const value = profile[key];
        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          value !== "null"
        ) {
          formData.append(key, value.toString().trim());
        }
      });

      // Handle Boolean for terms
      formData.append("termsAccepted", profile.termsAccepted ? "1" : "0");

      // Handle Password if provided
      if (profile.password) {
        formData.append("password", profile.password);
      }

      // 3. Handle File Uploads (Only append if a new file was selected)
      if (uploadFiles.profileImage instanceof File) {
        formData.append("profileImage", uploadFiles.profileImage);
      }
      if (uploadFiles.kycIdentity instanceof File) {
        formData.append("kycIdentity", uploadFiles.kycIdentity);
      }
      if (uploadFiles.kycAddress instanceof File) {
        formData.append("kycAddress", uploadFiles.kycAddress);
      }

      // 4. Call API
      const result = await updateClientProfile(userData.id, formData);

      if (result) {
        // Extract the updated data from response
        const updatedServerData = result.client || result.data || result;

        // 5. UPDATE LOCAL STORAGE TO UNLOCK SIDEBAR
        // We merge the old data with new data and set isProfileComplete to true
        const updatedUserLocal = {
          ...userData,
          ...updatedServerData,
          isProfileComplete: true, // THIS UNLOCKS THE PANEL
        };

        localStorage.setItem("user", JSON.stringify(updatedUserLocal));

        // 6. TRIGGER THE LAYOUT REFRESH
        // This fires the event that ClientLayout is listening for
        window.dispatchEvent(new Event("profileUpdated"));

        toast.success("Profile Updated! Dashboard features are now unlocked.");

        // 7. Update local component state
        setProfile((prev) => ({
          ...prev,
          ...updatedServerData,
          dob: updatedServerData.dob ? updatedServerData.dob.split("T")[0] : "",
          password: "", // Clear password field
        }));

        if (updatedServerData.profileImage) {
          setPreviews({
            profileImage: getImgUrl(updatedServerData.profileImage),
          });
        }
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(
        error?.message || "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout>
      <div className="p-4">
        <form
          onSubmit={handleSubmit}
          className="card border-0 shadow-sm p-4 bg-white rounded-4">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
            <h5 className="fw-bold m-0" style={{ color: navyColor }}>
              ACCOUNT SETTINGS
            </h5>
        {/* Replace your old status div with this code */}
<div className="d-flex align-items-center">
  <label className="me-2 small fw-bold text-uppercase">Status:</label>
  <span 
    className={`badge border-0 fw-bold px-3 py-2 ${profile.status === 'active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}
    style={{ fontSize: '12px' }}
  >
    {profile.status === 'active' ? '● ACTIVE' : '● INACTIVE'}
  </span>
</div>
          </div>

          <div className="row g-4">
            {/* Left Column: Image and KYC */}
            <div className="col-lg-4 border-end text-center">
              <div className="position-relative d-inline-block">
                <img
                  src={previews.profileImage}
                  className="rounded-circle border shadow-sm"
                  width="140"
                  height="140"
                  style={{ objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src = "/assets/images/profilepic.png";
                  }}
                  alt="profile"
                />
                <input
                  type="file"
                  name="profileImage"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  hidden
                  accept="image/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2">
                  <i className="bi bi-camera-fill"></i>
                </button>
              </div>

              <div className="bg-light p-3 rounded-3 mt-4 text-start">
                <h6 className="fw-bold small text-primary mb-3">
                  KYC DOCUMENTS
                </h6>
                <div className="mb-3">
                  <label className="small fw-bold d-block">
                    Identity Proof {profile.kycIdentity ? "✅" : "❌"}
                  </label>
                  <input
                    type="file"
                    name="kycIdentity"
                    className="form-control form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
                <div>
                  <label className="small fw-bold d-block">
                    Address Proof {profile.kycAddress ? "✅" : "❌"}
                  </label>
                  <input
                    type="file"
                    name="kycAddress"
                    className="form-control form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            {/* Right Column: All Text Fields */}
            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="small fw-bold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={profile.firstName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={profile.lastName || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <label className="small fw-bold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={profile.dob || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="small fw-bold">Country Code</label>
                  <input
                    type="text"
                    name="countryCode"
                    className="form-control"
                    placeholder="+91"
                    value={profile.countryCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-9">
                  <label className="small fw-bold">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    value={profile.mobile || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8">
                  <label className="small fw-bold">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    className="form-control"
                    value={profile.street || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">Apt/Block</label>
                  <input
                    type="text"
                    name="aptBlock"
                    className="form-control"
                    value={profile.aptBlock || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">Country</label>
                  <select
                    name="country"
                    className="form-select"
                    value={profile.country || ""}
                    onChange={handleChange}>
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.countryName}>
                        {c.countryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">City</label>
                  <select
                    name="city"
                    className="form-select"
                    value={profile.city || ""}
                    onChange={handleChange}
                    disabled={!profile.country}>
                    <option value="">Select City</option>
                    {filteredCities.map((ct) => (
                      <option key={ct.id} value={ct.cityName}>
                        {ct.cityName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={profile.state || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="small fw-bold">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={profile.zipCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8">
                  <label className="small fw-bold">New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Leave blank to keep current password"
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="termsAccepted"
                      id="termsCheck"
                      checked={profile.termsAccepted || false}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label small fw-bold"
                      htmlFor="termsCheck">
                      I confirm that the above information is correct.
                    </label>
                  </div>
                </div>

                <div className="col-12 text-end mt-4">
                  <button
                    type="submit"
                    disabled={loading || !isLoaded}
                    className="btn text-white px-5 fw-bold"
                    style={{ backgroundColor: navyColor }}>
                    {loading ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "UPDATE PROFILE"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
}