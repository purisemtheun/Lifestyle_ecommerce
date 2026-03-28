<script setup lang="jsx">
import { ref, onMounted } from 'vue'
import axios from 'axios' // อย่าลืม npm install axios ที่ฝั่ง frontend นะครับ

// --- 1. ข้อมูลหมวดหมู่ (เดี๋ยวอนาคตเราค่อยดึงจาก DB ได้ ตอนนี้ทำ Mock ไว้ก่อน) ---
const categories = [
  { id: 'all', name: 'สินค้าทั้งหมด', count: 120 },
  { id: 't-shirts', name: 'เสื้อยืด', count: 48 },
  { id: 'pants', name: 'กางเกง', count: 86 },
  { id: 'shoes', name: 'รองเท้า', count: 32 },
  { id: 'accessories', name: 'เครื่องประดับ', count: 64 },
]

// --- 2. ตัวแปรเก็บสินค้าที่ดึงมาจาก Backend ---
const products = ref([])

// --- 3. ฟังก์ชันดึงข้อมูลจาก API (Backend ของเรา) ---
const fetchProducts = async () => {
  try {
    // ยิงไปที่พอร์ต 3001 ตามที่เราตั้งไว้ใน Node.js
    const response = await axios.get('http://localhost:3001/api/products')
    
    // นำข้อมูลที่ Backend ส่งมา ยัดใส่ตัวแปร products
    products.value = response.data.data
  } catch (error) {
    console.error("ดึงข้อมูลไม่สำเร็จ โปรดเช็คว่าเปิด Backend หรือยัง:", error)
  }
}

// สั่งให้ดึงข้อมูลทันทีที่เปิดหน้านี้
onMounted(() => {
  fetchProducts()
})

// --- 4. ฟังก์ชันช่วยเหลือต่างๆ (Helpers) ---

// แปลง Path รูปภาพให้ Vite รู้จัก (อิงจากชื่อไฟล์ใน DB: img_name)
const getImageUrl = (name) => {
  if (!name) return '' // กันพังถ้าใน DB ไม่มีชื่อรูป
  return new URL(`../assets/imgs/${name}`, import.meta.url).href
}

// แปลงตัวเลขเป็นเงินบาท (฿)
const formatThaiBaht = (value) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
  }).format(value)
}

// --- 5. UI Components ย่อย ---
const StarIcon = () => (
  <svg class="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)
</script>

<template>
  <div class="min-h-screen font-kanit bg-white flex flex-col">
    
    <nav class="flex items-center justify-between px-12 py-6 border-b border-zinc-100">
      <router-link to="/" class="text-xl font-black uppercase tracking-tighter text-black">Lifestyle.co</router-link>
      <div class="text-xs font-bold uppercase tracking-widest text-zinc-500">Shop / All Products</div>
    </nav>

    <div class="max-w-[1600px] mx-auto w-full px-12 py-12 flex gap-12">
      
      <aside class="w-64 flex-shrink-0 space-y-12">
        <div class="space-y-6">
          <h3 class="text-sm font-black uppercase tracking-widest">หมวดหมู่สินค้า</h3>
          <ul class="space-y-4">
            <li v-for="cat in categories" :key="cat.name" class="flex items-center justify-between group cursor-pointer">
              <span class="text-sm font-bold text-zinc-400 group-hover:text-black transition" 
                    :class="{'text-black bg-zinc-100 px-3 py-1 rounded-md': cat.id === 'all'}">
                {{ cat.name }}
              </span>
              <span class="text-[10px] font-bold text-zinc-300">({{ cat.count }})</span>
            </li>
          </ul>
        </div>

        <div class="space-y-6">
          <h3 class="text-sm font-black uppercase tracking-widest">ตัวกรองด่วน</h3>
          <div class="flex flex-wrap gap-2">
            <button class="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-black transition">สินค้าใหม่</button>
            <button class="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:border-black transition">ยอดนิยม</button>
          </div>
        </div>
      </aside>

      <main class="flex-1 space-y-8">
        
        <div class="flex items-center justify-between border-b border-zinc-100 pb-6">
          <div class="text-sm font-bold text-zinc-400">
            แสดงสินค้าทั้งหมด <span class="text-black">{{ products.length }} รายการ</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-xs font-bold text-zinc-400 uppercase tracking-widest">เรียงโดย:</span>
            <select class="text-xs font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer">
              <option>สินค้าล่าสุด</option>
              <option>ราคา: ต่ำไปสูง</option>
              <option>ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>

        <div v-if="products.length === 0" class="py-20 text-center text-zinc-400 text-sm font-bold animate-pulse">
          กำลังโหลดสินค้าจากฐานข้อมูล...
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <div v-for="product in products" :key="product.id" class="group cursor-pointer">
            
            <div class="aspect-square bg-zinc-50 rounded-2xl overflow-hidden relative mb-4 border border-zinc-100">
              <img :src="getImageUrl(product.img_name)" :alt="product.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              
              <div class="absolute top-3 left-3 flex flex-col gap-2">
                <span v-if="product.is_new" class="px-2 py-1 bg-green-500 text-white text-[8px] font-black uppercase rounded-sm tracking-widest shadow-lg">NEW</span>
                <span v-if="product.is_bestseller" class="px-2 py-1 bg-orange-600 text-white text-[8px] font-black uppercase rounded-sm tracking-widest shadow-lg">BESTSELLER</span>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                  <StarIcon />
                  <span class="text-[10px] font-bold">4.9</span>
                </div>
              </div>
              
              <h4 class="text-sm font-black tracking-tight leading-tight group-hover:underline underline-offset-4">{{ product.name }}</h4>
              
              <div class="flex items-center gap-3">
                <span class="text-sm font-black">{{ formatThaiBaht(product.price) }}</span>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
.font-kanit { font-family: 'Kanit', sans-serif; }
</style>