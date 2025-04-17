<!-- src/views/HomePage.vue -->
<template>
  <section class="max-w-3xl mx-auto text-center py-20">
    <h2 class="text-4xl font-bold text-blue-600 mb-4">Available Jobs</h2>

    <div v-if="loading">
      Loading data...
    </div>
    <div v-else-if="error">
      Error loading data: {{ error }}
    </div>
    <div v-else>
      <h1>{{ data["total-job-count"] }}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <div v-for="item in data.jobs" :key="item.id" class="rounded overflow-hidden shadow-lg flex flex-col">
          <a :href="`/job/${item.id}`">
            <div class="relative flex flex-row">
              <div>
                <img class="min-w-[100px]"
                    :src="item.company_logo"
                    :alt="item.company_name"
                    :title="item.company_name"
                    width="100px"
                    >
              </div>
              <div class="flex flex-col w-full items-center mx-1 my-2">
                <div>
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="px-6 py-4 mb-auto">
                <div
                    class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">{{ item.candidate_required_location }}</div>
                <div>{{ item.salary }}</div>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span href="#" class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                  <span class="font-bold">{{ item.category }}</span>
                </span>
            </div>
          </a>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import jsonData from '@/assets/remote-jobs.json';

// Variáveis para manter estado sobre: carregamento (loading), erros (error), e os dados obtidos (data).
const data = ref(null);
const loading = ref(true);
const error = ref(null);
const cachedData = ref(null); // Para evitar acessos repetidos à API (desaconselhado por remotive.com)

// Função para obter os dados da API.
const fetchData = async () => {
  loading.value = true;
  error.value = null;

  // Verificar se temos dados na cache.
  const storedData = sessionStorage.getItem('remotiveApiData');
  if (storedData) {
    data.value = JSON.parse(storedData);
    cachedData.value = true;
    loading.value = false;
    return;
  }

  try {
    const response = await fetch('https://remotive.com/api/remote-jobs');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    data.value = jsonData;
    sessionStorage.setItem('remotiveApiData', JSON.stringify(jsonData)); // Cache the data
    cachedData.value = false;
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred.';
    console.error('Error fetching data:', err);
  } finally {
    loading.value = false;
  }
};

// Obter dados da API quando a página estiver carregada.
onMounted(
  () => {
    data.value = jsonData;
    sessionStorage.setItem('remotiveApiData', jsonData); // Too big!!!
    loading.value = false;
  });
  // onMounted(fetchData);
</script>
