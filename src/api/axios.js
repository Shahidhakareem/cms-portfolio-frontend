import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://cms-portfolio-backend.onrender.com/api
  withCredentials: true, // required for cookies (future-proof)
  timeout: 10000, // prevents hanging requests
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      // avoid infinite redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
