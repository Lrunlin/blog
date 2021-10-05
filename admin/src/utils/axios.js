import axios from 'axios';
import store from '@/store/index.js';
let whiteList = ['/os'];

axios.interceptors.request.use(function (config) {
    if (!whiteList.includes(config.url)) {
        store.commit('switchLoad', true)
    }
    config.headers.authorization = localStorage.token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    if (!whiteList.includes(response.config.url)) {
        store.commit('switchLoad', false)
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

axios.defaults.baseURL = process.env.NODE_ENV === "production" ?
    'https://blog-api.blogweb.cn' :
    "http://localhost:3000/";