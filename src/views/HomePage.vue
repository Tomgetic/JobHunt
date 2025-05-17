<!-- src/views/HomePage.vue -->
<template>
  <section class="max-w-7xl mx-auto text-center py-4">
    <h2 class="text-4xl font-bold text-offgreen-700 mb-8">Available Jobs</h2>

    <div class="flex flex-row items-center justify-between mb-8">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search jobs..."
        class="border border-gray-300 rounded-lg p-2 w-full max-w-md placeholder:text-offgreen-dark/50"
      />

      <!-- This CountrySelect component can be used anywhere we need a country -->
      <CountrySelect v-model="selectedLocation"
                    :aliases="{ 'United Kingdom': 'UK', 'United States': 'USA' }"
                    label="Location:"
                    labelClass="text-gray-700 px-6"
                    selectClass="border border-gray-300 rounded-lg p-2"
                    wrapperClass="inline"
                    placeholder="Select a country"
                    placeholderClass="text-offgreen-dark/50"
                    optionClass="text-gray-700"
                    />

      <div>
        <label for="selectedSalaryRange" class="text-gray-700 px-6">Salary:</label>
        <select v-model="selectedSalaryRange" class="border border-gray-300 rounded-lg p-2 text-offgreen-dark/50">
          <option class="text-gray-700" value="">All Salaries</option>
          <option class="text-gray-700" value="0-50000">0 - 50,000</option>
          <option class="text-gray-700" value="50001-100000">50,001 - 100,000</option>
          <option class="text-gray-700" value="100001-150000">100,001 - 150,000</option>
          <option class="text-gray-700" value="150001-200000">150,001 - 200,000</option>
        </select>
        </div>
    </div>

    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">Error loading data: {{ error }}</div>
    <div v-else>
      <h1>Showing {{ filteredJobs.length }} results</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-stretch">
        <div v-for="job in filteredJobs" :key="job.id" class="flex flex-col bg-white rounded-lg shadow-md p-3 mb-4 hover:shadow-lg transition-shadow duration-300 relative">
          <div class="flex flex-col h-full">
            <div class="flex items-start space-x-4">

              <div class="flex-1">
                <!-- Job Icon -->
                <img :src="job.company_logo" :alt="job.company_name" :title="job.company_name" class="w-12 h-12 rounded-md object-contain" />

                <!-- Save button -->
                <button
                  @click.stop="toggleSave(job.id)"
                  :class="[
                    'float-left ms-4 mt-4 text-gray-400 cursor-pointer',
                    isSaved(job.id) ? 'text-green-500' : 'text-red-500',
                    isSaved(job.id) ? 'hover:text-red-500' : 'hover:text-green-500'
                  ]"
                  :aria-label="isSaved(job.id) ? 'Unsave job' : 'Save job'"
                >
                  <ThumbsUp :size="16" />
                </button>
              </div>

              <a :href="`/job/${job.id}`" class="flex-1 cursor-pointer">
                <!-- Job Title -->
                <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>

                <!-- Job Location -->
                <p class="text-sm text-gray-600">{{ job.candidate_required_location }}</p>
              </a>
            </div>

            <!-- Spacer to push footer down -->
            <div class="flex-grow">
            </div>

            <div class="mt-4 flex justify-between items-end text-sm text-gray-700 gap-2">
              <!-- Job Salary -->
              <span class="font-medium text-left w-1/2">{{ job.salary.replace(/,000/g, 'K') || 'Unspecified salary' }}</span>
              <!-- Job Category -->
              <span class="text-right italic w-1/2">{{ job.category }}</span>
            </div>
          </div>
        </div>




      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import jsonData from '@/assets/remote-jobs.json';
import CountrySelect from '@/components/CountrySelect.vue'
import { ThumbsUp } from 'lucide-vue-next';

// Variáveis para manter estado sobre: carregamento (loading), erros (error), e os dados obtidos (data).
const data = ref(null)
const loading = ref(true)
const error = ref(null)
const cachedData = ref(null) // Para evitar acessos repetidos à API (desaconselhado por remotive.com)
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedSalaryRange = ref('')
const savedJobs = ref<string[]>([])

// Computed property para filtrar os empregos com base na pesquisa.
const filteredJobs = computed(() => {
  if (!data.value) return []
  return data.value.jobs.filter((job) => {
    const matchName = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchLocation = selectedLocation.value
      ? job.candidate_required_location.split(",").map(c => c.trim()).includes(selectedLocation.value) // candidate_required_location is a comma separated list os countries.
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

function toggleSave(jobId: string) {
  const index = savedJobs.value.indexOf(jobId)
  if (index === -1) {
    savedJobs.value.push(jobId)
  } else {
    savedJobs.value.splice(index, 1)
  }
  localStorage.setItem('savedJobs', JSON.stringify(savedJobs.value))
}

function isSaved(jobId: string) {
  return savedJobs.value.includes(jobId)
}

// Obter dados da API quando a página estiver carregada.
onMounted(() => {
  // JSON jobs' data
  data.value = jsonData
  sessionStorage.setItem('remotiveApiData', jsonData) // Too big!!!
  loading.value = false

  // Saved jobs
  const saved = localStorage.getItem('savedJobs')
  if (saved) savedJobs.value = JSON.parse(saved)

})
// onMounted(fetchData);
</script>
