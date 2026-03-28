<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

// --- 1. CONFIG ---
const route = useRoute()
const router = useRouter()
const API_URL = `http://localhost:3001/api/products/${route.params.id}`

// --- 2. STATES ---
const product = ref(null)
const isLoading = ref(true)
const selectedSize = ref('') // 🟢 เพิ่ม State สำหรับเก็บไซส์ที่เลือก
const sizes = ['S', 'M', 'L', 'XL']

// --- 3. METHODS ---
const fetchProductDetail = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(API_URL)
    product.value = response.data.data
  } catch (error) {
    console.error("Fetch Detail Error:", error)
    // ถ้าไม่เจอสินค้า ให้เด้งกลับหน้า sales หรือโชว์ Error
    if (error.response?.status === 404) {
      alert("ไม่พบข้อมูลสินค้านี้")
      router.push('/sales')
    }
  } finally {
    isLoading.value = false
  }
}

const handleAddToCart = () => {
  if (!selectedSize.value) {
    alert('กรุณาเลือกไซส์ก่อนเพิ่มลงตะกร้าครับ')
    return
  }
  // TODO: เชื่อมต่อกับระบบตะกร้าสินค้าในอนาคต
  alert(`เพิ่ม ${product.value.name} (Size: ${selectedSize.value}) ลงตะกร้าแล้ว!`)
}

// --- 4. HELPERS ---
const getImageUrl = (name) => `/products/${name}`
const formatThaiBaht = (val) => 
  new Intl.NumberFormat('th-TH', { 
    style: 'currency', 
    currency: 'THB', 
    minimumFractionDigits: 0 
  }).format(val)

onMounted(fetchProductDetail)
</script>

<template>
  <div class="min-h-screen bg-white font-kanit">
    <div v-if="isLoading" class="flex justify-center py-32">
      <div class="w-6 h-6 border-2 border-zinc-100 border-t-black rounded-full animate-spin"></div>
    </div>

    <div v-else-if="product" class="max-w-4xl mx-auto px-6 py-10 lg:py-14">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        <div class="md:col-span-5 aspect-[3/4] bg-zinc-50 rounded-xl overflow-hidden border border-zinc-50">
          <img :src="getImageUrl(product.img_name)" class="w-full h-full object-cover" />
        </div>

        <div class="md:col-span-7 flex flex-col space-y-6 pt-2">
          <div class="space-y-2">
            <p class="text-[8px] font-bold text-zinc-300 uppercase tracking-[0.2em]">{{ product.category }}</p>
            <h1 class="text-2xl font-semibold text-black tracking-tight">{{ product.name }}</h1>
            <p class="text-lg font-medium text-zinc-800">{{ formatThaiBaht(product.price) }}</p>
          </div>

          <div class="h-[1px] bg-zinc-50 w-12"></div> <div class="space-y-3">
            <p class="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Size</p>
            <div class="flex gap-2">
              <button 
                v-for="size in sizes" :key="size"
                @click="selectedSize = size"
                class="w-10 h-10 rounded-lg border text-[10px] font-bold transition-all"
                :class="selectedSize === size 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-zinc-400 border-zinc-100 hover:border-zinc-200'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="pt-4 space-y-4">
            <button 
              @click="handleAddToCart"
              class="w-full py-3.5 bg-black text-white rounded-lg font-bold text-[10px] uppercase tracking-[0.15em] hover:bg-zinc-800 active:scale-95 transition-all"
            >
              Add to Cart
            </button>
            
            <router-link 
              to="/sales" 
              class="flex items-center justify-center gap-2 text-zinc-300 text-[9px] font-bold uppercase tracking-widest hover:text-black transition-colors"
            >
              ← Back to Shop
            </router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.font-kanit { font-family: 'Kanit', sans-serif; }
</style>