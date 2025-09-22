<template>
  <div>
    <!-- Mostrar Login -->
    <LoginForm 
      v-if="currentView === 'login'"
      @switch-to-register="currentView = 'register'"
      @login-success="$emit('loginSuccess', $event)"
    />
    
    <!-- Mostrar Registro -->
    <RegisterForm 
      v-else-if="currentView === 'register'"
      @switch-to-login="currentView = 'login'"
      @register-success="$emit('registerSuccess', $event)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'

// Emits para comunicar con App.vue
const emit = defineEmits(['loginSuccess', 'registerSuccess'])

// Estado para controlar qué vista mostrar
const currentView = ref('login') // Inicia en login
</script>