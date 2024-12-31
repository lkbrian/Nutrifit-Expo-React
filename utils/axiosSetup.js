import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: "https://e066-41-80-116-253.ngrok-free.app/",
  timeout: 10000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // Make this function async
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // No token logic here
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    console.log(error.response?.data?.msg);
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: Redirect to login or refresh token logic");
      // Handle 401 errors (e.g., redirect to login page)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
