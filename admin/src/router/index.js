import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home'),
   children:[
     {
       //  path: '/writer',
       path:'',
       name: 'writer',
       component: () => import('../views/writer')
     }
   ]
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