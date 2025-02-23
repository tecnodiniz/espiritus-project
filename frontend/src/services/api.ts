import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json",
  },
});

export const conn_api = () => api.get("");
export const user_create = (data: any) => api.post("/users/", data);
export const fetch_users = () => api.get("/users/");
export const fetch_terreiros = () => api.get("/terreiros/");
export default api;
