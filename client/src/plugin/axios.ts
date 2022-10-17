import axios from "axios";
import cookie from 'js-cookie';

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
  }
  // error => {
  //   console.log(error);

  //   let errorCode: number = error?.response?.status;
  //   /** 响应码对应的错误*/
  //   let responseMessage: string | undefined = (ErrorCodeMessage as any)[errorCode + ""];
  //   /** 服务器返回的message属性*/
  //   let serverErrorMessage = error?.response?.data?.message;

  //   message.error(serverErrorMessage || `${errorCode}:${responseMessage}` || "请求错误");
  //   return Promise.reject(error);
  // }
);
