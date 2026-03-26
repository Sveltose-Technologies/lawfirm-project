// import React, { useState, useRef, useEffect, useMemo } from "react";
// import ClientLayout from "../../components/layout/ClientLayout";
// import {
//   getAllLocationCities,
//   getAllLocationCountries,
//   updateClientProfile,
//   getImgUrl,
// } from "../../services/authService";
// import { toast } from "react-toastify";

// export default function EditProfile() {
//   const navyColor = "#002147";
//   const fileInputRef = useRef(null);

//   const [cities, setCities] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     street: "",
//     aptBlock: "",
//     city: "",
//     state: "",
//     country: "",
//     zipCode: "",
//     countryCode: "+91",
//     dob: "",
//     password: "",
//     status: "active",
//     termsAccepted: false,
//     profileImage: "",
//     kycIdentity: "",
//     kycAddress: "",
//   });

//   const [uploadFiles, setUploadFiles] = useState({
//     profileImage: null,
//     kycIdentity: null,
//     kycAddress: null,
//   });

//   const [previews, setPreviews] = useState({
//     profileImage: "/assets/images/profilepic.png",
//   });

//   const filteredCities = useMemo(() => {
//     if (!profile.country || countries.length === 0) return [];
//     const selectedCountryObj = countries.find(
//       (c) => c.countryName === profile.country,
//     );
//     if (!selectedCountryObj) return [];
//     return cities.filter(
//       (city) => Number(city.countryId) === Number(selectedCountryObj.id),
//     );
//   }, [profile.country, cities, countries]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProfile((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//       ...(name === "country" ? { city: "" } : {}),
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files && files[0]) {
//       const file = files[0];
//       setUploadFiles((prev) => ({ ...prev, [name]: file }));
//       if (name === "profileImage") {
//         setPreviews((prev) => ({
//           ...prev,
//           profileImage: URL.createObjectURL(file),
//         }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const userData = JSON.parse(localStorage.getItem("user"));
//       const userId = userData?.id;

//       if (!userId) return toast.error("User session expired.");

//       const formData = new FormData();
//       Object.keys(profile).forEach((key) => {
//         if (
//           profile[key] !== "" &&
//           !["profileImage", "kycIdentity", "kycAddress"].includes(key)
//         ) {
//           let value = profile[key];
//           if (typeof value === "string") value = value.trim();
//           formData.append(key, value);
//         }
//       });

//       if (uploadFiles.profileImage instanceof File)
//         formData.append("profileImage", uploadFiles.profileImage);
//       if (uploadFiles.kycIdentity instanceof File)
//         formData.append("kycIdentity", uploadFiles.kycIdentity);
//       if (uploadFiles.kycAddress instanceof File)
//         formData.append("kycAddress", uploadFiles.kycAddress);

//       const result = await updateClientProfile(userId, formData);

//       if (result) {
//         const serverClient = result.client || result.data || {};

//         // Merge server response with existing local data
//         const finalUserObject = {
//           ...userData,
//           ...profile,
//           profileImage: serverClient.profileImage || userData.profileImage,
//           kycIdentity: serverClient.kycIdentity || userData.kycIdentity,
//           kycAddress: serverClient.kycAddress || userData.kycAddress,
//         };

//         localStorage.setItem("user", JSON.stringify(finalUserObject));

//         // Trigger global event for Header and Sidebar
//         window.dispatchEvent(new Event("profileUpdated"));

//         toast.success("Profile updated successfully!");
//         setProfile((prev) => ({ ...prev, ...serverClient }));
//       }
//     } catch (error) {
//       toast.error(error.message || "Failed to update profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [cityRes, countryRes] = await Promise.all([
//           getAllLocationCities(),
//           getAllLocationCountries(),
//         ]);
//         setCities(cityRes?.data || cityRes || []);
//         setCountries(countryRes?.data || countryRes || []);

//         const userData = JSON.parse(localStorage.getItem("user"));
//         if (userData) {
//           setProfile((prev) => ({ ...prev, ...userData, password: "" }));
//           if (userData.profileImage) {
//             setPreviews({ profileImage: getImgUrl(userData.profileImage) });
//           }
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     loadData();
//   }, []);

//   return (
//     <ClientLayout>
//       <div className="p-4">
//         <form
//           onSubmit={handleSubmit}
//           className="card border-0 shadow-sm p-4 bg-white rounded-4">
//           <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
//             <h5 className="fw-bold m-0" style={{ color: navyColor }}>
//               ACCOUNT SETTINGS
//             </h5>
//             <div className="d-flex align-items-center">
//               <label className="me-2 small fw-bold">STATUS:</label>
//               <select
//                 name="status"
//                 className={`form-select form-select-sm fw-bold ${profile.status === "active" ? "text-success" : "text-danger"}`}
//                 value={profile.status}
//                 onChange={handleChange}
//                 style={{ width: "120px" }}>
//                 <option value="active">ACTIVE</option>
//                 <option value="inactive">INACTIVE</option>
//               </select>
//             </div>
//           </div>

//           <div className="row g-4">
//             {/* Left Section: Image and KYC */}
//             <div className="col-lg-4 border-end">
//               <div className="text-center mb-4">
//                 <div className="position-relative d-inline-block">
//                   <img
//                     src={previews.profileImage}
//                     className="rounded-circle border shadow-sm"
//                     width="140"
//                     height="140"
//                     style={{ objectFit: "cover" }}
//                     alt="avatar"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/profilepic.png";
//                     }}
//                   />
//                   <input
//                     type="file"
//                     name="profileImage"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     hidden
//                     accept="image/*"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current.click()}
//                     className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2">
//                     <i className="bi bi-camera-fill"></i>
//                   </button>
//                 </div>
//               </div>

//               <div className="bg-light p-3 rounded-3 mt-4">
//                 <h6 className="fw-bold small text-primary mb-3 text-uppercase">
//                   KYC Verification
//                 </h6>
//                 <div className="mb-3">
//                   <label className="small fw-bold">
//                     Identity Proof {profile.kycIdentity ? "✅" : "❌"}
//                   </label>
//                   <input
//                     type="file"
//                     name="kycIdentity"
//                     className="form-control form-control-sm"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//                 <div className="mb-1">
//                   <label className="small fw-bold">
//                     Address Proof {profile.kycAddress ? "✅" : "❌"}
//                   </label>
//                   <input
//                     type="file"
//                     name="kycAddress"
//                     className="form-control form-control-sm"
//                     onChange={handleFileChange}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Section: Fields */}
//             <div className="col-lg-8">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">First Name</label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     className="form-control"
//                     value={profile.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">Last Name</label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     className="form-control"
//                     value={profile.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <label className="form-label small fw-bold">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     value={profile.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">
//                     Date of Birth
//                   </label>
//                   <input
//                     type="date"
//                     name="dob"
//                     className="form-control"
//                     value={profile.dob}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label small fw-bold">Code</label>
//                   <input
//                     type="text"
//                     name="countryCode"
//                     className="form-control"
//                     value={profile.countryCode}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-9">
//                   <label className="form-label small fw-bold">Mobile</label>
//                   <input
//                     type="text"
//                     name="mobile"
//                     className="form-control"
//                     value={profile.mobile}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mt-4">
//                   <h6 className="text-secondary fw-bold small border-bottom pb-1">
//                     LOCATION & ADDRESS
//                   </h6>
//                 </div>

//                 <div className="col-md-8">
//                   <label className="form-label small fw-bold">Street</label>
//                   <input
//                     type="text"
//                     name="street"
//                     className="form-control"
//                     value={profile.street}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Apt/Block</label>
//                   <input
//                     type="text"
//                     name="aptBlock"
//                     className="form-control"
//                     value={profile.aptBlock}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Country</label>
//                   <select
//                     name="country"
//                     className="form-select"
//                     value={profile.country}
//                     onChange={handleChange}>
//                     <option value="">Select Country</option>
//                     {countries.map((c) => (
//                       <option key={c.id} value={c.countryName}>
//                         {c.countryName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">City</label>
//                   <select
//                     name="city"
//                     className="form-select"
//                     value={profile.city}
//                     onChange={handleChange}
//                     disabled={!profile.country}>
//                     <option value="">Select City</option>
//                     {filteredCities.map((ct) => (
//                       <option key={ct.id} value={ct.cityName}>
//                         {ct.cityName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label small fw-bold">Zip Code</label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     className="form-control"
//                     value={profile.zipCode}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mt-4">
//                   <h6 className="text-secondary fw-bold small border-bottom pb-1">
//                     SECURITY & CONSENT
//                   </h6>
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label small fw-bold">
//                     Change Password
//                   </label>
//                   <input
//                     type="password"
//                     name="password"
//                     className="form-control"
//                     placeholder="New Password"
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="col-12 mt-4 text-end">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="btn text-white px-5 py-2 fw-bold"
//                     style={{ backgroundColor: navyColor }}>
//                     {loading ? (
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                     ) : (
//                       "UPDATE PROFILE"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </ClientLayout>
//   );
// }

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
  const [isLoaded, setIsLoaded] = useState(false); // Validation fix ke liye

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
    status: "active",
    kycIdentity: "",
    kycAddress: "",
    profileImage: "",
  });

  const [uploadFiles, setUploadFiles] = useState({
    profileImage: null,
    kycIdentity: null,
    kycAddress: null,
  });

  const [previews, setPreviews] = useState({
    profileImage: "/assets/images/profilepic.png",
  });

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

  // REFRESH LOGIC: API se fresh data fetch karna
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
            });

            if (serverData.profileImage) {
              setPreviews({ profileImage: getImgUrl(serverData.profileImage) });
            }
            // LocalStorage update taaki Header sync rahe
            localStorage.setItem(
              "user",
              JSON.stringify({ ...userData, ...serverData }),
            );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();

      // Sari Text Fields append karna
      Object.keys(profile).forEach((key) => {
        if (
          !["profileImage", "kycIdentity", "kycAddress", "password"].includes(
            key,
          )
        ) {
          if (
            profile[key] !== null &&
            profile[key] !== undefined &&
            profile[key] !== "" &&
            profile[key] !== "null"
          ) {
            formData.append(key, profile[key].toString().trim());
          }
        }
      });

      if (profile.password) formData.append("password", profile.password);

      // Files tabhi append hongi jab nayi select ki ho (instanceof File)
      if (uploadFiles.profileImage instanceof File)
        formData.append("profileImage", uploadFiles.profileImage);
      if (uploadFiles.kycIdentity instanceof File)
        formData.append("kycIdentity", uploadFiles.kycIdentity);
      if (uploadFiles.kycAddress instanceof File)
        formData.append("kycAddress", uploadFiles.kycAddress);

      const result = await updateClientProfile(userData.id, formData);

      if (result) {
        const updated = result.client || result.data || result;
        localStorage.setItem(
          "user",
          JSON.stringify({ ...userData, ...updated }),
        );
        window.dispatchEvent(new Event("profileUpdated"));
        toast.success("Profile updated!");
        setProfile((prev) => ({ ...prev, ...updated, password: "" }));
        if (updated.profileImage)
          setPreviews({ profileImage: getImgUrl(updated.profileImage) });
      }
    } catch (error) {
      toast.error("Update failed.");
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
            <div className="d-flex align-items-center">
              <label className="me-2 small fw-bold">STATUS:</label>
              <select
                name="status"
                className="form-select form-select-sm fw-bold"
                value={profile.status}
                onChange={handleChange}>
                <option value="active">ACTIVE</option>
                <option value="inactive">INACTIVE</option>
              </select>
            </div>
          </div>

          <div className="row g-4">
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
                  alt="p"
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
                <label className="small fw-bold">
                  Identity Proof {profile.kycIdentity ? "✅" : "❌"}
                </label>
                <input
                  type="file"
                  name="kycIdentity"
                  className="form-control form-control-sm mb-3"
                  onChange={handleFileChange}
                />
                <label className="small fw-bold">
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
                  <label className="small fw-bold">Email</label>
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
                  <label className="small fw-bold">DOB</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={profile.dob || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-3">
                  <label className="small fw-bold">Code</label>
                  <input
                    type="text"
                    name="countryCode"
                    className="form-control"
                    value={profile.countryCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-9">
                  <label className="small fw-bold">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    value={profile.mobile || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-8">
                  <label className="small fw-bold">Street</label>
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
                  <label className="small fw-bold">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-control"
                    value={profile.zipCode || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="small fw-bold">Change Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="New Password"
                    onChange={handleChange}
                  />
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