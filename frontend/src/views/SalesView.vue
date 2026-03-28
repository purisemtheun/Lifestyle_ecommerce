<script setup lang="jsx">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

// --- 1. CONFIG ---
const API_BASE_URL = 'http://localhost:3001/api/products'

// --- 2. STATES ---
const products = ref([])
const isLoading = ref(false)
const selectedCategory = ref('all')
const sortBy = ref('latest')
const searchQuery = ref('') // 🟢 เพิ่ม State สำหรับการค้นหา

const categories = ref([
  { id: 'all', name: 'สินค้าทั้งหมด' },
  { id: 'เสื้อยืด', name: 'เสื้อยืด' },
  { id: 'กางเกง', name: 'กางเกง' },
  { id: 'รองเท้า', name: 'รองเท้า' },
])

// --- 3. METHODS ---

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const params = {
      category: selectedCategory.value,
      sort: sortBy.value,
      search: searchQuery.value // 🟢 ส่งคำค้นหาไปที่ Backend
    }
    
    const response = await axios.get(API_BASE_URL, { params })
    products.value = response.data.data
  } catch (error) {
    console.error("API Error:", error.message)
  } finally {
    isLoading.value = false
  }
}

// 🟢 ทำการค้นหาเมื่อหยุดพิมพ์ (Debounce แบบง่าย)
let timeout = null
const handleSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    fetchProducts()
  }, 500) // รอ 0.5 วินาทีหลังจากหยุดพิมพ์ค่อยดึงข้อมูล
}

const handleCategoryChange = (categoryId) => {
  selectedCategory.value = categoryId
  fetchProducts()
}

const handleSortChange = (event) => {
  sortBy.value = event.target.value
  fetchProducts()
}

onMounted(() => {
  fetchProducts()
})

// --- 4. HELPERS ---
const getImageUrl = (name) => {
  if (!name) return 'https://placehold.co/600x600?text=No+Image'
  return `/products/${name}`
}

const formatThaiBaht = (value) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0
  }).format(value)
}

const StarIcon = () => (
  <svg class="w-3 h-3 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)
</script>

<template>
  <div class="min-h-screen font-kanit bg-white flex flex-col">
    <div class="max-w-[1600px] mx-auto w-full px-12 py-12 flex flex-col lg:flex-row gap-12">
      
      <aside class="w-full lg:w-64 flex-shrink-0 space-y-12">
        <div class="space-y-4">
          <h3 class="text-sm font-semibold uppercase tracking-widest text-black">ค้นหาสินค้า</h3>
          <div class="relative">
            <input 
              v-model="searchQuery"
              @input="handleSearch"
              type="text" 
              placeholder="พิมพ์ชื่อสินค้า..."
              class="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl text-sm focus:outline-none focus:border-black transition-all"
            />
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-sm font-semibold uppercase tracking-widest text-black">หมวดหมู่</h3>
          <ul class="space-y-2">
            <li v-for="cat in categories" :key="cat.id" 
                @click="handleCategoryChange(cat.id)"
                class="flex items-center justify-between group cursor-pointer p-2 rounded-lg transition-all"
                :class="selectedCategory === cat.id ? 'bg-zinc-100 shadow-sm' : 'hover:bg-zinc-50'">
              <span class="text-sm font-medium transition-colors" 
                    :class="selectedCategory === cat.id ? 'text-black' : 'text-zinc-500 group-hover:text-black'">
                {{ cat.name }}
              </span>
              <div v-if="selectedCategory === cat.id" class="w-1.5 h-1.5 bg-black rounded-full"></div>
            </li>
          </ul>
        </div>
      </aside>

      <main class="flex-1 space-y-8">
        <div class="flex items-center justify-between border-b border-zinc-100 pb-6">
          <div class="text-sm font-normal text-zinc-500">
            พบสินค้า <span class="font-semibold text-black">{{ products.length }}</span> รายการ
          </div>
          
          <div class="flex items-center gap-4">
            <span class="text-xs font-medium text-zinc-400 uppercase tracking-widest">เรียงโดย:</span>
            <select @change="handleSortChange" 
                    class="text-xs font-semibold uppercase tracking-widest outline-none bg-transparent cursor-pointer border-b-2 border-transparent focus:border-black pb-1">
              <option value="latest">สินค้าล่าสุด</option>
              <option value="price_asc">ราคา: ต่ำไปสูง</option>
              <option value="price_desc">ราคา: สูงไปต่ำ</option>
            </select>
          </div>
        </div>

        <div v-if="isLoading" class="py-20 flex flex-col items-center gap-4">
          <div class="w-8 h-8 border-4 border-zinc-200 border-t-black rounded-full animate-spin"></div>
          <p class="text-zinc-400 text-xs font-medium uppercase tracking-widest">กำลังโหลด...</p>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <router-link 
            v-for="product in products" 
            :key="product.id" 
            :to="`/product/${product.id}`"
            class="group block"
          >
            <div class="aspect-[3/4] bg-zinc-50 rounded-2xl overflow-hidden relative mb-4 border border-zinc-100">
              <img :src="getImageUrl(product.img_name)" 
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <span v-if="product.is_new" class="px-2 py-1 bg-black text-white text-[8px] font-bold uppercase rounded">NEW</span>
                <span v-if="product.is_bestseller" class="px-2 py-1 bg-orange-600 text-white text-[8px] font-bold uppercase rounded">BEST</span>
              </div>
            </div>

            <div class="space-y-1.5 px-1">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                  <StarIcon /><span class="text-[10px] font-medium text-zinc-500">4.9</span>
                </div>
              </div>
              <h4 class="text-sm font-normal text-zinc-800 group-hover:text-black transition-colors">{{ product.name }}</h4>
              <div class="text-base font-semibold text-black mt-1">{{ formatThaiBaht(product.price) }}</div>
            </div>
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;700;900&display=swap');

.font-kanit { font-family: 'Kanit', sans-serif; }

/* Custom Scrollbar สำหรับความสวยงาม */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #18181b;
}
</style>