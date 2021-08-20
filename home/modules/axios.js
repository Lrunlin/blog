import axios from 'axios';
import md5 from 'md5';
import {
    encode
} from 'js-base64';
axios.interceptors.request.use(function (config) {
    let data = {
        time: +new Date(),
        salt: Math.random().toString(32),
        sign: null
    }
    const method = config.method.toLocaleLowerCase();
    data.sign = md5('刘润霖0621' + method + data.time + data.salt);
    config.headers.authorization = encode(JSON.stringify(data))
    return config;
});

axios.defaults.baseURL = process.env.NODE_ENV === "production" ?
    'https://blog-api.blogweb.cn' :
    "http://localhost:3000/";