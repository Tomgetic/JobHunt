<!-- src/components/Navbar.vue -->
<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex flex-row items-center gap-2 text-offgreen-700 font-bold text-xl"
      >
        <img src="@/assets/thumbnail_Logo_large.jpg" alt="JobHunt Logo" class="w-10 h-10 mr-2 object-contain" />
      </RouterLink>

      <!-- Desktop Menu -->
      <ul class="hidden md:flex items-center gap-6 text-offgreen-700 font-bold">
        <li>
          <RouterLink
            to="/"
            class="relative hover:text-offgreen-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >Home</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/jobs"
            class="relative hover:text-offgreen-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >Jobs</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/saved_jobs"
            class="relative hover:text-offgreen-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >Saved Jobs</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/about"
            class="relative hover:text-offgreen-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >About</RouterLink
          >
        </li>
        <li>
          <RouterLink
            to="/contact"
            class="relative hover:text-offgreen-900 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
            >Contact</RouterLink
          >
        </li>
      </ul>

      <!-- Desktop CTA Buttons -->
      <template v-if="!auth.isLoggedIn">
        <div class="hidden md:flex gap-x-2">
          <RouterLink
            to="/login"
            class="bg-offgreen-500 text-white px-4 py-2 rounded-xl hover:bg-offgreen-700 cursor-pointer transition"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="bg-offgreen-500 text-white px-4 py-2 rounded-xl hover:bg-offgreen-700 cursor-pointer transition"
          >
            Register
          </RouterLink>
        </div>
      </template>
      <template v-else>
        <div class="relative hidden md:inline-block" ref="dropdownRef">
          <button
            @click="dropdownOpen = !dropdownOpen"
            class="flex items-center gap-2 bg-offgreen-500 text-white px-4 py-2 rounded-xl hover:bg-offgreen-700 cursor-pointer transition focus:outline-none"
            style="height: 40px"
          >
            <img :src="profilePic" alt="Profile" class="w-6 h-6 rounded-full border border-white" />
            <span class="hidden lg:inline text-base">{{ auth.user?.username || 'Profile' }}</span>
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            v-if="dropdownOpen"
            ref="dropdownRef"
            class="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50"
          >
            <RouterLink
              to="/profile"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              @click="dropdownOpen = false"
              >Profile</RouterLink
            >
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </template>

      <!-- Mobile Menu Button -->
      <button @click="menuOpen = !menuOpen" class="md:hidden text-gray-700">
        <MenuIcon class="w-6 h-6" />
      </button>
    </nav>

    <!-- Mobile Dropdown -->
    <div v-if="menuOpen" class="md:hidden bg-white shadow-md border-t">
      <ul class="flex flex-col gap-4 p-4 text-gray-700">
        <li><RouterLink @click="menuOpen = false" to="/">Home</RouterLink></li>
        <li><RouterLink @click="menuOpen = false" to="/jobs">Jobs</RouterLink></li>
        <li><RouterLink @click="menuOpen = false" to="/saved_jobs">Saved Jobs</RouterLink></li>
        <li><RouterLink @click="menuOpen = false" to="/about">About</RouterLink></li>
        <li><RouterLink @click="menuOpen = false" to="/contact">Contact</RouterLink></li>
        <template v-if="!auth.isLoggedIn">
          <li>
            <RouterLink @click="menuOpen = false" to="/login" class="text-blue-600 font-semibold"
              >Login</RouterLink
            >
          </li>
          <li>
            <RouterLink @click="menuOpen = false" to="/register" class="text-blue-600 font-semibold"
              >Register</RouterLink
            >
          </li>
        </template>
        <template v-else>
          <li>
            <RouterLink @click="menuOpen = false" to="/profile" class="text-blue-600 font-semibold"
              >Profile</RouterLink
            >
          </li>
          <li>
            <button @click="logoutAndCloseMenu" class="text-red-600 font-semibold w-full text-left">
              Logout
            </button>
          </li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu as MenuIcon } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const menuOpen = ref(false)
const dropdownOpen = ref(false)
const auth = useAuthStore()
const router = useRouter()
const dropdownRef = ref(null)

const handleLogout = () => {
  auth.logout()
  router.push('/')
}

const logoutAndCloseMenu = () => {
  auth.logout()
  menuOpen.value = false
  router.push('/')
}

const profilePic = computed(() => {
  if (auth.user?.profileImage) return auth.user.profileImage
  const name = auth.user?.username || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name[0])}&background=0D8ABC&color=fff&size=128`
})

onClickOutside(dropdownRef, () => {
  dropdownOpen.value = false
})
</script>
