import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import '@/utils/axios.js';


createApp(App)
    .use(router)
    .use(store)
    .use(ElementPlus, {
        zIndex: 9999999,
        locale: zhCn
    })
    .mount('#app')