import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://blog-api.blogweb.cn";
axios.interceptors.request.use(
  function (config) {
    config.headers.authorization = localStorage.token;
    config.headers['Cache-Control'] = 'no-cache';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);