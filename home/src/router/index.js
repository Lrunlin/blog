import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  children: [{
    path: '',
    name: 'index',
    component: () => import('../views/index.vue')
  }, ]
}, ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router