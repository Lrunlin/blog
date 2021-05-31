import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    assetsapi: '资源上传地址',
    html: '',
    
  },
  mutations: {
    setHtml(state, html) {
      state.html = html
    }
  },
  actions: {},
  modules: {}
})