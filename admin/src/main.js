import {
    createApp
} from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '@/utils/axios.js';


createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, {
        zIndex: 9999999
    })
    .mount('#app')
    