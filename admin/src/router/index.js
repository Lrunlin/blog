import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home'),
  children: [{
    path: '/',
    name: 'index',
    component: () => import('../views/index')
  }, {
    path: '/writer',
    name: 'writer',
    component: () => import('../views/writer')
  }, {
    path: '/finish',
    name: 'finish',
    component: () => import('../views/finish')
  }, {
    path: '/read-article',
    name: ' read-article',
    component: () => import('../views/read-article')
  }, {
    path: '/updata-article',
    name: ' updata-article',
    component: () => import('../views/updata-article')
  }, {
    path: '/message',
    name: ' message',
    component: () => import('../views/message')
  }, {
    path: '/type',
    name: ' type',
    component: () => import('../views/type')
  }, {
    path: '/type-analysis',
    name: 'type-analysis',
    component: () => import('../views/type-analysis')
  }]
}, {
  path: '/logn-in',
  name: 'logn-in',
  component: () => import('../views/logn-in')
}, ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router