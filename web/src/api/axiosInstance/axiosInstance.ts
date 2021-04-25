import axios from "axios";

const token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE3MzU1NTUiLCJpYXQiOjE2MTkzNTcyNjh9.B0HjixGDbi7NX2DtGMpOwPr85FCaDVW8ixlw2LP1KSw";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  // baseURL: window.location.origin,
});

 axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;

//Friend5
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE3MzU1NTUiLCJpYXQiOjE2MTkzNTcyNjh9.B0HjixGDbi7NX2DtGMpOwPr85FCaDVW8ixlw2LP1KSw"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE4MjQ3MjIiLCJpYXQiOjE2MTkyODE4NjR9.bhdsa5H1z4yYH-PYnn4ihEXLwRDydJzH22ajj1wlKKA"
//Friend1
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE3MzU5MjEiLCJpYXQiOjE2MTkzNDI4MjZ9.bwULCUFGubT4iW1p5DlwmT25ecElz1Krpgskh0gfDIk"
//Friend3
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzE3MzQ4NTMiLCJpYXQiOjE2MTkzNDMwMzR9.RhrEHrIek5AKxmPnECVkMdLLFKWD9yCuQoPpXyOntX8"