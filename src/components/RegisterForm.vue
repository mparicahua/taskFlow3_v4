<template>
    <div class="min-h-screen flex">
        <div class="w-full lg:w-1/2 bg-slate-900 flex items-center justify-center p-8">
            <div class="max-w-md w-full space-y-8">
                <!-- Header con botón de tema -->
                <div class="flex justify-end">
                    <button class="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                </div>
                <div class="text-center">
                    <h2 class="text-3xl font-bold text-white mb-2">
                        Crear Cuenta
                    </h2>
                    <p class="text-sm text-gray-400">
                        ¿Ya tienes cuenta?
                        <button @click="$emit('switchToLogin')" class="text-blue-400 hover:text-blue-300 font-medium">
                            Iniciar sesión
                        </button>
                    </p>
                </div>
                <div class="space-y-6">
                    <button @click="registerWithGoogle"
                        class="w-full flex justify-center items-center px-4 py-3 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Registrarse con Google
                    </button>
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-600"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-slate-900 text-gray-400">O continúa con</span>
                        </div>
                    </div>
                    <form @submit.prevent="handleRegister" class="space-y-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                                Nombre completo
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input id="name" v-model="form.name" type="text" required
                                    class="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Juan Pérez">
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div class="relative">

                                <input id="email" v-model="form.email" type="email" required
                                    class="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-600 placeholder-gray-500 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="tu@ejemplo.com">
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                                Contraseña
                            </label>
                            <div class="relative">
                                <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                                    required
                                    class="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-600 placeholder-gray-500 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••">
                                <button type="button" @click="showPassword = !showPassword"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg v-if="!showPassword" class="h-5 w-5 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg v-else class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.76 6.76m3.118 3.118l4.242 4.242M19.24 6.76L16.122 9.878" />
                                    </svg>
                                </button>
                            </div>
                            
                        </div>
                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                                Confirmar contraseña
                            </label>
                            <div class="relative">
                                <input id="confirmPassword" v-model="form.confirmPassword"
                                    :type="showConfirmPassword ? 'text' : 'password'" required
                                    class="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-600 placeholder-gray-500 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="••••••••">
                                <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                    class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <svg v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <svg v-else class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.76 6.76m3.118 3.118l4.242 4.242M19.24 6.76L16.122 9.878" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div>
                            <button type="submit" :disabled="isLoading"
                                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                                <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                </span>
                                {{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}
                            </button>
                        </div>
                        <div class="text-center">
                            <p class="text-xs text-gray-400">
                                Al continuar, aceptas nuestros
                                <a href="#" class="text-blue-400 hover:text-blue-300">Términos de Servicio</a>
                                y
                                <a href="#" class="text-blue-400 hover:text-blue-300">Política de Privacidad</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="hidden lg:flex lg:w-1/2 bg-blue-600 relative">
            <div class="flex items-center justify-center w-full">
                <div class="text-center">
                    <div class="flex items-center justify-center mb-4">
                        <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold text-white">TaskFlow3</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const emit = defineEmits(['switchToLogin'])
const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
})


const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const validateForm = () => {

    let isValid = true
    return isValid
}
const handleRegister = async () => {

    isLoading.value = true

    try {
        console.log('Registro exitoso:', {
            name: form.name,
            email: form.email,
            password: form.password
        })

    } catch (error) {
        console.error('Error en registro:', error)
        alert('Error al registrarse')
    } finally {
        isLoading.value = false
    }
}
const registerWithGoogle = () => {
    console.log('Registro con Google clickeado')
}
</script>