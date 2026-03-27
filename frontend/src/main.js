import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css' // ลบภาษาไทยออกก่อนเพื่อความชัวร์ครับ

createApp(App).use(router).mount('#app')