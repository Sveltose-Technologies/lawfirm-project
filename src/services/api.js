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
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler } from "./errorHandler"; 
import { responseHandler } from "./responseHandler"; 

const API = axios.create({
  baseURL: "https://nodejs.nrislawfirm.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// 🔐 1. REQUEST INTERCEPTOR (Token & Auth handling)
API.interceptors.request.use(
  (config) => {
       const isAuthRoute =
      config.url.includes("/login-signup") ||
      config.url.includes("/signup") ||
      config.url.includes("/forgot-password") ||
      config.url.includes("/verify-otp");

    if (!isAuthRoute) {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 🔔 2. RESPONSE INTERCEPTOR (Success & Error Toast handling)
API.interceptors.response.use(
  (response) => {
    // आपके responseHandler का उपयोग करके डेटा प्रोसेस करना
    const handledRes = responseHandler(response);

    // सिर्फ POST, PUT, DELETE मेथड्स पर Success Toast दिखाएं (GET पर नहीं)
    const method = response.config.method.toLowerCase();
    if (method !== "get") {
      console.log(`✅ [${method.toUpperCase()}] Success:`, handledRes.message);
      toast.success(handledRes.message);
    }

    return response;
  },
  (error) => {
    // आपके errorHandler का उपयोग करके एरर मैसेज प्राप्त करना
    const errorMessage = errorHandler(error);

    console.error("❌ API Global Error:", errorMessage);

    // किसी भी तरह की एरर आने पर लाल रंग का टोस्ट दिखाएं
    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default API;