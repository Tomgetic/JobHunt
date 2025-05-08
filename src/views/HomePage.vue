<!-- src/views/HomePage.vue -->
<template>
  <section class="max-w-7xl mx-auto text-center py-20">
    <h2 class="text-4xl font-bold text-blue-600 mb-4">Available Jobs</h2>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search jobs..."
      class="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md mx-auto"
    />

    <!-- Filtros -->
    <label for="location" class="text-gray-700 mb-2 px-2">Location:</label>
    <select v-model="selectedLocation" class="border border-gray-300 rounded-lg p-2">
      <option value="">All Locations</option>
      <optgroup label="North America">
        <option>Canada</option>
        <option>Mexico</option>
        <option>Puerto Rico</option>
        <option>USA</option>
      </optgroup>
      <optgroup label="South America">
        <option>Argentina</option>
        <option>Brazil</option>
        <option>Chile</option>
        <option>Colombia</option>
        <option>Peru</option>
      </optgroup>
      <optgroup label="Europe">
        <option>Austria</option>
        <option>Belgium</option>
        <option>Denmark</option>
        <option>Finland</option>
        <option>France</option>
        <option>Germany</option>
        <option>Hungary</option>
        <option>Ireland</option>
        <option>Italy</option>
        <option>Netherlands</option>
        <option>Norway</option>
        <option>Poland</option>
        <option>Portugal</option>
        <option>Spain</option>
        <option>Sweden</option>
        <option>Switzerland</option>
        <option>Russia</option>
        <option>UK</option>
        <option>Ukraine</option>
      </optgroup>
      <optgroup label="Asia">
        <option>China</option>
        <option>Hong Kong</option>
        <option>India</option>
        <option>Indonesia</option>
        <option>Japan</option>
        <option>Malaysia</option>
        <option>Philippines</option>
        <option>Singapore</option>
        <option>South Korea</option>
        <option>Thailand</option>
        <option>Vietnam</option>
      </optgroup>
      <optgroup label="Oceania">
        <option>Australia</option>
        <option>New Zealand</option>
      </optgroup>
      <optgroup label="Africa">
        <option>Egypt</option>
        <option>South Africa</option>
      </optgroup>
    </select>

    <label for="salary" class="text-gray-700 mb-2 px-2">Salary:</label>
    <select v-model="selectedSalaryRange" class="border border-gray-300 rounded-lg p-2">
      <option value="">All Salaries</option>
      <option value="0-50000">0 - 50,000</option>
      <option value="50001-100000">50,001 - 100,000</option>
      <option value="100001-150000">100,001 - 150,000</option>
      <option value="150001-200000">150,001 - 200,000</option>
    </select>

    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">Error loading data: {{ error }}</div>
    <div v-else>
      <h1>{{ filteredJobs.length }}</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div
          v-for="item in filteredJobs"
          :key="item.id"
          class="rounded overflow-hidden shadow-lg flex flex-col"
        >
          <a :href="`/job/${item.id}`">
            <div class="relative flex flex-row">
              <div>
                <img
                  class="min-w-[100px]"
                  :src="item.company_logo"
                  :alt="item.company_name"
                  :title="item.company_name"
                  width="100px"
                />
              </div>
              <div class="flex flex-col w-full items-center mx-1 my-2">
                <div>
                  {{ item.title }}
                </div>
              </div>
            </div>
            <div class="px-6 py-4 mb-auto">
              <div
                class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
              >
                {{ item.candidate_required_location }}
              </div>
              <div>{{ item.salary }}</div>
            </div>
            <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <span
                href="#"
                class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center"
              >
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
import { ref, onMounted, computed } from 'vue'
import jsonData from '@/assets/remote-jobs.json'

// Variáveis para manter estado sobre: carregamento (loading), erros (error), e os dados obtidos (data).
const data = ref(null)
const loading = ref(true)
const error = ref(null)
const cachedData = ref(null) // Para evitar acessos repetidos à API (desaconselhado por remotive.com)
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedSalaryRange = ref('')

// Computed property para filtrar os trabalhos com base na pesquisa.
const filteredJobs = computed(() => {
  if (!data.value) return []
  return data.value.jobs.filter((job) => {
    const matchName = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchLocation = selectedLocation.value
      ? job.candidate_required_location == selectedLocation.value
      : true
    let matchSalary = true

    if (selectedSalaryRange.value) {
      const [min, max] = selectedSalaryRange.value.split('-').map(Number)
      matchSalary = job.salary >= min && job.salary <= max
    }

    return matchName && matchLocation && matchSalary
  })
})

// Função para obter os dados da API.
const fetchData = async () => {
  loading.value = true
  error.value = null

  // Verificar se temos dados na cache.
  const storedData = sessionStorage.getItem('remotiveApiData')
  if (storedData) {
    data.value = JSON.parse(storedData)
    cachedData.value = true
    loading.value = false
    return
  }

  try {
    const response = await fetch('https://remotive.com/api/remote-jobs')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const jsonData = await response.json()
    data.value = jsonData
    sessionStorage.setItem('remotiveApiData', JSON.stringify(jsonData)) // Cache the data
    cachedData.value = false
  } catch (err) {
    error.value = err.message || 'An unexpected error occurred.'
    console.error('Error fetching data:', err)
  } finally {
    loading.value = false
  }
}

// Obter dados da API quando a página estiver carregada.
onMounted(() => {
  data.value = jsonData
  sessionStorage.setItem('remotiveApiData', jsonData) // Too big!!!
  loading.value = false
})
// onMounted(fetchData);
</script>
