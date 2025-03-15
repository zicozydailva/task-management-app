import useAxiosInstance from ".";
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

  return {
    getTasks,
    loginHandler,
  };
};

export default useDashboardApi;
