import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dicom-image',
      name: 'dicom',
      component: () => import('../views/DicomImageView.vue')
    },
    {
      path: '/web-image',
      name: 'web',
      component: () => import('../views/WebImageView.vue')
    }
  ]
})

export default router
