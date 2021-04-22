import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.cu-connex.com",
  // baseURL: window.location.origin,
});

export default axiosInstance;
