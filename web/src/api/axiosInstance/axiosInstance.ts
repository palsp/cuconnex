import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzIyMTIyMjMiLCJpYXQiOjE2MTk3MTQ5MTJ9.rEkg4v-0gwcP1JXbddpiV-aypjYVfDCOzAeJeCIjHgc";
const axiosInstance = axios.create({
  baseURL: "https://www.cu-connex.com",
  //baseURL: window.location.origin,
});

axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export default axiosInstance;
//loong2
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODM3NDgzMjEiLCJpYXQiOjE2MTk2MjEyNDV9.oGQV9USOlf0T7vHE5E1ZRmySuEk0dshaIegoBp2PKp8"
//loong
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzQ3Mzg0MjEiLCJpYXQiOjE2MTk1MDg3NjZ9.iO6bKJ7OWSqMWRjd8qY5s2Zma082MlCWX0YVn4j2m9E"
//
