import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import {
    Base64
} from "js-base64";
import QS from 'qs';






// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL =
    (process.env.NODE_ENV == "development") ?
    "http://localhost:3000/" :
    "https://blog-api.blogweb.cn"



 //拦截器，添加一个验证信息
 axios.interceptors.request.use((request) => {
     // 判断上传方式，在判断是否有参数，如果没有就定义一个空值，然后赋值在将post请求转化为正常的字符串
     if (request.method == 'post') {
         if (!request.data) {
             request.data = {}
         }
         request.data.check = Base64.encode((new Date().getTime()))
         request.data = QS.stringify(request.data)
     } else {
         if (!request.params) {
             request.params = {}
         }
         request.params.check = Base64.encode((new Date().getTime()))
     }
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







