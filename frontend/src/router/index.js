import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/product', component: ProductView },
  { path: '/cart', component: CartView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router