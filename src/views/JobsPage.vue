<!-- src/views/JobsPage.vue -->
<template>
  <section class="max-w-7xl mx-auto text-center py-4 px-2">
    <h2 class="text-3xl sm:text-4xl font-bold text-offgreen-700 mb-6 sm:mb-8">Available Jobs</h2>

    <!-- Responsive filter controls -->
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
      <div class="flex flex-col w-full sm:w-auto">
        <label class="text-gray-700 mb-1 sm:mb-0 sm:px-6 text-left sm:text-center">Search:</label>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search jobs..."
          class="border border-gray-700 rounded-lg p-2 w-full sm:max-w-md placeholder:text-offgreen-dark/700"
        />
      </div>

      <div class="flex flex-col w-full sm:w-auto">
        <CountrySelect
          v-model="selectedLocation"
          :aliases="{ 'United Kingdom': 'UK', 'United States': 'USA' }"
          label="Location:"
          labelClass="text-gray-700 mb-1 sm:mb-0 sm:px-6 text-left sm:text-center"
          selectClass="border border-gray-700 rounded-lg p-2 w-full"
          wrapperClass="w-full sm:w-auto"
          placeholder="Select a country"
          placeholderClass="text-offgreen-dark/700"
          optionClass="text-gray-700"
        />
      </div>

      <div class="flex flex-col w-full sm:w-auto">
        <label
          for="selectedSalaryRange"
          class="text-gray-700 mb-1 sm:mb-0 sm:px-6 text-left sm:text-center"
          >Salary:</label
        >
        <select
          v-model="selectedSalaryRange"
          class="border border-gray-700 rounded-lg p-2 w-full text-offgreen-dark/700"
        >
          <option class="text-gray-700" value="">All Salaries</option>
          <option class="text-gray-700" value="0-50000">0 - 50,000</option>
          <option class="text-gray-700" value="50001-100000">50,001 - 100,000</option>
          <option class="text-gray-700" value="100001-150000">100,001 - 150,000</option>
          <option class="text-gray-700" value="150001-200000">150,001 - 200,000</option>
          <option class="text-gray-700" value="200001+">200,001+</option>
          <option class="text-gray-700" value="unspecified">Unspecified salary</option>
        </select>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
      <div>
        <label class="mr-2">Jobs per page:</label>
        <select
          v-model="pageSize"
          class="border border-gray-700 rounded p-1 text-offgreen-dark/700"
        >
          <option :value="16">16</option>
          <option :value="32">32</option>
          <option :value="48">48</option>
          <option :value="64">64</option>
        </select>
      </div>
      <div>
        <button
          class="px-2 py-1 border rounded mx-1"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="px-2 py-1 border rounded mx-1"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

    <div v-if="loading">Loading data...</div>
    <div v-else-if="error">Error loading data: {{ error }}</div>
    <div v-else>
      <h1 class="text-lg sm:text-xl mb-4">Showing {{ filteredJobs.length }} results</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        <div
          v-for="job in paginatedJobs"
          :key="job.id"
          class="group flex flex-col bg-white rounded-lg shadow-md p-3 mb-2 sm:mb-4 transition-all duration-300 relative hover:shadow-2xl hover:scale-[1.04] cursor-pointer w-full"
        >
          <!-- Make the whole card clickable except the save button -->
          <router-link
            :to="`/job/${job.id}`"
            class="absolute inset-0 z-0"
            style="border-radius: inherit"
            tabindex="-1"
            aria-label="View job details"
          ></router-link>
          <div class="flex flex-col h-full relative z-10 pointer-events-none">
            <div class="flex items-start space-x-4">
              <div class="flex-1">
                <!-- Job Icon -->
                <img
                  :src="job.company_logo"
                  :alt="job.company_name"
                  :title="job.company_name"
                  class="w-12 h-12 rounded-md object-contain"
                />

                <!-- Save button: pointer-events-auto so it works above the overlay -->
                <button
                  :title="
                    auth.isLoggedIn
                      ? isSaved(job.id)
                        ? 'Unsave job'
                        : 'Save job'
                      : 'Login to save jobs'
                  "
                  @click.stop="toggleSave(job.id)"
                  :disabled="!auth.isLoggedIn"
                  :class="[
                    'float-left ms-4 mt-4 text-gray-400 cursor-pointer pointer-events-auto z-20 relative',
                    isSaved(job.id) ? 'text-yellow-500' : 'text-gray-500',
                    isSaved(job.id) ? 'hover:text-gray-500' : 'hover:text-yellow-500',
                    !auth.isLoggedIn ? 'opacity-50 cursor-not-allowed' : '',
                  ]"
                  :aria-label="
                    auth.isLoggedIn
                      ? isSaved(job.id)
                        ? 'Unsave job'
                        : 'Save job'
                      : 'Login to save jobs'
                  "
                >
                  <Star :size="16" />
                </button>
              </div>

              <div class="flex-1">
                <!-- Job Title -->
                <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>

                <!-- Job Location -->
                <p class="text-sm text-gray-600">{{ job.candidate_required_location }}</p>
              </div>
            </div>

            <!-- Spacer to push footer down -->
            <div class="flex-grow"></div>

            <div class="mt-4 flex justify-between items-end text-sm text-gray-700 gap-2">
              <!-- Job Salary -->
              <span class="font-medium text-left w-1/2">{{
                parseSalary(job.salary) ? job.salary.replace(/,000/g, 'K') : 'Unspecified salary'
              }}</span>
              <!-- Job Category -->
              <span class="text-right italic w-1/2">{{ job.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <label class="mr-2">Jobs per page:</label>
        <select
          v-model="pageSize"
          class="border border-gray-700 rounded p-1 text-offgreen-dark/700"
        >
          <option :value="16">16</option>
          <option :value="32">32</option>
          <option :value="48">48</option>
          <option :value="64">64</option>
        </select>
      </div>
      <div>
        <button
          class="px-2 py-1 border rounded mx-1"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="px-2 py-1 border rounded mx-1"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import jsonData from '@/assets/remote-jobs.json'
import CountrySelect from '@/components/CountrySelect.vue'
import { Star } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// Variáveis para manter estado sobre: carregamento (loading), erros (error), e os dados obtidos (data).
const data = ref(null)
const loading = ref(true)
const error = ref(null)
const cachedData = ref(null) // Para evitar acessos repetidos à API (desaconselhado por remotive.com)
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedSalaryRange = ref('')
const savedJobs = ref<string[]>([])
const pageSize = ref(16)
const currentPage = ref(1)

// Computed property para filtrar os empregos com base na pesquisa.
const filteredJobs = computed(() => {
  if (!data.value) return []
  return data.value.jobs.filter((job) => {
    const matchName = job.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchLocation = selectedLocation.value
      ? job.candidate_required_location
          .split(',')
          .map((c) => c.trim())
          .includes(selectedLocation.value) // candidate_required_location is a comma separated list os countries.
      : true
    let matchSalary = true

    const jobSalary = parseSalary(job.salary)

    if (selectedSalaryRange.value) {
      if (selectedSalaryRange.value === 'unspecified') {
        matchSalary = jobSalary === null
      } else if (selectedSalaryRange.value === '200001+') {
        matchSalary = jobSalary !== null && jobSalary > 200000
      } else {
        const [min, max] = selectedSalaryRange.value.split('-').map(Number)
        matchSalary = jobSalary !== null && jobSalary >= min && jobSalary <= max
      }
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

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredJobs.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredJobs.value.length / pageSize.value))

function toggleSave(jobId: string) {
  if (!auth.isLoggedIn) return
  if (auth.isJobSaved(jobId)) {
    auth.unsaveJob(jobId)
  } else {
    auth.saveJob(jobId)
  }
}

function isSaved(jobId: string) {
  return auth.isJobSaved(jobId)
}

function parseSalary(salary: string): number | null {
  if (!salary) return null

  // Remove currency symbols and non-numeric, non-k, non-dot, non-comma characters
  let cleaned = salary.replace(/[^0-9kK.,\-]/g, '')

  // Handle ranges like "50k-70k" or "50000-70000"
  if (cleaned.includes('-')) {
    cleaned = cleaned.split('-')[0] // Take the lower bound
  }

  // Remove commas
  cleaned = cleaned.replace(/,/g, '')

  // Handle "k" or "K" notation
  if (/k$/i.test(cleaned)) {
    return parseFloat(cleaned) * 1000
  }

  // Parse as float
  const num = parseFloat(cleaned)
  return isNaN(num) ? null : num
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

watch([filteredJobs, pageSize], () => {
  currentPage.value = 1
})
</script>
