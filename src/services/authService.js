// // import API from './api';
// // export const IMG_URL = 'https://nodejs.nrislawfirm.com';

// // // ================= CLIENT AUTH =================

// // // 1. SIGNUP API (POST /client/signup)
// // export const signupUser = async (payload) => {
// //   console.log("🚀 Calling Signup API:", payload);
// //   try {
// //     const response = await API.post('/client/signup', payload);
// //     console.log("✅ Signup API Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Signup API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 2. LOGIN API (POST /client/login)
// // export const loginUser = async (payload) => {
// //   console.log("🚀 Calling Login API:", payload);
// //   try {
// //     const response = await API.post('/client/login', payload);
// //     console.log("✅ Login API Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Login API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 3. FORGOT PASSWORD API (POST /client/forgot-password)
// // export const forgotPassword = async (payload) => {
// //   console.log("🚀 Calling Forgot Password API:", payload);
// //   try {
// //     const response = await API.post('/client/forgot-password', payload);
// //     console.log("✅ Forgot Password Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Forgot Password API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 4. VERIFY OTP API (POST /client/verify-otp)
// // export const verifyOtp = async (payload) => {
// //   console.log("🚀 Calling Verify OTP API:", payload);
// //   try {
// //     const response = await API.post('/client/verify-otp', payload);
// //     console.log("✅ Verify OTP Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Verify OTP API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 5. RESET PASSWORD API (PUT /client/reset-password)
// // export const resetPassword = async (payload) => {
// //   console.log("🚀 Calling Reset Password API (PUT):", payload);
// //   try {
// //     const response = await API.put('/client/reset-password', payload);
// //     console.log("✅ Reset Password Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Reset Password API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // ================= ATTORNEY AUTH =================

// // // 1. SIGNUP API (POST /attorney/signup)
// // export const signupAttorney = async (payload) => {
// //   console.log("🚀 Calling Attorney Signup API:", payload);
// //   try {
// //     const response = await API.post('/attorney/signup', payload);
// //     console.log("✅ Attorney Signup API Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Attorney Signup API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 2. LOGIN API (POST /attorney/login)
// // export const loginAttorney = async (payload) => {
// //   console.log("🚀 Calling Attorney Login API:", payload);
// //   try {
// //     const response = await API.post('/attorney/login', payload);
// //     console.log("✅ Attorney Login API Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Attorney Login API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 3. FORGOT PASSWORD API (POST /attorney/forgot-password)
// // export const forgotPasswordAttorney = async (payload) => {
// //   console.log("🚀 Calling Attorney Forgot Password API:", payload);
// //   try {
// //     const response = await API.post('/attorney/forgot-password', payload);
// //     console.log("✅ Attorney Forgot Password Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Attorney Forgot Password API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 4. VERIFY OTP API (POST /attorney/verify-otp)
// // export const verifyOtpAttorney = async (payload) => {
// //   console.log("🚀 Calling Attorney Verify OTP API:", payload);
// //   try {
// //     const response = await API.post('/attorney/verify-otp', payload);
// //     console.log("✅ Attorney Verify OTP Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Attorney Verify OTP API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // 5. RESET PASSWORD API (PUT /attorney/reset-password)
// // export const resetPasswordAttorney = async (payload) => {
// //   console.log("🚀 Calling Attorney Reset Password API (PUT):", payload);
// //   try {
// //     const response = await API.put('/attorney/reset-password', payload);
// //     console.log("✅ Attorney Reset Password Response:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("❌ Attorney Reset Password API Error:", error.response?.data || error.message);
// //     throw error.response?.data || error;
// //   }
// // };

// // // --- Capability Categories APIs ---
// // export const getAllCapabilityCategories = async () => {
// //   try {
// //     const response = await API.get('/capability-categories/get-all');
// //       console.log("category response",response);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Cat API Error", error);
// //     return { success: false };
// //   }
// // };

// // export const getAllCapabilitySubCategories = async () => {
// //   try {
// //     const response = await API.get('/capability-subcategory/getall-subcategory');
// //     console.log("sub- category response",response);

// //     return response.data;
// //   } catch (error) {
// //     console.error("SubCat API Error", error);
// //     return { success: false };
// //   }
// // };

// // 1. Get All CMS Categories
// export const getAllCMSCategories = async () => {
//   try {
//     console.log("🚀 Fetching all CMS Categories...");
//     const response = await API.get("/cms-category/getall");
//     console.log("✅ CMS Categories fetched:", response.data);
    
//     // Aapke component ki logic ke hisaab se response format set kiya hai
//     return { 
//       success: true, 
//       data: response.data?.data || response.data || [] 
//     };
//   } catch (error) {
//     console.error("❌ Fetch CMS Categories Error:", error.response?.data || error.message);
//     return { success: false, data: [] };
//   }
// };

// // 2. Create CMS Category
// export const createCMSCategory = async (payload) => {
//   try {
//     console.log("🚀 Creating New CMS Category Content:", payload);
//     const response = await API.post("/cms-category/create", payload);
//     console.log("✅ CMS Create Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Create CMS Category Error:", error.response?.data || error.message);
//     throw error.response?.data || error;
//   }
// };

// // 3. Update CMS Category
// export const updateCMSCategory = async (id, payload) => {
//   try {
//     console.log(`🚀 Updating CMS Category ID: ${id}...`, payload);
//     const response = await API.put(`/cms-category/update/${id}`, payload);
//     console.log("✅ CMS Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Update CMS Category Error:", error.response?.data || error.message);
//     throw error.response?.data || error;
//   }
// };

// // 4. Delete CMS Category
// export const deleteCMSCategory = async (id) => {
//   try {
//     console.log(`🚀 Deleting CMS Category ID: ${id}`);
//     const response = await API.delete(`/cms-category/delete/${id}`);
//     console.log("✅ CMS Delete Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Delete CMS Category Error:", error.response?.data || error.message);
//     throw error.response?.data || error;
//   }
// };

// // 5. Get All CMS Subcategories (Optional, if needed for another page)
// export const getAllCMSSubcategories = async () => {
//   try {
//     console.log("🚀 Fetching all CMS Subcategories...");
//     const response = await API.get("/cms-subcategory/getall");
//     console.log("✅ CMS Subcategories fetched:", response.data);
//     return { success: true, data: response.data?.data || response.data || [] };
//   } catch (error) {
//     console.error("❌ Fetch CMS Subcategories Error:", error.response?.data || error.message);
//     return { success: false, data: [] };
//   }
// };

// // --- Location APIs ---
// export const getAllLocationCountries = async () => {
//   try {
//     const response = await API.get("/location-country/getall");
//     return response.data;
//   } catch (error) {
//     console.error("Country API Error:", error);
//     return { success: false, data: [] };
//   }
// };

// export const getAllLocationCities = async () => {
//   try {
//     const response = await API.get("/location-city/getall");
//     return response.data;
//   } catch (error) {
//     console.error("City API Error:", error);
//     return { success: false, data: [] };
//   }
// };

// // export const getAllLocationCMS = async () => {
// //   try {
// //     const response = await API.get('/location-cms/getall');
// //     return response.data;
// //   } catch (error) {
// //     console.error('Location CMS API Error:', error);
// //     return { success: false, data: [] };
// //   }
// // };

// // //ourfirm

// // //award
// // export const getAllAwards = async () => {
// //   try {
// //     const response = await API.get('/award/getall');
// //     console.log("award", response);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching awards:", error);
// //     return { success: false, data: [] };
// //   }
// // };

// //      // Contact Inquiry API
// // // Contact Inquiry API
// // export const createContactInquiry = async (formData) => {
// //   try {
// //     const response = await API.post('/contact/create', formData);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error creating inquiry:', error.response || error);
// //     throw error;
// //   }
// // };

// // --- Privacy Policy API ---
// export const getAllPrivacyPolicy = async () => {
//   try {
//     const response = await API.get('/privacy-policy/getall');
//     console.log("Privacy Policy API Response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Privacy Policy API Error:", error);
//     return { success: false, data: [] };
//   }
// };

// // // --- Terms & Conditions API ---
// export const getAllTermsConditions = async () => {
//   try {
//     const response = await API.get('/terms-condition/getall');
//     console.log("Terms API Response:", response);
//     return response.data;
//   } catch (error) {
//     console.error("Terms API Error:", error);
//     return { success: false, data: [] };
//   }

// };

// import API from "./api";

// export const IMG_URL = "https://nodejs.nrislawfirm.com";

// // ================= CLIENT AUTH =================

// // 1. SIGNUP API (POST /client/signup)
// export const signupUser = async (payload) => {
//   console.log("🚀 Calling Signup API:", payload);
//   try {
//     const response = await API.post("/client/signup", payload);
//     console.log("✅ Signup API Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Signup API Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // 2. LOGIN API (POST /client/login)
// export const loginUser = async (payload) => {
//   console.log("🚀 Calling Login API:", payload);
//   try {
//     const response = await API.post("/client/login", payload);
//     console.log("✅ Login API Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Login API Error:", error.response?.data || error.message);
//     throw error.response?.data || error;
//   }
// };

// // 3. FORGOT PASSWORD API (POST /client/forgot-password)
// export const forgotPassword = async (payload) => {
//   console.log("🚀 Calling Forgot Password API:", payload);
//   try {
//     const response = await API.post("/client/forgot-password", payload);
//     console.log("✅ Forgot Password Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Forgot Password API Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // 4. VERIFY OTP API (POST /client/verify-otp)
// export const verifyOtp = async (payload) => {
//   console.log("🚀 Calling Verify OTP API:", payload);
//   try {
//     const response = await API.post("/client/verify-otp", payload);
//     console.log("✅ Verify OTP Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Verify OTP API Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // 5. RESET PASSWORD API (PUT /client/reset-password)
// export const resetPassword = async (payload) => {
//   console.log("🚀 Calling Reset Password API (PUT):", payload);
//   try {
//     const response = await API.put("/client/reset-password", payload);
//     console.log("✅ Reset Password Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Reset Password API Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // ================= ATTORNEY AUTH =================

// export const signupAttorney = async (payload) => {
//   try {
//     const response = await API.post("/attorney/signup", payload);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };

// export const loginAttorney = async (payload) => {
//   try {
//     const response = await API.post("/attorney/login", payload);
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || error;
//   }
// };

// // ================= CAPABILITY APIs =================
// // ================= CAPABILITY APIs =================

// export const getAllCapabilityCategories = async () => {
//   try {
//     console.log("🚀 Fetching all Capability Categories...");
//     const response = await API.get("/capability-categories/get-all");
//     console.log("✅ Categories fetched:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Fetch Categories Error:",
//       error.response?.data || error.message,
//     );
//     return { success: false, data: [] };
//   }
// };

// export const createCapabilityCategory = async (formData) => {
//   try {
//     console.log("🚀 Creating New Category...");
//     // FormData is passed directly from component
//     const response = await API.post("/capability-categories/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     console.log("✅ Create Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Create Category Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// export const updateCapabilityCategory = async (id, formData) => {
//   try {
//     console.log(`🚀 Updating Category ID: ${id}...`);
//     // FormData is passed directly from component
//     const response = await API.put(
//       `/capability-categories/update/${id}`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       },
//     );
//     console.log("✅ Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Update Category Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// export const deleteCapabilityCategory = async (id) => {
//   try {
//     console.log(`🚀 Deleting Category ID: ${id}`);
//     const response = await API.delete(`/capability-categories/delete/${id}`);
//     console.log("✅ Delete Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Delete Category Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// export const getAllCapabilitySubCategories = async () => {
//   try {
//     const response = await API.get(
//       "/capability-subcategory/getall-subcategory",
//     );
//     console.log("subcapability",response.data);
    
//     return { success: true, data: response.data.data || response.data || [] };
//   } catch (error) {
//     console.error("SubCat API Error", error);
//     return { success: false, data: [] };
//   }
// };

// export const createCapabilitySubCategory = async (formData) => {
//   const res = await API.post("/capability-subcategory/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// export const updateCapabilitySubCategory = async (id, formData) => {
//   const res = await API.put(`/capability-subcategory/update/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// export const deleteCapabilitySubCategory = async (id) => {
//   const res = await API.delete(`/capability-subcategory/delete/${id}`);
//   return res.data;
// };




// // ================= LOCATION APIs =================

// export const getAllCountries = async () => {
//   const res = await API.get("/location-country/getall");
//   return res.data;
// };

// export const createLocationCountry = async (data) => {
//   const res = await API.post("/location-country/create", data);
//   return res.data;
// };

// export const getAllCities = async () => {
//   const res = await API.get("/location-city/getall");
//   return res.data;
// };

// export const createLocationCity = async (formData) => {
//   const res = await API.post("/location-city/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };

// export const getAllLocationCMS = async () => {
//   try {
//     const res = await API.get("/location-cms/getall");
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Failed to fetch CMS" };
//   }
// };

// // ================= ADMIN & USER MGMT =================

// export const getCurrentUser = () => {
//   if (typeof window !== "undefined") {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user) : null;
//   }
//   return null;
// };

// export const adminLogin = async (email, password) => {
//   try {
//     const response = await API.post("/admin/login", { email, password });
//     const token = response.data?.token || response.data?.admin?.token;
//     if (token) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("role", "admin");
//       return {
//         success: true,
//         message: response.data?.message || "Login successful",
//         data: response.data,
//       };
//     }
//     return {
//       success: false,
//       message: response.data?.message || "Login failed",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || "Login failed",
//     };
//   }
// };

// export const adminForgotPassword = async (email) => {
//   try {
//     const response = await API.post("/admin/forgot-password", { email });
//     return {
//       success: true,
//       message: response.data?.message || "OTP sent to email",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to send OTP",
//     };
//   }
// };

// export const adminVerifyOtp = async (email, otp) => {
//   try {
//     const response = await API.post("/admin/verify-otp", { email, otp });
//     return { success: true, message: response.data?.message || "OTP verified" };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Invalid OTP",
//     };
//   }
// };

// export const adminResetPassword = async (
//   email,
//   newPassword,
//   confirmPassword,
// ) => {
//   try {
//     const response = await API.post("/admin/reset-password", {
//       email,
//       newPassword,
//       confirmPassword,
//     });
//     return {
//       success: true,
//       message: response.data?.message || "Password reset successful",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to reset password",
//     };
//   }
// };

// // ================= ADMIN PROFILE APIs =================
// // ================= ADMIN PROFILE APIs =================

// export const getAdminProfile = async () => {
//   try {
//     console.log("🚀 Fetching Admin Profile...");
//     // Direct call to getall or profile based on your backend
//     const response = await API.get("/admin/getall");
    
//     // Based on your log, if it returns an array, take the first index, else take object
//     const data = response.data?.data || response.data;
//     const adminData = Array.isArray(data) ? data[0] : data;
    
//     console.log("✅ Admin Profile Data:", adminData);
//     return adminData;
//   } catch (error) {
//     console.error("❌ Get Admin Profile Error:", error);
//     throw error;
//   }
// };

// export const updateAdminProfile = async (id, formData) => {
//   try {
//     console.log(`🚀 Updating Admin Profile ID: ${id}...`);
//     const response = await API.put(`/admin/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     console.log("✅ Admin Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("❌ Update Admin Error:", error.response?.data || error.message);
//     throw error;
//   }
// };
// export const logout = () => {
//   if (typeof window !== "undefined") {
//     localStorage.clear();
//     window.location.href = "/login-signup";
//   }
// };

// // ================= OUR FIRM & AWARDS =================

// export const getAllOurFirm = async () => {
//   try {
//     const response = await API.get("/ourfirm/getall");
//     console.log("getAllOurfirm response", response.data);

//     // Handle nested response structure: response.data = { success: true, data: [...] }
//     const data = response.data?.data || response.data || [];
//     return { success: true, data: Array.isArray(data) ? data : [data] };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// export const createOurFirm = async (formData) => {
//   const res = await API.post("/ourfirm/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return { success: true, data: res.data };
// };

// export const getAllAwards = async () => {
//   try {
//     const response = await API.get("/award/getall");
//     // Handle multiple response formats: direct array, nested data, or count+data
//     let data = [];
//     if (Array.isArray(response.data)) {
//       data = response.data;
//     } else if (response.data?.data) {
//       data = response.data.data;
//     } else if (response.data?.awards) {
//       data = response.data.awards;
//     }
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// // --- AWARD CRUD ---
// export const createAward = async (formData) => {
//   try {
//     const res = await API.post("/award/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Create failed" };
//   }
// };

// export const updateAward = async (id, formData) => {
//   try {
//     const res = await API.put(`/award/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Update failed" };
//   }
// };

// export const deleteAward = async (id) => {
//   try {
//     const res = await API.delete(`/award/delete/${id}`);
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Delete failed" };
//   }
// };

// // --- PROMOTER CRUD ---
// export const getAllPromoters = async () => {
//   try {
//     const res = await API.get("/promoter/getall");
//     // Handle multiple response formats: direct array, nested data, or count+data
//     let data = [];
//     if (Array.isArray(res.data)) {
//       data = res.data;
//     } else if (res.data?.data) {
//       data = res.data.data;
//     } else if (res.data?.promoters) {
//       data = res.data.promoters;
//     }
//     return { success: true, data };
//   } catch (err) {
//     return { success: false, data: [] };
//   }
// };

// export const createPromoter = async (formData) => {
//   try {
//     const res = await API.post("/promoter/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Create failed" };
//   }
// };

// export const updatePromoter = async (id, formData) => {
//   try {
//     const res = await API.put(`/promoter/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Update failed" };
//   }
// };

// export const deletePromoter = async (id) => {
//   try {
//     const res = await API.delete(`/promoter/delete/${id}`);
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Delete failed" };
//   }
// };

// // --- OUR FIRM CRUD (create already exists) ---
// export const updateOurFirm = async (id, formData) => {
//   try {
//     const res = await API.put(`/ourfirm/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Update failed" };
//   }
// };

// export const deleteOurFirm = async (id) => {
//   try {
//     const res = await API.delete(`/ourfirm/delete/${id}`);
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Delete failed" };
//   }
// };

// // --- Helper: Image base URL and helper function ---

// /**
//  * Global Image URL Resolver
//  * सभी प्रकार के इमेज पाथ को हैंडल करता है:
//  * 1. पूर्ण URL (https://...)
//  * 2. 'uploads/' के साथ आने वाले पाथ
//  * 3. बिना किसी फोल्डर के आने वाले पाथ (defaulting to uploads)
//  * 4. 'public/' या '/' से शुरू होने वाले पाथ
//  */
// export const getImgUrl = (path) => {
//   const BASE = "https://nodejs.nrislawfirm.com"; // आपका Backend Base URL
//   const PLACEHOLDER = "https://placehold.co/600x400?text=No+Image";

//   if (!path) return PLACEHOLDER;

//   if (typeof path === "string" && /^https?:\/\//i.test(path)) {
//     return path;
//   }

//   let cleanPath = path.toString().replace(/^\//, "");

//   if (cleanPath.startsWith("uploads/")) {
//     return `${BASE}/${cleanPath}`;
//   } else if (cleanPath.startsWith("public/")) {
//     return `${BASE}/${cleanPath}`;
//   } else {
//     if (!cleanPath.includes("/")) {
//       return `${BASE}/uploads/${cleanPath}`;
//     }
//     return `${BASE}/${cleanPath}`;
//   }
// };

// // ================= NEWS & EVENTS =================

// // ================= NEWS & EVENTS =================

// // न्यूज़ प्राप्त करने के लिए
// export const getAllNews = async () => {
//   try {
//     const response = await API.get("/news/getall");
//     // Handle multiple response formats: direct array, nested data, or count+data
//     let data = [];
//     if (Array.isArray(response.data)) {
//       data = response.data;
//     } else if (response.data?.data) {
//       data = response.data.data;
//     } else if (response.data?.news) {
//       data = response.data.news;
//     }
//     return { success: true, data };
//   } catch (error) {
//     console.error("❌ Get News Error:", error);
//     return { success: false, data: [] };
//   }
// };


// export const createNews = async (formData) => {
//   const response = await API.post("/news/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return { success: true, data: response.data };
// };


// export const updateNews = async (id, formData) => {
//   const response = await API.put(`/news/update/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return { success: true, data: response.data };
// };

// export const deleteNews = async (id) => {
//   const response = await API.delete(`/news/delete/${id}`);
//   return { success: true, data: response.data };
// };

// // ================= CAREERS & CONTACT =================

// export const getAllCareers = async () => {
//   try {
//     const response = await API.get("/career/getall");
//     // API returns { count: number, jobs: [...] }
//     const data = response.data?.jobs || [];
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// // --- CAREER CRUD ---
// export const createCareer = async (formData) => {
//   try {
//     const res = await API.post("/career/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Create failed" };
//   }
// };

// export const updateCareer = async (id, formData) => {
//   try {
//     const res = await API.put(`/career/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Update failed" };
//   }
// };

// export const deleteCareer = async (id) => {
//   try {
//     const res = await API.delete(`/career/delete/${id}`);
//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false, message: "Delete failed" };
//   }
// };

// export const createContactInquiry = async (formData) => {
//   try {
//     const response = await API.post("/contact/create", formData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getAllContacts = async () => {
//   const res = await API.get("/contact/getall");
//   return { success: true, data: res.data };
// };

// // ================= POLICIES =================

// export const getAllTermsConditions = async () => {
//   try {
//     const response = await API.get("/terms-condition/getall");
//     return { success: true, data: response.data };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// export const getAllPrivacyPolicy = async () => {
//   try {
//     const response = await API.get("/privacy-policy/getall");
//     return { success: true, data: response.data };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// // GET ALL CLIENTS
// export const getAllClients = async () => {
//   try {
//     const response = await API.get("/client/getall");
//     console.log("🚀 Get All Clients Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Get Clients Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // UPDATE CLIENT
// export const updateClient = async (id, payload) => {
//   try {
//     console.log(`🚀 Updating Client ID: ${id}`, payload);
//     const response = await API.put(`/client/update/${id}`, payload);
//     console.log("✅ Update Client Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Update Client Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // DELETE CLIENT
// export const deleteClient = async (id) => {
//   try {
//     console.log(`🚀 Deleting Client ID: ${id}`);
//     const response = await API.delete(`/client/delete/${id}`);
//     console.log("✅ Delete Client Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Delete Client Error:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // --- ATTORNEY APIs ---

// // 1. GET ALL ATTORNEYS
// export const getAllAttorneys = async () => {
//   try {
//     console.log("🚀 Fetching all attorneys...");
//     const response = await API.get("/attorney/getall");
//     console.log("✅ Attorneys list received:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Error fetching attorneys:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // 2. DELETE ATTORNEY
// export const deleteAttorney = async (id) => {
//   try {
//     console.log(`🚀 Requesting deletion for attorney ID: ${id}`);
//     const response = await API.delete(`/attorney/delete/${id}`);
//     console.log("✅ Attorney deleted successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Error deleting attorney:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // 3. UPDATE ATTORNEY (For Profile & Status Toggle)
// export const updateAttorney = async (id, payload) => {
//   try {
//     console.log(`🚀 Updating attorney ID: ${id}`, payload);
//     const response = await API.put(`/attorney/update/${id}`, payload);
//     console.log("✅ Attorney updated successfully:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Error updating attorney:",
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error;
//   }
// };

// // --- PROFESSIONALS / ATTORNEYS ALIAS ---
// export const getAllProfessionals = async () => {
//   // Alias for getAllAttorneys - used by event/career pages
//   try {
//     const response = await API.get("/attorney/getall");
//     return response.data;
//   } catch (error) {
//     console.error("❌ Error fetching professionals:", error);
//     return { success: false, data: [] };
//   }
// };

// // ================= EVENTS APIs =================
// export const getAllEvents = async () => {
//   try {
//     const response = await API.get("/event/getall");
//     // Handle multiple response formats: direct array, nested data, or count+data
//     let data = [];
//     if (Array.isArray(response.data)) {
//       data = response.data;
//     } else if (response.data?.data) {
//       data = response.data.data;
//     } else if (response.data?.events) {
//       data = response.data.events;
//     }
//     return { success: true, data };
//   } catch (error) {
//     return { success: false, data: [] };
//   }
// };

// export const createEvent = async (formData) => {
//   const response = await API.post("/event/create", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// export const updateEvent = async (id, formData) => {
//   const response = await API.put(`/event/update/${id}`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response.data;
// };

// export const deleteEvent = async (id) => {
//   const response = await API.delete(`/event/delete/${id}`);
//   return response.data;
// };

// // --- Default export (backwards compatibility) ---
// const defaultAuthService = {
//   IMG_URL,
//   getImgUrl,
//   getCurrentUser,
//   adminLogin,
//   adminForgotPassword,
//   adminVerifyOtp,
//   adminResetPassword,
//   logout,

//   // Our firm & awards
//   getAllOurFirm,
//   createOurFirm,
//   updateOurFirm,
//   deleteOurFirm,
//   getAllAwards,
//   createAward,
//   updateAward,
//   deleteAward,

//   // Promoters
//   getAllPromoters,
//   createPromoter,
//   updatePromoter,
//   deletePromoter,

//   // News & events
//   getAllNews,
//   createNews,
//   getAllEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent,

//   // Locations
//   getAllCountries,
//   getAllLocationCountries,
//   getAllCities,
//   getAllLocationCMS,

//   // Capabilities
//   getAllCapabilityCategoryCMS,
//   getAllSubcategoryCMS,
//   getAllCapabilityCategories,
//   getAllCapabilitySubCategories,

//   // Professionals & careers
//   getAllProfessionals,
//   getAllCareers,
//   createCareer,
//   updateCareer,
//   deleteCareer,
//   createContactInquiry,
//   getAllContacts,

//   // Clients & attorneys
//   getAllClients,
//   deleteClient,
//   updateClient,
//   getAllAttorneys,
//   deleteAttorney,
//   updateAttorney,
// };

// export default defaultAuthService;



import API from "./api";

export const IMG_URL = "https://nrislaw.rxchartsquare.com";

// ================= HELPER FUNCTIONS =================

/**
 * Resolve Global Image URL
 */

// services/authService.js

export const getAdminId = () => {
  if (typeof window !== "undefined") {
    // 1. LocalStorage se 'user' ya jo bhi aapki key ka naam hai use nikalien
    // Agar aapne key ka naam 'adminData' rakha hai to wahi likhein
    const storedData = localStorage.getItem("user") || localStorage.getItem("adminProfile");
    
    if (storedData) {
      const admin = JSON.parse(storedData);
      console.log("Found Admin ID:", admin.id); // Debugging ke liye
      return admin.id; // Aapke data mein ye 'id' hi hai
    }
  }
  return null;
};
export const getImgUrl = (path) => {
  const BASE = "https://nrislaw.rxchartsquare.com";
  const PLACEHOLDER = "https://placehold.co/600x400?text=No+Image";

  if (!path) return PLACEHOLDER;
  if (typeof path === "string" && /^https?:\/\//i.test(path)) return path;

  let cleanPath = path.toString().replace(/^\//, "");
  if (cleanPath.startsWith("uploads/") || cleanPath.startsWith("public/")) {
    return `${BASE}/${cleanPath}`;
  }
  return `${BASE}/uploads/${cleanPath}`;
};

/**
 * Get Current User from storage
 */
export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Logout and clear storage
 */
export const logout = () => {
  console.log("🚀 Logging out and clearing storage...");
  if (typeof window !== "undefined") {
    localStorage.clear();
    window.location.href = "/login-signup";
  }
};

// ================= CLIENT AUTHENTICATION =================

export const signupUser = async (payload) => {
  try {
    console.log("🚀 Calling Client Signup API:", payload);
    const response = await API.post("/client/signup", payload);
    console.log("✅ Client Signup Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Client Signup Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginUser = async (payload) => {
  try {
    console.log("🚀 Calling Client Login API:", payload);
    const response = await API.post("/client/login", payload);
    console.log("✅ Client Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Client Login Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    console.log("🚀 Calling Client Forgot Password API:", payload);
    const response = await API.post("/client/forgot-password", payload);
    console.log("✅ Client Forgot Password Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Client Forgot Password Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (payload) => {
  try {
    console.log("🚀 Calling Client Verify OTP API:", payload);
    const response = await API.post("/client/verify-otp", payload);
    console.log("✅ Client Verify OTP Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Client Verify OTP Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const resetPassword = async (payload) => {
  try {
    console.log("🚀 Calling Client Reset Password API:", payload);
    const response = await API.put("/client/reset-password", payload);
    console.log("✅ Client Reset Password Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Client Reset Password Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ================= ATTORNEY AUTHENTICATION =================

export const signupAttorney = async (payload) => {
  try {
    console.log("🚀 Calling Attorney Signup API:", payload);
    const response = await API.post("/attorney/signup", payload);
    console.log("✅ Attorney Signup Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Attorney Signup Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const loginAttorney = async (payload) => {
  try {
    console.log("🚀 Calling Attorney Login API:", payload);
    const response = await API.post("/attorney/login", payload);
    console.log("✅ Attorney Login Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Attorney Login Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ================= ADMIN AUTH & OTP =================

export const adminLogin = async (email, password) => {
  try {
    console.log("🚀 Admin Login Attempt:", email);
    const response = await API.post("/admin/login", { email, password });
    const token = response.data?.token || response.data?.admin?.token;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      console.log("✅ Admin Login Success:", response.data);
      return { success: true, data: response.data };
    }
    return { success: false, message: "Login failed" };
  } catch (error) {
    console.error("❌ Admin Login Error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};

export const adminForgotPassword = async (email) => {
  try {
    console.log("🚀 Calling Admin Forgot Password API:", email);
    const response = await API.post("/admin/forgot-password", { email });
    console.log("✅ Admin OTP Sent:", response.data);
    return { success: true, message: response.data?.message || "OTP sent to email" };
  } catch (error) {
    console.error("❌ Admin Forgot Password Error:", error);
    return { success: false, message: error.response?.data?.message || "Failed to send OTP" };
  }
};

export const adminVerifyOtp = async (email, otp) => {
  try {
    console.log("🚀 Calling Admin Verify OTP API:", { email, otp });
    const response = await API.post("/admin/verify-otp", { email, otp });
    console.log("✅ Admin OTP Verified:", response.data);
    return { success: true, message: response.data?.message || "OTP verified" };
  } catch (error) {
    console.error("❌ Admin Verify OTP Error:", error);
    return { success: false, message: error.response?.data?.message || "Invalid OTP" };
  }
};

export const adminResetPassword = async (email, newPassword, confirmPassword) => {
  try {
    console.log("🚀 Calling Admin Reset Password API:", email);
    const response = await API.post("/admin/reset-password", { email, newPassword, confirmPassword });
    console.log("✅ Admin Password Reset Success:", response.data);
    return { success: true, message: response.data?.message || "Password reset successful" };
  } catch (error) {
    console.error("❌ Admin Reset Password Error:", error);
    return { success: false, message: error.response?.data?.message || "Failed to reset password" };
  }
};

// ================= ADMIN PROFILE =================

export const getAdminProfile = async () => {
  try {
    console.log("🚀 Fetching Admin Profile...");
    const response = await API.get("/admin/getall-adminprofile");
    const data = response.data?.data || response.data;
    const adminData = Array.isArray(data) ? data[0] : data;
    console.log("✅ Admin Profile Data:", adminData);
    return adminData;
  } catch (error) {
    console.error("❌ Get Admin Profile Error:", error);
    throw error;
  }
};

export const updateAdminProfile = async (id, formData) => {
  try {
    // Ensure ID is present
    if (!id) throw new Error("Admin ID is missing");

    const response = await API.put(`/admin/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Agar API direct data bhejti hai to use return karein
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Admin Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ================= CAPABILITY CATEGORY APIs =================

export const getAllCapabilityCategories = async () => {
  try {
    console.log("🚀 Fetching all Capability Categories...");
    const response = await API.get("/capability-categories/get-all");
    console.log("✅ Categories fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Categories Error:", error.response?.data || error.message);
    return { success: false, data: [] };
  }
};

export const createCapabilityCategory = async (formData) => {
  try {
    console.log("🚀 Creating New Category...");
    const response = await API.post("/capability-categories/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Create Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Category Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateCapabilityCategory = async (id, formData) => {
  try {
    console.log(`🚀 Updating Category ID: ${id}...`);
    const response = await API.put(`/capability-categories/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Category Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteCapabilityCategory = async (id) => {
  try {
    console.log(`🚀 Deleting Category ID: ${id}`);
    const response = await API.delete(`/capability-categories/delete/${id}`);
    console.log("✅ Delete Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Category Error:", error.response?.data || error.message);
    throw error;
  }
};

// ================= CAPABILITY SUBCATEGORY APIs =================

export const getAllCapabilitySubCategories = async () => {
  try {
    console.log("🚀 Fetching all Subcategories...");
    const response = await API.get("/capability-subcategory/getall-subcategory");
    console.log("✅ Subcategories fetched:", response.data);
    return { success: true, data: response.data.data || response.data || [] };
  } catch (error) {
    console.error("❌ SubCat API Error:", error);
    return { success: false, data: [] };
  }
};

export const createCapabilitySubCategory = async (formData) => {
  try {
    console.log("🚀 Creating New Subcategory...");
    const res = await API.post("/capability-subcategory/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Create Subcategory Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Create Subcategory Error:", error);
    throw error;
  }
};

export const updateCapabilitySubCategory = async (id, formData) => {
  try {
    console.log(`🚀 Updating Subcategory ID: ${id}`);
    const res = await API.put(`/capability-subcategory/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Update Subcategory Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Update Subcategory Error:", error);
    throw error;
  }
};

export const deleteCapabilitySubCategory = async (id) => {
  try {
    console.log(`🚀 Deleting Subcategory ID: ${id}`);
    const res = await API.delete(`/capability-subcategory/delete/${id}`);
    console.log("✅ Delete Subcategory Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Delete Subcategory Error:", error);
    throw error;
  }
};

// ================= CMS APIs =================

export const getAllCapabilityCategoryCMS = async () => {
  try {
    console.log("🚀 Fetching all Capability Category CMS Content...");
    const response = await API.get("/cms-category/getall");
    console.log("✅ Category CMS Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Category CMS API Error:", error);
    return { success: false, data: [] };
  }
};

export const getAllCMSCategories = async () => {
  try {
    console.log("🚀 Calling CMS Category getAll...");
    const response = await API.get("/cms-category/getall");
    console.log("✅ CMS Category Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ CMS Category API Error:", error);
    throw error;
  }
};

export const createCMSCategory = async (data) => {
  try {
    console.log("🚀 Creating CMS Category Content:", data);
    const response = await API.post("/cms-category/create", data);
    console.log("✅ CMS Category Create Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create CMS Category Error:", error);
    throw error;
  }
};

export const updateCMSCategory = async (id, data) => {
  try {
    console.log(`🚀 Updating CMS Category Content ID: ${id}`, data);
    const response = await API.put(`/cms-category/update/${id}`, data);
    console.log("✅ CMS Category Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update CMS Category Error:", error);
    throw error;
  }
};

export const deleteCMSCategory = async (id) => {
  try {
    console.log(`🚀 Deleting CMS Category Content ID: ${id}`);
    const response = await API.delete(`/cms-category/delete/${id}`);
    console.log("✅ CMS Category Delete Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete CMS Category Error:", error);
    throw error;
  }
};




// ================= CMS SUBCATEGORY APIs =================

/**
 * Fetch all CMS entries for subcategory detail pages
 */
export const getAllCMSSubcategories = async () => {
  try {
    console.log("🚀 Fetching all CMS Subcategory entries...");
    const response = await API.get("/cms-subcategory/getall");
    console.log("✅ CMS Subcategory entries fetched:", response.data);
    return { success: true, data: response.data?.data || response.data || [] };
  } catch (error) {
    console.error(
      "❌ Fetch CMS Subcategory Error:",
      error.response?.data || error.message,
    );
    return { success: false, data: [] };
  }
};

/**
 * Create a new CMS entry for a subcategory
 */
export const createCMSSubcategory = async (payload) => {
  try {
    console.log("🚀 Creating New CMS Subcategory entry:", payload);
    const response = await API.post("/cms-subcategory/create", payload);
    console.log("✅ CMS Subcategory Created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Create CMS Subcategory Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};

/**
 * Update an existing CMS entry for a subcategory
 */
export const updateCMSSubcategory = async (id, payload) => {
  try {
    console.log(`🚀 Updating CMS Subcategory ID: ${id}`, payload);
    const response = await API.put(`/cms-subcategory/update/${id}`, payload);
    console.log("✅ CMS Subcategory Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update CMS Subcategory Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};

/**
 * Delete a CMS entry for a subcategory
 */
export const deleteCMSSubcategory = async (id) => {
  try {
    console.log(`🚀 Deleting CMS Subcategory ID: ${id}`);
    const response = await API.delete(`/cms-subcategory/delete/${id}`);
    console.log("✅ CMS Subcategory Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Delete CMS Subcategory Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};

// authService.js

// ================= CMS SUBCATEGORY APIs =================

/**
 * Fetch all CMS entries for subcategory detail pages
 */
export const getAllSubcategoryCMS = async () => {
  try {
    console.log("🚀 Fetching all Subcategory CMS Content...");
    const response = await API.get("/cms-subcategory/getall");
    console.log("✅ Subcategory CMS fetched:", response.data);
    
    // Response handling based on your data structure
    return { 
      success: true, 
      data: response.data?.data || response.data || [] 
    };
  } catch (error) {
    console.error("❌ Fetch Subcategory CMS Error:", error.response?.data || error.message);
    return { success: false, data: [] };
  }
};

// ================= OUR FIRM APIs =================

export const getAllOurFirm = async () => {
  try {
    console.log("🚀 Fetching all Our Firm records...");
    const response = await API.get("/ourfirm/getall");
    console.log("✅ Our Firm Response:", response.data);
    const data = response.data?.data || response.data || [];
    return { success: true, data: Array.isArray(data) ? data : [data] };
  } catch (error) {
    console.error("❌ Our Firm Fetch Error:", error);
    return { success: false, data: [] };
  }
};

export const createOurFirm = async (formData) => {
  try {
    console.log("🚀 Creating New Our Firm record...");
    const res = await API.post("/ourfirm/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Our Firm Create Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Create Our Firm Error:", error);
    throw error;
  }
};

export const updateOurFirm = async (id, formData) => {
  try {
    console.log(`🚀 Updating Our Firm record ID: ${id}`);
    const res = await API.put(`/ourfirm/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Our Firm Update Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Update Our Firm Error:", error);
    throw error;
  }
};

export const deleteOurFirm = async (id) => {
  try {
    console.log(`🚀 Deleting Our Firm record ID: ${id}`);
    const res = await API.delete(`/ourfirm/delete/${id}`);
    console.log("✅ Our Firm Delete Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Delete Our Firm Error:", error);
    throw error;
  }
};

// ================= AWARDS APIs =================

export const getAllAwards = async () => {
  try {
    console.log("🚀 Fetching all Awards...");
    const response = await API.get("/award/getall");
    console.log("✅ Awards Response:", response.data);
    let data = [];
    if (Array.isArray(response.data)) {
      data = response.data;
    } else if (response.data?.data) {
      data = response.data.data;
    } else if (response.data?.awards) {
      data = response.data.awards;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Awards Fetch Error:", error);
    return { success: false, data: [] };
  }
};

export const createAward = async (formData) => {
  try {
    console.log("🚀 Creating New Award...");
    const res = await API.post("/award/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Award Create Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Create Award Error:", error);
    return { success: false, message: "Create failed" };
  }
};

export const updateAward = async (id, formData) => {
  try {
    console.log(`🚀 Updating Award ID: ${id}`);
    const res = await API.put(`/award/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Award Update Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Update Award Error:", error);
    return { success: false, message: "Update failed" };
  }
};

export const deleteAward = async (id) => {
  try {
    console.log(`🚀 Deleting Award ID: ${id}`);
    const res = await API.delete(`/award/delete/${id}`);
    console.log("✅ Award Delete Success:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Delete Award Error:", error);
    return { success: false, message: "Delete failed" };
  }
};

export const getAllPromoters = async () => {
  try {
    const res = await API.get("/promoter/getall");
    // Standardizing the response data format
    const data = res.data?.data || res.data?.promoters || res.data || [];
    return { success: true, data };
  } catch (error) {
    console.error(
      "Fetch Promoters Error:",
      error.response?.data || error.message,
    );
    return { success: false, data: [] };
  }
};

/**
 * Create a new promoter with images
 */
export const createPromoter = async (formData) => {
  try {
    const res = await API.post("/promoter/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (error) {
    // 500 Error details logged here
    console.error(
      "Create Promoter Error:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Server Error: Unable to create promoter",
    };
  }
};

/**
 * Update an existing promoter by ID
 */
export const updatePromoter = async (id, formData) => {
  try {
    const res = await API.put(`/promoter/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error(
      "Update Promoter Error:",
      error.response?.data || error.message,
    );
    return { success: false, message: "Update failed" };
  }
};

/**
 * Delete a promoter by ID
 */
export const deletePromoter = async (id) => {
  try {
    const res = await API.delete(`/promoter/delete/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    console.error(
      "Delete Promoter Error:",
      error.response?.data || error.message,
    );
    return { success: false, message: "Delete failed" };
  }
};
// ================= NEWS APIs =================

export const getAllNews = async () => {
  try {
    console.log("🚀 Fetching all News...");
    const response = await API.get("/news/getall");
    let data = response.data?.data || response.data?.news || response.data || [];
    console.log("✅ News fetched:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Get News Error:", error);
    return { success: false, data: [] };
  }
};

export const createNews = async (formData) => {
  try {
    console.log("🚀 Creating New News Article...");
    const response = await API.post("/news/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ News Create Success:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Create News Error:", error);
    throw error;
  }
};

export const updateNews = async (id, formData) => {
  try {
    console.log(`🚀 Updating News ID: ${id}`);
    const response = await API.put(`/news/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ News Update Success:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Update News Error:", error);
    throw error;
  }
};

export const deleteNews = async (id) => {
  try {
    console.log(`🚀 Deleting News ID: ${id}`);
    const response = await API.delete(`/news/delete/${id}`);
    console.log("✅ News Delete Success:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Delete News Error:", error);
    throw error;
  }
};

// ================= EVENTS APIs =================

export const getAllEvents = async () => {
  try {
    console.log("🚀 Fetching all Events...");
    const response = await API.get("/event/getall");
    let data = response.data?.data || response.data?.events || response.data || [];
    console.log("✅ Events fetched:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Get Events Error:", error);
    return { success: false, data: [] };
  }
};

export const createEvent = async (formData) => {
  try {
    console.log("🚀 Creating New Event...");
    const response = await API.post("/event/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Event Create Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Event Error:", error);
    throw error;
  }
};

export const updateEvent = async (id, formData) => {
  try {
    console.log(`🚀 Updating Event ID: ${id}`);
    const response = await API.put(`/event/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Event Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Event Error:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    console.log(`🚀 Deleting Event ID: ${id}`);
    const response = await API.delete(`/event/delete/${id}`);
    console.log("✅ Event Delete Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Event Error:", error);
    throw error;
  }
};

// ================= CAREERS APIs =================
export const getAllCareers = async () => {
  try {
    const response = await API.get("/career/getall");
    // Based on your JSON log: response.data contains { count, jobs: [] }
    const data = response.data?.jobs || [];
    return { success: true, data };
  } catch (error) {
    console.error("❌ Get Careers Error:", error);
    return { success: false, data: [] };
  }
};

export const createCareer = async (formData) => {
  try {
    const res = await API.post("/career/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (error) {
    // Return specific error message from server if available
    const msg = error.response?.data?.message || "Internal Server Error";
    return { success: false, message: msg };
  }
};

export const updateCareer = async (id, formData) => {
  try {
    const res = await API.put(`/career/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Update failed",
    };
  }
};

export const deleteCareer = async (id) => {
  try {
    const res = await API.delete(`/career/delete/${id}`);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
};
// ================= LOCATION COUNTRY APIs =================



export const getAllCountries = async () => {
  try {
    console.log("🚀 Fetching all countries...");
    const response = await API.get("/location-country/getall");
    console.log("✅ Countries fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Countries Error:", error.response?.data || error.message);
    return { success: false, data: [] };
  }
};

/**
 * Create a new country
 */
export const createLocationCountry = async (payload) => {
  try {
    console.log("🚀 Creating new Location Country:", payload);
    const response = await API.post("/location-country/create", payload);
    console.log("✅ Country created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Country Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Update an existing country
 */
export const updateLocationCountry = async (id, payload) => {
  try {
    console.log(`🚀 Updating Location Country ID: ${id}`, payload);
    const response = await API.put(`/location-country/update/${id}`, payload);
    console.log("✅ Country updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Country Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Delete a country
 */
export const deleteLocationCountry = async (id) => {
  try {
    console.log(`🚀 Deleting Location Country ID: ${id}`);
    const response = await API.delete(`/location-country/delete/${id}`);
    console.log("✅ Country deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Country Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ================= LOCATION CITY APIs =================

/**
 * Fetch all cities
 */


/**
 * Update an existing city (Uses FormData for Image Upload)
 */
export const updateLocationCity = async (id, formData) => {
  try {
    console.log(`🚀 Updating Location City ID: ${id} (FormData)...`);
    const response = await API.put(`/location-city/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ City updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update City Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Delete a city
 */
export const deleteLocationCity = async (id) => {
  try {
    console.log(`🚀 Deleting Location City ID: ${id}`);
    const response = await API.delete(`/location-city/delete/${id}`);
    console.log("✅ City deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete City Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};




export const getAllLocationCountries = async () => {
  try {
    console.log("🚀 Fetching Location Country records...");
    const response = await API.get("/location-country/getall");
    console.log("✅ Location Countries fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Location Country API Error:", error);
    return { success: false, data: [] };
  }
};

export const getAllCities = async () => {
  try {
    console.log("🚀 Fetching all cities...");
    const res = await API.get("/location-city/getall");
    console.log("✅ Cities response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Get Cities Error:", error);
    throw error;
  }
};

export const getAllLocationCities = async () => {
  try {
    console.log("🚀 Fetching Location City records...");
    const response = await API.get("/location-city/getall");
    console.log("✅ Location Cities fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Location City API Error:", error);
    return { success: false, data: [] };
  }
};

export const createLocationCity = async (formData) => {
  try {
    console.log("🚀 Creating Location City...", formData);
    const res = await API.post("/location-city/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ City Create Success:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Create City Error:", error);
    throw error;
  }
};

export const getAllLocationCMS = async () => {
  try {
    console.log("🚀 Fetching Location CMS records...");
    const res = await API.get("/location-cms/getall");
    console.log("✅ Location CMS fetched:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Location CMS Error:", error);
    return { success: false, message: "Failed to fetch CMS" };
  }
};


/**
 * Create a new Location CMS record
 */
export const createLocationCMS = async (payload) => {
  try {
    console.log("🚀 Creating new Location CMS record:", payload);
    const res = await API.post("/location-cms/create", payload);
    console.log("✅ Location CMS created successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Create Location CMS Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Update an existing Location CMS record
 */
export const updateLocationCMS = async (id, payload) => {
  try {
    console.log(`🚀 Updating Location CMS record ID: ${id}`, payload);
    const res = await API.put(`/location-cms/update/${id}`, payload);
    console.log("✅ Location CMS updated successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Update Location CMS Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Delete a Location CMS record
 */
export const deleteLocationCMS = async (id) => {
  try {
    console.log(`🚀 Deleting Location CMS record ID: ${id}`);
    const res = await API.delete(`/location-cms/delete/${id}`);
    console.log("✅ Location CMS deleted successfully:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Delete Location CMS Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
// ================= CONTACT & INQUIRY =================

export const createContactInquiry = async (formData) => {
  try {
    console.log("🚀 Submitting Contact Inquiry...", formData);
    const response = await API.post("/contact/create", formData);
    console.log("✅ Inquiry Submit Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Submit Inquiry Error:", error);
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    console.log("🚀 Fetching all Contact inquiries...");
    const res = await API.get("/contact/getall");
    console.log("✅ Contacts fetched:", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Get Contacts Error:", error);
    throw error;
  }
};



// ================= CLIENT MANAGEMENT =================

export const getAllClients = async () => {
  try {
    console.log("🚀 Fetching All Clients...");
    const response = await API.get("/client/getall");
    console.log("✅ Clients fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Get Clients Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateClient = async (id, payload) => {
  try {
    console.log(`🚀 Updating Client ID: ${id}`, payload);
    const response = await API.put(`/client/update/${id}`, payload);
    console.log("✅ Update Client Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Client Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteClient = async (id) => {
  try {
    console.log(`🚀 Deleting Client ID: ${id}`);
    const response = await API.delete(`/client/delete/${id}`);
    console.log("✅ Delete Client Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Client Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// ================= ATTORNEY MANAGEMENT =================

export const getAllAttorneys = async () => {
  try {
    console.log("🚀 Fetching All Attorneys...");
    const response = await API.get("/attorney/getall");
    console.log("✅ Attorneys fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Get Attorneys Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteAttorney = async (id) => {
  try {
    console.log(`🚀 Deleting Attorney ID: ${id}`);
    const response = await API.delete(`/attorney/delete/${id}`);
    console.log("✅ Delete Attorney Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Attorney Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateAttorney = async (id, payload) => {
  try {
    console.log(`🚀 Updating Attorney ID: ${id}`, payload);
    const response = await API.put(`/attorney/update/${id}`, payload);
    console.log("✅ Update Attorney Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Attorney Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getAllProfessionals = async () => {
  try {
    console.log("🚀 Fetching All Professionals (Attorneys)...");
    const response = await API.get("/attorney/getall");
    console.log("✅ Professionals fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching professionals:", error);
    return { success: false, data: [] };
  }
};

// ================= TERMS & CONDITIONS APIs =================

/**
 * Fetch all Terms & Conditions
 */
export const getAllTermsConditions = async () => {
  try {
    console.log("🚀 Fetching all Terms & Conditions...");
    const response = await API.get("/terms-condition/getall");
    console.log("✅ Terms & Conditions fetched:", response.data);
    
    // Returning structured data based on your log: { success: true, data: Array(1) }
    return { 
      success: true, 
      data: response.data?.data || response.data || [] 
    };
  } catch (error) {
    console.error("❌ Fetch Terms Error:", error.response?.data || error.message);
    return { success: false, data: [] };
  }
};

/**
 * Create new Terms & Conditions
 */
export const createTermsCondition = async (payload) => {
  try {
    console.log("🚀 Creating new Terms & Conditions:", payload);
    const response = await API.post("/terms-condition/create", payload);
    console.log("✅ Terms & Conditions created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Terms Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Update existing Terms & Conditions
 */
export const updateTermsCondition = async (id, payload) => {
  try {
    console.log(`🚀 Updating Terms & Conditions ID: ${id}`, payload);
    const response = await API.put(`/terms-condition/update/${id}`, payload);
    console.log("✅ Terms & Conditions updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Terms Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Delete Terms & Conditions entry
 */
export const deleteTermsCondition = async (id) => {
  try {
    console.log(`🚀 Deleting Terms & Conditions ID: ${id}`);
    const response = await API.delete(`/terms-condition/delete/${id}`);
    console.log("✅ Terms & Conditions deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Terms Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


/**
 * Fetch all Privacy Policies
 */
// --- Privacy Policy API ---
export const getAllPrivacyPolicy = async () => {
  try {
    const response = await API.get('/privacy-policy/getall');
    console.log("Privacy Policy API Response:", response);
    return response.data;
  } catch (error) {
    console.error("Privacy Policy API Error:", error);
    return { success: false, data: [] };
  }
};


/**
 * Create Privacy Policy
 */
export const createPrivacyPolicy = async (payload) => {
  try {
    console.log("🚀 Creating Privacy Policy:", payload);
    const response = await API.post("/privacy-policy/create", payload);
    console.log("✅ Privacy Policy created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Create Privacy Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Update Privacy Policy
 */
export const updatePrivacyPolicy = async (id, payload) => {
  try {
    console.log(`🚀 Updating Privacy Policy ID: ${id}`, payload);
    const response = await API.put(`/privacy-policy/update/${id}`, payload);
    console.log("✅ Privacy Policy updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Privacy Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

/**
 * Delete Privacy Policy
 */
export const deletePrivacyPolicy = async (id) => {
  try {
    console.log(`🚀 Deleting Privacy Policy ID: ${id}`);
    const response = await API.delete(`/privacy-policy/delete/${id}`);
    console.log("✅ Privacy Policy deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Privacy Error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
