# 📋 Administrador de Tareas

<div align="center">
![Estado del Proyecto](https://img.shields.io/badge/estado-activo-brightgreen)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue)
![Versión](https://img.shields.io/badge/versión-1.0.0-orange)
</div>

Aplicación full-stack para gestión de tareas construida con React y Node.js.
![image](https://github.com/user-attachments/assets/6717e59b-59a4-4fde-913a-2377b8301094)
![image](https://github.com/user-attachments/assets/e9ae7829-c0c4-4e9a-9e1f-1c50e2dd8d01)

## ✨ Características

- ✅ Crear, leer, actualizar y eliminar tareas
- 🔄 Gestión de estados de tareas (Pendiente, En Progreso, Completada)
- 📱 Diseño responsive y estilo moderno realizado con Bootstrap
- 🎨 Interfaz moderna con gradientes y animaciones
- 🔒 Validación de formularios
- 💾 Persistencia de datos

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Git

### 📥 Clonar el Repositorio

```bash
# Clonar el proyecto
git clone https://github.com/jacquelineroballo/forit-challenge.git

# Ingresar al directorio
cd forit-challenge
```

### 🔧 Configuración del Backend

```bash
# Ingresar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
echo PORT=5000 > .env
echo NODE_ENV=development >> .env
echo CORS_ORIGIN=http://localhost:5173 >> .env

# Iniciar servidor de desarrollo
npm run dev
```

### 🎨 Configuración del Frontend

```bash
# Ingresar al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
echo VITE_API_URL=http://localhost:5000 > .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🛠️ Tecnologías Utilizadas

### Frontend

- ⚛️ React - Biblioteca de UI
- 🔄 React Router - Enrutamiento
- ⚡ Vite - Build tool y dev server
- 🎨 Bootstrap - Framework CSS
- 💅 CSS Moderno - Estilos y animaciones

### Backend

- 🟢 Node.js - Runtime de JavaScript
- 🚂 Express - Framework web
- 🔄 CORS - Seguridad de recursos cruzados
- 🔐 dotenv - Variables de entorno

## 📡 API Endpoints

| Método | Endpoint         | Descripción                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/api/tasks`     | Obtener todas las tareas       |
| POST   | `/api/tasks`     | Crear una nueva tarea          |
| PUT    | `/api/tasks/:id` | Actualizar una tarea existente |
| DELETE | `/api/tasks/:id` | Eliminar una tarea             |

## 📁 Estructura del Proyecto

```
📦 forit-challenge
├── 📂 backend
│   ├── 📂 src
│   │   ├── 📄 index.js    # Punto de entrada del servidor
│   │   └── 📂 routes      # Rutas de la API
│   ├── 📄 .env           # Variables de entorno
│   └── 📄 package.json
└── 📂 frontend
    ├── 📂 src
    │   ├── 📂 components  # Componentes de React
    │   ├── 📄 App.jsx     # Componente principal
    │   └── 📄 App.css     # Estilos
    ├── 📄 .env           # Variables de entorno
    └── 📄 package.json
```

## 💡 Desarrollo

La aplicación utiliza un array en memoria para el almacenamiento de datos. En un entorno de producción, se recomienda reemplazar esto con una base de datos adecuada.

## 🌐 Acceso

Una vez iniciados ambos servidores, puedes acceder a:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)
