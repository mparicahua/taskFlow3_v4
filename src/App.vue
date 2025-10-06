<template>
  <div>
    <!-- Vista de Autenticación -->
    <AuthContainer 
      v-if="!userStore.isLoggedIn"
      @login-success="handleLoginSuccess"
      @register-success="handleRegisterSuccess"
    />
    
    <!-- Dashboard -->
    <Dashboard 
      v-else
      @logout="handleLogout"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from './stores/userStore'
import AuthContainer from './components/AuthContainer.vue'
import Dashboard from './components/Dashboard.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.restoreSession()
})

// Manejar login exitoso
const handleLoginSuccess = (userData) => {
  userStore.login(userData)
}

// Manejar registro exitoso
const handleRegisterSuccess = (userData) => {
  userStore.login(userData)
}

// Manejar logout
const handleLogout = () => {
  userStore.logout()
}
</script>