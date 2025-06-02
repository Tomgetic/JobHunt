<!-- src/views/HomePage.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <main
      ref="pageContent"
      class="opacity-0 translate-y-4 transition-all duration-1000 ease-out p-6"
    >
      <h1 class="text-3xl font-bold text-center mb-8">Welcome to JobHunt</h1>
      <p class="text-lg text-gray-700 text-center mb-6">Find your dream job</p>
      <router-link
        to="/jobs"
        class="block text-center bg-offgreen-500 text-white px-4 py-2 rounded-lg hover:bg-offgreen-700 transition"
      >
        Browse Jobs
      </router-link>
    </main>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const pageContent = ref(null)
onMounted(() => {
  // Invoked after the page loads (mounted) - Triggers transition: opacity from 0 to 100 and vertical slide
  requestAnimationFrame(() => {
    pageContent.value.classList.remove('opacity-0', 'translate-y-4')
    pageContent.value.classList.add('opacity-100', 'translate-y-0')
  })
})
</script>
