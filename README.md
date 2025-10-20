# TaskFlow3

Sistema de gestión de proyectos y tareas colaborativo desarrollado con Vue 3 y Node.js.

## Características

-  **Sistema de autenticación** completo (login/registro)
-  **Dashboard de proyectos** con vista de tarjetas
-  **Proyectos colaborativos** con gestión de miembros y roles
-  **Tablero Kanban** para organizar tareas
-  **Interfaz moderna** con Tailwind CSS
-  **Persistencia de sesión** con localStorage
-  **Estado global** con Pinia

##  Tecnologías

### Frontend
- **Vue 3** - Framework progresivo de JavaScript
- **Vue Router** - Enrutamiento oficial de Vue
- **Pinia** - Gestión de estado
- **Tailwind CSS 4** - Framework de CSS utility-first
- **Vite** - Build tool ultra-rápido

### Backend (Requerido)
- API REST compatible (Node.js/Express recomendado)
- Base de datos SQL o NoSQL



## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

##  Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd taskFlow3_v4
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3000
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 🌐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend API | `http://localhost:3000` |
| `PORT` | Puerto del servidor (producción) | `4000` |

## Funcionalidades

### Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Persistencia de sesión
- Protección de rutas

##  Despliegue

### Build de Producción
```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### Servidor Express
El proyecto incluye un servidor Express (`server.js`) para servir la aplicación en producción:

```bash
npm start
```
