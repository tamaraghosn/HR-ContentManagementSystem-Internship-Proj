import axios from "axios";
import history from "./history";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      //window.location.href = "/";
      // Cookies.set("shift-management-accesstoken", null);
    } else {
      return Promise.reject(error);
    }
  }
);
axios.defaults.proxy = process.env.REACT_APP_BASE_URL;
instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get(
    "shift-management-accesstoken"
  )}`;
  return config;
});

export default instance;
