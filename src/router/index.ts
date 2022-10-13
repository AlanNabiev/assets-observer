import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/liked',
    name: 'liked',
    component: () => import('../views/LikedView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
