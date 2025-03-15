import useAxiosInstance from ".";
import { jwtDecode } from "jwt-decode";
import { handleGenericError } from "../notify";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();

  const getTasks = async (page?: number, limit?: number) => {
    try {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append("page", page.toString());
      if (limit) queryParams.append("limit", limit.toString());

      const { data: res } = await axiosInstance.get(
        `task?${queryParams.toString()}`
      );
      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  const loginHandler = async (data: { email: string; password: string }) => {
    try {
      const { data: res } = await axiosInstance.post("auth/login", data);
      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  const getUserId = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return (decoded as any)._id;
    } catch (error) {
      console.error("Error decoding token", error);
      return null;
    }
  };

  const logout = async () => {
    const userId = getUserId();

    try {
      const { data: res } = await axiosInstance.post("auth/logout", userId);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  return {
    getTasks,
    loginHandler,
    getUserId,
    logout,
  };
};

export default useDashboardApi;
