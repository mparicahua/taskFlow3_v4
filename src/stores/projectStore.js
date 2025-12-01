import { defineStore } from 'pinia'
import { api } from '../services/api'
import { socketService } from '../services/socket'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null,
    listenersSetup: false
  }),

  getters: {
    allProjects: (state) => state.projects,
    projectCount: (state) => state.projects.length,
    activeProjects: (state) => state.projects.filter(p => p.activo)
  },

  actions: {
    setupSocketListeners() {
      if (this.listenersSetup) {
        console.log('⚠️ Listeners ya configurados, saltando...')
        return
      }

      console.log('🎧 Configurando listeners de Socket en ProjectStore')

      // Proyecto creado
      socketService.on('project:created', (data) => {
        console.log('📩 [STORE] Proyecto creado recibido:', data)
        
        const existe = this.projects.find(p => p.id === data.project.id)
        if (!existe) {
          this.projects.unshift(data.project)
          console.log('✅ [STORE] Proyecto agregado a la lista')
        } else {
          console.log('⚠️ [STORE] Proyecto ya existe, ignorando')
        }
      })

      // Proyecto actualizado
      socketService.on('project:updated', (data) => {
        console.log('📩 [STORE] Proyecto actualizado recibido:', data)
        
        const index = this.projects.findIndex(p => p.id === data.project.id)
        if (index !== -1) {
          // Actualizar manteniendo la reactividad
          this.projects[index] = { ...this.projects[index], ...data.project }
          console.log('✅ [STORE] Proyecto actualizado en la lista')
        }
      })

      // Proyecto eliminado
      socketService.on('project:deleted', (data) => {
        console.log('📩 [STORE] Proyecto eliminado recibido:', data)
        
        this.projects = this.projects.filter(p => p.id !== data.projectId)
        console.log('✅ [STORE] Proyecto eliminado de la lista')
      })

      // Miembro agregado
      socketService.on('project:member:added', (data) => {
        console.log('📩 [STORE] Miembro agregado recibido:', data)
        
        const proyecto = this.projects.find(p => p.id === data.projectId)
        if (proyecto) {
          if (!proyecto.proyecto_usuario_rol) {
            proyecto.proyecto_usuario_rol = []
          }
          
          // Verificar que no exista ya
          const existe = proyecto.proyecto_usuario_rol.find(
            m => m.usuario.id === data.member.usuario.id
          )
          
          if (!existe) {
            proyecto.proyecto_usuario_rol.push(data.member)
            console.log('✅ [STORE] Miembro agregado al proyecto')
          }
        }
      })

      // Miembro removido
      socketService.on('project:member:removed', (data) => {
        console.log('📩 [STORE] Miembro removido recibido:', data)
        
        const proyecto = this.projects.find(p => p.id === data.projectId)
        if (proyecto && proyecto.proyecto_usuario_rol) {
          proyecto.proyecto_usuario_rol = proyecto.proyecto_usuario_rol.filter(
            m => m.usuario.id !== data.userId
          )
          console.log('✅ [STORE] Miembro removido del proyecto')
        }
      })

      // Te uniste a un nuevo proyecto
      socketService.on('project:joined', (data) => {
        console.log('📩 [STORE] Te uniste a un proyecto:', data)
        
        // Recargar proyectos para obtener el nuevo
        const userId = JSON.parse(localStorage.getItem('user'))?.id
        if (userId && this.projects.length > 0) {
          this.fetchProjects(userId)
        }
      })

      // Te removieron de un proyecto
      socketService.on('project:left', (data) => {
        console.log('📩 [STORE] Te removieron de un proyecto:', data)
        this.projects = this.projects.filter(p => p.id !== data.projectId)
      })

      this.listenersSetup = true
      console.log('✅ [STORE] Listeners configurados correctamente')
    },

    async fetchProjects(userId) {
      this.loading = true
      this.error = null

      try {
        const data = await api.projects.getByUser(userId)
        
        if (data.success) {
          this.projects = data.data
          console.log(`📦 [STORE] ${data.data.length} proyectos cargados`)
        } else {
          throw new Error(data.message || 'Error al cargar proyectos')
        }
      } catch (error) {
        console.error('❌ [STORE] Error al cargar proyectos:', error)
        this.error = error.response?.data?.message || error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProject(projectData) {
      try {
        const data = await api.projects.create(projectData)
        
        if (data.success) {
          const existe = this.projects.find(p => p.id === data.data.id)
          if (!existe) {
            this.projects.unshift(data.data)
            console.log('✅ [STORE] Proyecto creado localmente (optimistic)')
          }
          
          return { success: true, data: data.data }
        } else {
          throw new Error(data.message || 'Error al crear proyecto')
        }
      } catch (error) {
        console.error('❌ [STORE] Error al crear proyecto:', error)
        throw error
      }
    },

    async updateProject(projectId, projectData) {
      try {
        const data = await api.projects.update(projectId, projectData)
        
        if (data.success) {
          const index = this.projects.findIndex(p => p.id === projectId)
          if (index !== -1) {
            // Actualizar manteniendo reactividad
            this.projects[index] = { ...this.projects[index], ...data.data }
            console.log('✅ [STORE] Proyecto actualizado localmente (optimistic)')
          }
          
          return { success: true, data: data.data }
        } else {
          throw new Error(data.message || 'Error al actualizar proyecto')
        }
      } catch (error) {
        console.error('❌ [STORE] Error al actualizar proyecto:', error)
        throw error
      }
    },

    async deleteProject(projectId) {
      try {
        const data = await api.projects.delete(projectId)
        
        if (data.success) {
          this.projects = this.projects.filter(p => p.id !== projectId)
          console.log('✅ [STORE] Proyecto eliminado localmente (optimistic)')
          
          return { success: true }
        } else {
          throw new Error(data.message || 'Error al eliminar proyecto')
        }
      } catch (error) {
        console.error('❌ [STORE] Error al eliminar proyecto:', error)
        throw error
      }
    },

    clearProjects() {
      this.projects = []
      this.error = null
      this.listenersSetup = false
    }
  }
})