import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './components/Homepage'
import Rating from "./components/Rating";

const routes = [
  {
    path: '/',
    component: Homepage
  },

  {
    path: '/rating',
    component: Rating,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router;
