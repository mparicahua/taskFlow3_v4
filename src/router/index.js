// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/userStore'

import LandingPage from '../components/LandingPage.vue'
import AuthContainer from '../components/AuthContainer.vue'
import Dashboard from '../components/Dashboard.vue'
import ProjectBoard from '../components/ProjectBoard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
    meta: { requiresAuth: false }
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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  
  // Restaurar sesión si hay tokens
  if (!userStore.isLoggedIn) {
    userStore.restoreSession()
  }
  
  // Verificar token si está autenticado
  if (userStore.isLoggedIn && to.meta.requiresAuth) {
    try {
      const isValid = await userStore.verifyToken()
      if (!isValid) {
        userStore.clearSession()
        return next('/login')
      }
    } catch (error) {
      console.error('Error al verificar token:', error)
      userStore.clearSession()
      return next('/login')
    }
  }
  
  // Proteger rutas autenticadas
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  }
  // Redirigir usuarios autenticados fuera de login
  else if (to.meta.requiresGuest && userStore.isLoggedIn) {
    next('/dashboard')
  }
  else {
    next()
  }
})

export default router