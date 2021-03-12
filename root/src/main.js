import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL =
    (process.env.NODE_ENV == "development") ?
    "http://localhost:3000/" :
    "https://blogapi.liurl.xyz"

// elemetnPlus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 公共css没有scoped
import '@/views/common.css'
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







