<script setup lang="jsx">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // --- ส่วนนี้ไว้ใส่ Logic เชื่อมต่อ API Backend ในอนาคต ---
  console.log('Logging in with:', email.value, password.value)
  // สมมติว่าผ่านแล้วให้กลับไปหน้าแรก
  router.push('/')
}

const Logo = () => (
  <div class="flex flex-col items-center gap-4 mb-10">
    <div class="w-12 h-12 bg-black rounded-full flex items-center justify-center">
      <div class="w-3 h-3 bg-white rounded-full" />
    </div>
    <h1 class="text-2xl font-black uppercase tracking-tighter">Lifestyle.co</h1>
  </div>
)
</script>

<template>
  <div class="min-h-screen bg-white font-kanit flex items-center justify-center px-6">
    <div class="max-w-[400px] w-full border border-zinc-100 p-10 rounded-3xl shadow-sm">
      <Logo />
      
      <h2 class="text-xl font-bold mb-2">ยินดีต้อนรับเข้าสู่ระบบ</h2>
      <p class="text-zinc-400 text-sm mb-8">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</p>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-widest text-zinc-500">อีเมล</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="example@mail.com"
            class="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:border-black outline-none transition-all text-sm"
            required
          />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold uppercase tracking-widest text-zinc-500">รหัสผ่าน</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="••••••••"
            class="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:border-black outline-none transition-all text-sm"
            required
          />
        </div>

        <button type="submit" class="w-full py-5 bg-black text-white rounded-xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all active:scale-[0.98]">
          เข้าสู่ระบบ
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-zinc-400 text-xs">
          ยังไม่มีบัญชีใช่ไหม? 
          <router-link to="/register" class="text-black font-bold hover:underline ml-1">สมัครสมาชิก</router-link>
        </p>
      </div>
    </div>
  </div>
</template>