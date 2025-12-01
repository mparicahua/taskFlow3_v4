import { io } from 'socket.io-client'

class SocketService {
  constructor() {
    this.socket = null
    this.isConnected = false
    this.isReady = false // Nueva bandera
    this.listeners = new Map()
  }

  connect(token) {
    if (this.socket?.connected) {
      console.log('⚠️ Socket ya está conectado')
      return
    }

    const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

    console.log('🔌 Conectando a Socket.IO...', SOCKET_URL)

    this.socket = io(SOCKET_URL, {
      auth: {
        token: token
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    // ✨ ESCUCHAR TODOS LOS EVENTOS (para debugging)
    this.socket.onAny((eventName, ...args) => {
      console.log(`📩 Evento recibido:`, eventName, args)
    })

    this.socket.on('connect', () => {
      this.isConnected = true
      console.log('✅ Socket conectado:', this.socket.id)
    })

    // ✨ NUEVO: Escuchar cuando el servidor confirme que está listo
    this.socket.on('connection:ready', (data) => {
      this.isReady = true
      console.log('✅ Socket LISTO:', data)
    })

    this.socket.on('disconnect', (reason) => {
      this.isConnected = false
      this.isReady = false
      console.log('🔌 Socket desconectado:', reason)
    })

    this.socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión Socket:', error.message)
    })

    this.socket.on('error', (error) => {
      console.error('❌ Error en Socket:', error)
    })

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 Socket reconectado después de ${attemptNumber} intentos`)
      this.isConnected = true
    })

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 Intento de reconexión ${attemptNumber}...`)
    })

    this.socket.on('reconnect_error', (error) => {
      console.error('❌ Error al reconectar:', error.message)
    })

    this.socket.on('reconnect_failed', () => {
      console.error('❌ Falló la reconexión después de todos los intentos')
    })
  }

  disconnect() {
    if (this.socket) {
      console.log('🔌 Desconectando Socket...')
      this.socket.disconnect()
      this.socket = null
      this.isConnected = false
      this.isReady = false
      this.listeners.clear()
    }
  }

  emit(event, data) {
    if (this.socket) {
      console.log('📤 Emitiendo evento:', event, data)
      this.socket.emit(event, data)
    } else {
      console.warn('⚠️ Socket no está conectado. No se puede emitir:', event)
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback)
      
      if (!this.listeners.has(event)) {
        this.listeners.set(event, [])
      }
      this.listeners.get(event).push(callback)
      
      console.log(`👂 Escuchando evento: ${event}`)
    } else {
      console.warn('⚠️ Socket no está conectado. No se puede escuchar:', event)
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback)
      
      if (this.listeners.has(event)) {
        const callbacks = this.listeners.get(event)
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  removeAllListeners(event) {
    if (this.socket) {
      this.socket.removeAllListeners(event)
      this.listeners.delete(event)
    }
  }

  joinProjects() {
    this.emit('join:projects')
  }

  joinProject(projectId) {
    this.emit('join:project', { projectId })
  }

  leaveProject(projectId) {
    this.emit('leave:project', { projectId })
  }

  getConnectedUsers(projectId) {
    this.emit('get:connected-users', { projectId })
  }

  get connected() {
    return this.isConnected && this.socket?.connected
  }

  get ready() {
    return this.isReady
  }
}

export const socketService = new SocketService()