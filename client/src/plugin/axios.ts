import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_HOST;
axios.interceptors.request.use(
  (config: any) => {
    // 客户端才修改请求头
    if (typeof window != "undefined") {
      config.headers.authorization = cookie.get("token");
    }
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
    if (axios.isCancel(error)) {
      return new Promise(() => {}); // 返回一个空Promise 取消请求不触发catch
    }
    return Promise.reject({ ...error.response?.data, status: error.response?.status });
  }
);
