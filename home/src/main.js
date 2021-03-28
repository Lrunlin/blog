import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL =
    (process.env.NODE_ENV == "development") ?
    "http://localhost:3000/" :
    "https://blog-api.blogweb.cn"


import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(ElementPlus)
    .mount('#app')