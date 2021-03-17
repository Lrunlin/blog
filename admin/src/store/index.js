import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    html: '', //富文本的HTML
    api: (process.env.NODE_ENV == "development") ?
      "http://localhost:3000" : "https://blog.blogweb.cn", //
    assetsapi: (process.env.NODE_ENV == "development") ?
      "http://localhost:3456" : "https://assets.blogweb.cn", //资源上传请求接口
    assets: (process.env.NODE_ENV == "development") ?
      "http://127.0.0.1:5500/assets/": "https://blogweb.cn/assets/", //文章图片地址
    // thisType: ''
  },
  mutations: {
    setHtml(state, html) {
      state.html = html
    },
    // setType(state, type) {
    //   state.thisType = type;
    // }
  },
  actions: {},
  modules: {}
})
