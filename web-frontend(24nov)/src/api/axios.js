// import axios from "axios";

// const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
// const normalizedApiUrl = rawApiUrl
//   .trim()
//   .replace(/^['"]|['"]$/g, "")
//   .replace(/,+$/, "")
//   .replace(/\/+$/, "");

// const axiosInstance = axios.create({
//   baseURL: `${normalizedApiUrl}/api`,
// });

// export default axiosInstance;

import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const normalizedApiUrl = rawApiUrl
  .trim()
  .replace(/^['"]|['"]$/g, "")
  .replace(/,+$/, "")
  .replace(/\/+$/, "");

const axiosInstance = axios.create({
  baseURL: `${normalizedApiUrl}/api`,
});

export default axiosInstance;
