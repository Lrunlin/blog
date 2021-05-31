import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import axios from 'axios';
import vueAxios from 'vue-axios';
axios.defaults.baseURL = "http://localhost:3000/"


createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .use(vueAxios, axios)
    .mount('#app')