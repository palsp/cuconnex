import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com/",
});

export default axiosInstance;
