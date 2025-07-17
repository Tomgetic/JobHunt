<!-- src/views/SavedJobsPage.vue -->
<template>
  <section class="max-w-7xl mx-auto text-center py-4">
    <template v-if="!auth.isLoggedIn">
      <div class="flex flex-col items-center justify-center py-16">
        <h2 class="text-2xl font-bold mb-4 text-offgreen-700">
          Please log in to view your saved jobs.
        </h2>
        <div class="flex gap-4">
          <RouterLink
            to="/login"
            class="bg-offgreen-500 text-white px-6 py-2 rounded-xl hover:bg-offgreen-700 transition"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="bg-offgreen-500 text-white px-6 py-2 rounded-xl hover:bg-offgreen-700 transition"
          >
            Register
          </RouterLink>
        </div>
      </div>
    </template>
    <template v-else>
      <h2 class="text-4xl font-bold text-offgreen-700 mb-8">Saved Jobs</h2>
      <p class="text-lg text-gray-600 mb-6">
        Here are the jobs you've saved. Click to view details or apply.
      </p>
      <p class="text-sm text-gray-500 mb-8">
        You can save jobs by clicking the "Save Job" button on the job listing pages.
      </p>
      <div v-if="savedJobsList.length === 0">
        <p class="text-gray-500">No jobs saved yet.</p>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-stretch">
        <div
          v-for="job in savedJobsList"
          :key="job.id"
          class="group flex flex-col bg-white rounded-lg shadow-md p-3 mb-4 transition-all duration-300 relative hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
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
                <img
                  v-if="job.company_logo"
                  :src="job.company_logo"
                  :alt="job.company_name"
                  :title="job.company_name"
                  class="w-12 h-12 rounded-md object-contain"
                />
                <!-- Save button: pointer-events-auto so it works above the overlay -->
                <button
                  title="Unsave job"
                  @click.stop="auth.unsaveJob(job.id)"
                  class="float-left ms-4 mt-4 text-yellow-500 hover:text-gray-500 cursor-pointer pointer-events-auto z-20 relative"
                  aria-label="Unsave job"
                >
                  <Star :size="16" />
                </button>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>
                <p class="text-sm text-gray-600">{{ job.candidate_required_location }}</p>
              </div>
            </div>
            <div class="flex-grow"></div>
            <div class="mt-4 flex justify-between items-end text-sm text-gray-700 gap-2">
              <span class="font-medium text-left w-1/2">
                {{ job.salary ? job.salary.replace(/,000/g, 'K') : 'Unspecified salary' }}
              </span>
              <span class="text-right italic w-1/2">{{ job.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import jsonData from '@/assets/remote-jobs.json'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
import { Star } from 'lucide-vue-next'

interface Job {
  id: string
  title: string
  candidate_required_location: string
  category: string
  company_logo?: string
  company_name?: string
  salary?: string
}

interface JobsJson {
  jobs: Job[]
}

const auth = useAuthStore()
const allJobs = ref<Job[]>((jsonData as JobsJson).jobs)
const savedIds = ref<string[]>([])

onMounted(() => {
  const saved = localStorage.getItem('savedJobs')
  if (saved) savedIds.value = JSON.parse(saved)
})

const savedJobsList = computed(() =>
  allJobs.value.filter((job: Job) => auth.user?.savedJobs?.includes(job.id)),
)
</script>
