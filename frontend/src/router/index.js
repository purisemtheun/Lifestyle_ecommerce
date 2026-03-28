import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 1. แยก Routes Array ออกมาเพื่อให้จัดการง่าย
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // Lazy Loading: โหลดเฉพาะเมื่อผู้ใช้เข้าหน้านี้
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    component: () => import('../views/SalesView.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: () => import('../views/ProductDetailView.vue'),
    props: true // ช่วยให้เข้าถึง id ผ่าน props ในหน้า Detail ได้ง่ายขึ้น
  }
]

// 2. สร้าง Router Instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // เลื่อนขึ้นไปบนสุดอัตโนมัติเมื่อเปลี่ยนหน้า
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router