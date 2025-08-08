<!-- src/components/AppFooter.vue -->
<template>
  <footer class="bg-gray-900 text-gray-200 py-6 mt-12">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div>© {{ new Date().getFullYear() }} JobHunt. All rights reserved.</div>
      <div class="flex flex-col md:items-end mt-2 md:mt-0 text-sm">
        <div><span class="font-semibold">Phone:</span> +31 123456789</div>
        <div><span class="font-semibold">Address:</span> Example, Lisbon, Portugal</div>
        <div>
          <span class="font-semibold">Email:</span>
          <a href="mailto:contact@jobhunt.com" class="hover:underline text-blue-300"
            > contact@jobhunt.com</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
