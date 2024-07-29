import axios from "axios";

export const Api = axios.create({
  baseURL: "http://localhost:3000/users",
  // baseURL: "https://blog-api-t6u0.onrender.com/posts",
});
