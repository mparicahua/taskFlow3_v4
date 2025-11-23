import { defineStore } from 'pinia'
import { api } from '../services/api'

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
    // ==================== LOGIN ====================
    async login(email, password) {
      this.loading = true
      this.error = null

      try {
        const response = await api.auth.login(email, password)

        if (response.success) {
          // Guardar tokens
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
          
          // Guardar usuario
          this.user = response.user
          this.isAuthenticated = true
          
          // Guardar en localStorage para persistencia
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('isAuthenticated', 'true')

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

    // ==================== REGISTER ====================
    async register(nombre, email, password) {
      this.loading = true
      this.error = null

      try {
        const response = await api.auth.register(nombre, email, password)

        if (response.success) {
          // Guardar tokens
          localStorage.setItem('accessToken', response.accessToken)
          localStorage.setItem('refreshToken', response.refreshToken)
          
          // Guardar usuario
          this.user = response.user
          this.isAuthenticated = true
          
          // Guardar en localStorage
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('isAuthenticated', 'true')

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

    // ==================== LOGOUT ====================
    async logout() {
      this.loading = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (refreshToken) {
          try {
            await api.auth.logout(refreshToken)
          } catch (error) {
            // Si falla el logout en el servidor, igual limpiamos localmente
            console.warn('Error al hacer logout en servidor:', error)
          }
        }
      } catch (error) {
        console.error('Error en logout:', error)
      } finally {
        // Limpiar estado local
        this.user = null
        this.isAuthenticated = false
        this.error = null
        
        // Limpiar localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        
        this.loading = false
      }
    },

    // ==================== LOGOUT ALL (Cerrar todas las sesiones) ====================
    async logoutAll() {
      this.loading = true

      try {
        await api.auth.logoutAll()
      } catch (error) {
        console.error('Error en logout all:', error)
      } finally {
        // Limpiar estado local
        this.user = null
        this.isAuthenticated = false
        this.error = null
        
        // Limpiar localStorage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        
        this.loading = false
      }
    },

    // ==================== RESTORE SESSION ====================
    restoreSession() {
      try {
        const savedUser = localStorage.getItem('user')
        const isAuth = localStorage.getItem('isAuthenticated')
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        
        if (savedUser && isAuth === 'true' && accessToken && refreshToken) {
          this.user = JSON.parse(savedUser)
          this.isAuthenticated = true
          return true
        } else {
          // Si falta algo, limpiar todo
          this.clearSession()
          return false
        }
      } catch (error) {
        console.error('Error al restaurar sesión:', error)
        this.clearSession()
        return false
      }
    },

    // ==================== VERIFY TOKEN ====================
    async verifyToken() {
      try {
        const response = await api.auth.verify()
        
        if (response.success) {
          // Actualizar datos del usuario si cambiaron
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

    // ==================== CLEAR SESSION ====================
    clearSession() {
      this.user = null
      this.isAuthenticated = false
      this.error = null
      
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    // ==================== UPDATE USER ====================
    updateUser(userData) {
      this.user = { ...this.user, ...userData }
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    // ==================== CLEAR ERROR ====================
    clearError() {
      this.error = null
    }
  }
})