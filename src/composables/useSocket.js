import { onMounted, onUnmounted } from 'vue'
import { socketService } from '../services/socket'

/**
 * Composable para usar Socket.IO en componentes Vue
 * Maneja automáticamente el cleanup de listeners
 */
export function useSocket() {
  const listeners = []

  /**
   * Escuchar un evento
   */
  const on = (event, callback) => {
    socketService.on(event, callback)
    listeners.push({ event, callback })
  }

  /**
   * Emitir un evento
   */
  const emit = (event, data) => {
    socketService.emit(event, data)
  }

  /**
   * Unirse a un proyecto
   */
  const joinProject = (projectId) => {
    socketService.joinProject(projectId)
  }

  /**
   * Salir de un proyecto
   */
  const leaveProject = (projectId) => {
    socketService.leaveProject(projectId)
  }

  /**
   * Obtener usuarios conectados
   */
  const getConnectedUsers = (projectId) => {
    socketService.getConnectedUsers(projectId)
  }

  /**
   * Cleanup automático al desmontar el componente
   */
  onUnmounted(() => {
    // Limpiar todos los listeners registrados por este componente
    listeners.forEach(({ event, callback }) => {
      socketService.off(event, callback)
    })
    listeners.length = 0
  })

  return {
    on,
    emit,
    joinProject,
    leaveProject,
    getConnectedUsers,
    connected: socketService.connected
  }
}