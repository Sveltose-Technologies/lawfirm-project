// import axios from "axios";
// import { errorHandler } from "./errorHandler";
// import { responseHandler } from "./responseHandler";

// const API = axios.create({
//   // baseURL: "https://api.blustor.net",
//   baseURL: "https://nrislaw.rxchartsquare.com",

//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// API.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       let token = localStorage.getItem("token");

//       if (!token) {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//           try {
//             const parsed = JSON.parse(userData);
//             token = parsed.token;
//           } catch (e) {
//             token = null;
//           }
//         }
//       }

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// API.interceptors.response.use(
//   (response) => responseHandler(response),
//   (error) => {
//     const errorMessage = errorHandler(error); // This returns a string?
//     return Promise.reject(errorMessage); // You are rejecting a STRING
//   },
// );

// export default API;

import axios from "axios";

const API = axios.create({
  // baseURL: "https://api.blustor.net",
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

      // FIX: Agar token null hai ya string "undefined" hai, toh user object se lo
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
    return config;
  },
  (error) => Promise.reject(error),
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar server 401 bhej raha hai, toh matlab token kharab hai
    if (error.response && error.response.status === 401) {
      console.error("Token invalid or expired");
    }
    return Promise.reject(error);
  },
);

export default API;