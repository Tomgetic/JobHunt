<!-- src/views/AboutPage.vue -->
<!--  Needs these componentes: npm install @motionone/vue lucide-vue-next -->

<template>
  <section class="max-w-4xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold mb-6 text-center">About Us</h1>
    <p class="text-lg text-gray-700 mb-12 text-center">
      We help you connect with remote-friendly companies and land your ideal job.
    </p>

    <div class="grid sm:grid-cols-2 gap-10">
      <div v-for="(section, index) in aboutSections" :key="index" class="flex items-start gap-4">
        <component :is="icons[section.icon]" class="w-6 h-6 text-blue-600 mt-1 shrink-0" />
        <div>
          <h2 class="text-xl font-semibold mb-1">{{ section.title }}</h2>
          <p class="text-gray-600">{{ section.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Target, Settings, Users, Star, Heart, UserCircle, Mail } from 'lucide-vue-next'
import type { Component } from 'vue'

type IconName = 'Target' | 'Settings' | 'Users' | 'Star' | 'Heart' | 'UserCircle' | 'Mail'

const icons: Record<IconName, Component> = {
  Target,
  Settings,
  Users,
  Star,
  Heart,
  UserCircle,
  Mail,
}

const aboutSections: { title: string; icon: IconName; text: string }[] = [
  {
    title: 'Our Mission',
    icon: 'Target',
    text: 'To connect skilled professionals with companies who value remote work and global collaboration.',
  },
  {
    title: 'What We Offer',
    icon: 'Settings',
    text: 'We aggregate remote jobs, offer curated listings, and provide career tools to help you stand out.',
  },
  {
    title: 'The Team',
    icon: 'Users',
    text: 'We’re a small but passionate team of developers, recruiters, and designers who love helping others succeed.',
  },
  {
    title: 'Why Remote',
    icon: 'Star',
    text: 'Remote work is about flexibility, inclusivity, and tapping into a truly global talent pool.',
  },
  {
    title: 'Built with Care',
    icon: 'Heart',
    text: 'This site is made with modern tools like Vue 3.5 and Tailwind CSS v4, with performance and accessibility in mind.',
  },
  {
    title: 'Get in Touch',
    icon: 'Mail',
    text: 'Have questions, feedback, or ideas? Reach out to us anytime — we’d love to hear from you.',
  },
]
</script>
