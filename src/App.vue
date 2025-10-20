<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'

const router = useRouter()
const userStore = useUserStore()


onMounted(() => {
  userStore.restoreSession()
  
  if (userStore.isLoggedIn && router.currentRoute.value.path === '/') {
    router.push('/dashboard')
  }
})
</script>