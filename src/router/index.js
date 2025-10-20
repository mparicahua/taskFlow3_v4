import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'


import AuthContainer from '../components/AuthContainer.vue'
import Dashboard from '../components/Dashboard.vue'
import ProjectBoard from '../components/ProjectBoard.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthContainer,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/proyecto/:id',
    name: 'ProjectBoard',
    component: ProjectBoard,
    meta: { requiresAuth: true },
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  

  if (!userStore.isLoggedIn) {
    userStore.restoreSession()
  }
  

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  }

  else if (to.meta.requiresGuest && userStore.isLoggedIn) {
    next('/dashboard')
  }

  else {
    next()
  }
})

export default router