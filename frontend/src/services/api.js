import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true, // ⭐ VERY IMPORTANT
});

export default API;
