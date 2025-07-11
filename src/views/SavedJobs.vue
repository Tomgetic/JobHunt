<!-- src/views/SavedJobsPage.vue -->
<template>
  <section class="max-w-7xl mx-auto text-center py-4">
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

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <div
        v-for="job in savedJobsList"
        :key="job.id"
        class="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
      >
        <h3 class="text-lg font-semibold text-gray-900">{{ job.title }}</h3>
        <p class="text-sm text-gray-600">{{ job.candidate_required_location }}</p>
        <p class="text-sm italic mt-2">{{ job.category }}</p>
        <a :href="`/job/${job.id}`" class="block mt-4 text-blue-600 hover:underline text-sm">
          View Job
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import jsonData from '@/assets/remote-jobs.json'

interface Job {
  id: string
  title: string
  candidate_required_location: string
  category: string
}

interface JobsJson {
  jobs: Job[]
}

const allJobs = ref<Job[]>((jsonData as JobsJson).jobs)
const savedIds = ref<string[]>([])

onMounted(() => {
  const saved = localStorage.getItem('savedJobs')
  if (saved) savedIds.value = JSON.parse(saved)
})

const savedJobsList = computed(() => allJobs.value.filter((job: Job) => savedIds.value.includes(job.id)))
</script>
