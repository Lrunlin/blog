import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {
    ElMessage
} from 'element-plus'
import axios from 'axios';
import vueAxios from 'vue-axios';
axios.defaults.baseURL = process.env.NODE_ENV === "production" ?
    'https://blog-api.blogweb.cn' :
    "http://localhost:3000/";
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



createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus, {
        zIndex: 30000
    })
    .use(vueAxios, axios)
    .mount('#app')