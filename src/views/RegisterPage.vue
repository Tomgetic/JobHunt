<!-- src/views/RegisterPage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CountrySelect from '@/components/CountrySelect.vue'
import DialCodeSelect from '@/components/DialCodeSelect.vue'
import countryCodes from '@/assets/CountryCodes.json'

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  country: '',
  phone: '',
  phoneCode: '',
})
const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  if (auth.isLoggedIn) {
    router.replace('/') // Redirect to home if already logged in
  }
})

const MIN_AGE = 16

const handleRegister = () => {
  // Check all required fields
  if (
    !form.value.username ||
    !form.value.email ||
    !form.value.password ||
    !form.value.confirmPassword ||
    !form.value.birthdate ||
    !form.value.country ||
    !form.value.phone ||
    !form.value.phoneCode
  ) {
    auth.error = 'Please fill in all fields.'
    return
  }
  if (!form.value.phoneCode) {
    auth.error = 'Please select a valid dial code.'
    return
  }
  // Email already used check
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (users.some((u: any) => u.email === form.value.email)) {
    auth.error = 'This email is already registered.'
    return
  }
  // Age check
  const birth = new Date(form.value.birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  if (age < MIN_AGE) {
    auth.error = `You must be at least ${MIN_AGE} years old to register.`
    return
  }
  // Phone number validation (digits only)
  if (!/^\d+$/.test(form.value.phone)) {
    auth.error = 'Please enter a valid phone number (digits only).'
    return
  }
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
      phoneCode: form.value.phoneCode,
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
        <CountrySelect
          v-model="form.country"
          :aliases="{ 'United Kingdom': 'UK', 'United States': 'USA' }"
          label="Country"
          labelClass="block text-sm font-medium mb-1"
          selectClass="border border-gray-300 p-2 w-full rounded"
          placeholder="Pick your country"
          required
        />
      </div>
      <div class="mb-4 flex gap-2 items-end">
        <div>
          <label class="block text-sm font-medium mb-1">Code</label>
          <DialCodeSelect v-model="form.phoneCode" :codes="countryCodes" />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1">Phone</label>
          <input
            v-model="form.phone"
            type="tel"
            class="border border-gray-300 p-2 w-full rounded"
            placeholder="123456789"
          />
        </div>
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
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer transition"
      >
        Register
      </button>
    </form>
  </div>
</template>
