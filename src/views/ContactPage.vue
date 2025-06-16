<!-- src/views/ContactPage.vue -->
<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Contact Us</h1>
    <p class="mb-8 text-lg text-gray-700 text-center">
      If you have any questions or inquiries, feel free to reach out!
    </p>
    <form @submit.prevent="submitForm" class="bg-white rounded-xl shadow-lg p-8 grid gap-6">
      <div>
        <label for="name" class="text-base mb-2 block">Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Your Name"
          autocomplete="off"
          class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
          required
        />
      </div>
      <div>
        <label for="email" class="text-base mb-2 block">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="you@company.com"
          autocomplete="off"
          class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
          required
        />
      </div>
      <div>
        <label for="message" class="text-base mb-2 block">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Your message"
          class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none h-36 focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="inline-flex text-black bg-yellow-200 border border-yellow-200 rounded-full hover:border-black justify-center px-8 py-3"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
}
</script>
