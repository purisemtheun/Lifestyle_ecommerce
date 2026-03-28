<script setup lang="jsx">
import { useRoute } from 'vue-router'
const route = useRoute()

// --- 1. ข้อมูลเมนู ---
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/sales' },
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'About', href: '#' },
]

// --- 2. ส่วนประกอบย่อย (UI Components) ---
const CircularLogo = () => (
  <router-link to="/" class="flex items-center gap-3 group cursor-pointer">
    <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
      <div class="w-1.5 h-1.5 bg-white rounded-full" />
    </div>
    <span class="text-xl font-medium tracking-tighter text-black font-kanit">Lifestyle.co</span>
  </router-link>
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
    <span class="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
      {count}
    </span>
  </div>
)
</script>

<template>
  <div class="min-h-screen font-kanit">
    <nav class="flex items-center justify-between px-12 py-6 bg-white sticky top-0 z-[100] border-b border-zinc-50">
      <CircularLogo />
      
      <div class="hidden md:flex items-center gap-10 text-[12px] font-medium uppercase tracking-widest text-zinc-400">
        <router-link 
          v-for="link in NAV_LINKS" 
          :key="link.name" 
          :to="link.href" 
          class="relative py-2 transition-colors hover:text-black"
          :class="{ 'text-black': route.path === link.href }"
        >
          {{ link.name }}
          <div 
            v-if="route.path === link.href" 
            class="absolute -bottom-1 left-0 w-full h-[1.5px] bg-black"
          ></div>
        </router-link>
      </div>

      <div class="flex items-center gap-6 text-zinc-800">
        <button class="hover:opacity-60 transition"><SearchIcon /></button>
        <router-link to="/login" class="text-[11px] font-medium uppercase tracking-widest border border-zinc-200 px-5 py-2 rounded-full hover:bg-black hover:text-white transition">
          Login
        </router-link>
        <CartIcon :count="1" />
      </div>
    </nav>

    <router-view />

    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
.font-kanit { font-family: 'Kanit', sans-serif; }
</style>