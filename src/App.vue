<template>
  <div id="app" class="h-screen">
    <AuthContainer 
      v-if="currentPage === 'auth'"
      @login-success="goToDashboard"
    />
    <Dashboard 
      v-if="currentPage === 'dashboard'"
      @logout="goToAuth"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthContainer from './components/AuthContainer.vue'
import Dashboard from './components/Dashboard.vue'
const currentPage = ref('auth') // 'auth' | 'dashboard'

const goToDashboard = () => {
  currentPage.value = 'dashboard'
}
const goToAuth = () => {
  currentPage.value = 'auth'
}
</script>