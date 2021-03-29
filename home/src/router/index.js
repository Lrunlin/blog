import {
  createRouter,
  createWebHistory,
  createWebHashHistory

} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  children: [{
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '首页'
    }
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue'),
    meta: {
      title: '搜索文章'
    }
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue'),
    meta: {
      title: '关于作者'
    }
  }, {
    path: '/resume',
    name: 'resume',
    component: () => import('../views/resume.vue'),
    meta: {
      title: '简历'
    }
  }, ]
}, ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),

  routes
})

export default router