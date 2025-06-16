import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue' // or your default view
import Jobs from '../views/JobsPage.vue'
import About from '../views/AboutPage.vue'
import Job from '../views/JobItem.vue'
import SavedJobs from '../views/SavedJobs.vue'
import Contact from '../views/ContactPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/jobs', name: 'Jobs', component: Jobs },
  { path: '/about', name: 'About', component: About },
  { path: '/job/:id', name: 'Job Details', component: Job },
  { path: '/saved_jobs', name: 'Saved Jobs', component: SavedJobs },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
