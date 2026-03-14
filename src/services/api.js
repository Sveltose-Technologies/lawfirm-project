import axios from "axios";
import { toast } from "react-toastify";
import { errorHandler } from "./errorHandler";
import { responseHandler } from "./responseHandler";

const API = axios.create({
  baseURL: "https://nodejs.bluestor.net",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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

      const userData =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          token = parsed.token;
        } catch (e) {
          console.error("Token parsing error");
        }
      }

      if (!token) {
        token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
      }

      if (token && token !== "admin-token") {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`🚀 Real JWT Token attached for: ${config.url}`);
      } else {
        console.error(
          `🚨 No valid JWT found for: ${config.url}. Please login again.`,
        );
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);
API.interceptors.response.use(
  (response) => {
    const handledRes = responseHandler(response);

    const method = response.config.method.toLowerCase();
    if (method !== "get") {
      console.log(` [${method.toUpperCase()}] Success:`, handledRes.message);
      toast.success(handledRes.message);
    }

    return response;
  },
  (error) => {
    const errorMessage = errorHandler(error);

    console.error(" API Global Error:", errorMessage);

    // Auto logout if unauthorized (optional but professional)
    if (error.response?.status === 401) {
      console.error("Unauthorized access - 401");
    }

    toast.error(errorMessage);
    return Promise.reject(error);
  },
);

export default API;
