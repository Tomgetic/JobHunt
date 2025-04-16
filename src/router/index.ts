import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue' // or your default view
import About from '../views/About.vue'
import Job from '../views/Job.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/job/:id', name: 'Job Details', component: Job },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
