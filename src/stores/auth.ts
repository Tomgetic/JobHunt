import { defineStore } from 'pinia'

interface User {
  username: string
  email: string
  password?: string
  birthdate?: string
  country?: string
  phone?: string
  phoneCode?: string
  profileImage?: string
  savedJobs?: string[]
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    register(payload: User & { password: string }) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some((u: any) => u.email === payload.email || u.username === payload.username)) {
        this.error = 'User already exists'
        return false
      }
      users.push(payload)
      localStorage.setItem('users', JSON.stringify(users))
      this.error = null
      return true
    },
    login({ email, password }: { email: string; password: string }) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(
        (u: any) => (u.email === email || u.username === email) && u.password === password,
      )
      if (user) {
        this.user = { ...user }
        this.token = '-token'
        localStorage.setItem('loggedInUser', JSON.stringify(this.user))
        this.error = null
        return true
      } else {
        this.error = 'Invalid credentials'
        return false
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('loggedInUser')
    },
    loadUser() {
      const user = localStorage.getItem('loggedInUser')
      if (user) {
        this.user = JSON.parse(user)
        this.token = '-token'
      }
    },
    setProfileImage(image: string) {
      if (!this.user) return
      this.user.profileImage = image

      // Update users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const idx = users.findIndex((u: any) => u.email === this.user?.email)
      if (idx !== -1) {
        users[idx].profileImage = image
        localStorage.setItem('users', JSON.stringify(users))
      }

      // Update logged in user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(this.user))
    },
    saveJob(jobId: string) {
      if (!this.user) return
      if (!this.user.savedJobs) this.user.savedJobs = []
      if (!this.user.savedJobs.includes(jobId)) {
        this.user.savedJobs.push(jobId)
        this._updateUserInStorage()
      }
    },
    unsaveJob(jobId: string) {
      if (!this.user || !this.user.savedJobs) return
      this.user.savedJobs = this.user.savedJobs.filter((id: string) => id !== jobId)
      this._updateUserInStorage()
    },
    isJobSaved(jobId: string) {
      return (
        !!this.user && Array.isArray(this.user.savedJobs) && this.user.savedJobs.includes(jobId)
      )
    },
    _updateUserInStorage() {
      // Update users array in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const idx = users.findIndex((u: any) => u.email === this.user?.email)
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...this.user }
        localStorage.setItem('users', JSON.stringify(users))
      }
      // Update logged in user in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(this.user))
    },
  },
})
