import axios from "axios";

const axiosInstance = axios.create({
  baseURL: window.location.origin,
});

export default axiosInstance;
