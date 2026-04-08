//Services
import axios from "axios";

const API = axios.create({
  baseURL: "https://nrislaw.rxchartsquare.com",

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      let token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        const userData = localStorage.getItem("user");
        if (userData) {
          try {
            const parsed = JSON.parse(userData);
            token = parsed.token;
          } catch (e) {
            token = null;
          }
        }
      }

      if (token && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      console.error("Token invalid or expired");
    }
    return Promise.reject(error);
  },
);

export default API;