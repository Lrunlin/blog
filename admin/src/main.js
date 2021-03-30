import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import {
    Base64
} from "js-base64";






// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL =
    (process.env.NODE_ENV == "development") ?
    "http://localhost:3000/" :
    "https://blog-api.blogweb.cn"


//拦截器，添加一个验证信息
axios.interceptors.request.use((request) => {
    request.headers.liurunlin = Base64.encode(new Date().getTime());
    return request;
}, function (error) {
    return Promise.reject(error);
});












// elemetnPlus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 公共css没有scoped
import '@/views/common.scss'
// 代码高亮
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; //代码高亮样式用atom的
createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(ElementPlus)
    .use(hljs.vuePlugin)
    .mount('#app')