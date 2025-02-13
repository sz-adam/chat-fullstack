import axios from "axios";

const API_URL = "http://localhost:5001/api/";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


