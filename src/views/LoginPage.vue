<!-- src/views/LoginPage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = () => {
  if (auth.login({ email: email.value, password: password.value })) {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-4xl flex items-center justify-center">
    <form class="bg-white p-6 rounded shadow-md w-80" @submit.prevent="handleLogin">
      <h1 class="text-lg font-bold mb-4">Login</h1>
      <div v-if="auth.error" class="mb-2 text-red-600 text-sm">{{ auth.error }}</div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">Email/Username</label>
        <input v-model="email" type="text" id="email" required class="border border-gray-300 p-2 w-full rounded" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <input v-model="password" type="password" id="password" required class="border border-gray-300 p-2 w-full rounded" />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  </div>
</template>
