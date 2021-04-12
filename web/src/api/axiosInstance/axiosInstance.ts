import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://188.166.197.13/",
});

export default axiosInstance;
