// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://nodejs.nrislawfirm.com',
//   // baseURL: 'http://72.62.87.252:3000',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// // 🔐 TOKEN INTERCEPTOR (LOGIN & SIGNUP SKIP)
// API.interceptors.request.use(
//   (config) => {
//     const isAuthRoute =
//       config.url.includes('/auth/login') ||
//       config.url.includes('/auth/signup');

//     if (!isAuthRoute) {
//       const token =
//         typeof window !== 'undefined'
//           ? localStorage.getItem('token')
//           : null;

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } else {

//       delete config.headers.Authorization;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;

// import axios from "axios";
// import { toast } from "react-toastify";
// import { errorHandler } from "./errorHandler";
// import { responseHandler } from "./responseHandler";

// const API = axios.create({
//   // baseURL: "https://nodejs.nrislawfirm.com",
//   baseURL : "https://nrislaw.rxchartsquare.com",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // 🔐 1. REQUEST INTERCEPTOR (Token & Auth handling)
// API.interceptors.request.use(
//   (config) => {
//        const isAuthRoute =
//       config.url.includes("/login-signup") ||
//       config.url.includes("/signup") ||
//       config.url.includes("/forgot-password") ||
//       config.url.includes("/verify-otp");

//     if (!isAuthRoute) {
//       const token =
//         typeof window !== "undefined" ? localStorage.getItem("token") : null;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     } else {
//       delete config.headers.Authorization;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// API.interceptors.response.use(
//   (response) => {
//     const handledRes = responseHandler(response);

//     const method = response.config.method.toLowerCase();
//     if (method !== "get") {
//       console.log(`✅ [${method.toUpperCase()}] Success:`, handledRes.message);
//       toast.success(handledRes.message);
//     }

//     return response;
//   },
//   (error) => {
//     const errorMessage = errorHandler(error);

//     console.error("❌ API Global Error:", errorMessage);

//     toast.error(errorMessage);

//     return Promise.reject(error);
//   },
// );

// export default API;

import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler } from "./errorHandler";
import { responseHandler } from "./responseHandler";

const API = axios.create({
  // baseURL: "https://nodejs.nrislawfirm.com",
  baseURL: "https://nrislaw.rxchartsquare.com",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// services/api.js

// services/api.js

// services/api.js

API.interceptors.request.use(
  (config) => {
    const isAuthRoute =
      config.url.includes("/login-signup") ||
      config.url.includes("/signup") ||
      config.url.includes("/forgot-password") ||
      config.url.includes("/verify-otp") ||
      config.url.includes("/admin/login");

    if (!isAuthRoute) {
      let token = null;

      // 1. Pehle 'user' object ke andar se asli JWT token dhundo
      const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          token = parsed.token; // Jo aapne log me dikhaya, asli token yahan hai
        } catch (e) {
          console.error("Token parsing error");
        }
      }

      // 2. Agar wahan nahi mila, toh 'token' key check karo
      if (!token) {
        token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      }

      // 3. Agar token mil gaya aur wo "admin-token" jaisa dummy text nahi hai
      if (token && token !== "admin-token") {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`🚀 Real JWT Token attached for: ${config.url}`);
      } else {
        console.error(`🚨 No valid JWT found for: ${config.url}. Please login again.`);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
API.interceptors.response.use(
  (response) => {
    const handledRes = responseHandler(response);

    const method = response.config.method.toLowerCase();
    if (method !== "get") {
      console.log(`✅ [${method.toUpperCase()}] Success:`, handledRes.message);
      toast.success(handledRes.message);
    }

    return response;
  },
  (error) => {
    const errorMessage = errorHandler(error);

    console.error("❌ API Global Error:", errorMessage);

    // Auto logout if unauthorized (optional but professional)
    if (error.response?.status === 401) {
      console.error("Unauthorized access - 401");
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  },
);

export default API;