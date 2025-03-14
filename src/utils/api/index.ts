import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const useAxiosInstance = (multipart = false) => {
  // Create the axios instance
  const instance = axios.create({
    headers: {
      "Content-Type": multipart ? "multipart/form-data" : "application/json",
    },
    baseURL: BASE_API_URL,
    timeout: 60000,
  });

  // Add a request interceptor to set the auth token
  instance.interceptors.request.use(
    async (config) => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Q0NmEyNDFkYjhiMjM1ZGNmODIyNDciLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkdGxaYlVLak9PSU1kMUhGT1EyT2RNLlNqbEZ5cXFkTmR5cG1lOGhyRmlaaThDaG5SWlBPVWEiLCJjcmVhdGVkQXQiOiIyMDI1LTAzLTE0VDE3OjQwOjUyLjQzOFoiLCJ1cGRhdGVkQXQiOiIyMDI1LTAzLTE0VDE3OjQyOjU2Ljk1MVoiLCJfX3YiOjAsInNlc3Npb25JZCI6IkRBMXl0dnFRUVFiUFB4UzdhMzhMRiIsImlhdCI6MTc0MTk3OTcxMCwiZXhwIjoxNzQzMTg5MzEwfQ.suuBROYFur3DrXOWvvVFP5_5owsO63WFFhPTfzsKdOc";

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

  return instance;
};

export default useAxiosInstance;
