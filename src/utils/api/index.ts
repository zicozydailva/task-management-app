import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const useAxiosInstance = (multipart = false) => {
  const { getAccessTokenSilently } = useAuth0();

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
        const token = await getAccessTokenSilently();
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
