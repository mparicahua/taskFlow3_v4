/**
 * 🔔 Servicio de Notificaciones del Navegador
 * Maneja notificaciones push usando la Notifications API nativa
 * Compatible con Chrome, Firefox, Edge, Safari
 */

class NotificationService {
  constructor() {
    this.permission = 'default'
    this.supported = 'Notification' in window
  }

  // ==================== INICIALIZACIÓN ====================
  
  /**
   * Inicializa el servicio de notificaciones
   * Verifica permisos actuales sin solicitarlos
   */
  async initialize() {
    if (!this.supported) {
      console.warn('⚠️ Notificaciones no soportadas en este navegador')
      return false
    }

    // Verificar permiso actual
    this.permission = Notification.permission

    if (this.permission === 'default') {
      console.log('📢 Permisos de notificación no solicitados aún')
      return false
    }

    if (this.permission === 'granted') {
      console.log('✅ Permisos de notificación ya concedidos')
      return true
    }

    console.log('❌ Permisos de notificación denegados')
    return false
  }

  // ==================== PERMISOS ====================
  
  /**
   * Solicita permisos para mostrar notificaciones
   * Debe ser llamado después de una interacción del usuario
   */
  async requestPermission() {
    if (!this.supported) {
      console.warn('⚠️ Notificaciones no soportadas')
      return false
    }

    if (this.permission === 'granted') {
      console.log('✅ Permisos ya concedidos')
      return true
    }

    try {
      const permission = await Notification.requestPermission()
      this.permission = permission
      
      if (permission === 'granted') {
        console.log('✅ Permisos de notificación concedidos')
        
        // Mostrar notificación de bienvenida
        this.showNotification('🎉 Notificaciones Activadas', {
          body: 'Ahora recibirás actualizaciones de tus proyectos',
          tag: 'welcome',
          requireInteraction: false
        })
        
        return true
      } else {
        console.log('❌ Permisos de notificación denegados por el usuario')
        return false
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error)
      return false
    }
  }

  // ==================== MOSTRAR NOTIFICACIÓN ====================
  
  /**
   * Muestra una notificación del navegador
   * @param {string} title - Título de la notificación
   * @param {object} options - Opciones de la notificación
   */
  async showNotification(title, options = {}) {
    if (!this.supported) {
      console.warn('⚠️ Notificaciones no soportadas')
      return null
    }

    if (this.permission !== 'granted') {
      console.warn('⚠️ No se puede mostrar notificación (permisos no concedidos)')
      return null
    }

    const defaultOptions = {
      icon: '/favicon.ico', // Puedes cambiar por tu logo
      badge: '/favicon.ico',
      vibrate: [200, 100, 200], // Patrón de vibración (móviles)
      requireInteraction: false, // No requiere que el usuario cierre la notificación
      silent: false, // Reproducir sonido
      timestamp: Date.now(),
      ...options
    }

    try {
      const notification = new Notification(title, defaultOptions)

      // ✨ MANEJAR CLIC EN LA NOTIFICACIÓN
      notification.onclick = (event) => {
        event.preventDefault() // Prevenir comportamiento por defecto
        
        // Enfocar la ventana
        window.focus()
        
        // Si hay datos de navegación, navegar
        if (options.data?.projectId) {
          window.location.href = `/proyecto/${options.data.projectId}`
        }
        
        // Cerrar notificación
        notification.close()
      }

      // Cerrar automáticamente después de 5 segundos (si no requiere interacción)
      if (!defaultOptions.requireInteraction) {
        setTimeout(() => {
          notification.close()
        }, 5000)
      }

      // Vibrar (si está disponible - principalmente móviles)
      if ('vibrate' in navigator && options.vibrate) {
        navigator.vibrate(options.vibrate)
      }

      console.log('✅ Notificación mostrada:', title)
      return notification
    } catch (error) {
      console.error('❌ Error al mostrar notificación:', error)
      return null
    }
  }

  // ==================== NOTIFICACIONES POR EVENTO ====================

  /**
   * Notificación: Proyecto Creado
   */
  async notifyProjectCreated(projectName, creatorName) {
    return this.showNotification('📁 Nuevo Proyecto', {
      body: `${creatorName} creó "${projectName}"`,
      tag: 'project-created',
      icon: '/favicon.ico',
      vibrate: [200, 100, 200]
    })
  }

  /**
   * Notificación: Proyecto Actualizado
   */
  async notifyProjectUpdated(projectName) {
    return this.showNotification('✏️ Proyecto Actualizado', {
      body: `"${projectName}" fue modificado`,
      tag: 'project-updated',
      icon: '/favicon.ico',
      vibrate: [200]
    })
  }

  /**
   * Notificación: Proyecto Eliminado
   */
  async notifyProjectDeleted(projectName) {
    return this.showNotification('🗑️ Proyecto Eliminado', {
      body: `"${projectName}" fue eliminado`,
      tag: 'project-deleted',
      icon: '/favicon.ico',
      vibrate: [200, 100, 200]
    })
  }

  /**
   * Notificación: Miembro Agregado al Proyecto
   */
  async notifyMemberAdded(memberName, roleName, projectName, projectId) {
    return this.showNotification('👥 Nuevo Miembro', {
      body: `${memberName} fue agregado como ${roleName} a "${projectName}"`,
      tag: 'member-added',
      icon: '/favicon.ico',
      vibrate: [200],
      data: { projectId } // Para navegación al hacer clic
    })
  }

  /**
   * Notificación: Miembro Removido del Proyecto
   */
  async notifyMemberRemoved(memberName, projectName, projectId) {
    return this.showNotification('👋 Miembro Removido', {
      body: `${memberName} fue removido de "${projectName}"`,
      tag: 'member-removed',
      icon: '/favicon.ico',
      vibrate: [200],
      data: { projectId }
    })
  }

  /**
   * Notificación: Te Uniste a un Proyecto
   */
  async notifyJoinedProject(projectName, projectId) {
    return this.showNotification('🎉 Nuevo Proyecto', {
      body: `Te agregaron a "${projectName}"`,
      tag: 'project-joined',
      icon: '/favicon.ico',
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: true, // Requiere que el usuario cierre la notificación
      data: { projectId }
    })
  }

  /**
   * Notificación: Te Removieron de un Proyecto
   */
  async notifyLeftProject(projectName) {
    return this.showNotification('⚠️ Proyecto', {
      body: `Fuiste removido de "${projectName}"`,
      tag: 'project-left',
      icon: '/favicon.ico',
      vibrate: [500],
      requireInteraction: true
    })
  }

  // ==================== NOTIFICACIONES ADICIONALES (OPCIONAL) ====================

  /**
   * Notificación: Lista Creada
   */
  async notifyListCreated(listName, projectName, projectId) {
    return this.showNotification('📝 Nueva Lista', {
      body: `Se creó la lista "${listName}" en "${projectName}"`,
      tag: 'list-created',
      icon: '/favicon.ico',
      vibrate: [100],
      data: { projectId }
    })
  }

  /**
   * Notificación: Tarea Asignada
   */
  async notifyTaskAssigned(taskTitle, projectName, projectId) {
    return this.showNotification('✅ Nueva Tarea Asignada', {
      body: `"${taskTitle}" en "${projectName}"`,
      tag: 'task-assigned',
      icon: '/favicon.ico',
      vibrate: [200, 100, 200],
      requireInteraction: true,
      data: { projectId }
    })
  }

  // ==================== UTILIDADES ====================

  /**
   * Verifica si el usuario ha concedido permisos
   */
  hasPermission() {
    return this.permission === 'granted'
  }

  /**
   * Verifica si las notificaciones están soportadas
   */
  isSupported() {
    return this.supported
  }

  /**
   * Obtiene el estado actual del permiso
   */
  getPermissionStatus() {
    return this.permission
  }

  /**
   * Cierra todas las notificaciones activas
   * Nota: Las notificaciones del navegador se cierran automáticamente
   */
  closeAll() {
    console.log('🔕 Cerrando todas las notificaciones')
    // Las notificaciones del navegador no tienen un método global para cerrarlas todas
    // Se cierran automáticamente después del timeout o cuando el usuario las cierra
  }

  /**
   * Prueba de notificación (para testing)
   */
  async testNotification() {
    if (!this.hasPermission()) {
      console.warn('⚠️ Solicita permisos primero con requestPermission()')
      return
    }

    return this.showNotification('🧪 Notificación de Prueba', {
      body: 'Si ves esto, las notificaciones funcionan correctamente',
      tag: 'test',
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: false
    })
  }
}

// Exportar instancia única (singleton)
export const notificationService = new NotificationService()