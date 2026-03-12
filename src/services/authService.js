import API from "./api";

export const IMG_URL = "https://nodejs.nrislawfirm.com";

// ================= HELPER FUNCTIONS =================

export const getAdminId = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    console.log("Admin ID", userData);
    if (userData) {
      try {
        const user = JSON.parse(userData);

        return user.id || null;
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return null;
      }
    }
  }
  return null;
};
export const getImgUrl = (path) => {
  if (!path) return "";

  let normalizedPath = path.replace(/\\/g, "/");

  if (normalizedPath.startsWith("http")) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("/")) {
    normalizedPath = normalizedPath.substring(1);
  }

  // 4. Logic to determine the folder structure
  if (
    normalizedPath.startsWith("uploads/") ||
    normalizedPath.startsWith("public/")
  ) {
    return `${IMG_URL}/${normalizedPath}`;
  }

  return `${IMG_URL}/uploads/${normalizedPath}`;
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
    console.error(
      "❌ Client Signup Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Client Login Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Client Forgot Password Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Client Verify OTP Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Client Reset Password Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Attorney Signup Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Attorney Login Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};
export const getUserProfile = async (userId) => {
  try {
    console.log("🚀 Calling Attorney Login API:", userId);
    const response = await API.get(`/attorney/get-by-id/${userId}`);
    console.log("✅ Attorney userInfo:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Attorney user Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};
// ================= ATTORNEY AUTH (Add these) =================

export const forgotPasswordAttorney = async (payload) => {
  const response = await API.post("/attorney/forgot-password", payload);
  return response.data;
};

export const verifyOtpAttorney = async (payload) => {
  const response = await API.post("/attorney/verify-otp", payload);
  return response.data;
};

export const resetPasswordAttorney = async (payload) => {
  const response = await API.put("/attorney/reset-password", payload);
  return response.data;
};


// ================= ADMIN AUTH & OTP =================
export const adminLogin = async (email, password) => {
  try {
    const response = await API.post("/admin/login", { email, password });

    // Asli JWT Token extract karein
    const token =
      response.data?.token ||
      response.data?.admin?.token ||
      response.data?.user?.token;
    const adminData =
      response.data?.admin || response.data?.user || response.data;

    if (token) {
      // ✅ Dummy "admin-token" ki jagah asli JWT save karein
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(adminData));
      localStorage.setItem("isLoggedIn", "true");

      console.log("✅ Real JWT Token saved successfully.");
      return { success: true, data: response.data };
    }
    return { success: false, message: "Token missing" };
  } catch (error) {
    return { success: false, message: "Login failed" };
  }
};
// export const adminLogin = async (email, password) => {
//   try {
//     const response = await API.post("/admin/login", { email, password });

//     // Check karein ki data kahan hai (response.data ya response.data.admin)
//     const adminData = response.data?.admin || response.data;
//     const token = response.data?.token || adminData?.token;

//     if (token) {
//       localStorage.setItem("token", token);

//       // Pura adminData save karein jisme ID ho
//       localStorage.setItem("user", JSON.stringify(adminData));

//       localStorage.setItem("isLoggedIn", "true");
//       return { success: true, data: response.data };
//     }
//     return { success: false, message: "Login failed" };
//   } catch (error) {
//     return { success: false, message: "Error during login" };
//   }
// };

export const adminForgotPassword = async (email) => {
  try {
    console.log("🚀 Calling Admin Forgot Password API:", email);
    const response = await API.post("/admin/forgot-password", { email });
    console.log("✅ Admin OTP Sent:", response.data);
    return {
      success: true,
      message: response.data?.message || "OTP sent to email",
    };
  } catch (error) {
    console.error("❌ Admin Forgot Password Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send OTP",
    };
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
    return {
      success: false,
      message: error.response?.data?.message || "Invalid OTP",
    };
  }
};

export const adminResetPassword = async (
  email,
  newPassword,
  confirmPassword,
) => {
  try {
    console.log("🚀 Calling Admin Reset Password API:", email);
    const response = await API.post("/admin/reset-password", {
      email,
      newPassword,
      confirmPassword,
    });
    console.log("✅ Admin Password Reset Success:", response.data);
    return {
      success: true,
      message: response.data?.message || "Password reset successful",
    };
  } catch (error) {
    console.error("❌ Admin Reset Password Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};

// ================= ADMIN PROFILE =================

// ================= ADMIN PROFILE SERVICES =================

export const getAdminProfile = async () => {
  try {
    console.log("🚀 Fetching Admin Profile...");
    const response = await API.get("/admin/getall-adminprofile");

    // Normalize data structure
    const data = response.data?.data || response.data;
    const adminData = Array.isArray(data) ? data[0] : data;

    console.log("✅ Admin Profile Data Fetched:", adminData);
    return adminData;
  } catch (error) {
    console.error(
      "❌ Get Admin Profile Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateAdminProfile = async (id, formData) => {
  try {
    if (!id) throw new Error("Admin ID is missing");

    console.log(`📤 Updating Admin Profile for ID: ${id}...`);

    const response = await API.put(`/admin/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data) {
      console.log("✅ Update Success:", response.data.message);

      // OPTIONAL: Update local storage 'user' object so UI stays in sync
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = { ...currentUser, ...response.data.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }

    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Admin Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// export const getAdminProfile = async () => {
//   try {
//     console.log("🚀 Fetching Admin Profile...");
//     const response = await API.get("/admin/getall-adminprofile");
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
//     // Ensure ID is present
//     if (!id) throw new Error("Admin ID is missing");

//     const response = await API.put(`/admin/update/${id}`, formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     // Agar API direct data bhejti hai to use return karein
//     return response.data;
//   } catch (error) {
//     console.error(
//       "❌ Update Admin Error:",
//       error.response?.data || error.message,
//     );
//     throw error;
//   }
// };

// ================= CAPABILITY CATEGORY APIs =================

export const getAllCapabilityCategories = async () => {
  try {
    console.log("🚀 Fetching all Capability Categories...");
    const response = await API.get("/capability-categories/get-all");
    console.log("✅ Categories fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Fetch Categories Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Create Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateCapabilityCategory = async (id, formData) => {
  try {
    console.log(`🚀 Updating Category ID: ${id}...`);
    const response = await API.put(
      `/capability-categories/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    console.log("✅ Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Category Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Category Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// ================= CAPABILITY SUBCATEGORY APIs =================

export const getAllCapabilitySubCategories = async () => {
  try {
    console.log("🚀 Fetching all Subcategories...");
    const response = await API.get(
      "/capability-subcategory/getall-subcategory",
    );
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
    const res = await API.put(
      `/capability-subcategory/update/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
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
      data: response.data?.data || response.data || [],
    };
  } catch (error) {
    console.error(
      "❌ Fetch Subcategory CMS Error:",
      error.response?.data || error.message,
    );
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
    let data =
      response.data?.data || response.data?.news || response.data || [];
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
    let data =
      response.data?.data || response.data?.events || response.data || [];
    console.log("✅ Events fetched:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Get Events Error:", error);
    return { success: false, data: [] };
  }
};
// create event banner
export const createBannerEvent = async (formData) => {
  try {
    console.log("Creating banner Event...p", formData);
    const response = await API.post("/event-banner/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Event banner Create Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Create Event Error:", error);
    throw error;
  }
};
export const updateBannerEvent = async (id, formData) => {
  try {
    console.log(`🚀 Updating Event ID: ${id}`);
    const response = await API.put(`/event-banner/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("✅ Event Update Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Update Event Error:", error);
    throw error;
  }
};
export const deleteBannerEvent = async (id) => {
  try {
    console.log(`🚀 Deleting Event ID: ${id}`);
    const response = await API.delete(`/event-banner/delete/${id}`);
    console.log("✅ Event Delete Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Delete Event Error:", error);
    throw error;
  }
};
export const getBanner = async () => {
  try {
    console.log("🚀 Fetching all News...");
    const response = await API.get("/event-banner/get-all");
    let data =
      response.data?.data || response.data?.banner || response.data || [];
    console.log("✅ News Banner:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Get News Error:", error);
    return { success: false, data: [] };
  }
};

export const createEvent = async (formData) => {
  try {
    console.log("🚀 Creating New Event...p", formData);
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
    console.error(
      "❌ Fetch Countries Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Create Country Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update Country Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Country Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update City Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete City Error:",
      error.response?.data || error.message,
    );
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

// ================= LOCATION MAIN (BANNER) APIs =================

export const createLocation = async (formData) => {
  try {
    // Kyunki isme image (bannerImage) hai, isliye FormData use hoga
    const response = await API.post("/location/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getAllLocations = async () => {
  try {
    const response = await API.get("/location/get-all");
    return response.data;
  } catch (error) {
    console.error("❌ Get All Locations Error:", error);
    return { success: false, data: [] };
  }
};

export const getLocationById = async (id) => {
  const response = await API.get(`/location/get-by-id/${id}`);
  return response.data;
};

export const updateLocation = async (id, formData) => {
  try {
    const response = await API.put(`/location/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteLocation = async (id) => {
  try {
    const response = await API.delete(`/location/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
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
    console.error(
      "❌ Create Location CMS Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update Location CMS Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Location CMS Error:",
      error.response?.data || error.message,
    );
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

// ... existing code

export const updateContact = async (id, data) => {
  try {
    const response = await API.put(`/contact/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const response = await API.delete(`/contact/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- Contact Page Text Methods ---

export const getContactText = async () => {
  try {
    const res = await API.get("/contact-text/get-all");
    return { success: true, data: res.data };
  } catch (error) {
    console.error("❌ Get Contact Text Error:", error);
    throw error;
  }
};

export const createContactText = async (data) => {
  try {
    const response = await API.post("/contact-text/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateContactText = async (id, data) => {
  try {
    // URL format: /contact-text/update/:id
    const response = await API.put(`/contact-text/update/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContactText = async (id) => {
  try {
    // URL format: /contact-text/delete/:id
    const response = await API.delete(`/contact-text/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ================= CLIENT MANAGEMENT =================

// services/authService.js

export const getAllClients = async () => {
  try {
    const response = await API.get("/client/getall");
    console.log("✅ API Success /client/getall:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Get Clients Error:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
export const updateClient = async (id, payload) => {
  try {
    console.log(`🚀 Updating Client ID: ${id}`, payload);
    const response = await API.put(`/client/update/${id}`, payload);
    console.log("✅ Update Client Success:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Update Client Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Client Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Get Attorneys Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Attorney Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update Attorney Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
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
      data: response.data?.data || response.data || [],
    };
  } catch (error) {
    console.error(
      "❌ Fetch Terms Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Create Terms Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update Terms Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Terms Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};

/**
 * Fetch all Privacy Policies
 */
// --- Privacy Policy API ---
export const getAllPrivacyPolicy = async () => {
  try {
    const response = await API.get("/privacy-policy/getall");
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
    console.error(
      "❌ Create Privacy Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Update Privacy Error:",
      error.response?.data || error.message,
    );
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
    console.error(
      "❌ Delete Privacy Error:",
      error.response?.data || error.message,
    );
    throw error.response?.data || error;
  }
};

// ================= PROFESSIONAL SERVICES =================

export const getAllProfessionals = async () => {
  try {
    console.log("🚀 Fetching All Professionals (Attorneys)...");
    const response = await API.get("/professionals/get-all");
    console.log("✅ Professionals fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching professionals:", error);
    return { success: false, data: [] };
  }
};

// services/authService.js update karein

export const createProfessional = async (data) => {
  // Headers override karne ke liye config yahan pass karein
  const response = await API.post("/professionals/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProfessional = async (id, data) => {
  const response = await API.put(`/professionals/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProfessional = async (id) => {
  const response = await API.delete(`/professionals/delete/${id}`);
  return response.data;
};
// ================= CAPABILITIES SERVICES =================

export const getAllCapabilities = async () => {
  const response = await API.get("/capability/getall");
  return response.data;
};

export const createCapability = async (data) => {
  const response = await API.post("/capability/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCapability = async (id, data) => {
  const response = await API.put(`/capability/update/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteCapability = async (id) => {
  const response = await API.delete(`/capability/delete/${id}`);
  return response.data;
};

// ================= SOCIAL MEDIA SERVICES =================

export const getAllSocialMedia = async () => {
  const response = await API.get("/social-media/get-all");
  return response.data;
};

export const createSocialMedia = async (data) => {
  const response = await API.post("/social-media/create", data);
  return response.data;
};

export const updateSocialMedia = async (id, data) => {
  const response = await API.put(`/social-media/update/${id}`, data);
  return response.data;
};

export const deleteSocialMedia = async (id) => {
  const response = await API.delete(`/social-media/delete/${id}`);
  return response.data;
};

// Logo Type API
export const createLogoType = (data) => API.post("/logo-type/create", data);
export const getAllLogoTypes = () => API.get("/logo-type/get-all");
export const updateLogoType = (id, data) =>
  API.put(`/logo-type/update/${id}`, data);
export const deleteLogoType = (id) => API.delete(`/logo-type/delete/${id}`);

// Home Banner API
export const createHomeBanner = (formData) =>
  API.post("/home-banner/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getAllHomeBanners = () => API.get("/home-banner/get-all");
export const updateHomeBanner = (id, formData) =>
  API.put(`/home-banner/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteHomeBanner = (id) => API.delete(`/home-banner/delete/${id}`);

// Home Data API
export const createHomeData = (formData) =>
  API.post("/home-data/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getAllHomeData = () => API.get("/home-data/get-all");
export const updateHomeData = (id, formData) =>
  API.put(`/home-data/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteHomeData = (id) => API.delete(`/home-data/delete/${id}`);

// Home Counter API
export const createCounters = (formData) =>
  API.post("/home-count/create", formData);
export const getAllCounters = () => API.get("home-count/getall");
export const updateCounters = (id, formData) =>
  API.put(`/home-count/update/${id}`, formData);
export const deleteCountData = (id) => API.delete(`/home-count/delete/${id}`);

// Home Ranking API
export const createRanking = (formData) =>
  API.post("/home-ranking/create", formData);
export const getAllRanking = () => API.get("/home-ranking/getall");
export const deleteRankData = (id) => API.delete(`/home-ranking/delete/${id}`);
export const updateRanking = (id, formData) =>
  API.put(`/home-ranking/update/${id}`, formData);

// Home All Languages
export const getAttorneylanguages = async () => {
  try {
    console.log("Fetching All Languages...");
    const response = await API.get("/languages/get-all");
    const data = response.data || response.data;
    console.log("data Testing", data);
    
    return data;
  } catch (error) {
    console.error(
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Home All Location
export const getAttorneyLocation = async () => {
  try {
    console.log("Fetching All Languages...");
    const response = await API.get("/languages/get-all");
    const data = response.data || response.data;
    return data;
  } catch (error) {
    console.error(
      error.response?.data || error.message,
    );
    throw error;
  }
};