<!-- src/components/AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-gray-200 py-6 mt-12">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div>
        © {{ new Date().getFullYear() }} JobHunt. All rights reserved.
      </div>
      <div class="flex gap-4 mt-2 md:mt-0">
        <a href="/" class="hover:underline">Home</a>
        <a href="/about" class="hover:underline">About</a>
        <a href="/support" class="hover:underline">Contact</a>
      </div>
    </div>
  </footer>
</template>
