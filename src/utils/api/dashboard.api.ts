import useAxiosInstance from ".";
import { handleGenericError } from "../notify";

const useDashboardApi = () => {
  const axiosInstance = useAxiosInstance();

  const getTasks = async () => {
    try {
      const {data: res} = await axiosInstance.get("task");
      return res.data;
    } catch (error) {
      handleGenericError(error);
    }
  };

  return {
    getTasks,
  };
};

export default useDashboardApi;
