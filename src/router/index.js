import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../Auth.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/LoginComponent.vue')
    },
    {
        path: '/',
        name: 'welcome',
        component: () => import('../components/DashboardComponent.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../components/RegisterComponent.vue')
    }
]

console.log(process.env)

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.name ? `${to.name} - Autoscout` : 'Autoscout'
    next()
})

export default router
