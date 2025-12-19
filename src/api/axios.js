import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // no cookies needed
  timeout: 15000,
});

// Request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("API CALL →", config.baseURL + config.url);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API ERROR →", error);

   if (error.response?.status === 401) {
  localStorage.removeItem("token");

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

    return Promise.reject(error);
  }
);

export default api;
