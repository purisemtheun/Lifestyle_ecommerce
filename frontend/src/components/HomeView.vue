<script setup lang="jsx">
// --- 1. Data Configuration ---
const NAV_LINKS = [
  { name: 'Shop', href: '#' },
  { name: 'Categories', href: '#' },
  { name: 'Men', href: '#' },
  { name: 'Women', href: '#' },
  { name: 'Sales', href: '#', highlight: true },
  { name: 'About', href: '#' },
]

// --- 2. Functional Components (JSX) ---
const Logo = () => (
  <div class="flex items-center gap-2 group cursor-pointer">
    <div class="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
      <div class="w-2 h-2 bg-white rounded-full" />
    </div>
    <span class="text-xl font-black tracking-tighter uppercase">Lifestyle.co</span>
  </div>
)

const SearchIcon = () => (
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const CartIcon = ({ count }) => (
  <div class="relative cursor-pointer">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
    {count > 0 && (
      <span class="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
        {count}
      </span>
    )}
  </div>
)
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
    
    <header class="flex items-center justify-between px-12 py-8 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      <Logo />

      <nav class="hidden md:flex items-center gap-8">
        <a 
          v-for="link in NAV_LINKS" 
          :key="link.name"
          :href="link.href"
          :class="[
            'text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-black',
            link.highlight ? 'text-red-500' : 'text-zinc-400'
          ]"
        >
          {{ link.name }}
        </a>
      </nav>

      <div class="flex items-center gap-6">
        <button class="hover:opacity-50 transition"><SearchIcon /></button>
        <CartIcon :count="0" />
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-12 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      
      <section class="space-y-12 animate-fade-in">
        <div class="space-y-6">
          <h1 class="text-7xl font-black leading-[1.1] tracking-tighter">
            ความเรียบง่าย <br />
            <span class="text-zinc-300 italic">คือคำตอบ.</span>
          </h1>
          <p class="text-zinc-500 text-xl max-w-sm leading-relaxed font-medium">
            "เพราะการใช้ชีวิตที่ดี เริ่มต้นจากการเลือกสิ่งที่พอดีกับตัวคุณ" เสื้อผ้าที่ออกแบบมาเพื่อความคล่องตัวในทุกวัน
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button class="primary-btn">ซื้อเลย</button>
          <button class="secondary-btn">ประเภทสินค้า</button>
        </div>

        <div class="pt-12 border-t border-zinc-100">
          <div class="text-5xl font-black tracking-tighter italic">850+</div>
          <div class="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2">จำนวนสินค้าทั้งหมด</div>
        </div>
      </section>

      <section class="relative">
        <div class="absolute inset-0 bg-zinc-50 -rotate-2 rounded-[2.5rem] border border-zinc-100" />
        
        <div class="relative z-10 w-full aspect-[4/5] bg-zinc-100 rounded-[2rem] border-2 border-dashed border-zinc-200 flex items-center justify-center group overflow-hidden">
          
          <div class="text-center space-y-2 opacity-30 group-hover:opacity-100 transition-opacity">
            <div class="text-4xl">⊕</div>
            <p class="text-[10px] font-bold uppercase tracking-widest">Drop your lifestyle image here</p>
          </div>

          <div class="absolute bottom-8 left-8 bg-white/80 backdrop-blur p-5 rounded-2xl shadow-xl border border-white">
            <p class="text-[10px] font-black uppercase tracking-widest text-zinc-400">Concept</p>
            <p class="text-sm font-bold">Minimalist & Comfort</p>
          </div>
        </div>

        <div class="absolute -top-6 -right-6 w-24 h-24 border border-zinc-200 rounded-full animate-spin-slow pointer-events-none" />
      </section>
    </main>

    <footer class="flex flex-col items-center py-16">
      <div class="w-px h-16 bg-zinc-200" />
      <p class="mt-6 text-[9px] font-bold uppercase tracking-[0.6em] text-zinc-300">EST. 2026 • LIFESTYLE CO.</p>
    </footer>

  </div>
</template>

<style scoped>
/* --- Custom Buttons --- */
.primary-btn {
  @apply px-12 py-5 bg-black text-white rounded-full font-bold text-[13px] tracking-widest
         hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-zinc-200;
}

.secondary-btn {
  @apply px-12 py-5 border border-zinc-200 rounded-full font-bold text-[13px] tracking-widest
         hover:border-black transition-all active:scale-95;
}

/* --- Animations --- */
.animate-fade-in {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-spin-slow {
  animation: spin 12s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>