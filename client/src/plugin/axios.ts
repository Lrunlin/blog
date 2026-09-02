import axiosPlugin from "axios";
import { getToken } from "@/common/modules/cookie";

// 创建 axios 实例
const apiClient = axiosPlugin.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 客户端才修改请求头
    if (typeof window !== "undefined") {
      config.headers.authorization = getToken();
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
    // 取消请求时直接 reject，让 finally 正常执行
    if (axiosPlugin.isCancel(error)) {
      return Promise.reject({ cancelled: true });
    }

    // 401 未授权处理
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // 清除本地 token
        localStorage.removeItem("token");
        // 可以触发登录弹窗或跳转登录页
        // window.location.href = '/login';
      }
    }

    return Promise.reject({
      ...error.response?.data,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
  },
);

export default apiClient;
