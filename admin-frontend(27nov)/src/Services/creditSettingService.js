import axios from "axios";

const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const CREDIT_SETTING_API =
  `${API_BASE_URL}/credit-settings`;

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  return {
    headers: {
      Authorization:
        token
          ? `Bearer ${token}`
          : "",
    },
  };
};

export const getCreditSettingsApi =
  async () => {
    const response =
      await axios.get(
        CREDIT_SETTING_API,
        getAuthHeaders()
      );

    return response.data;
  };

export const updateCreditSettingsApi =
  async (payload) => {
    const response =
      await axios.patch(
        CREDIT_SETTING_API,
        payload,
        getAuthHeaders()
      );

    return response.data;
  };

export const updateCreditProductApi =
  async (
    code,
    payload
  ) => {
    const response =
      await axios.patch(
        `${CREDIT_SETTING_API}/product/${code}`,
        payload,
        getAuthHeaders()
      );

    return response.data;
  };

export const resetCreditSettingsApi =
  async () => {
    const response =
      await axios.post(
        `${CREDIT_SETTING_API}/reset`,
        {},
        getAuthHeaders()
      );

    return response.data;
  };