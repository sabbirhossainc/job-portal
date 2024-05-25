import axios from "axios";

const axiosInstance = axios.create({
  // baseURL:
  //   "https://my-json-server.typicode.com/sabbirhossainc/book-server",
  baseURL: "https://book-server-6clx.onrender.com",
});

export default axiosInstance;
