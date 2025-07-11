<!-- src/views/RegisterPage.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  country: '',
  phone: '',
})
const auth = useAuthStore()
const router = useRouter()

const handleRegister = () => {
  if (form.value.password !== form.value.confirmPassword) {
    auth.error = 'Passwords do not match'
    return
  }
  if (
    auth.register({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      birthdate: form.value.birthdate,
      country: form.value.country,
      phone: form.value.phone,
    })
  ) {
    router.push('/login')
  }
}
</script>

<template>
  <div class="min-h-4xl flex items-center justify-center">
    <form class="bg-white p-6 rounded shadow-md w-80" @submit.prevent="handleRegister">
      <h1 class="text-lg font-bold mb-4">Register</h1>
      <div v-if="auth.error" class="mb-2 text-red-600 text-sm">{{ auth.error }}</div>
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium mb-1">Username</label>
        <input
          v-model="form.username"
          type="text"
          id="username"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div class="mb-4">
        <label for="birthdate" class="block text-sm font-medium mb-1">Birthdate</label>
        <input
          v-model="form.birthdate"
          type="date"
          id="birthdate"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div class="mb-4">
        <label for="country" class="block text-sm font-medium mb-1">Country</label>
        <input
          v-model="form.country"
          type="text"
          id="country"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
        <!-- Or use your CountrySelect component here if you have one -->
      </div>
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium mb-1">Phone (optional)</label>
        <input
          v-model="form.phone"
          type="tel"
          id="phone"
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div class="mb-4">
        <label for="confirmPassword" class="block text-sm font-medium mb-1">Confirm Password</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          id="confirmPassword"
          required
          class="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  </div>
</template>
