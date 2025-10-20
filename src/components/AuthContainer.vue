<template>
  <div>
    <!-- Mostrar Login -->
    <LoginForm 
      v-if="currentView === 'login'"
      @switch-to-register="currentView = 'register'"
      @login-success="handleLoginSuccess"
    />
    
    <!-- Mostrar Registro -->
    <RegisterForm 
      v-else-if="currentView === 'register'"
      @switch-to-login="currentView = 'login'"
      @register-success="handleRegisterSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

const router = useRouter()
const userStore = useUserStore()

const currentView = ref('login')

const handleLoginSuccess = (userData) => {
  userStore.login(userData)
  router.push('/dashboard')
}

const handleRegisterSuccess = (userData) => {
  userStore.login(userData)
  router.push('/dashboard')
}
</script>