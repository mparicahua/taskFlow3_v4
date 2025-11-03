<template>
    <div class="min-h-screen bg-slate-900 flex">
        <div class="hidden md:flex md:w-64 bg-slate-800 flex-col">
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

        <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 md:hidden"></div>
        <transition name="slide">
            <div v-if="sidebarOpen" class="fixed inset-y-0 left-0 w-64 bg-slate-800 z-50 flex flex-col md:hidden">
                <div class="p-6 border-b border-slate-700 flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h1 class="text-xl font-bold text-white">TodoList</h1>
                    </div>
                    <button @click="sidebarOpen = false" class="text-gray-400 hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
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
        </transition>

        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="bg-slate-800 border-b border-slate-700 px-6 py-4 flex-shrink-0">
                <div class="flex items-center justify-between">
                    <!-- Botón Hamburguesa (solo móvil) -->
                    <button @click="sidebarOpen = true" class="md:hidden text-gray-400 hover:text-white mr-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

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
                <div class="flex space-x-6 h-full min-w-min pb-4">

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
                        </div>

                        <button @click="mostrarOffcanvas = true"
                            class="w-full mt-4 py-2 border-2 border-dashed border-slate-600 text-gray-400 rounded-lg hover:border-slate-500 hover:text-gray-300 transition-colors flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva Tarea
                        </button>
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
                                <h4 class="text-white font-medium mb-2">Tema04</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip04</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Alta</span>
                                    </div>
                                    <span class="text-xs text-gray-400">12 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">API</span>
                                        <span class="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">Backend</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-semibold">
                                        A
                                    </div>
                                </div>
                            </div>

                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema05</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip05</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Media</span>
                                    </div>
                                    <span class="text-xs text-gray-400">22 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded">Testing</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs text-white font-semibold">
                                        L
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button @click="mostrarOffcanvas = true"
                            class="w-full mt-4 py-2 border-2 border-dashed border-slate-600 text-gray-400 rounded-lg hover:border-slate-500 hover:text-gray-300 transition-colors flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva Tarea
                        </button>
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
                            <div class="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer">
                                <h4 class="text-white font-medium mb-2">Tema06</h4>
                                <p class="text-sm text-gray-400 mb-3">Descrip06</p>

                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center space-x-1">
                                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span class="text-xs text-gray-400">Baja</span>
                                    </div>
                                    <span class="text-xs text-gray-400">10 Sep</span>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex space-x-1">
                                        <span class="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded">Docs</span>
                                    </div>
                                    <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs text-white font-semibold">
                                        M
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button @click="mostrarOffcanvas = true"
                            class="w-full mt-4 py-2 border-2 border-dashed border-slate-600 text-gray-400 rounded-lg hover:border-slate-500 hover:text-gray-300 transition-colors flex items-center justify-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Nueva Tarea
                        </button>
                    </div>
                    <div class="flex-shrink-0 w-80">
                        <button
                            @click="abrirModalLista"
                            class="w-full h-full min-h-[200px] border-2 border-dashed border-slate-600 text-gray-400 rounded-lg hover:border-slate-500 hover:text-gray-300 hover:bg-slate-800/30 transition-colors flex flex-col items-center justify-center">
                            <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span class="font-medium">Nueva Lista</span>
                        </button>
                    </div>
                </div>
            </main>

            <div v-if="mostrarOffcanvas" @click.self="mostrarOffcanvas = false"
                class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div class="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between z-10">
                        <h3 class="text-xl font-bold text-white">Nueva Tarea</h3>
                        <button @click="mostrarOffcanvas = false"
                            class="text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Título</label>
                            <input type="text" placeholder="Título de la tarea..."
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                            <textarea rows="4" placeholder="Describe la tarea..."
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"></textarea>
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
            <div v-if="mostrarModalLista" @click.self="cerrarModalLista"
                class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div class="bg-slate-800 rounded-lg w-full max-w-md">
                    <div class="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                        <h3 class="text-xl font-bold text-white">Nueva Lista</h3>
                        <button @click="cerrarModalLista" class="text-gray-400 hover:text-white transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="crearLista" class="p-6 space-y-4">
                        <!-- Error Message -->
                        <div v-if="errorLista" class="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                            {{ errorLista }}
                        </div>

                        <!-- Nombre -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                Nombre de la lista <span class="text-red-400">*</span>
                            </label>
                            <input 
                                v-model="formularioLista.nombre" 
                                type="text" 
                                placeholder="Ej: Pendientes, En proceso..." 
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                required
                                maxlength="100"
                            >
                        </div>

                        <!-- Orden (opcional) -->
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">
                                Orden <span class="text-gray-500 text-xs">(opcional)</span>
                            </label>
                            <input 
                                v-model.number="formularioLista.orden" 
                                type="number" 
                                min="0"
                                placeholder="0" 
                                class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            >
                            <p class="text-xs text-gray-400 mt-1">Define el orden de visualización de las listas</p>
                        </div>

                        <!-- Botones -->
                        <div class="flex justify-end space-x-3 pt-4">
                            <button 
                                @click="cerrarModalLista" 
                                type="button"
                                class="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors">
                                Cancelar
                            </button>
                            <button 
                                type="submit"
                                :disabled="loadingLista"
                                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
                                <svg v-if="loadingLista" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ loadingLista ? 'Creando...' : 'Crear Lista' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</template>

<!-- 
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
const sidebarOpen = ref(false)
const loading = ref(true)


///////////////////
// Modal para nueva lista
const mostrarModalLista = ref(false)
const formularioLista = ref({
    nombre: '',
    orden: 0
})
const loadingLista = ref(false)
const errorLista = ref('')

const cerrarModalLista = () => {
    mostrarModalLista.value = false
    formularioLista.value = { nombre: '', orden: 0 }
    errorLista.value = ''
}

const crearLista = () => {
    if (!formularioLista.value.nombre.trim()) {
        errorLista.value = 'El nombre de la lista es requerido'
        return
    }

    console.log('Crear lista:', formularioLista.value)
    cerrarModalLista()
}
//////////////////







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
</script> -->

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
const sidebarOpen = ref(false)
const loading = ref(true)
const abrirModalLista = () => {
    formularioLista.value = { nombre: '', orden: 0 }
    errorLista.value = ''
    mostrarModalLista.value = true
}
const mostrarModalLista = ref(false)
const formularioLista = ref({
    nombre: '',
    orden: 0
})
const loadingLista = ref(false)
const errorLista = ref('')

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

const cerrarModalLista = () => {
    mostrarModalLista.value = false
    formularioLista.value = { nombre: '', orden: 0 }
    errorLista.value = ''
}

const crearLista = () => {
    if (!formularioLista.value.nombre.trim()) {
        errorLista.value = 'El nombre de la lista es requerido'
        return
    }

    console.log('Crear lista:', formularioLista.value)
    cerrarModalLista()
}
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>