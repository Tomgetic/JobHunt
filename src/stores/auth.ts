import { defineStore } from 'pinia'

interface User {
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
  }),
  actions: {
    register({ username, email, password, birthdate, country, phone }: { username: string; email: string; password: string; birthdate: string; country: string; phone: string }) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      if (users.some((u: any) => u.email === email || u.username === username)) {
        this.error = 'User already exists'
        return false
      }
      users.push({ username, email, password , birthdate, country, phone })
      localStorage.setItem('users', JSON.stringify(users))
      this.error = null
      return true
    },
    login({ email, password }: { email: string; password: string }) {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: any) => (u.email === email || u.username === email) && u.password === password)
      if (user) {
        this.user = { username: user.username, email: user.email }
        this.token = 'demo-token'
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
        this.token = 'demo-token'
      }
    }
  }
})
