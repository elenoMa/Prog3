# TP: Sistemas de Información – Gestor de Personas

Esta es una aplicación full-stack que permite gestionar un listado de personas, desarrollada como trabajo práctico integrador. Incluye un backend desarrollado con Express y un frontend desarrollado con React + Vite.

---

## 📁 Estructura del Proyecto

```
tp4progra2/
├── Backend/                 # API Express con estructura MVC
│   ├── models/
│   │   └── Persona.js       # Modelo de datos
│   ├── controllers/
│   │   └── personasController.js  # Controlador
│   ├── routes/
│   │   └── personasRoutes.js      # Rutas
│   ├── package.json
│   └── server.js            # Servidor principal
└── Frontend/                # Aplicación React + Vite
    ├── src/
    │   ├── components/
    │   │   ├── TraerPersonas.jsx
    │   │   ├── ListaTarjetas.jsx
    │   │   └── TarjetaPersona.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── index.html
```

---

## ✨ Características

### 🔙 Backend
- API REST con Express
- Estructura basada en el patrón MVC
- Ruta `GET /personas` que devuelve un listado de personas
- Cada persona contiene: `id`, `nombre`, `apellido`, `edad`, `email`
- Incluye al menos 5 personas de ejemplo
- CORS habilitado para la comunicación con el frontend

### 🔜 Frontend
- Aplicación desarrollada con React + Vite
- Componentes reutilizables:
  - `TraerPersonas`: Realiza la solicitud HTTP al backend
  - `ListaTarjetas`: Recibe y muestra una lista de personas
  - `TarjetaPersona`: Presenta individualmente los datos de cada persona
- Diseño moderno, responsive y con manejo de estados de carga y error

---

## ⚙️ Instalación y Ejecución

### Backend

```bash
cd Backend        # Ir al backend
npm install       # Instalar dependencias
npm run dev       # Ejecutar en modo desarrollo
# o
npm start         # Ejecutar en modo producción
```

El backend estará disponible en: `http://localhost:3000`

### Frontend

```bash
cd Frontend       # Ir al frontend
npm install       # Instalar dependencias
npm run dev       # Ejecutar servidor de desarrollo
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🔗 Endpoints de la API

- `GET /` → Información general de la API
- `GET /personas` → Devuelve todas las personas registradas

#### Ejemplo de respuesta de `/personas`:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "García",
      "edad": 28,
      "email": "juan.garcia@email.com"
    }
  ],
  "message": "Personas obtenidas exitosamente"
}
```

---

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- CORS

### Frontend
- React 18
- Vite
- Axios
- CSS3 con estilos modernos

---

## ⚛️ Componentes de React

1. **TraerPersonas**: Realiza la petición al backend y gestiona estados
2. **ListaTarjetas**: Renderiza una lista de tarjetas de personas
3. **TarjetaPersona**: Muestra la información de una persona

---

## 🎨 Características del Diseño

- Estilo visual tipo glassmorphism (efectos de blur y transparencia)
- Gradientes y animaciones suaves
- Diseño adaptable a múltiples resoluciones
- Estados visuales interactivos (hover, loading, error)
- Iconos y avatares generados dinámicamente

---

## 📝 Notas Finales

- Es importante iniciar primero el backend antes de levantar el frontend
- El frontend realiza las peticiones a `http://localhost:3000/personas`
- La aplicación es completamente funcional y lista para ser utilizada
