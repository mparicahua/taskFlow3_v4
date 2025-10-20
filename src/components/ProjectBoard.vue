<template>
    <div class="min-h-screen bg-slate-900 flex">
        <div class="w-64 bg-slate-800 flex flex-col">
            <div class="p-6 border-b border-slate-700">
                <div class="flex items-center">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 class="text-xl font-bold text-white">TodoList</h1>
                </div>
            </div>
            <nav class="flex-1 p-4">
                <ul class="space-y-2">
                    <li>
                        <button @click="volverADashboard"
                            class="w-full flex items-center px-4 py-2 text-gray-300 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors">
                            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Proyectos
                        </button>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="flex-1 flex flex-col">
            <header class="bg-slate-800 border-b border-slate-700 px-6 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-white mb-1">{{ proyecto.nombre }}</h2>
                        <p class="text-sm text-gray-400">{{ proyecto.descripcion }}</p>
                    </div>

                    <div class="flex items-center space-x-4">
                        <button class="p-2 text-gray-400 hover:text-gray-300 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </button>
                        <div class="flex -space-x-2">
                            <div v-for="miembro in proyecto.miembros" :key="miembro.id"
                                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-slate-800"
                                :style="{ backgroundColor: miembro.color }" :title="miembro.nombre">
                                {{ miembro.iniciales }}
                            </div>
                            <button
                                class="w-8 h-8 rounded-full flex items-center justify-center text-white bg-slate-600 hover:bg-slate-500 border-2 border-slate-800 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main class="flex-1 overflow-x-auto p-6">
                <div class="flex space-x-6 h-full">
                    <div class="flex-shrink-0 w-80">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-semibold text-white">Por Hacer</h3>
                                <span class="px-2 py-0.5 text-xs font-medium bg-slate-700 text-gray-300 rounded-full">3</span>
                            </div>
                            <button class="p-1 text-gray-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        <div class="space-y-3">
                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema01</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip01</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Alta</span>
                                    </div>
                                    <span class="text-xs text-gray-400">15 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">UI/UX</span>
                                        <span class="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded">Frontend</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-semibold">
                                        J
                                    </div>
                                </div>
                            </div>
                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema02</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip02</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Media</span>
                                    </div>
                                    <span class="text-xs text-gray-400">18 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Backend</span>
                                        <span class="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded">Database</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-xs text-white font-semibold">
                                        M
                                    </div>
                                </div>
                            </div>

                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema03</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip03</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Baja</span>
                                    </div>
                                    <span class="text-xs text-gray-400">20 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded">Docs</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-semibold">
                                        J
                                    </div>
                                </div>
                            </div>

                            <button @click="mostrarOffcanvas = true"
                                class="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-gray-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Agregar tarea</span>
                            </button>
                        </div>
                    </div>

                    <div class="flex-shrink-0 w-80">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-semibold text-white">En Progreso</h3>
                                <span class="px-2 py-0.5 text-xs font-medium bg-slate-700 text-gray-300 rounded-full">2</span>
                            </div>
                            <button class="p-1 text-gray-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        <div class="space-y-3">
                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema01</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip01</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Alta</span>
                                    </div>
                                    <span class="text-xs text-gray-400">16 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Backend</span>
                                        <span class="px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded">API</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-xs text-white font-semibold">
                                        M
                                    </div>
                                </div>
                            </div>

                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema02</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip02</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Media</span>
                                    </div>
                                    <span class="text-xs text-gray-400">19 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">Testing</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-semibold">
                                        J
                                    </div>
                                </div>
                            </div>

                            <button @click="mostrarOffcanvas = true"
                                class="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-gray-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Agregar tarea</span>
                            </button>
                        </div>
                    </div>

                    <div class="flex-shrink-0 w-80">
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-2">
                                <h3 class="text-lg font-semibold text-white">Completado</h3>
                                <span class="px-2 py-0.5 text-xs font-medium bg-slate-700 text-gray-300 rounded-full">1</span>
                            </div>
                            <button class="p-1 text-gray-400 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        <div class="space-y-3">
                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer opacity-75">
                                <div class="flex items-start space-x-2">
                                    <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <input id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                    <div class="flex-1">
                                        <h4 class="text-white font-medium mb-2">Tema01</h4>
                                        <div class="flex items-center justify-between">
                                            <div class="flex space-x-1">
                                                <span class="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded">Design</span>
                                            </div>
                                            <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-semibold">
                                                J
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button @click="mostrarOffcanvas = true"
                                class="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-gray-400 hover:text-white hover:border-slate-600 transition-colors flex items-center justify-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Agregar tarea</span>
                            </button>
                        </div>
                    </div>

                    <div class="flex-shrink-0 w-80">
                        <button
                            class="w-full h-full min-h-[200px] border-2 border-dashed border-slate-700 rounded-lg text-gray-400 hover:text-white hover:border-slate-600 transition-colors flex flex-col items-center justify-center space-y-2">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span class="font-medium">Agregar lista</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>


        <div v-if="mostrarOffcanvas" class="fixed inset-0 z-50 overflow-hidden">

            <div @click="mostrarOffcanvas = false" class="absolute inset-0 bg-black/50 transition-opacity"></div>

            <div class="absolute inset-y-0 right-0 max-w-md w-full bg-slate-800 shadow-xl">
                <div class="h-full flex flex-col">
                    <div class="px-6 py-4 border-b border-slate-700">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold text-white">Nueva Tarea</h3>
                            <button @click="mostrarOffcanvas = false" class="text-gray-400 hover:text-white transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Título de la tarea</label>
                            <input type="text" placeholder="Escribir una tarea increíble"
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                            <textarea rows="4" placeholder="Describe los detalles de la tarea..."
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Asignado a</label>
                            <select class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                                <option>Seleccionar persona</option>
                            </select>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                                <select class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                                    <option>Baja</option>
                                    <option selected>Media</option>
                                    <option>Alta</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Fecha límite</label>
                                <input type="date"
                                    class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Lista</label>
                            <select class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500">
                                <option>Por Hacer</option>
                                <option>En Progreso</option>
                                <option>Completado</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Etiquetas</label>
                            <div class="flex gap-2">
                                <input type="text" placeholder="Agregar etiqueta..."
                                    class="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                                <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Agregar
                                </button>
                            </div>

                            <div class="mt-3">
                                <p class="text-xs text-gray-400 mb-2">Etiquetas</p>
                                <div class="flex flex-wrap gap-2">
                                    <span class="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded cursor-pointer hover:bg-green-500/30">Frontend</span>
                                    <span class="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded cursor-pointer hover:bg-purple-500/30">Backend</span>
                                    <span class="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded cursor-pointer hover:bg-blue-500/30">UI/UX</span>
                                    <span class="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 rounded cursor-pointer hover:bg-orange-500/30">Testing</span>
                                    <span class="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded cursor-pointer hover:bg-red-500/30">Database</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 py-4 border-t border-slate-700 flex justify-end space-x-3">
                        <button @click="mostrarOffcanvas = false"
                            class="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors">
                            Cancelar
                        </button>
                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Guardar Tarea
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()


const proyecto = ref({
    id: null,
    nombre: '',
    descripcion: '',
    miembros: []
})


const mostrarOffcanvas = ref(false)

const loading = ref(true)

onMounted(async () => {
    await cargarProyecto()
})

const cargarProyecto = async () => {
    loading.value = true
    try {
        const proyectoId = route.params.id
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/user/${userStore.currentUser.id}`)
        const data = await response.json()

        if (data.success) {
            const proyectoEncontrado = data.data.find(p => p.id === parseInt(proyectoId))

            if (proyectoEncontrado) {
                proyecto.value = {
                    id: proyectoEncontrado.id,
                    nombre: proyectoEncontrado.nombre,
                    descripcion: proyectoEncontrado.descripcion,
                    miembros: proyectoEncontrado.proyecto_usuario_rol.map(pur => ({
                        id: pur.usuario.id,
                        nombre: pur.usuario.nombre,
                        iniciales: pur.usuario.iniciales,
                        color: pur.usuario.color_avatar
                    }))
                }
            } else {
                router.push('/dashboard')
            }
        }
    } catch (error) {
        console.error('Error al cargar proyecto:', error)
        router.push('/dashboard')
    } finally {
        loading.value = false
    }
}

const volverADashboard = () => {
    router.push('/dashboard')
}
</script>