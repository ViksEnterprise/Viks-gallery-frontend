import axios from "axios";
const base_url = "http://127.0.0.1:8000/api/";
// const base_url = import.meta.env.VKIS_API_URL;

console.log(base_url)

const token = sessionStorage.getItem("MVtoken");

const key =
  "qiCRC7p7cv8YMhZZuyabB2ovC1v4l79kM22FPB0G9PCticx6g6WAnq1TsS8laI9Fb7Y6";
// const key = import.meta.env.VIKS_API_KEY;

// 
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
