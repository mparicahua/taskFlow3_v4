import { defineStore } from 'pinia'
import { api } from '../services/api'
import { socketService } from '../services/socket'
import { notificationService } from '../services/notifications' // ✨ IMPORT

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userInitials: (state) => state.user?.iniciales || '',
    userName: (state) => state.user?.nombre || '',
    userColor: (state) => state.user?.color_avatar || '#6B7280',
    userId: (state) => state.user?.id || null
  },

  actions: {
    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const response = await api.auth.login(email, password)

        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
          
          this.user = response.user
          this.isAuthenticated = true
          
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('isAuthenticated', 'true')

          // ✨ CONECTAR WEBSOCKET
          socketService.connect(response.accessToken)
          
          // ✨ CONFIGURAR LISTENERS DE PROYECTOS
          setTimeout(() => {
            import('./projectStore').then(module => {
              const projectStore = module.useProjectStore()
              projectStore.setupSocketListeners()
            })
          }, 100)

          // ✨ INICIALIZAR NOTIFICACIONES
          await notificationService.initialize()
          console.log('🔔 Notificaciones inicializadas')

          return { success: true }
        } else {
          throw new Error(response.message || 'Error al iniciar sesión')
        }
      } catch (error) {
        console.error('Error en login:', error)
        this.error = error.response?.data?.message || error.message || 'Error de conexión'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async register(nombre, email, password) {
      this.loading = true
      this.error = null

      try {
        const response = await api.auth.register(nombre, email, password)

        if (response.success) {
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
          
          this.user = response.user
          this.isAuthenticated = true
          
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('isAuthenticated', 'true')

          // ✨ CONECTAR WEBSOCKET
          socketService.connect(response.accessToken)
          
          // ✨ CONFIGURAR LISTENERS DE PROYECTOS
          setTimeout(() => {
            import('./projectStore').then(module => {
              const projectStore = module.useProjectStore()
              projectStore.setupSocketListeners()
            })
          }, 100)

          // ✨ INICIALIZAR NOTIFICACIONES
          await notificationService.initialize()
          console.log('🔔 Notificaciones inicializadas')

          return { success: true }
        } else {
          throw new Error(response.message || 'Error al registrarse')
        }
      } catch (error) {
        console.error('Error en registro:', error)
        this.error = error.response?.data?.message || error.message || 'Error de conexión'
        return { success: false, message: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (refreshToken) {
          try {
            await api.auth.logout(refreshToken)
          } catch (error) {
            console.warn('Error al hacer logout en servidor:', error)
          }
        }
      } catch (error) {
        console.error('Error en logout:', error)
      } finally {
        // ✨ LIMPIAR STORE DE PROYECTOS
        import('./projectStore').then(module => {
          const projectStore = module.useProjectStore()
          projectStore.clearProjects()
        })
        
        // ✨ DESCONECTAR WEBSOCKET
        socketService.disconnect()
        
        // ✨ CERRAR NOTIFICACIONES
        notificationService.closeAll()
        
        this.user = null
        this.isAuthenticated = false
        this.error = null
        
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        
        this.loading = false
      }
    },

    async logoutAll() {
      this.loading = true

      try {
        await api.auth.logoutAll()
      } catch (error) {
        console.error('Error en logout all:', error)
      } finally {
        // ✨ LIMPIAR STORE DE PROYECTOS
        import('./projectStore').then(module => {
          const projectStore = module.useProjectStore()
          projectStore.clearProjects()
        })
        
        // ✨ DESCONECTAR WEBSOCKET
        socketService.disconnect()
        
        // ✨ CERRAR NOTIFICACIONES
        notificationService.closeAll()
        
        this.user = null
        this.isAuthenticated = false
        this.error = null
        
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        
        this.loading = false
      }
    },

    restoreSession() {
      try {
        const savedUser = localStorage.getItem('user')
        const isAuth = localStorage.getItem('isAuthenticated')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (savedUser && isAuth === 'true' && accessToken && refreshToken) {
          this.user = JSON.parse(savedUser)
          this.isAuthenticated = true
          
          // ✨ RECONECTAR WEBSOCKET
          socketService.connect(accessToken)
          
          // ✨ CONFIGURAR LISTENERS DE PROYECTOS
          setTimeout(() => {
            import('./projectStore').then(module => {
              const projectStore = module.useProjectStore()
              projectStore.setupSocketListeners()
            })
          }, 100)
          
          // ✨ INICIALIZAR NOTIFICACIONES
          notificationService.initialize()
          console.log('🔔 Notificaciones restauradas')
          
          return true
        } else {
          this.clearSession()
          return false
        }
      } catch (error) {
        console.error('Error al restaurar sesión:', error)
        this.clearSession()
        return false
      }
    },

    async verifyToken() {
      try {
        const response = await api.auth.verify()
        
        if (response.success) {
          this.user = response.user
          localStorage.setItem('user', JSON.stringify(response.user))
          return true
        } else {
          this.clearSession()
          return false
        }
      } catch (error) {
        console.error('Error al verificar token:', error)
        this.clearSession()
        return false
      }
    },

    clearSession() {
      // ✨ DESCONECTAR WEBSOCKET
      socketService.disconnect()
      
      // ✨ CERRAR NOTIFICACIONES
      notificationService.closeAll()
      
      this.user = null
      this.isAuthenticated = false
      this.error = null
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    updateUser(userData) {
      this.user = { ...this.user, ...userData }
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    clearError() {
      this.error = null
    }
  }
})