import axiosPlugin from "axios";
import cookie from "js-cookie";

// 创建 axios 实例
const apiClient = axiosPlugin.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 客户端才修改请求头
    if (typeof window !== "undefined") {
      config.headers.authorization = cookie.get("token");
    }
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    /**访问成功**/
    return response;
  },
  (error) => {
    if (axiosPlugin.isCancel(error)) {
      return new Promise(() => {}); // 返回一个空 Promise 取消请求不触发 catch
    }
    return Promise.reject({
      ...error.response?.data,
      status: error.response?.status,
    });
  },
);

export default apiClient;
