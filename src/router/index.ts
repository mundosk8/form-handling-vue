import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/edit'
    },
    {
      path: '/edit',
      name: 'edit',
      component: () => import('../views/EditView.vue')
    },
    {
      path: '/render',
      name: 'render',
      component: () => import('../views/RenderView.vue')
    }
  ]
})

export default router
