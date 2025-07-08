import axios from "axios";
const base_url = import.meta.env.VITE_API_URL;

const token = sessionStorage.getItem("MVtoken");

const key = import.meta.env.VITE_VIKS_API_KEY;

export default axios.create({
  baseURL: base_url,
  headers: {
    "X-REDU-API-KEY": `${key}`,
  },
});

export const axiosPrivate = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${token}`,
    "X-REDU-API-KEY": `${key}`,
  },
  credentials: true,
});
