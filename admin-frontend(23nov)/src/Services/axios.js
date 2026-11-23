// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   // baseURL: "https://diginiwas-admin-backend.onrender.com/api"
// });

// export default  axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    `${import.meta.env.VITE_API_URL}/v1`,

  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
