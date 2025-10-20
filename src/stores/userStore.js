import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  getters: {

    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    userInitials: (state) => state.user?.iniciales || '',
    userName: (state) => state.user?.nombre || '',
    userColor: (state) => state.user?.color_avatar || '#6B7280'
  },

  actions: {

    login(userData) {
      this.user = userData
      this.isAuthenticated = true

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('isAuthenticated', 'true')
    },


    logout() {
      this.user = null
      this.isAuthenticated = false
      
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },


    restoreSession() {
      const savedUser = localStorage.getItem('user')
      const isAuth = localStorage.getItem('isAuthenticated')
      
      if (savedUser && isAuth === 'true') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
        return true
      }
      return false
    },


    updateUser(userData) {
      this.user = { ...this.user, ...userData }
      localStorage.setItem('user', JSON.stringify(this.user))
    }
  }
})