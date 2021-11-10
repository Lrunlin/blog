import {
    createStore
} from 'vuex';
import axios from 'axios';
import article from './article';
import type from './type';


const store = createStore({
    state: {
        //资源接口地址
        assetsapi: "http://localhost:3456",
        html: '', //富文本编辑器的值
        isLoad: false, //遮罩层显示
    },
    mutations: {
        setHtml(state, html) {
            state.html = html
        },
        switchLoad(state, value) {
            state.isLoad = value
        },
    },
    actions: {

    },
    modules: {
        article,
        type
    }
})
export default store;