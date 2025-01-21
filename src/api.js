import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "https://skillup-tracker-backend.onrender.com", // Backend server URL
});

export default API;
