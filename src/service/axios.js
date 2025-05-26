import axios from "axios";
const base_url = import.meta.env.VITE_API_URL;

const token = sessionStorage.getItem("MVtoken");

export default axios.create({
  baseURL: base_url,
});

export const axiosPrivate = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  credentials: true,
});
