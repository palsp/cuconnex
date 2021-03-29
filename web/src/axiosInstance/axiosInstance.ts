import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://connex.test",
});

export default axiosInstance;
