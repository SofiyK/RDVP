import {createRouter, createWebHistory} from 'vue-router'
import Homepage from './components/Homepage'
import Rating from "./components/Rating";
import LoginDialog from "./components/LoginDialog";

const routes = [
  {
    path: '/',
    component: Homepage

  },

  {
    path: '/rating',
    component: Rating,
  },
  {
    path: '/login',
    component: LoginDialog,
  },
  {
    path: '/signin',
    redirect: '/login'
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router;
