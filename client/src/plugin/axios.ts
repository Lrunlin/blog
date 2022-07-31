import axios from "axios";
axios.defaults.baseURL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://api.blogweb.cn/";

const ErrorCodeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求(请求参数)有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  // 404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

axios.interceptors.request.use(
  (config: any) => {
    config.headers.authorization = localStorage.token;
    config.headers.isadmin = true;
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

import { message } from "antd";
axios.interceptors.response.use(
  config => {
    /**访问成功**/
    return config;
  },
  error => {
    let errorCode: number = error.response.status;
    /** 响应码对应的错误*/
    let responseMessage: string | undefined = (ErrorCodeMessage as any)[errorCode + ""];
    /** 服务器返回的message属性*/
    let serverErrorMessage = error?.response?.data?.message;

    message.error(serverErrorMessage || `${errorCode}:${responseMessage}` || "请求错误");
    return Promise.reject(error);
  }
);
