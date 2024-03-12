import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DicomImageView from '../views/DicomImageView.vue'
import WebImageView from '../views/WebImageView.vue'

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
      // component: () => import('../views/DicomImageView.vue')
      component: DicomImageView
    },
    {
      path: '/web-image',
      name: 'web',
      // component: () => import('../views/WebImageView.vue')
      component: WebImageView
    }
  ]
})

export default router
