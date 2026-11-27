import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const PUBLISHING_API =
  `${API_BASE_URL}/property-publishing`;

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: token
      ? `Bearer ${token}`
      : "",
  };
};

export const getPropertyPublishingSummaryApi =
  async () => {
    const response = await axios.get(
      `${PUBLISHING_API}/summary`,
      {
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  };

export const getReadyForFinalReviewPropertiesApi =
  async (params = {}) => {
    const response = await axios.get(
      `${PUBLISHING_API}/ready`,
      {
        params,
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  };

export const getLivePublishingPropertiesApi =
  async (params = {}) => {
    const response = await axios.get(
      `${PUBLISHING_API}/live`,
      {
        params,
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  };

export const getFinalReviewPropertyApi =
  async (id) => {
    const response = await axios.get(
      `${PUBLISHING_API}/${id}/final-review`,
      {
        headers: {
          ...getAuthHeaders(),
        },
      }
    );

    return response.data;
  };

export const makePropertyLiveApi =
  async (
    id,
    payload = {}
  ) => {
    const response = await axios.patch(
      `${PUBLISHING_API}/${id}/make-live`,
      payload,
      {
        headers: {
          ...getAuthHeaders(),
          "Content-Type":
            "application/json",
        },
      }
    );

    return response.data;
  };
