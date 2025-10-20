<template>
  <div class="min-h-screen bg-slate-900 flex">
    <!-- Sidebar -->
    <div class="w-64 bg-slate-800 flex flex-col">
      <div class="p-6 border-b border-slate-700">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 class="text-xl font-bold text-white">TaskFlow3</h1>
        </div>
      </div>
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li>
            <a href="#" class="flex items-center px-4 py-2 text-blue-400 bg-blue-400/10 rounded-lg">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Proyectos
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col">
      <header class="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
        <h2 class="text-xl font-semibold text-white">Proyectos</h2>
        <div class="flex items-center space-x-4">
          <button class="p-2 text-gray-400 hover:text-gray-300 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div class="flex items-center space-x-3">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :style="{ backgroundColor: userStore.userColor }"
            >
              <span class="text-sm font-medium text-white">{{ userStore.userInitials }}</span>
            </div>
            <button @click="handleLogout" class="text-sm text-gray-400 hover:text-gray-300">
              Salir
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-auto">
        <div class="mb-6">
          <button
            @click="abrirModalCrear"
            class="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Proyecto
          </button>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p class="text-gray-400 mt-4">Cargando proyectos...</p>
        </div>

        <div v-else-if="proyectos.length === 0" class="text-center py-12">
          <p class="text-gray-400">No hay proyectos aún. ¡Crea tu primer proyecto!</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="proyecto in proyectos"
            :key="proyecto.id"
            class="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 
                  @click="abrirProyecto(proyecto)"
                  class="text-lg font-semibold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {{ proyecto.nombre }}
                </h3>
                <p class="text-sm text-gray-400 line-clamp-2">{{ proyecto.descripcion || 'Sin descripción' }}</p>
              </div>
              <div class="flex space-x-2 ml-4">
                <button 
                  @click="abrirModalEditar(proyecto)" 
                  class="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                  title="Editar proyecto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button 
                  @click="confirmarEliminar(proyecto)" 
                  class="p-1 text-gray-400 hover:text-red-400 transition-colors"
                  title="Eliminar proyecto"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="mb-4">
              <div class="flex items-center text-sm text-gray-400">
                <span class="mr-4">5 todos</span>
                <span class="text-green-400">3 completados</span>
              </div>
            </div>
            <div class="flex -space-x-2">
              <div
                v-for="miembro in proyecto.proyecto_usuario_rol.slice(0, 3)"
                :key="miembro.usuario.id"
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white border-2 border-slate-800"
                :style="{ backgroundColor: miembro.usuario.color_avatar }"
                :title="miembro.usuario.nombre"
              >
                {{ miembro.usuario.iniciales }}
              </div>
              <div
                v-if="proyecto.proyecto_usuario_rol.length > 3"
                class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-gray-400 bg-slate-700 border-2 border-slate-800"
              >
                +{{ proyecto.proyecto_usuario_rol.length - 3 }}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal Crear/Editar Proyecto -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="closeModal">
      <div class="bg-slate-800 rounded-lg p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-white">
            {{ modoEdicion ? 'Editar Proyecto' : 'Nuevo Proyecto' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="modoEdicion ? editarProyecto() : crearProyecto()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Título del Proyecto</label>
            <input
              v-model="formularioProyecto.nombre"
              type="text"
              placeholder="Escribir un proyecto increíble"
              required
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
            <textarea
              v-model="formularioProyecto.descripcion"
              placeholder="Describe los detalles del proyecto..."
              rows="3"
              class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          </div>

          <div class="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
            <label class="text-sm font-medium text-gray-300">Proyecto Colaborativo</label>
            <button
              type="button"
              @click="toggleColaborativo"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="formularioProyecto.es_colaborativo ? 'bg-blue-600' : 'bg-gray-600'"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                :class="formularioProyecto.es_colaborativo ? 'translate-x-6' : 'translate-x-1'"
              ></span>
            </button>
          </div>

          <!-- Gestión de miembros (solo si es colaborativo) -->
          <div v-if="formularioProyecto.es_colaborativo" class="space-y-4 border-t border-slate-600 pt-4">
            <!-- Miembros actuales en edición -->
            <div v-if="modoEdicion && miembrosProyecto.length > 0">
              <label class="block text-sm font-medium text-gray-300 mb-2">Miembros del Equipo</label>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <div
                  v-for="miembro in miembrosProyecto"
                  :key="miembro.usuario.id"
                  class="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      :style="{ backgroundColor: miembro.usuario.color_avatar }"
                    >
                      {{ miembro.usuario.iniciales }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">{{ miembro.usuario.nombre }}</p>
                      <p class="text-xs text-gray-400">{{ miembro.rol.nombre }}</p>
                    </div>
                  </div>
                  <button
                    v-if="miembro.rol.nombre !== 'Propietario'"
                    type="button"
                    @click="eliminarMiembro(miembro.usuario.id)"
                    class="text-red-400 hover:text-red-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Agregar nuevo miembro -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Agregar Miembros</label>
              <div class="flex flex-col sm:flex-row gap-2">
                <select
                  v-model="nuevoMiembro.usuario_id"
                  class="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar usuario...</option>
                  <option
                    v-for="usuario in usuariosDisponibles"
                    :key="usuario.id"
                    :value="usuario.id"
                  >
                    {{ usuario.nombre }} ({{ usuario.email }})
                  </option>
                </select>
                <select
                  v-model="nuevoMiembro.rol_id"
                  class="sm:w-40 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Rol...</option>
                  <option
                    v-for="rol in roles.filter(r => r.nombre !== 'Propietario')"
                    :key="rol.id"
                    :value="rol.id"
                  >
                    {{ rol.nombre }}
                  </option>
                </select>
                <button
                  type="button"
                  @click="agregarMiembroLista"
                  :disabled="!nuevoMiembro.usuario_id || !nuevoMiembro.rol_id"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  Agregar
                </button>
              </div>
            </div>

            <!-- Miembros seleccionados (solo en creación) -->
            <div v-if="!modoEdicion && miembrosSeleccionados.length > 0">
              <label class="block text-sm font-medium text-gray-300 mb-2">Miembros a Agregar</label>
              <div class="space-y-2 max-h-48 overflow-y-auto">
                <div
                  v-for="(miembro, index) in miembrosSeleccionados"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                >
                  <div class="flex items-center space-x-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      :style="{ backgroundColor: miembro.usuario.color_avatar }"
                    >
                      {{ miembro.usuario.iniciales }}
                    </div>
                    <div>
                      <p class="text-sm font-medium text-white">{{ miembro.usuario.nombre }}</p>
                      <p class="text-xs text-gray-400">{{ miembro.rol.nombre }}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="removerMiembroSeleccionado(index)"
                    class="text-red-400 hover:text-red-300"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="errorModal" class="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
            {{ errorModal }}
          </div>

          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="loadingModal"
              class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loadingModal ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Guardar Proyecto') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// Estado
const proyectos = ref([])
const loading = ref(false)
const showModal = ref(false)
const loadingModal = ref(false)
const errorModal = ref('')
const modoEdicion = ref(false)
const proyectoEditando = ref(null)

// Listas para usuarios y roles
const usuarios = ref([])
const roles = ref([])
const usuariosDisponibles = ref([])
const miembrosProyecto = ref([])
const miembrosSeleccionados = ref([])
const colaborativoAnterior = ref(true)

// Formulario
const formularioProyecto = reactive({
  nombre: '',
  descripcion: '',
  es_colaborativo: true
})

const nuevoMiembro = reactive({
  usuario_id: '',
  rol_id: ''
})

onMounted(() => {
  cargarProyectos()
  cargarUsuarios()
  cargarRoles()
})

// Cargar datos
const cargarProyectos = async () => {
  loading.value = true
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/user/${userStore.currentUser.id}`)
    const data = await response.json()
    if (data.success) {
      proyectos.value = data.data
    }
  } catch (error) {
    console.error('Error al cargar proyectos:', error)
  } finally {
    loading.value = false
  }
}

const cargarUsuarios = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`)
    const data = await response.json()
    if (data.success) {
      usuarios.value = data.data
    }
  } catch (error) {
    console.error('Error al cargar usuarios:', error)
  }
}

const cargarRoles = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/roles`)
    const data = await response.json()
    if (data.success) {
      roles.value = data.data
    }
  } catch (error) {
    console.error('Error al cargar roles:', error)
  }
}

const cargarUsuariosDisponibles = async (proyectoId = null) => {
  if (!proyectoId) {
    usuariosDisponibles.value = usuarios.value.filter(u => u.id !== userStore.currentUser.id)
    const idsSeleccionados = miembrosSeleccionados.value.map(m => m.usuario.id)
    usuariosDisponibles.value = usuariosDisponibles.value.filter(u => !idsSeleccionados.includes(u.id))
  } else {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/disponibles/${proyectoId}`)
      const data = await response.json()
      if (data.success) {
        usuariosDisponibles.value = data.data
      }
    } catch (error) {
      console.error('Error al cargar usuarios disponibles:', error)
    }
  }
}

const abrirModalCrear = () => {
  modoEdicion.value = false
  proyectoEditando.value = null
  formularioProyecto.nombre = ''
  formularioProyecto.descripcion = ''
  formularioProyecto.es_colaborativo = true
  colaborativoAnterior.value = true
  miembrosSeleccionados.value = []
  cargarUsuariosDisponibles()
  showModal.value = true
}

const abrirModalEditar = async (proyecto) => {
  modoEdicion.value = true
  proyectoEditando.value = proyecto
  formularioProyecto.nombre = proyecto.nombre
  formularioProyecto.descripcion = proyecto.descripcion || ''
  formularioProyecto.es_colaborativo = proyecto.es_colaborativo
  colaborativoAnterior.value = proyecto.es_colaborativo
  miembrosProyecto.value = proyecto.proyecto_usuario_rol || []
  await cargarUsuariosDisponibles(proyecto.id)
  showModal.value = true
}

const toggleColaborativo = async () => {
  const nuevoValor = !formularioProyecto.es_colaborativo
  
  if (modoEdicion.value && colaborativoAnterior.value && !nuevoValor) {
    if (confirm('¿Desactivar proyecto colaborativo? Esto eliminará a todos los miembros excepto al propietario.')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${proyectoEditando.value.id}/miembros`, {
          method: 'DELETE'
        })
        
        const data = await response.json()
        
        if (data.success) {
          formularioProyecto.es_colaborativo = nuevoValor
          miembrosProyecto.value = miembrosProyecto.value.filter(m => m.rol.nombre === 'Propietario')
          await cargarUsuariosDisponibles(proyectoEditando.value.id)
        } else {
          alert(data.message || 'Error al eliminar miembros')
          return
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error al eliminar miembros')
        return
      }
    } else {
      return
    }
  } else {
    formularioProyecto.es_colaborativo = nuevoValor
  }
  
  if (nuevoValor && !modoEdicion.value) {
    cargarUsuariosDisponibles()
  }
}


const agregarMiembroLista = () => {
  if (!nuevoMiembro.usuario_id || !nuevoMiembro.rol_id) return
  
  const usuario = usuarios.value.find(u => u.id === parseInt(nuevoMiembro.usuario_id))
  const rol = roles.value.find(r => r.id === parseInt(nuevoMiembro.rol_id))
  
  if (modoEdicion.value) {
    agregarMiembroProyecto()
  } else {
    miembrosSeleccionados.value.push({
      usuario: usuario,
      rol: rol,
      usuario_id: usuario.id,
      rol_id: rol.id
    })
    
    usuariosDisponibles.value = usuariosDisponibles.value.filter(u => u.id !== usuario.id)
    nuevoMiembro.usuario_id = ''
    nuevoMiembro.rol_id = ''
  }
}

const agregarMiembroProyecto = async () => {
  if (!proyectoEditando.value) return
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${proyectoEditando.value.id}/miembros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: parseInt(nuevoMiembro.usuario_id),
        rol_id: parseInt(nuevoMiembro.rol_id)
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      miembrosProyecto.value.push(data.data)
      await cargarUsuariosDisponibles(proyectoEditando.value.id)
      nuevoMiembro.usuario_id = ''
      nuevoMiembro.rol_id = ''
    } else {
      alert(data.message || 'Error al agregar miembro')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al agregar miembro')
  }
}

const eliminarMiembro = async (usuarioId) => {
  if (!proyectoEditando.value) return
  if (!confirm('¿Eliminar este miembro del proyecto?')) return
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${proyectoEditando.value.id}/miembros/${usuarioId}`,
      { method: 'DELETE' }
    )
    
    const data = await response.json()
    
    if (data.success) {
      miembrosProyecto.value = miembrosProyecto.value.filter(m => m.usuario.id !== usuarioId)
      await cargarUsuariosDisponibles(proyectoEditando.value.id)
    } else {
      alert(data.message || 'Error al eliminar miembro')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al eliminar miembro')
  }
}

const removerMiembroSeleccionado = (index) => {
  const miembro = miembrosSeleccionados.value[index]
  miembrosSeleccionados.value.splice(index, 1)
  
  if (!usuariosDisponibles.value.find(u => u.id === miembro.usuario.id)) {
    usuariosDisponibles.value.push(miembro.usuario)
  }
}

const crearProyecto = async () => {
  loadingModal.value = true
  errorModal.value = ''
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: formularioProyecto.nombre,
        descripcion: formularioProyecto.descripcion,
        es_colaborativo: formularioProyecto.es_colaborativo,
        usuario_id: userStore.currentUser.id
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      const nuevoProyecto = data.data
      
      if (formularioProyecto.es_colaborativo && miembrosSeleccionados.value.length > 0) {
        for (const miembro of miembrosSeleccionados.value) {
          await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${nuevoProyecto.id}/miembros`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              usuario_id: miembro.usuario_id,
              rol_id: miembro.rol_id
            })
          })
        }
      }
      
      await cargarProyectos()
      closeModal()
    } else {
      errorModal.value = data.message || 'Error al crear el proyecto'
    }
  } catch (error) {
    console.error('Error:', error)
    errorModal.value = 'Error de conexión'
  } finally {
    loadingModal.value = false
  }
}

const editarProyecto = async () => {
  loadingModal.value = true
  errorModal.value = ''
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${proyectoEditando.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: formularioProyecto.nombre,
        descripcion: formularioProyecto.descripcion,
        es_colaborativo: formularioProyecto.es_colaborativo,
        usuario_id: userStore.currentUser.id
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      await cargarProyectos()
      closeModal()
    } else {
      errorModal.value = data.message || 'Error al actualizar el proyecto'
    }
  } catch (error) {
    console.error('Error:', error)
    errorModal.value = 'Error de conexión'
  } finally {
    loadingModal.value = false
  }
}

const confirmarEliminar = async (proyecto) => {
  if (!confirm(`¿Estás seguro de eliminar el proyecto "${proyecto.nombre}"?`)) {
    return
  }
  
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/${proyecto.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id: userStore.currentUser.id
      })
    })
    
    const data = await response.json()
    
    if (data.success) {
      proyectos.value = proyectos.value.filter(p => p.id !== proyecto.id)
    } else {
      alert(data.message || 'Error al eliminar el proyecto')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error de conexión')
  }
}

const closeModal = () => {
  showModal.value = false
  formularioProyecto.nombre = ''
  formularioProyecto.descripcion = ''
  formularioProyecto.es_colaborativo = true
  colaborativoAnterior.value = true
  errorModal.value = ''
  modoEdicion.value = false
  proyectoEditando.value = null
  miembrosProyecto.value = []
  miembrosSeleccionados.value = []
  usuariosDisponibles.value = []
  nuevoMiembro.usuario_id = ''
  nuevoMiembro.rol_id = ''
}

const handleLogout = () => {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    userStore.logout()
    router.push('/login')
  }
}

const abrirProyecto = (proyecto) => {
  router.push(`/proyecto/${proyecto.id}`)
}
</script>