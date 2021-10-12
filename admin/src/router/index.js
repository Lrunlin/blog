//导入路由相关的函数
import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'


const routes = [{
    path: '/sign',
    component: () => import('@/view/admin/sign.vue'),
    meta: {
        title: '登录'
    }
}, {
    path: '/',
    component: () => import('@/view/Home.vue'),
    children: [{
        path: '',
        component: () => import('@/view/article/Article.vue'),
        meta: {
            title: "首页"
        }
    }, {
        path: '/article',
        component: () => import('@/view/article/Article.vue'),
        meta: {
            title: "查询文章"
        }
    }, {
        path: '/updata-article',
        component: () => import('@/view/article/UpdataArticle.vue'),
        meta: {
            title: "修改文章 "
        }
    }, {
        path: '/write',
        component: () => import('@/view/article/CreateArticle.vue'),
        meta: {
            title: "写文章"
        }
    }, {
        path: '/option',
        component: () => import('@/view/article/Option.vue'),
        meta: {
            title: "文章配置"
        }
    }, {
        path: '/type',
        component: () => import('@/view/type/Index.vue'),
        meta: {
            title: "文章类型处理"
        }
    }, {
        path: '/message',
        component: () => import('@/view/message/Index.vue'),
        meta: {
            title: "留言处理"
        }
    }, {
        path: '/os/data',
        component: () => import('@/view/os/Data.vue'),
        meta: {
            title: "服务器信息"
        }
    }, {
        path: '/rss',
        component: () => import('@/view/rss/Index.vue'),
        meta: {
            title: "订阅查询"
        }
    }, {
        path: '/updata-admin',
        component: () => import('@/view/admin/UpdataAdmin.vue'),
        meta: {
            title: "密码修改"
        }
    }, {
        path: '/log',
        component: () => import('@/view/log/Index.vue'),
        meta: {
            title: "日志"
        }
    }, {
        path: '/assets',
        component: () => import('@/view/assets/Index.vue'),
        meta: {
            title: "静态文件察看"
        }
    }]
}]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;