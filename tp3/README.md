# Sistema de Turnos Médicos

Este proyecto es una aplicación web para la gestión de turnos médicos, desarrollada con **Node.js**, **Express**, **Sequelize** y **SQLite**. Permite registrar pacientes, crear, listar y cancelar turnos, y gestionar los estados de los mismos.

---

## Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Inicialización de la Base de Datos](#inicialización-de-la-base-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos y Base de Datos](#modelos-y-base-de-datos)
- [Rutas Principales](#rutas-principales)
- [Vistas](#vistas)
- [Scripts Útiles](#scripts-útiles)
- [Licencia](#licencia)
- [Rutas de la API REST](#rutas-de-la-api-rest)
- [Configuración del archivo `.env`](#configuración-del-archivo-env)

---

## Características

- Registro y autenticación de pacientes (con contraseñas hasheadas).
- Creación, listado y cancelación de turnos médicos.
- Gestión de estados de turno: pendiente, confirmado, cancelado, completado.
- Interfaz web moderna y responsiva con EJS.
- Base de datos relacional con Sequelize y SQLite.
- Scripts para inicializar y poblar la base de datos con datos de prueba.

---

## Requisitos

- Node.js (v16 o superior recomendado)
- npm (v8 o superior)
- Git

---

## Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/santozzi/practico3progra3.git
   cd practico3progra3
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

---

## Inicialización de la Base de Datos

Para crear la estructura de la base de datos y cargar datos de prueba, ejecuta:

```bash
npm run seed
```

Esto creará los estados de turno, algunos pacientes y turnos de ejemplo.  
**Usuario de prueba:**  
- Email: `usuario@prueba.com`  
- Contraseña: `Password123`

---

## Estructura del Proyecto

```
src/
│
├── config/           # Configuración de la base de datos y variables de entorno
├── controllers/      # Lógica de negocio y controladores de rutas
├── middlewares/      # Middlewares de Express
├── models/           # Modelos de datos y entidades Sequelize
│   └── sqlite/
│       └── entities/ # Entidades: Turno, Paciente, EstadoTurno
├── public/           # Archivos estáticos (CSS, JS, imágenes)
├── routes/           # Definición de rutas (web y API)
├── scripts/          # Scripts de inicialización y seed
├── views/            # Vistas EJS (páginas y partials)
│
├── index.js          # Entrada principal de la app
└── server.js         # Configuración y arranque del servidor
```

---

## Modelos y Base de Datos

- **Paciente:**  
  - id, nombre, apellido, email, dni, password (hasheada)
- **Turno:**  
  - id, idPaciente, fechaHora, motivo, estadoId
- **EstadoTurno:**  
  - id, nombre (pendiente, confirmado, cancelado, completado)

Las relaciones están definidas con Sequelize.  
Un turno pertenece a un paciente y a un estado.

---

## Rutas Principales

### Web

- `/` — Página de inicio
- `/listar` — Listado de turnos
- `/nuevo-turno` — Crear un nuevo turno
- `/cancelar` — Cancelar un turno (ingresando el ID)

### API (opcional, si está implementada)

- `/api/turnos` — Endpoints para gestión de turnos (consultar, crear, cancelar, etc.)

---

## Rutas de la API REST

### Pacientes (`/api/pacientes`)

- `POST /api/pacientes/login`  
  **Público** — Login de paciente (devuelve token JWT)
- `POST /api/pacientes/register`  
  **Protegido** — Registrar un nuevo paciente (requiere token)
- `POST /api/pacientes/refresh-token`  
  **Protegido** — Renovar token JWT
- `GET /api/pacientes/`  
  **Protegido** — Listar todos los pacientes
- `GET /api/pacientes/:id`  
  **Protegido** — Obtener paciente por ID
- `PUT /api/pacientes/:id`  
  **Protegido** — Actualizar datos de paciente
- `DELETE /api/pacientes/:id`  
  **Protegido** — Eliminar paciente

### Turnos (`/api/turnos`)

- `POST /api/turnos`  
  **Protegido** — Crear un nuevo turno
- `GET /api/turnos`  
  **Protegido** — Listar todos los turnos
- `GET /api/turnos/:id`  
  **Protegido** — Obtener turno por ID
- `PUT /api/turnos/:id`  
  **Protegido** — Actualizar estado de un turno
- `DELETE /api/turnos/:id`  
  **Protegido** — Cancelar un turno
- `GET /api/turnos/paciente/:pacienteId`  
  **Protegido** — Listar turnos de un paciente específico

---

## Vistas

- **index.ejs:** Página de bienvenida.
- **list.ejs:** Listado de turnos.
- **new.ejs:** Formulario para crear un turno.
- **cancel.ejs:** Formulario para cancelar un turno por ID.
- **partials/header.ejs y footer.ejs:** Encabezado y pie de página reutilizables.

---

## Scripts Útiles

- **Inicializar datos de prueba:**  
  ```bash
  npm run seed
  ```
  Esto borra y recrea la base de datos con datos de ejemplo.

- **Modo desarrollo (con recarga automática):**  
  ```bash
  npm run dev
  ```

---

## Licencia

Este proyecto está bajo la licencia ISC.  
Puedes modificarlo y adaptarlo para fines educativos o personales.

---

¿Dudas, sugerencias o errores?  
Abre un issue en el [repositorio de GitHub](https://github.com/santozzi/practico3progra3/issues).

---

## Configuración del archivo `.env`

Debes crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Palabra secreta para JWT (obligatoria)
SECRETE_WORD=tu_clave_secreta_super_segura

# Tiempo de expiración del token JWT (opcional, por defecto 1h)
EXPIRES_IN=1h

# Algoritmo JWT (opcional, por defecto HS256)
JWT_ALGORITHM=HS256

# Emisor del JWT (opcional)
JWT_ISSUER=clinica-api

# Audiencia del JWT (opcional)
JWT_AUDIENCE=clinica-client

# Rondas de bcrypt para hasheo de contraseñas (opcional, por defecto 10)
BCRYPT_ROUNDS=10

# Puerto del servidor (opcional, por defecto 3000)
PORT=3000

# Origen permitido para CORS (opcional)
CORS_ORIGIN=*
```

Guarda el archivo y reinicia el servidor para que los cambios tengan efecto. 