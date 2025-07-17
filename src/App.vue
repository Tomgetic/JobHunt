<!-- src/App.vue -->
<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import AppFooter from './components/AppFooter.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

const auth = useAuthStore()
onMounted(() => {
  auth.loadUser()
})

const pageContent: Ref<HTMLElement | null> = ref(null)

onMounted(() => {
  // Invocado depois da página carregar (mounted) - Desencadeia transição: opacidade de 0 para 100 e desloca na vertical
  requestAnimationFrame(() => {
    if (pageContent.value) {
      pageContent.value.classList.remove('opacity-0', 'translate-y-4')
      pageContent.value.classList.add('opacity-100', 'translate-y-0')
    }
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar as a component -->
    <NavBar />

    <!-- Conteúdo da página com transição quando carrega: Começa escondido (opacity-0) e ligeiramente deslocado para baixo (translate-y-4)
         Quando página carrega (onMounted) troca estas classes por opacity-100 e translate-y-0
         Transição é controlada por: "transition-all duration-1000 ease-out"
    -->
    <main
      ref="pageContent"
      class="flex-1 opacity-0 translate-y-4 transition-all duration-1000 ease-out p-6"
    >
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Optional global styles */
</style>
