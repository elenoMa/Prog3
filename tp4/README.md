# TP4: Sistemas de Información – Listado de Personas

Este trabajo práctico consiste en una aplicación web que muestra un listado de personas. El proyecto está dividido en dos partes: un **backend** que provee una API, y un **frontend** que consume dicha API y muestra la información al usuario.

---

## 🧱 Estructura del Proyecto

```
/Backend   → API REST desarrollada con Express (estructura MVC)
/Frontend  → Interfaz de usuario desarrollada con React + Vite
```

---

## 🔧 Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: React, Vite

---

## 📦 Instalación y Ejecución

### Backend (API)

1. Acceder a la carpeta del backend:
   ```bash
   cd Backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor:
   ```bash
   node app.js
   ```

El backend quedará disponible en [http://localhost:3001](http://localhost:3001) y expone la ruta `/personas`, que devuelve un listado de personas en formato JSON.

---

### Frontend (Interfaz)

1. Acceder a la carpeta del frontend:
   ```bash
   cd Frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173) y consumirá los datos expuestos por la API.

---

## 📁 Estructura MVC (Backend)

- `models/` → Define la estructura de los datos
- `controllers/` → Lógica que maneja las rutas
- `routes/` → Define los endpoints disponibles
- `app.js` → Punto de entrada del servidor

---

## ✅ Objetivo del Proyecto

El objetivo principal es poner en práctica la integración de un servidor backend con una aplicación frontend, implementando una arquitectura MVC en el backend y una interfaz dinámica con React.
