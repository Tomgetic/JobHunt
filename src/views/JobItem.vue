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
                    :title="
                      auth.isLoggedIn
                        ? isSaved(data.id)
                          ? 'Unsave job'
                          : 'Save job'
                        : 'Login to save jobs'
                    "
                    @click.stop="toggleSave(data.id)"
                    :disabled="!auth.isLoggedIn"
                    :class="[
                      'float-left ms-4 mt-4 text-gray-400 cursor-pointer',
                      isSaved(data.id) ? 'text-yellow-500' : 'text-gray-500',
                      isSaved(data.id) ? 'hover:text-gray-500' : 'hover:text-yellow-500',
                      !auth.isLoggedIn ? 'opacity-50 cursor-not-allowed' : '',
                    ]"
                    :aria-label="
                      auth.isLoggedIn
                        ? isSaved(data.id)
                          ? 'Unsave job'
                          : 'Save job'
                        : 'Login to save jobs'
                    "
                  >
                    <Star :size="16" />
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
          <div v-if="!auth.isLoggedIn" class="mb-8 text-center text-red-600 font-semibold">
            You must be logged in to apply for this job.
            <router-link to="/login" class="underline text-blue-700 ml-2">Login</router-link>
          </div>
          <form v-else class="my-5" @submit="handleApply">
            <div v-if="errorMsg" class="mb-2 text-red-600 text-sm">{{ errorMsg }}</div>
            <div v-if="successMsg" class="mb-2 text-green-600 text-sm">{{ successMsg }}</div>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="text-base mb-2 block">First Name</label>
                <input
                  v-model="firstName"
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
                  v-model="lastName"
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
                  v-model="email"
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
                  v-model="phone"
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
                  v-model="address"
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
                  v-model="coverLetter"
                  placeholder="Cover Letter"
                  class="w-full px-4 py-3 border-2 placeholder:text-offgreen-dark/50 rounded-md outline-none h-36 focus:ring-4 border-offgreen-medium focus:border-offgreen-dark ring-gray-100"
                  name="cover"
                ></textarea>
              </div>
            </div>
            <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-5">
              <div class="flex flex-col">
                <label class="text-base font-semibold mb-2 flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-offgreen-dark"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Attach Resume <span class="text-xs text-gray-500 ml-2">(PDF, DOC, DOCX)</span>
                </label>
                <div
                  class="border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3 bg-gray-50"
                >
                  <input
                    ref="resumeInput"
                    id="resume"
                    type="file"
                    name="resume"
                    accept="application/pdf,.doc,.docx"
                    class="hidden"
                    @change="onResumeChange"
                  />
                  <!-- prettier-ignore -->
                  <button
                    type="button"
                    class="inline-flex text-black bg-yellow-200 border border-yellow-200 rounded-full hover:border-black cursor-pointer justify-center px-8 py-3"
                    @click="$refs.resumeInput.click()"
                  >
                    Browse...
                  </button>
                  <span v-if="resumeFileName" class="text-sm text-gray-700 ml-2">{{
                    resumeFileName
                  }}</span>
                  <button
                    v-if="resumeFileName"
                    type="button"
                    class="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs cursor-pointer transition"
                    @click="clearResume"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <!-- prettier-ignore -->
              <button
                type="submit"
                class="inline-flex text-black bg-yellow-200 border border-yellow-200 rounded-full hover:border-black cursor-pointer justify-center px-8 py-3"
              >
                Apply Job
              </button>
            </div>
            <div v-if="errorMsg" class="mt-4 text-red-600 text-sm">{{ errorMsg }}</div>
            <div v-if="successMsg" class="mt-4 text-green-600 text-sm">{{ successMsg }}</div>
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
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const itemId = route.params.id
const data = ref(null)
const resumeFileName = ref('')
const errorMsg = ref('')
const successMsg = ref('')

// Form fields
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const country = ref('')
const coverLetter = ref('')
const resumeFile = ref<File | null>(null)
const BLOCK_DAYS = 7

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

function onResumeChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  resumeFile.value = file || null
  resumeFileName.value = file ? file.name : ''
}

function clearResume() {
  resumeFile.value = null
  resumeFileName.value = ''
  if ($refs.resumeInput) {
    ;($refs.resumeInput as HTMLInputElement).value = ''
  }
}

function getBlockKey() {
  // Use user email and job id as a unique key
  return `applied_${email.value || auth.user?.email || 'guest'}_${itemId}`
}

function isBlocked() {
  const key = getBlockKey()
  const lastApplied = localStorage.getItem(key)
  if (!lastApplied) return false
  const last = new Date(parseInt(lastApplied, 10))
  const now = new Date()
  const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays < BLOCK_DAYS
}

async function handleApply(e: Event) {
  e.preventDefault()
  errorMsg.value = ''
  successMsg.value = ''

  // Check block
  if (isBlocked()) {
    errorMsg.value = `You have already applied for this job. Please wait ${BLOCK_DAYS} days before applying again.`
    successMsg.value = ''
    return
  }

  // Validate all fields
  if (
    !firstName.value ||
    !lastName.value ||
    !email.value ||
    !phone.value ||
    !address.value ||
    !country.value ||
    !coverLetter.value ||
    !resumeFile.value
  ) {
    errorMsg.value = 'Please fill in all fields and attach your resume.'
    successMsg.value = ''
    return
  }

  // Validate phone number (only digits allowed)
  if (!/^\d+$/.test(phone.value)) {
    errorMsg.value = 'Please enter a valid phone number (digits only).'
    successMsg.value = ''
    return
  }

  // Prepare form data
  const formData = new FormData()
  formData.append('first_name', firstName.value)
  formData.append('last_name', lastName.value)
  formData.append('email', email.value)
  formData.append('phone', phone.value)
  formData.append('address', address.value)
  formData.append('country', country.value)
  formData.append('cover_letter', coverLetter.value)
  formData.append('resume', resumeFile.value)

  // Send to backend (replace URL with your endpoint)
  try {
    // Example POST request (replace with your API endpoint)
    // const response = await fetch('/api/apply', {
    //   method: 'POST',
    //   body: formData,
    // })
    // if (!response.ok) throw new Error('Failed to submit application')
    // successMsg.value = 'Application submitted successfully!'

    // Simulate success for demo:
    await new Promise((resolve) => setTimeout(resolve, 1000))
    successMsg.value = 'Application submitted successfully!'
    errorMsg.value = ''
    // Block further submissions for this job/user
    localStorage.setItem(getBlockKey(), Date.now().toString())
    // Optionally clear form
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    phone.value = ''
    address.value = ''
    country.value = ''
    coverLetter.value = ''
    clearResume()
  } catch (err) {
    errorMsg.value = 'Failed to submit application.'
    successMsg.value = ''
    // Do NOT set the block key or clear the form
  }
}

onMounted(() => {
  const job = jsonData.jobs.find((job) => job.id == itemId)
  if (job) {
    job.description = job.description
      .replace(/class='\"/g, 'class="')
      .replace(/'>/g, '">')
      .replace(/\"'/g, '"')
      .replace(/%22/g, '"')
    data.value = job
  }
  // Do NOT show the block message on mount.
  // Only show it after a successful submission or when submitting.
})
</script>
