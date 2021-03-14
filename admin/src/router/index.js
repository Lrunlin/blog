import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

const routes = [{
  path: '/',
  name: 'index',
  component: () => import('../views/index.vue'),
  children: [{
      path: '',
      name: 'write',
      component: () => import('@/views/editorHtml/acticle')
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('@/views/editorHtml/finish')
    }, {
      path: '/type',
      name: 'type',
      component: () => import('@/views/type/type')
    }, {
      path: '/read-article',
      name: 'read-article',
      component: () => import('@/views/article/read-article')
    }, {
      path: '/update-article',
      name: 'update-article',
      component: () => import('@/views/article/update-article')
    },
  ]
}, {
  path: '/previewPage',
  name: 'previewPage',
  component: () => import('@/views/editorHtml/previewPage.vue')
}, ]
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})
export default router