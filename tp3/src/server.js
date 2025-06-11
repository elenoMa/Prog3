const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Importar rutas
const rutaPacientes = require('./routes/pacientes.route.js');
const home = require('./routes/home.routes.js');
const rutaTurnos = require('./routes/turnos.route.js');

dotenv.config();

class Server {
  constructor(template = process.env.TEMPLATE || 'ejs') {
    this.app = express();
    this.port = process.env.PORT || 3001;

    this.middleware();
    this.engine(template);
    this.rutas();
  }

  engine(template) {
    try {
      // Verifica que el motor esté instalado
      require.resolve(template);

      this.app.set('view engine', template);
      // Aquí defines la carpeta donde estarán tus vistas
      this.app.set('views', './src/views');
    } catch (error) {
      console.error('Error al configurar el motor de plantillas:', template);
      console.error(error);
    }
  }

  middleware() {
    // Servir archivos estáticos (css, js, imágenes, etc)
    this.app.use(express.static('public'));

    // Para parsear application/json
    this.app.use(express.json());

    // Para parsear application/x-www-form-urlencoded (formularios)
    this.app.use(express.urlencoded({ extended: true }));

    // Logger de peticiones HTTP
    this.app.use(morgan('dev'));
  }

  rutas() {
    // Ruta home (renderiza vistas)
    this.app.use('/', home);

    // Rutas API REST
    this.app.use('/api/v1/pacientes', rutaPacientes);
    this.app.use('/api/v1/turnos', rutaTurnos);

    // Middleware para manejar 404 - No encontrado
    this.app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    });

    // Middleware de manejo de errores (404, 500, etc)
    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);

      // Si la petición es para una API REST (JSON)
      if (req.originalUrl.startsWith('/api/')) {
        return res.json({
          error: {
            message: error.message,
          },
        });
      }

      // Para rutas normales (renderizamos una vista de error o mensaje)
      res.render('error', { error }); // Necesitarás crear views/error.ejs o manejarlo como gustes
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST || 'localhost'}:${this.port}`
      );
    });
  }
}

module.exports = Server;
