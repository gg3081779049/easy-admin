import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'
import Layout from '@/layout'

// 路由模式
const historyCreatorMap = {
    hash: createWebHashHistory,
    history: createWebHistory,
    memory: createMemoryHistory,
}

const router = createRouter({
    history: historyCreatorMap['history'](),
    routes: [{
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
    }, {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/register/index.vue'),
    }, {
        path: '/applylicense',
        name: 'Applylicense',
        component: (resolve) => require(['@/views/applylicense/index.vue'], resolve),
    }, {
        path: '/401',
        name: '401',
        component: () => import('@/views/401/index.vue'),
    }, {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
    }, {
        path: '',
        name: 'Layout',
        component: Layout,
        redirect: 'home',
        children: [{
            path: 'home',
            name: 'Home',
            component: () => import('@/views/modules/home/index.vue'),
            meta: { title: 'home', icon: 'home', noCache: false, hidden: false },
        }]
    }]
})

// 捕捉连续点击多次路由报错
let push = router.push
router.push = function (to) {
    return push.call(this, to).catch(err => err)
}

export default router