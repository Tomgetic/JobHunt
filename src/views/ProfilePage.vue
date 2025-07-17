<!-- src/views/ProfilePage.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import CountrySelect from '@/components/CountrySelect.vue'
import DialCodeSelect from '@/components/DialCodeSelect.vue'
import countryCodes from '@/assets/CountryCodes.json'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

// For profile picture
const profilePic = computed(() => {
  if (auth.user?.profileImage) return auth.user.profileImage
  const name = auth.user?.username || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name[0])}&background=0D8ABC&color=fff&size=128`
})

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    auth.setProfileImage(reader.result as string)
  }
  reader.readAsDataURL(file)
}

// User settings
const settings = ref({
  username: auth.user?.username || '',
  email: auth.user?.email || '',
  birthdate: auth.user?.birthdate || '',
  country: auth.user?.country || '',
  phone: auth.user?.phone || '',
  phoneCode: auth.user?.phoneCode || countryCodes[0].dial_code,
})

const selectedCode = ref(auth.user?.phoneCode || '') // Default: user's saved dial code or empty
const showEmailConfirm = ref(false)
const pendingSettings = ref(null)
const showDeletePrompt = ref(false)
const showConfirmPrompt = ref(false)
const deletePassword = ref('')
const deleteError = ref('')

function saveSettings() {
  if (!auth.user) return
  // Validate all required fields
  if (
    !settings.value.username ||
    !settings.value.email ||
    !settings.value.birthdate ||
    !settings.value.country ||
    !settings.value.phone ||
    !selectedCode.value
  ) {
    alert('Please fill in all fields.')
    return
  }
  // Phone number validation (digits only)
  if (!/^\d+$/.test(settings.value.phone)) {
    alert('Please enter a valid phone number (digits only).')
    return
  }
  // Email already used check (exclude current user)
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (
    users.some(
      (u: any) => u.email === settings.value.email && u.email !== auth.user.email, // Exclude current user's own email
    )
  ) {
    alert('This email is already registered.')
    return
  }
  // Age check (e.g., 16+)
  const MIN_AGE = 16
  const birth = new Date(settings.value.birthdate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  if (age < MIN_AGE) {
    alert(`You must be at least ${MIN_AGE} years old to use this site.`)
    return
  }
  if (settings.value.email !== auth.user.email) {
    pendingSettings.value = { ...settings.value }
    showEmailConfirm.value = true
    return
  }
  applySettings(settings.value)
}

function applySettings(newSettings) {
  auth.user.username = newSettings.username
  auth.user.email = newSettings.email
  auth.user.birthdate = newSettings.birthdate
  auth.user.country = newSettings.country
  auth.user.phone = newSettings.phone
  auth.user.phoneCode = selectedCode.value

  // Update users array in localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const idx = users.findIndex((u) => u.email === auth.user?.email)
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...auth.user }
    localStorage.setItem('users', JSON.stringify(users))
  }
  localStorage.setItem('loggedInUser', JSON.stringify(auth.user))
  alert('Profile updated!')
}

// Delete account handler
function handleDeleteAccount() {
  // Simulate password check (replace with real check if you have backend)
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find((u) => u.email === auth.user?.email)
  if (!user || user.password !== deletePassword.value) {
    deleteError.value = 'Incorrect password.'
    return
  }
  // Remove user from localStorage
  const updatedUsers = users.filter((u) => u.email !== auth.user?.email)
  localStorage.setItem('users', JSON.stringify(updatedUsers))
  // Remove session
  auth.logout()
  showConfirmPrompt.value = false
  showDeletePrompt.value = false // <-- add this
  deletePassword.value = ''
  deleteError.value = ''
  // Redirect to home
  router.push('/')
  alert('Your account has been deleted.')
}
</script>

<template>
  <section class="max-w-4xl mx-auto py-8">
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Profile Sidebar -->
      <aside class="md:w-1/3 flex flex-col items-center bg-white rounded-lg shadow p-6">
        <div class="relative mb-4 group">
          <img :src="profilePic" alt="Profile" class="w-24 h-24 rounded-full" />
          <label
            for="profile-upload"
            class="absolute inset-0 flex items-center justify-center bg-gray-700/40 opacity-0 group-hover:opacity-100 text-white rounded-full cursor-pointer transition duration-200"
            title="Change profile picture"
            style="line-height: 0"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"
              />
            </svg>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden"
            />
          </label>
        </div>
        <h2 class="text-2xl font-bold mb-2">{{ auth.user?.username }}</h2>
        <p class="text-gray-600 mb-4">{{ auth.user?.email }}</p>
        <p class="text-gray-600 mb-4">Phone: {{ auth.user?.phoneCode }} {{ auth.user?.phone }}</p>
        <!-- prettier-ignore -->
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2 cursor-pointer transition"
          @click="auth.logout(); router.push('/')"
        >
          Logout
        </button>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <!-- Settings -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
          <h3 class="text-xl font-semibold mb-4">Settings</h3>
          <form @submit.prevent="saveSettings">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Username</label>
              <input
                v-model="settings.username"
                type="text"
                class="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Email</label>
              <input
                v-model="settings.email"
                type="email"
                class="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Birthdate</label>
              <input
                v-model="settings.birthdate"
                type="date"
                class="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div class="mb-4">
              <CountrySelect
                v-model="settings.country"
                label="Country"
                :aliases="{ 'United Kingdom': 'UK', 'United States': 'USA' }"
                labelClass="block text-sm font-medium mb-1"
                selectClass="border border-gray-300 p-2 w-full rounded"
                placeholder="Pick your country"
                required
              />
            </div>
            <div class="mb-4 flex gap-2 items-end">
              <div>
                <label class="block text-sm font-medium mb-1">Code</label>
                <DialCodeSelect v-model="selectedCode" :codes="countryCodes" />
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium mb-1">Phone</label>
                <input
                  v-model="settings.phone"
                  type="tel"
                  class="border border-gray-300 p-2 w-full rounded"
                  placeholder="123456789"
                />
              </div>
            </div>
            <!-- prettier-ignore -->
            <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer transition">
              Save Changes
            </button>
          </form>
        </div>

        <!-- Email Confirmation Modal -->
        <div
          v-if="showEmailConfirm"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div class="bg-white p-6 rounded shadow-lg w-80">
            <h2 class="text-lg font-bold mb-4 text-red-600">Confirm Email Change</h2>
            <p class="mb-4">
              Are you sure you want to change your email to
              <span class="font-bold">{{ pendingSettings.email }}</span
              >? This may affect how you log in.
            </p>
            <div class="flex justify-end gap-2">
              <!-- prettier-ignore -->
              <button class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer transition" @click="showEmailConfirm = false">
                Cancel
              </button>
              <!-- prettier-ignore -->
              <button
                class="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white cursor-pointer transition"
                @click="applySettings(pendingSettings); showEmailConfirm = false"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        <!-- Delete Account Button -->
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2 cursor-pointer transition"
          @click="showDeletePrompt = true"
        >
          Delete Account
        </button>

        <!-- First Prompt: Are you sure? -->
        <div
          v-if="showDeletePrompt"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div class="bg-white p-6 rounded shadow-lg w-80">
            <h2 class="text-lg font-bold mb-4 text-red-600">Delete Account</h2>
            <p class="mb-4">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div class="flex justify-end gap-2">
              <!-- prettier-ignore -->
              <button class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer transition" @click="showDeletePrompt = false">
                Cancel
              </button>
              <!-- prettier-ignore -->
              <button
                class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer transition"
                @click="showConfirmPrompt = true; showDeletePrompt = false"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <!-- Second Prompt: Password Check -->
        <div
          v-if="showConfirmPrompt"
          class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
        >
          <div class="bg-white p-6 rounded shadow-lg w-80">
            <h2 class="text-lg font-bold mb-4 text-red-600">Confirm Deletion</h2>
            <p class="mb-2">Please enter your password to confirm:</p>
            <input
              v-model="deletePassword"
              type="password"
              class="border border-gray-300 p-2 w-full rounded mb-2"
              placeholder="Password"
            />
            <div v-if="deleteError" class="text-red-600 text-sm mb-2">{{ deleteError }}</div>
            <div class="flex justify-end gap-2">
              <!-- prettier-ignore -->
              <button class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer transition" @click="showConfirmPrompt = false; deletePassword = ''; deleteError = ''">
                Cancel
              </button>
              <!-- prettier-ignore -->
              <button class="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer transition" @click="handleDeleteAccount">
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>
