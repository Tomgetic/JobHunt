<!-- src/components/Navbar.vue -->
<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex flex-row items-center gap-2 text-offgreen-700 font-bold text-xl"
      >
        <img src="@/assets/logo.png" alt="JobHunt Logo" class="w-8 h-8 mr-2 object-contain" />
        <span>JobHunt</span>
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

      <!-- CTA Button -->
      <RouterLink
        to="/some-action"
        class="hidden md:inline-block bg-offgreen-500 text-white px-4 py-2 rounded-xl hover:bg-offgreen-700 transition"
      >
        Some Action
      </RouterLink>

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
        <li>
          <RouterLink
            @click="menuOpen = false"
            to="/some-action"
            class="text-blue-600 font-semibold"
            >Some Action</RouterLink
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu as MenuIcon } from 'lucide-vue-next'
const menuOpen = ref(false)
</script>
