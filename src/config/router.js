import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home.vue'
import AdminPages from '../components/admin/AdminPages.vue'
import ArticlesByCategory from '../components/article/ArticlesByCategory.vue'
import ArticlesById from '../components/article/ArticlesById.vue'
import Auth from '../components/authentication/Auth.vue'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'ArticlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'ArticlesById',
    path: '/articles/:id',
    component: ArticlesById
}, {
    name: 'Auth',  /* componente da autenticação */
    path: '/auth',
    component: Auth
}
]

 const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {  /* com esse validação o usuario n pode acessar o Admin */
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record=> record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' }) 
    } else {
        next()
    }
})

export default router
 