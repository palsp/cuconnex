import axios from "axios";

// const token =

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODU3NDY1MjEiLCJpYXQiOjE2MTkzNzM4NTJ9.XJOBxI1g_cvL4Gvj1X2UkObSLK6EeZjTbpN_r8Ydn30";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  //baseURL: window.location.origin,
});

// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
//loong2
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODM3NDgzMjEiLCJpYXQiOjE2MTk2MjEyNDV9.oGQV9USOlf0T7vHE5E1ZRmySuEk0dshaIegoBp2PKp8"
//loong
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzQ3Mzg0MjEiLCJpYXQiOjE2MTk1MDg3NjZ9.iO6bKJ7OWSqMWRjd8qY5s2Zma082MlCWX0YVn4j2m9E"
