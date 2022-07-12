import axios from "axios";
const baseURL = "http://localhost:3001/api";

const Axios = axios.create({ baseURL });

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    token
      ? (config.headers.Authorization = token)
      : delete config.headers.Authorization;
    return config;
  },
  null,
  { synchronous: true }
);

export default Axios;
