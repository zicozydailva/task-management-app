import axios from "axios";
const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const DashboardMiscApi = {
  async getCurrencies() {
    const { data } = await axios.get(`${BASE_API_URL}/currencies`);

    return data;
  },
};

export default DashboardMiscApi;
