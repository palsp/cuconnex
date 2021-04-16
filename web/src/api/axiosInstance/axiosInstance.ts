import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.cu-connex.com/",
});

export default axiosInstance;
