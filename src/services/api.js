import axios from 'axios'

// Crear instancia de Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos
})

// Variable para evitar múltiples refreshes simultáneos
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

// ==================== INTERCEPTOR DE REQUEST ====================
apiClient.interceptors.request.use(
  (config) => {
    // Obtener token de localStorage
    const token = localStorage.getItem('accessToken')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// ==================== INTERCEPTOR DE RESPONSE ====================
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, retornarla
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Si el error NO es 401, rechazarlo directamente
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error)
    }

    // Si el error es 401 y ya intentamos refrescar, ir a login
    if (originalRequest._retry) {
      // Limpiar tokens y redirigir a login
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
      
      // Redirigir a login
      window.location.href = '/login'
      
      return Promise.reject(error)
    }

    // Marcar que ya intentamos refrescar
    originalRequest._retry = true

    if (isRefreshing) {
      // Si ya se está refrescando, agregar a la cola
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    }

    isRefreshing = true

    const refreshToken = localStorage.getItem('refreshToken')

    if (!refreshToken) {
      // No hay refresh token, ir a login
      isRefreshing = false
      localStorage.clear()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    try {
      // Intentar refrescar el token
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (response.data.success && response.data.accessToken) {
        const newAccessToken = response.data.accessToken

        // Guardar nuevo access token
        localStorage.setItem('accessToken', newAccessToken)

        // Actualizar header de la petición original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // Procesar cola de peticiones fallidas
        processQueue(null, newAccessToken)

        isRefreshing = false

        // Reintentar petición original
        return apiClient(originalRequest)
      } else {
        throw new Error('No se pudo refrescar el token')
      }
    } catch (refreshError) {
      // Fallo al refrescar, limpiar y redirigir
      processQueue(refreshError, null)
      isRefreshing = false

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')

      window.location.href = '/login'

      return Promise.reject(refreshError)
    }
  }
)

// ==================== FUNCIONES DE API ====================

export const api = {
  // -------------------- AUTH --------------------
  auth: {
    login: async (email, password) => {
      const response = await apiClient.post('/api/auth/login', { email, password })
      return response.data
    },
    
    register: async (nombre, email, password) => {
      const response = await apiClient.post('/api/auth/register', { nombre, email, password })
      return response.data
    },
    
    logout: async (refreshToken) => {
      const response = await apiClient.post('/api/auth/logout', { refreshToken })
      return response.data
    },
    
    logoutAll: async () => {
      const response = await apiClient.post('/api/auth/logout-all')
      return response.data
    },
    
    verify: async () => {
      const response = await apiClient.get('/api/auth/verify')
      return response.data
    }
  },

  // -------------------- PROJECTS --------------------
  projects: {
    getByUser: async (userId) => {
      const response = await apiClient.get(`/api/projects/user/${userId}`)
      return response.data
    },
    
    getAll: async () => {
      const response = await apiClient.get('/api/projects')
      return response.data
    },
    
    create: async (projectData) => {
      const response = await apiClient.post('/api/projects', projectData)
      return response.data
    },
    
    update: async (projectId, projectData) => {
      const response = await apiClient.put(`/api/projects/${projectId}`, projectData)
      return response.data
    },
    
    delete: async (projectId) => {
      const response = await apiClient.delete(`/api/projects/${projectId}`)
      return response.data
    },
    
    addMember: async (projectId, memberData) => {
      const response = await apiClient.post(`/api/projects/${projectId}/miembros`, memberData)
      return response.data
    },
    
    removeMember: async (projectId, userId) => {
      const response = await apiClient.delete(`/api/projects/${projectId}/miembros/${userId}`)
      return response.data
    },
    
    removeAllMembers: async (projectId) => {
      const response = await apiClient.delete(`/api/projects/${projectId}/miembros`)
      return response.data
    }
  },

  // -------------------- LISTS --------------------
  lists: {
    getByProject: async (projectId) => {
      const response = await apiClient.get(`/api/lists/project/${projectId}`)
      return response.data
    },
    
    create: async (listData) => {
      const response = await apiClient.post('/api/lists', listData)
      return response.data
    },
    
    update: async (listId, listData) => {
      const response = await apiClient.put(`/api/lists/${listId}`, listData)
      return response.data
    },
    
    delete: async (listId) => {
      const response = await apiClient.delete(`/api/lists/${listId}`)
      return response.data
    },
    
    reorder: async (listsData) => {
      const response = await apiClient.put('/api/lists/reorder/bulk', { listas: listsData })
      return response.data
    }
  },

  // -------------------- TASKS --------------------
  tasks: {
    getByList: async (listId) => {
      const response = await apiClient.get(`/api/tasks/list/${listId}`)
      return response.data
    },
    
    getById: async (taskId) => {
      const response = await apiClient.get(`/api/tasks/${taskId}`)
      return response.data
    },
    
    create: async (taskData) => {
      const response = await apiClient.post('/api/tasks', taskData)
      return response.data
    },
    
    update: async (taskId, taskData) => {
      const response = await apiClient.put(`/api/tasks/${taskId}`, taskData)
      return response.data
    },
    
    move: async (taskId, moveData) => {
      const response = await apiClient.put(`/api/tasks/${taskId}/move`, moveData)
      return response.data
    },
    
    delete: async (taskId) => {
      const response = await apiClient.delete(`/api/tasks/${taskId}`)
      return response.data
    },
    
    reorder: async (tasksData) => {
      const response = await apiClient.put('/api/tasks/reorder/bulk', { tareas: tasksData })
      return response.data
    },
    
    addTag: async (taskId, tagId) => {
      const response = await apiClient.post(`/api/tasks/${taskId}/etiquetas`, { etiqueta_id: tagId })
      return response.data
    },
    
    removeTag: async (taskId, tagId) => {
      const response = await apiClient.delete(`/api/tasks/${taskId}/etiquetas/${tagId}`)
      return response.data
    }
  },

  // -------------------- USERS --------------------
  users: {
    getAll: async () => {
      const response = await apiClient.get('/api/users')
      return response.data
    },
    
    getAvailable: async (projectId) => {
      const response = await apiClient.get(`/api/users/disponibles/${projectId}`)
      return response.data
    },
    
    getRoles: async () => {
      const response = await apiClient.get('/api/users/roles')
      return response.data
    }
  },

  // -------------------- TAGS --------------------
  tags: {
    getAll: async () => {
      const response = await apiClient.get('/api/tags')
      return response.data
    }
  }
}

export default apiClient