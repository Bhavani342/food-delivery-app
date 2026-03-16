import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getRestaurants = (params) => API.get("/restaurants", { params });
export const getRestaurant = (id) => API.get(`/restaurants/${id}`);
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const createOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/my-orders");
export const createPayment = (amount) => API.post("/payment/create-order", { amount });

export default API;
