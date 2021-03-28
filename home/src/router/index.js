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
    component: () => import('../views/index.vue')
  }, {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue')
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  }]
}, ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),

  routes
})

export default router