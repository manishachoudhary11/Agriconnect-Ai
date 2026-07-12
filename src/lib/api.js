import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("agriconnect_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function normalizeErrorMessage(data) {
  if (!data) return null;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    return data.detail.map((item) => item.msg || item).join(", ");
  }
  if (typeof data.message === "string") return data.message;
  return null;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      normalizeErrorMessage(error.response?.data) ||
      error.message ||
      "Something went wrong";

    if (status === 401 && !error.config?.url?.includes("/api/auth/login")) {
      localStorage.removeItem("agriconnect_token");
      localStorage.removeItem("agriconnect_user");

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      }
    }

    return Promise.reject({
      status,
      message,
      original: error,
    });
  }
);

export default api;
