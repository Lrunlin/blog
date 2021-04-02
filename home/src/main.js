import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
    Base64
} from "js-base64";

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