<template>
    <div class="min-h-screen bg-slate-950 flex flex-col">
        <!-- HEADER SUPERIOR (consistente con Dashboard) -->
        <header class="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
            <div class="px-4 lg:px-6 py-3 flex items-center justify-between">
                <!-- Logo y título -->
                <div class="flex items-center space-x-4">
                    <button @click="toggleSidebar" class="lg:hidden text-gray-400 hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-white">{{ proyecto.nombre }}</h1>
                            <p class="text-xs text-gray-400 hidden sm:block">Tablero Kanban</p>
                        </div>
                    </div>
                </div>

                <!-- Acciones del header -->
                <div class="flex items-center space-x-2">
                    <button @click="abrirModalLista" class="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center text-sm">
                        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span class="hidden sm:inline">Nueva Lista</span>
                        <span class="sm:hidden">Lista</span>
                    </button>

                    <!-- Avatar del usuario -->
                    <div :style="{ backgroundColor: userStore.currentUser.color_avatar }" class="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity" :title="userStore.currentUser.nombre">
                        {{ userStore.currentUser.iniciales }}
                    </div>
                </div>
            </div>
        </header>

        <div class="flex flex-1 overflow-hidden">
            <!-- SIDEBAR (consistente con Dashboard) -->
            <!-- Overlay móvil -->
            <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>

            <!-- Sidebar -->
            <aside :class="['fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']">
                <!-- Header del sidebar -->
                <div class="p-4 border-b border-slate-800">
                    <div class="flex items-center justify-between mb-3">
                        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide">Proyecto</h2>
                        <button @click="sidebarOpen = false" class="lg:hidden text-gray-400 hover:text-white">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <h3 class="text-base font-bold text-white">{{ proyecto.nombre }}</h3>
                    <p v-if="proyecto.descripcion" class="text-sm text-gray-400 mt-1">{{ proyecto.descripcion }}</p>
                </div>

                <!-- Estadísticas del proyecto -->
                <div class="p-4 border-b border-slate-800">
                    <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Estadísticas</h3>
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-400">Listas</span>
                            <span class="text-sm font-semibold text-white">{{ listas.length }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-400">Total Tareas</span>
                            <span class="text-sm font-semibold text-white">{{ totalTareas }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-gray-400">Completadas</span>
                            <span class="text-sm font-semibold text-green-400">{{ tareasCompletadas }}</span>
                        </div>
                    </div>
                </div>

                <!-- Miembros del proyecto -->
                <div class="p-4 border-b border-slate-800 flex-1 overflow-y-auto">
                    <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Equipo ({{ proyecto.miembros.length }})</h3>
                    <div class="space-y-2">
                        <div v-for="miembro in proyecto.miembros" :key="miembro.id" class="flex items-center space-x-2 p-2 rounded hover:bg-slate-800/50 transition-colors">
                            <div :style="{ backgroundColor: miembro.color }" class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                {{ miembro.iniciales }}
                            </div>
                            <span class="text-sm text-gray-300 truncate">{{ miembro.nombre }}</span>
                        </div>
                    </div>
                </div>

                <!-- Botón volver al dashboard -->
                <div class="p-4 border-t border-slate-800">
                    <button @click="volverADashboard" class="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center font-medium">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        Volver al Dashboard
                    </button>
                </div>
            </aside>

            <!-- CONTENIDO PRINCIPAL - Tablero Kanban -->
            <main class="flex-1 overflow-hidden flex flex-col bg-slate-950">
                <!-- Loading -->
                <div v-if="loading" class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p class="mt-4 text-gray-400">Cargando tablero...</p>
                    </div>
                </div>

                <!-- Tablero con listas -->
                <div v-else class="flex-1 overflow-x-auto overflow-y-hidden p-6">
                    <div class="flex space-x-4 h-full pb-4">
                        <!-- Cada Lista (Columna) -->
                        <div v-for="lista in listas" :key="lista.id" class="flex-shrink-0 w-80 bg-slate-900 rounded-lg border border-slate-800 flex flex-col" style="max-height: calc(100vh - 180px);">
                            <!-- Header de la lista -->
                            <div class="p-4 border-b border-slate-800 flex-shrink-0">
                                <div class="flex items-center justify-between mb-2">
                                    <h3 class="font-semibold text-white text-base">{{ lista.nombre }}</h3>
                                    <button @click="eliminarLista(lista)" class="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex items-center justify-between text-xs">
                                    <span class="text-gray-400">{{ lista.tareas ? lista.tareas.length : 0 }} tareas</span>
                                    <span class="text-green-400">{{ contarCompletadas(lista) }} completadas</span>
                                </div>
                            </div>

                            <!-- Área de tareas con scroll -->
                            <div class="flex-1 overflow-y-auto p-3 space-y-2 min-h-0" :data-lista-id="lista.id">
                                <!-- Tarjeta de Tarea -->
                                <div v-for="tarea in lista.tareas" :key="tarea.id" :data-tarea-id="tarea.id" class="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-slate-600 transition-all cursor-move hover:shadow-lg group">
                                    <!-- Título y checkbox -->
                                    <div class="flex items-start justify-between mb-2">
                                        <div class="flex items-start space-x-2 flex-1 min-w-0">
                                            <input type="checkbox" :checked="tarea.completada" @change="toggleCompletada(tarea)" class="mt-1 w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer flex-shrink-0">
                                            <h4 :class="['text-sm font-medium flex-1 break-words', tarea.completada ? 'line-through text-gray-500' : 'text-white']">
                                                {{ tarea.titulo }}
                                            </h4>
                                        </div>
                                        <button @click="abrirModalEditarTarea(tarea)" class="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white ml-2 p-1 hover:bg-slate-700 rounded transition-all flex-shrink-0">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    </div>

                                    <!-- Descripción -->
                                    <p v-if="tarea.descripcion" class="text-xs text-gray-400 mb-2 line-clamp-2">
                                        {{ tarea.descripcion }}
                                    </p>

                                    <!-- Footer: Prioridad, Fecha, Asignado -->
                                    <div class="flex items-center justify-between text-xs mt-3">
                                        <div class="flex items-center space-x-2">
                                            <!-- Prioridad -->
                                            <span :class="[
                                                'px-2 py-0.5 rounded font-medium',
                                                tarea.prioridad === 'Alta' ? 'bg-red-500/20 text-red-400' :
                                                tarea.prioridad === 'Media' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-green-500/20 text-green-400'
                                            ]">
                                                {{ tarea.prioridad }}
                                            </span>

                                            <!-- Fecha -->
                                            <span v-if="tarea.fecha_vencimiento" class="text-gray-400 flex items-center">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {{ formatearFecha(tarea.fecha_vencimiento) }}
                                            </span>
                                        </div>

                                        <!-- Usuario asignado -->
                                        <div v-if="tarea.usuario" :style="{ backgroundColor: tarea.usuario.color_avatar }" class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold" :title="tarea.usuario.nombre">
                                            {{ tarea.usuario.iniciales }}
                                        </div>
                                    </div>

                                    <!-- Etiquetas -->
                                    <div v-if="tarea.tarea_etiqueta && tarea.tarea_etiqueta.length > 0" class="flex flex-wrap gap-1 mt-2">
                                        <span v-for="te in tarea.tarea_etiqueta" :key="te.id" :style="{ backgroundColor: te.etiqueta.color + '33', color: te.etiqueta.color }" class="px-2 py-0.5 rounded text-xs font-medium">
                                            {{ te.etiqueta.nombre }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Mensaje si no hay tareas -->
                                <div v-if="!lista.tareas || lista.tareas.length === 0" class="text-center text-gray-500 text-sm py-8">
                                    <svg class="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p>No hay tareas</p>
                                </div>
                            </div>

                            <!-- Botón añadir tarea al final de la lista -->
                            <div class="p-3 border-t border-slate-800 flex-shrink-0">
                                <button @click="abrirModalTarea(lista.id)" class="w-full px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center group">
                                    <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Añadir tarea
                                </button>
                            </div>
                        </div>

                        <!-- Botón Nueva Lista (al final) -->
                        <div class="flex-shrink-0 w-80">
                            <button @click="abrirModalLista" class="w-full h-32 bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-lg text-gray-400 hover:border-slate-500 hover:text-gray-300 hover:bg-slate-800/30 transition-all flex flex-col items-center justify-center group">
                                <svg class="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                                <span class="font-medium">Nueva Lista</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <!-- MODAL: Nueva/Editar Tarea -->
        <div v-if="mostrarModalTarea" @click.self="cerrarModalTarea" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div class="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between z-10">
                    <h3 class="text-xl font-bold text-white">
                        {{ modoEdicionTarea ? 'Editar Tarea' : 'Nueva Tarea' }}
                    </h3>
                    <button @click="cerrarModalTarea" class="text-gray-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="modoEdicionTarea ? actualizarTarea() : crearTarea()" class="p-6 space-y-4">
                    <!-- Error Message -->
                    <div v-if="errorTarea" class="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-start">
                        <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ errorTarea }}
                    </div>

                    <!-- Título -->
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Título <span class="text-red-400">*</span>
                        </label>
                        <input v-model="formularioTarea.titulo" type="text" required placeholder="Título de la tarea..." maxlength="150" class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <!-- Descripción -->
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                        <textarea v-model="formularioTarea.descripcion" rows="4" placeholder="Describe la tarea..." class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"></textarea>
                    </div>

                    <!-- Prioridad y Fecha -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Prioridad</label>
                            <select v-model="formularioTarea.prioridad" class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                <option value="Baja">Baja</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha límite</label>
                            <input v-model="formularioTarea.fecha_vencimiento" type="date" class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        </div>
                    </div>

                    <!-- Lista (solo en modo creación) -->
                    <div v-if="!modoEdicionTarea">
                        <label class="block text-sm font-medium text-gray-300 mb-2">Lista</label>
                        <select v-model="formularioTarea.lista_id" class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option v-for="lista in listas" :key="lista.id" :value="lista.id">
                                {{ lista.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Asignar a -->
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">Asignar a</label>
                        <select v-model="formularioTarea.asignado_a" class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option :value="null">Sin asignar</option>
                            <option v-for="miembro in proyecto.miembros" :key="miembro.id" :value="miembro.id">
                                {{ miembro.nombre }}
                            </option>
                        </select>
                    </div>

                    <!-- Botones -->
                    <div class="flex justify-between pt-4 border-t border-slate-700">
                        <!-- Botón eliminar (solo en modo edición) -->
                        <button v-if="modoEdicionTarea" @click="eliminarTarea" type="button" class="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium">
                            Eliminar
                        </button>
                        <div v-else></div>

                        <!-- Botones cancelar y guardar -->
                        <div class="flex space-x-3">
                            <button @click="cerrarModalTarea" type="button" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors font-medium">
                                Cancelar
                            </button>
                            <button type="submit" :disabled="loadingTarea" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium">
                                <svg v-if="loadingTarea" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {{ loadingTarea ? 'Guardando...' : 'Guardar' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <!-- MODAL: Nueva Lista -->
        <div v-if="mostrarModalLista" @click.self="cerrarModalLista" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-slate-800 rounded-lg w-full max-w-md shadow-2xl">
                <div class="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
                    <h3 class="text-xl font-bold text-white">Nueva Lista</h3>
                    <button @click="cerrarModalLista" class="text-gray-400 hover:text-white transition-colors p-1 hover:bg-slate-700 rounded">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="crearLista" class="p-6 space-y-4">
                    <!-- Error Message -->
                    <div v-if="errorLista" class="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-start">
                        <svg class="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ errorLista }}
                    </div>

                    <!-- Nombre -->
                    <div>
                        <label class="block text-sm font-medium text-gray-300 mb-2">
                            Nombre de la lista <span class="text-red-400">*</span>
                        </label>
                        <input v-model="formularioLista.nombre" type="text" required maxlength="100" placeholder="Ej: Por Hacer, En Progreso..." class="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>

                    <!-- Botones -->
                    <div class="flex justify-end space-x-3 pt-4">
                        <button @click="cerrarModalLista" type="button" class="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors font-medium">
                            Cancelar
                        </button>
                        <button type="submit" :disabled="loadingLista" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium">
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
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import Sortable from 'sortablejs'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// Estados
const proyecto = ref({
    id: null,
    nombre: '',
    descripcion: '',
    miembros: []
})

const listas = ref([])
const loading = ref(true)
const sidebarOpen = ref(false)

// Computed properties para estadísticas
const totalTareas = computed(() => {
    return listas.value.reduce((total, lista) => {
        return total + (lista.tareas ? lista.tareas.length : 0)
    }, 0)
})

const tareasCompletadas = computed(() => {
    return listas.value.reduce((total, lista) => {
        if (!lista.tareas) return total
        return total + lista.tareas.filter(t => t.completada).length
    }, 0)
})

// Modal Lista
const mostrarModalLista = ref(false)
const formularioLista = ref({
    nombre: '',
    orden: 0
})
const loadingLista = ref(false)
const errorLista = ref('')

// Modal Tarea
const mostrarModalTarea = ref(false)
const modoEdicionTarea = ref(false)
const tareaEditando = ref(null)
const formularioTarea = ref({
    lista_id: null,
    titulo: '',
    descripcion: '',
    prioridad: 'Media',
    fecha_vencimiento: null,
    asignado_a: null
})
const loadingTarea = ref(false)
const errorTarea = ref('')

// ==================== FUNCIONES DE UI ====================

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const contarCompletadas = (lista) => {
    if (!lista.tareas) return 0
    return lista.tareas.filter(t => t.completada).length
}

// ==================== FUNCIONES DE CARGA ====================

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
                
                await cargarListasYTareas()
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

const cargarListasYTareas = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lists/project/${proyecto.value.id}`)
        const data = await response.json()

        if (data.success) {
            listas.value = data.data
            
            await nextTick()
            inicializarDragAndDrop()
        }
    } catch (error) {
        console.error('Error al cargar listas:', error)
    }
}

// ==================== FUNCIONES DE LISTAS ====================

const abrirModalLista = () => {
    formularioLista.value = { nombre: '', orden: 0 }
    errorLista.value = ''
    mostrarModalLista.value = true
}

const cerrarModalLista = () => {
    mostrarModalLista.value = false
    formularioLista.value = { nombre: '', orden: 0 }
    errorLista.value = ''
}

const crearLista = async () => {
    if (!formularioLista.value.nombre.trim()) {
        errorLista.value = 'El nombre de la lista es requerido'
        return
    }

    loadingLista.value = true
    errorLista.value = ''

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proyecto_id: proyecto.value.id,
                nombre: formularioLista.value.nombre,
                orden: listas.value.length
            })
        })

        const data = await response.json()

        if (data.success) {
            listas.value.push({ ...data.data, tareas: [] })
            cerrarModalLista()
            
            await nextTick()
            inicializarDragAndDrop()
        } else {
            errorLista.value = data.message || 'Error al crear la lista'
        }
    } catch (error) {
        console.error('Error:', error)
        errorLista.value = 'Error de conexión con el servidor'
    } finally {
        loadingLista.value = false
    }
}

const eliminarLista = async (lista) => {
    if (!confirm(`¿Estás seguro de eliminar la lista "${lista.nombre}"? Las tareas serán archivadas.`)) {
        return
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/lists/${lista.id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        if (data.success) {
            listas.value = listas.value.filter(l => l.id !== lista.id)
        } else {
            alert(data.message || 'Error al eliminar la lista')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Error de conexión con el servidor')
    }
}

// ==================== FUNCIONES DE TAREAS ====================

const abrirModalTarea = (listaId) => {
    modoEdicionTarea.value = false
    tareaEditando.value = null
    formularioTarea.value = {
        lista_id: listaId,
        titulo: '',
        descripcion: '',
        prioridad: 'Media',
        fecha_vencimiento: null,
        asignado_a: null
    }
    errorTarea.value = ''
    mostrarModalTarea.value = true
}

const abrirModalEditarTarea = (tarea) => {
    modoEdicionTarea.value = true
    tareaEditando.value = tarea
    formularioTarea.value = {
        lista_id: tarea.lista_id,
        titulo: tarea.titulo,
        descripcion: tarea.descripcion || '',
        prioridad: tarea.prioridad,
        fecha_vencimiento: tarea.fecha_vencimiento ? tarea.fecha_vencimiento.split('T')[0] : null,
        asignado_a: tarea.asignado_a
    }
    errorTarea.value = ''
    mostrarModalTarea.value = true
}

const cerrarModalTarea = () => {
    mostrarModalTarea.value = false
    modoEdicionTarea.value = false
    tareaEditando.value = null
    formularioTarea.value = {
        lista_id: null,
        titulo: '',
        descripcion: '',
        prioridad: 'Media',
        fecha_vencimiento: null,
        asignado_a: null
    }
    errorTarea.value = ''
}

const crearTarea = async () => {
    if (!formularioTarea.value.titulo.trim()) {
        errorTarea.value = 'El título de la tarea es requerido'
        return
    }

    loadingTarea.value = true
    errorTarea.value = ''

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formularioTarea.value)
        })

        const data = await response.json()

        if (data.success) {
            const lista = listas.value.find(l => l.id === formularioTarea.value.lista_id)
            if (lista) {
                if (!lista.tareas) {
                    lista.tareas = []
                }
                lista.tareas.push(data.data)
            }
            
            cerrarModalTarea()
            
            await nextTick()
            inicializarDragAndDrop()
        } else {
            errorTarea.value = data.message || 'Error al crear la tarea'
        }
    } catch (error) {
        console.error('Error:', error)
        errorTarea.value = 'Error de conexión con el servidor'
    } finally {
        loadingTarea.value = false
    }
}

const actualizarTarea = async () => {
    if (!formularioTarea.value.titulo.trim()) {
        errorTarea.value = 'El título de la tarea es requerido'
        return
    }

    loadingTarea.value = true
    errorTarea.value = ''

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${tareaEditando.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: formularioTarea.value.titulo,
                descripcion: formularioTarea.value.descripcion,
                prioridad: formularioTarea.value.prioridad,
                fecha_vencimiento: formularioTarea.value.fecha_vencimiento,
                asignado_a: formularioTarea.value.asignado_a
            })
        })

        const data = await response.json()

        if (data.success) {
            const lista = listas.value.find(l => l.id === tareaEditando.value.lista_id)
            if (lista && lista.tareas) {
                const index = lista.tareas.findIndex(t => t.id === tareaEditando.value.id)
                if (index !== -1) {
                    lista.tareas[index] = data.data
                }
            }
            
            cerrarModalTarea()
        } else {
            errorTarea.value = data.message || 'Error al actualizar la tarea'
        }
    } catch (error) {
        console.error('Error:', error)
        errorTarea.value = 'Error de conexión con el servidor'
    } finally {
        loadingTarea.value = false
    }
}

const eliminarTarea = async () => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) {
        return
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${tareaEditando.value.id}`, {
            method: 'DELETE'
        })

        const data = await response.json()

        if (data.success) {
            const lista = listas.value.find(l => l.id === tareaEditando.value.lista_id)
            if (lista && lista.tareas) {
                lista.tareas = lista.tareas.filter(t => t.id !== tareaEditando.value.id)
            }
            
            cerrarModalTarea()
        } else {
            alert(data.message || 'Error al eliminar la tarea')
        }
    } catch (error) {
        console.error('Error:', error)
        alert('Error de conexión con el servidor')
    }
}

const toggleCompletada = async (tarea) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${tarea.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completada: !tarea.completada
            })
        })

        const data = await response.json()

        if (data.success) {
            tarea.completada = !tarea.completada
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

// ==================== DRAG & DROP ====================

const inicializarDragAndDrop = () => {
    const contenedores = document.querySelectorAll('[data-lista-id]')
    
    contenedores.forEach(contenedor => {
        Sortable.create(contenedor, {
            group: 'tareas',
            animation: 150,
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            onEnd: async (evt) => {
                const tareaId = parseInt(evt.item.dataset.tareaId)
                const nuevaListaId = parseInt(evt.to.dataset.listaId)
                const nuevoOrden = evt.newIndex
                
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${tareaId}/move`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            nueva_lista_id: nuevaListaId,
                            nuevo_orden: nuevoOrden
                        })
                    })
                    
                    const data = await response.json()
                    
                    if (data.success) {
                        await cargarListasYTareas()
                    }
                } catch (error) {
                    console.error('Error al mover tarea:', error)
                }
            }
        })
    })
}

// ==================== UTILIDADES ====================

const formatearFecha = (fecha) => {
    if (!fecha) return ''
    const date = new Date(fecha)
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

const volverADashboard = () => {
    router.push('/dashboard')
}

// ==================== LIFECYCLE ====================

onMounted(async () => {
    await cargarProyecto()
})
</script>

<style scoped>
.sortable-ghost {
    opacity: 0.4;
    background: #1e293b;
    border: 2px dashed #3b82f6;
}

.sortable-drag {
    opacity: 1;
    cursor: grabbing !important;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #1e293b;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #475569;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #64748b;
}
</style>