import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue' // or your default view
import Jobs from '../views/JobsPage.vue'
import About from '../views/AboutPage.vue'
import Job from '../views/JobItem.vue'
import SavedJobs from '../views/SavedJobs.vue'
import Contact from '../views/ContactPage.vue'
import Login from '../views/LoginPage.vue'
import Register from '../views/RegisterPage.vue'
import Profile from '../views/ProfilePage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/jobs', name: 'Jobs', component: Jobs },
  { path: '/about', name: 'About', component: About },
  { path: '/job/:id', name: 'Job Details', component: Job },
  { path: '/saved_jobs', name: 'Saved Jobs', component: SavedJobs },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
