// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// // 1. All Buyers fetch karne ke liye
// export const fetchAllBuyers = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/buyers/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching buyers:", error);
//     throw error;
//   }
// };

// // 2. Single Buyer by ID fetch karne ke liye
// export const fetchBuyerById = async (id) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/buyers/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching buyer with ID ${id}:`, error);
//     throw error;
//   }
// };


import axios from "./axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BUYER_API = `${API_BASE_URL}/buyers`;

export const fetchAllBuyers = async () => {
  const response = await axios.get(BUYER_API);
  return response.data;
};

export const fetchBuyerById = async (id) => {
  const response = await axios.get(`${BUYER_API}/${id}`);
  return response.data;
};

export const fetchBuyerDashboard = async (id) => {
  const response = await axios.get(`${BUYER_API}/${id}/dashboard`);
  return response.data;
};
