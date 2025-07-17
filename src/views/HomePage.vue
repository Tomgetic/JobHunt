<!-- src/views/HomePage.vue -->
<template>
  <div class="flex flex-col min-h-screen w-full bg-[#1d5e74] overflow-hidden relative">
    <!-- Logo in top left -->
    <img
      src="@/assets/thumbnail_Logo_icon.jpg"
      alt="JobHunt Logo"
      class="absolute top-10 left-10 w-32 h-32 object-contain z-10"
      style="background: transparent"
    />
    <main
      ref="pageContent"
      class="flex flex-col items-center justify-center flex-1 opacity-0 translate-y-4 transition-all duration-1000 ease-out"
    >
      <h1 class="text-7xl md:text-9xl font-extrabold text-white text-center mb-6 drop-shadow-lg">JobHunt</h1>
      <router-link
        to="/jobs"
        class="mt-6 bg-white text-[#1d5e74] text-2xl md:text-3xl font-bold px-12 py-6 rounded-full shadow-lg hover:bg-gray-100 transition"
        style="min-width: 400px; text-align: center;"
      >
        Find here your dream job
      </router-link>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const pageContent: Ref<HTMLElement | null> = ref(null)
onMounted(() => {
  // Invoked after the page loads (mounted) - Triggers transition: opacity from 0 to 100 and vertical slide
  requestAnimationFrame(() => {
    if (pageContent.value) {
      pageContent.value.classList.remove('opacity-0', 'translate-y-4')
      pageContent.value.classList.add('opacity-100', 'translate-y-0')
    }
  })
})
</script>
