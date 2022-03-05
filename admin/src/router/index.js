//导入路由相关的函数
import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'


const routes = [{
    path: '/sign',
    component: () => import('@/page/Sign.vue'),
    meta: {
        title: '登录'
    }
}, {
    path: '/analysis',
    component: () => import('@/page/Analysis/index.vue'),
    meta: {
        title: '数据分析'
    }
}, {
    path: '/',
    component: () => import('@/layout/Home.vue'),
    children: [{
        path: '',
        component: () => import('@/page/Index.vue'),
        meta: {
            title: '首页'
        }
    }, {
        path: '/github',
        component: () => import('@/page/GitHub.vue'),
        meta: {
            title: '仓库信息'
        }
    }, {
        path: '/comment',
        component: () => import('@/page/Comment.vue'),
        meta: {
            title: '评论'
        }
    }, {
        path: '/type',
        component: () => import('@/page/Type.vue'),
        meta: {
            title: '文章类型'
        }
    }, {
        path: '/assets',
        component: () => import('@/page/Assets.vue'),
        meta: {
            title: '静态资源'
        }
    }, {
        path: '/create-api',
        component: () => import('@/page/api/ApiCreate.vue'),
        meta: {
            title: '创建API'
        }
    }, {
        path: '/api',
        component: () => import('@/page/api/Api.vue'),
        meta: {
            title: 'API'
        }
    }, {
        path: '/api/:id',
        component: () => import('@/page/api/ApiUpdate.vue'),
        meta: {
            title: '指定API查询',
        }
    }, {
        path: '/create-article',
        component: () => import('@/page/article/CreateArticle.vue'),
        meta: {
            title: '发布文章'
        }
    }, {
        path: '/article',
        component: () => import('@/page/article/Article.vue'),
        meta: {
            title: '文章管理'
        }
    }, {
        path: '/article/:id',
        component: () => import('@/page/article/UpdateArticle.vue'),
        meta: {
            title: '文章更新'
        }
    }, {
        path: '/tube',
        component: () => import('@/page/article/Tube.vue'),
        meta: {
            title: '文章导出导入'
        }
    }, {
        path: '/password',
        component: () => import('@/page/UpdatePassword.vue'),
        meta: {
            title: '修改密码'
        }
    }]
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;