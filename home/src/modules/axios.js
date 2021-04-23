import axios from 'axios';
import {
    Base64
} from "js-base64";
axios.defaults.baseURL =
    (process.env.NODE_ENV === "development") ?
    "http://localhost:3000/" :
    "https://blog-api.blogweb.cn"
//拦截器，添加一个验证信息
axios.interceptors.request.use((request) => {
    request.headers.liurunlin = Base64.encode(new Date().getTime());
    return request;
}, function (error) {
    return Promise.reject(error);
});