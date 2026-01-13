import axios from "axios";

const api = axios.create({
  baseURL: "https://atsresume-backend.onrender.com/api",
});

export default api;
