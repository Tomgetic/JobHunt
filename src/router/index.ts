import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue' // or your default view
import About from '../views/AboutPage.vue'
import Job from '../views/JobItem.vue'
import SevedJobs from '../views/SavedJobs.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/job/:id', name: 'Job Details', component: Job },
  { path: '/saved_jobs', name: 'Saved Jobs', component: SevedJobs },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
