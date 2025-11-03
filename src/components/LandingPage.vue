<template>
  <div class="min-h-screen bg-slate-900">
    <nav class="fixed w-full bg-slate-800 backdrop-blur-md border-b border-slate-700 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3 cursor-pointer" @click="scrollToTop">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span class="text-2xl font-bold text-white">TaskFlow3</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a @click="scrollToSection('features')" class="text-gray-300 hover:text-white transition-colors cursor-pointer">Características</a>
            <a @click="scrollToSection('benefits')" class="text-gray-300 hover:text-white transition-colors cursor-pointer">Beneficios</a>
            <button @click="goToLogin"
              class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg">
              {{ isLoggedIn ? 'Ir al Dashboard' : 'Iniciar Sesión' }}
            </button>
          </div>
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-slate-700">
          <a @click="scrollToSection('features')" class="block py-2 text-gray-300 hover:text-white cursor-pointer">Características</a>
          <a @click="scrollToSection('benefits')" class="block py-2 text-gray-300 hover:text-white cursor-pointer">Beneficios</a>
          <button @click="goToLogin" class="w-full mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">
            {{ isLoggedIn ? 'Dashboard' : 'Login' }}
          </button>
        </div>
      </div>
    </nav>

    <section class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">

          <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Gestiona tus tareas
            <br />
            <span class="text-blue-500">de forma simple</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            La herramienta minimalista de gestión de tareas diseñada para estudiantes y profesionales.
            Sin complicaciones, solo lo esencial para ser más productivo.
          </p>

          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button @click="goToLogin"
              class="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2">
              <span>Comenzar Gratis</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button @click="scrollToSection('features')"
              class="px-8 py-4 bg-slate-800 border-2 border-slate-700 text-white font-bold rounded-lg hover:bg-slate-700 transition-all">
              Ver características
            </button>
          </div>
          <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">100%</div>
              <div class="text-sm text-gray-400">Gratuito</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">3min</div>
              <div class="text-sm text-gray-400">Para empezar</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
              <div class="text-sm text-gray-400">Proyectos</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="py-20 bg-slate-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Todo lo que necesitas
          </h2>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Características diseñadas para maximizar tu productividad sin complicaciones
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Súper Rápido</h3>
            <p class="text-gray-400 leading-relaxed">
              Crea tu primera tarea en menos de 3 minutos. Interfaz intuitiva sin curvas de aprendizaje.
            </p>
          </div>

          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Tableros Kanban</h3>
            <p class="text-gray-400 leading-relaxed">
              Visualiza tu progreso con tableros estilo Kanban. Arrastra y suelta tareas entre columnas.
            </p>
          </div>

          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Colaboración</h3>
            <p class="text-gray-400 leading-relaxed">
              Trabaja en equipo. Comparte proyectos y asigna tareas a tus compañeros fácilmente.
            </p>
          </div>

          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Etiquetas</h3>
            <p class="text-gray-400 leading-relaxed">
              Organiza tus tareas con etiquetas personalizables. Colores que facilitan la identificación.
            </p>
          </div>
          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Fechas Límite</h3>
            <p class="text-gray-400 leading-relaxed">
              Establece fechas de vencimiento y prioridades. Mantén el control de tus deadlines.
            </p>
          </div>
          <div class="bg-slate-900 border border-slate-700 rounded-xl p-8 hover:border-blue-600 transition-all hover:transform hover:-translate-y-1">
            <div class="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Seguro</h3>
            <p class="text-gray-400 leading-relaxed">
              Tus datos están protegidos. Autenticación segura y encriptación de contraseñas.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section id="benefits" class="py-20 bg-slate-900">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
              Diseñado para estudiantes
            </h2>
            <p class="text-xl text-gray-300 mb-8 leading-relaxed">
              TaskFlow3 nació como un proyecto universitario con un objetivo claro: simplificar la gestión de tareas para estudiantes que no necesitan herramientas corporativas complejas.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Proyectos Académicos</h3>
                  <p class="text-gray-400">Organiza trabajos grupales y tareas individuales en un solo lugar.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Sin Distracciones</h3>
                  <p class="text-gray-400">Interfaz limpia y minimalista que te permite enfocarte en lo importante.</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-2">Completamente Gratis</h3>
                  <p class="text-gray-400">Sin planes premium ni funciones bloqueadas. Todo gratis, para siempre.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="bg-slate-800 border border-slate-700 rounded-2xl p-8">
              <div class="bg-slate-900 rounded-xl p-6 shadow-2xl">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-white font-semibold">Proyecto Final</h3>
                  <span class="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">En progreso</span>
                </div>
                <div class="space-y-3">
                  <div class="bg-slate-800 border border-slate-700 p-3 rounded-lg">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300 text-sm">Investigación</span>
                      <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div class="bg-slate-800 border border-slate-700 p-3 rounded-lg">
                    <div class="flex items-center justify-between">
                      <span class="text-gray-300 text-sm">Desarrollo</span>
                      <div class="w-20 bg-slate-700 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: 60%"></div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-slate-800 border border-slate-700 p-3 rounded-lg opacity-50">
                    <span class="text-gray-400 text-sm">Presentación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-800">
      <div class="max-w-4xl mx-auto text-center px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para ser más productivo?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Únete hoy y comienza a organizar tus tareas de manera efectiva
        </p>
        <button @click="goToLogin"
          class="px-10 py-5 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
          Comenzar Gratis →
        </button>
        <p class="text-gray-400 text-sm mt-4">No se requiere tarjeta de crédito</p>
      </div>
    </section>

    <footer class="bg-slate-900 border-t border-slate-800 py-12">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-white">TaskFlow3</span>
            </div>
            <p class="text-gray-400 text-sm">
              Gestión de tareas simple y efectiva para estudiantes y profesionales.
            </p>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Producto</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><a @click="scrollToSection('features')" class="hover:text-white transition-colors cursor-pointer">Características</a></li>
              <li><a @click="scrollToSection('benefits')" class="hover:text-white transition-colors cursor-pointer">Beneficios</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Proyecto</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li>Universidad Católica San Pablo</li>
              <li>Desarrollo Basado en Plataformas</li>
              <li>Semestre 2025-2</li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-semibold mb-4">Equipo</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li>Ian Anci Alvarez</li>
              <li>Arturo Benavente Vilca</li>
              <li>Rodrigo Diaz Cucalon</li>
              <li>Mharco Paricahua Akutak</li>
            </ul>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Términos de Servicio</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const mobileMenuOpen = ref(false)

const isLoggedIn = computed(() => userStore.isLoggedIn)

const goToLogin = () => {
  mobileMenuOpen.value = false
  if (isLoggedIn.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}

const scrollToSection = (sectionId) => {
  mobileMenuOpen.value = false
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>