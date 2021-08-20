import {
  createStore
} from 'vuex'
import axios from 'axios';
export default createStore({
  state: {
    assetsapi: process.env.NODE_ENV === "production" ?
      'https://assets.blogweb.cn' : "http://localhost:3456",
    html: '',
  },
  mutations: {
    setHtml(state, html) {
      state.html = html
    },
  },
  actions: {

  },
  modules: {}
});