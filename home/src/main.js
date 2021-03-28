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

import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL =
    (process.env.NODE_ENV == "development") ?
    "http://localhost:3000/" :
    "https://blog-api.blogweb.cn"



axios.interceptors.request.use((request) => {
    // 判断上传方式，在判断是否有参数，如果没有就定义一个空值，然后赋值在将post请求转化为正常的字符串
    if (request.method == 'post') {
        if (!request.data) {
            request.data = {}
        }
        request.data.check = Base64.encode((new Date().getTime())) //拦截器，添加一个验证信息
        request.data = QS.stringify(request.data)
    } else {
        if (!request.query) {
            request.query = {}
        }
        request.data.check = Base64.encode((new Date().getTime())) //拦截器，添加一个验证信息
    }
    return request;
}, function (error) {
    return Promise.reject(error);
});






import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';



router.beforeEach((to, from, next) => {
    //  路由发生变化修改页面title 
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})


createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(ElementPlus)
    .mount('#app')