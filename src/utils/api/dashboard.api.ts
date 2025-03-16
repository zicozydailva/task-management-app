import useAxiosInstance from ".";
import { jwtDecode } from "jwt-decode";
import { handleGenericError } from "../notify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();
  const queryClient = useQueryClient();

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

  const createTask = async (data: {
    title: string;
    description: string;
    status: string;
  }) => {
    try {
      await axiosInstance
        .post("task", data)
        .then(() =>
          queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] })
        );
    } catch (error) {
      handleGenericError(error);
    }
  };

  const updateTaskStatus = async (id: string, data: { status: string }) => {
    try {
      await axiosInstance
        .patch(`task/${id}/status`, data)
        .then(() =>
          queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] })
        );
    } catch (error) {
      handleGenericError(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axiosInstance
        .delete(`task/${id}`)
        .then(() =>
          queryClient.invalidateQueries({ queryKey: [queryKeys.tasks] })
        );
    } catch (error) {
      handleGenericError(error);
    }
  };

  const getTaskStatusCounts = async () => {
    try {
      const { data: res } = await axiosInstance.get("task/status-counts");
      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  const loginHandler = async (data: { email: string; password: string }) => {
    const { data: res } = await axiosInstance.post("auth/login", data);
    return res.data;
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

  const getUsers = async () => {
    try {
      const { data: res } = await axiosInstance.get("users");
      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  return {
    getTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    loginHandler,
    getUserId,
    logout,
    getUsers,
    getTaskStatusCounts,
  };
};

export default useDashboardApi;
