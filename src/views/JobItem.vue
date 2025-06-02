<!-- src/views/JobItem.vue -->
<template>
  <div></div>

  <div v-if="data">
    <!-- Use itemId to fetch or display data -->
    <div class="text-center bg-offgreen-light py-14">
      <div class="w-full max-w-screen-xl mx-auto px-5">
        <div>
          <div class="grid gap-3">
            <div class="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
              <div class="flex flex-col md:flex-row items-center flex-1 gap-6">
                <div class="size-32 bg-white rounded-2xl grid place-items-center shadow-xl">
                  <img
                    alt="Logo"
                    class="min-w-[100px]"
                    :src="data.company_logo"
                    :alt="data.company_name"
                    :title="data.company_name"
                    width="100px"
                    decoding="async"
                    loading="lazy"
                    style="color: transparent"
                  />
                </div>
                <div class="md:text-left">
                  <h2 class="m-0 text-3xl font-bold tracking-tight">{{ data.title }}</h2>
                  <div class="text-offgreen-dark text-lg mt-1">
                    {{ data.company_name }} | {{ data.category }} |
                    <span style="text-transform: capitalize">{{
                      data.job_type.replace(/_/g, '-')
                    }}</span>
                  </div>
                  <button
                    :title="isSaved(data.id) ? 'Unsave job' : 'Save job'"
                    @click.stop="toggleSave(data.id)"
                    :class="[
                      'ms-0 mt-1 text-gray-400 cursor-pointer',
                      isSaved(data.id) ? 'text-yellow-500' : 'text-gray-500',
                      isSaved(data.id) ? 'hover:text-gray-500' : 'hover:text-yellow-500',
                    ]"
                    :aria-label="isSaved(data.id) ? 'Unsave job' : 'Save job'"
                  >
                    <Star :size="20" />
                  </button>
                </div>
              </div>
              <div
                class="flex items-center flex-col md:first-letter:flex-row justify-between gap-px mr-2 md:flex-col md:items-end"
              >
                <span class="text-xl font-medium">{{ data.candidate_required_location }}</span>
                <span class="text-2xl font-medium">{{
                  data.salary ? data.salary : 'Unspecified Salary'
                }}</span>
                <time class="text-offgreen-dark">Posted {{ timeAgo(data.publication_date) }}</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full max-w-screen-xl mx-auto px-5">
      <div>
        <div class="border-b border-offgreen-medium">
          <div class="py-8">
            <div class="w-8 h-8 float-left mr-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M0 80L0 229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7L48 32C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                />
              </svg>
            </div>

            <div class="flex gap-10 md:gap-5 flex-wrap items-start">
              <div v-for="tag in data.tags" :key="data.id" class="shadow-lg flex flex-col">
                <span
                  class="text-sm bg-offgreen-dark text-offgreen-light py-1 px-2 rounded border border-offgreen-dark"
                  >{{ tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-10 mt-16 lg:grid-cols-2">
      <div class="hidden lg:block sticky top-10 self-start">
        <!-- Job details -->
        <div class="mx-12 job-details" v-html="data.description"></div>
      </div>
      <div>
        <!-- Application Form-->
        <div class="mx-12">
          <h3 class="text-xl font-bold">Apply for this job</h3>
          <form class="my-5">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="text-base mb-2 block">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  autocomplete="false"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="first_name"
                />
              </div>
              <div>
                <label class="text-base mb-2 block">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  autocomplete="false"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="last_name"
                />
              </div>
              <div>
                <label for="email_address" class="text-base mb-2 block">Email Address</label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="you@company.com"
                  name="email"
                  autocomplete="false"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                />
              </div>
              <div>
                <label for="phone" class="text-base mb-2 block">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  autocomplete="false"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="phone"
                />
              </div>
              <div>
                <label for="email_address" class="text-base mb-2 block">Address</label>
                <input
                  type="text"
                  placeholder="Full Address"
                  autocomplete="false"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="address"
                />
              </div>
              <div>
                <CountrySelect
                  v-model="country"
                  label="Country"
                  labelClass="text-base mb-2 block"
                  selectClass="w-full px-4 py-3 border-2 after:bg-[url('/img/hero-pattern.svg')] rounded-md outline-none focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  wrapperClass="relative"
                  placeholder="Choose country"
                  placeholderClass="text-offgreen-dark/50"
                  optionClass="text-gray-700"
                />
              </div>
              <div class="md:col-span-2">
                <label for="email_address" class="text-base mb-2 block">Cover Letter</label>
                <textarea
                  placeholder="Cover Letter"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none h-36 focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="cover"
                ></textarea>
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-5">
              <div>
                <span class="text-sm sr-only font-bold">Attach Resume</span>
                <input
                  type="file"
                  class="w-full mt-1"
                  placeholder="Upload Resume"
                  name="resume"
                  accept="application/pdf,.doc,.docx"
                />
              </div>
              <button
                type="submit"
                class="inline-flex text-black bg-yellow-200 border border-yellow-200 rounded-full hover:border-black justify-center px-8 py-3"
              >
                Apply Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading data...</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import jsonData from '@/assets/remote-jobs.json'
import CountrySelect from '@/components/CountrySelect.vue'
import { Star } from 'lucide-vue-next'

const route = useRoute()
const itemId = route.params.id // Obter id passado como parâmetro no URL
const data = ref(null)
const savedJobs = ref<string[]>([])

function timeAgo(date) {
  const now = new Date()
  const seconds = Math.floor((now - new Date(date)) / 1000)

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const delta = Math.floor(seconds / secondsInUnit)
    if (delta >= 1) {
      return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-delta, unit)
    }
  }

  return 'just now'
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

onMounted(() => {
  // Procurar ID no array jsonData.jobs.
  const job = jsonData.jobs.find((job) => job.id == itemId)
  if (job) {
    job.description = job.description
      .replace(/class='\"/g, 'class="')
      .replace(/'>/g, '">')
      .replace(/\"'/g, '"')
      .replace(/%22/g, '"')
    data.value = job
  }
  const saved = localStorage.getItem('savedJobs')
  if (saved) savedJobs.value = JSON.parse(saved)
})
</script>
