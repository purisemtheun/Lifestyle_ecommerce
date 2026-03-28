<script setup lang="jsx">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleRegister = () => {
  // --- ส่วนนี้ไว้ใส่ Logic สมัครสมาชิกส่งข้อมูลไป Backend ---
  console.log('Registering user:', form.value)
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-white font-kanit flex items-center justify-center px-6 py-20">
    <div class="max-w-[400px] w-full">
      
      <div class="mb-10">
        <router-link to="/" class="text-zinc-300 hover:text-black transition flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <span>←</span> กลับหน้าหลัก
        </router-link>
      </div>

      <h2 class="text-4xl font-black tracking-tighter mb-2 uppercase">สร้างบัญชี</h2>
      <p class="text-zinc-400 mb-10">สร้างบัญชีใหม่เพื่อเริ่มต้นการใช้งาน</p>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">ชื่อ-นามสกุล</label>
          <input v-model="form.name" type="text" class="input-field" placeholder="Full Name" required />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">อีเมล</label>
          <input v-model="form.email" type="email" class="input-field" placeholder="Email Address" required />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">รหัสผ่าน</label>
          <input v-model="form.password" type="password" class="input-field" placeholder="••••••••" required />
        </div>

        <div class="pt-4">
          <button type="submit" class="w-full py-5 bg-black text-white rounded-full font-bold text-sm uppercase tracking-[0.2em] hover:shadow-xl transition-all">
            สมัครสมาชิก
          </button>
        </div>
      </form>

      <p class="mt-8 text-center text-zinc-400 text-xs font-medium">
        มีบัญชีอยู่แล้ว? <router-link to="/login" class="text-black font-bold">เข้าสู่ระบบ</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-0 py-3 bg-transparent border-b-2 border-zinc-100 focus:border-black outline-none transition-all text-sm font-medium placeholder:text-zinc-200;
}
</style>