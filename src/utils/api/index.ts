import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const useAxiosInstance = (multipart = false) => {
  const instance = axios.create({
    headers: {
      "Content-Type": multipart ? "multipart/form-data" : "application/json",
    },
    baseURL: BASE_API_URL,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    async (config) => {
      try {
        const token = localStorage.getItem("accessToken");

        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error("Failed to get access token", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error("Response Error:", error);

      if (error.response?.status === 401) {
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;
