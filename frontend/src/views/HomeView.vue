<script setup lang="jsx">
// --- 1. ข้อมูลเมนูและหมวดหมู่ (Data) ---
const NAV_LINKS = [
  { name: 'Shop', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Sales', href: '#' },
  { name: 'About', href: '#' },
]

const CATEGORIES = [
  { 
    title: 'เสื้อยืด', 
    desc: 'สัมผัสความนุ่มสบายจากผ้าคอตตอนแท้', 
    imgName: 't-shirt.jpg' 
  },
  { 
    title: 'กางเกง', 
    desc: 'ดีไซน์ทันสมัย ตอบโจทย์ทุกการเคลื่อนไหว', 
    imgName: 'pant.jpg' 
  },
  { 
    title: 'รองเท้า', 
    desc: 'ผสมผสานความคลาสสิกและความทันสมัยในทุกก้าวเดิน', 
    imgName: 'shoes.jpg' 
  },
]

// --- ฟังก์ชันช่วยดึงรูปภาพจาก Assets (แก้ไขปัญหา Path ใน Vite) ---
const getImageUrl = (name) => {
  return new URL(`../assets/imgs/${name}`, import.meta.url).href
}

// --- 2. ส่วนประกอบย่อย (UI Components) ---
const CircularLogo = () => (
  <div class="flex items-center gap-3 group cursor-pointer">
    <div class="w-9 h-9 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      <div class="w-2 h-2 bg-white rounded-full" />
    </div>
    <span class="text-xl font-black tracking-tighter uppercase text-black font-kanit">Lifestyle.co</span>
  </div>
)

const SearchIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CartIcon = ({ count }) => (
  <div class="relative cursor-pointer hover:scale-110 transition">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    <span class="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
      {count}
    </span>
  </div>
)
</script>

<template>
  <div class="min-h-screen font-kanit bg-white selection:bg-black selection:text-white">
    
    <nav class="flex items-center justify-between px-12 py-6 bg-white sticky top-0 z-50 shadow-sm">
      <CircularLogo />
      
      <div class="hidden md:flex items-center gap-10 text-[12px] font-bold uppercase tracking-widest text-zinc-500">
        <a v-for="link in NAV_LINKS" :key="link.name" :href="link.href" class="hover:text-black transition">
          {{ link.name }}
        </a>
      </div>

      <div class="flex items-center gap-6 text-zinc-800">
        <button class="hover:opacity-60 transition"><SearchIcon /></button>
        
        <router-link to="/login" class="text-[11px] font-bold uppercase tracking-widest border border-zinc-200 px-4 py-2 rounded-full hover:bg-black hover:text-white transition">
          Login
        </router-link>

        <CartIcon :count="1" />
      </div>
    </nav>

    <header class="bg-[#0a0a0a] text-white">
      <div class="max-w-7xl mx-auto px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div class="absolute inset-0 opacity-5 pointer-events-none" 
             style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 50px 50px;">
        </div>

        <div class="relative z-10 space-y-8 animate-fade-in">
          <div class="inline-block px-3 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Season Collection 2026
          </div>
          <h1 class="text-6xl font-black leading-[1.1] tracking-tighter">
            ความเรียบง่าย <br />
            <span class="text-zinc-500 italic font-medium">คือคำตอบ.</span>
          </h1>
          <p class="text-zinc-400 text-lg max-w-md leading-relaxed">
            สัมผัสประสบการณ์การแต่งกายที่เน้นความสบายและดีไซน์ที่ยั่งยืน 
            เสื้อผ้าทุกชิ้นถูกออกแบบมาเพื่อให้คุณใช้ชีวิตในทุกวันได้อย่างมั่นใจ
          </p>
          <div class="flex items-center gap-4 pt-4">
            <button class="px-10 py-4 bg-white text-black rounded-sm font-black text-sm uppercase tracking-widest hover:bg-zinc-200 transition active:scale-95">
              ซื้อเลย →
            </button>
            <button class="px-10 py-4 border border-zinc-800 rounded-sm font-black text-sm uppercase tracking-widest hover:border-white transition active:scale-95">
              ประเภทสินค้า
            </button>
          </div>
        </div>

        <div class="relative flex justify-center items-center py-10">
          <div class="absolute w-[95%] h-[110%] bg-zinc-900/40 -rotate-3 rounded-2xl border border-zinc-800"></div>
          <div class="relative z-10 w-full aspect-square flex items-center justify-center group">
            <div class="w-[85%] h-[85%] border border-zinc-800 rounded-xl flex items-center justify-center overflow-hidden bg-zinc-900 shadow-2xl">
               <img 
                 src="../assets/imgs/clothesshop.jpg" 
                 alt="Main Visual" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="max-w-7xl mx-auto px-12 py-24 bg-white">
      <div class="flex items-end justify-between mb-16 border-l-4 border-black pl-6">
        <div>
          <h2 class="text-4xl font-black tracking-tighter uppercase font-kanit">หมวดหมู่สินค้า</h2>
          <p class="text-zinc-400 mt-2 font-medium">คัดสรรสไตล์ที่ตอบโจทย์ไลฟ์สไตล์คุณ</p>
        </div>
        <button class="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black transition border-b border-zinc-200 pb-1 font-kanit">
          ดูทั้งหมด <span>→</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="cat in CATEGORIES" :key="cat.title" class="group cursor-pointer">
          <div class="aspect-[4/5] bg-zinc-50 rounded-xl overflow-hidden mb-6 border border-zinc-100 relative">
            <img 
              :src="getImageUrl(cat.imgName)" 
              :alt="cat.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div class="space-y-2 font-kanit">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-black tracking-tight group-hover:text-zinc-500 transition">{{ cat.title }}</h3>
              <span class="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{{ cat.count }}</span>
            </div>
            <p class="text-xs text-zinc-500 font-medium leading-relaxed max-w-[200px]">{{ cat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-20 border-t border-zinc-50 flex flex-col items-center gap-6">
      <div class="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
        <div class="w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
      </div>
      <p class="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300 font-kanit">© 2026 Lifestyle.co • Minimal apparel</p>
    </footer>

  </div>
</template>

<style scoped>
.font-kanit { font-family: 'Kanit', sans-serif; }
.animate-fade-in { animation: fadeIn 1s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
html { scroll-behavior: smooth; }
</style>