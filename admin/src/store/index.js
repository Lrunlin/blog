import {
    createStore
} from 'vuex';


const store = createStore({
    state: {
        /** 资源接口*/
        assets: process.env.NODE_ENV === "production" ? "https://assets.blogweb.cn" : "http://localhost:3456",
        /** token方便在模板中使用*/
        token: localStorage.token,
        /** 管理员登录状态*/
        isSign: false
    },
    mutations: {},
    actions: {

    },
    modules: {}
})
export default store;