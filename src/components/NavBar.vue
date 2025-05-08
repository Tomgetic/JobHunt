<!-- src/components/Navbar.vue -->
<template>
  <header class="sticky top-0 bg-white shadow-md z-50">
    <nav class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <img src="@/assets/logo.png" alt="App Icon" class="w-6 h-6 mr-2" />
        <h1 class="text-xl font-bold text-blue-600">Job Search</h1>
      </div>
      <ul class="flex gap-6 text-gray-700 font-medium">
        <li>
          <router-link to="/" class="hover:text-blue-600 transition">Home</router-link>
        </li>
        <li>
          <router-link to="/about" class="hover:text-blue-600 transition">About</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
// No script needed unless we add interactivity later
</script>
