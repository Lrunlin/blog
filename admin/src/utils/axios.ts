import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_HOST;

axios.interceptors.request.use(
  (config: any) => {
    config.headers.authorization = localStorage.token;
    config.headers.isAdmin = true;
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  config => {
    /**访问成功**/
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
