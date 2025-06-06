const express = require('express');
const dotenv = require('dotenv');

const rutaPacientes = require('./routes/pacientes.route.js')
const home = require('./routes/home.routes.js');
const rutaTurnos = require('./routes/turnos.route.js')

const morgan = require('morgan');
dotenv.config()

class Server {
  constructor(template = process.env.TEMPLATE || 'ejs') {
    this.app = express()
    this.port = process.env.PORT || 3001
    this.middleware()
    //this.cors()
    this.engine(template)
    this.rutas()


  }

  /*   cors () {
      this.app.use(cors())
    } */

  engine(template) {
    try {
      require.resolve(template);

      this.app.set('view engine', template)
      this.app.set('views', './src/views/' + template)
    } catch (error) {
      console.log('Error al configurar el motor de plantillas:', template)

    }

  }
  middleware() {
    // this.app.use('/', express.static('public'))
    this.app.use(express.json())
    this.app.use(morgan('dev'))
  }

  rutas() {
    //Ruta home
    this.app.use('/', home)

    //rutas apirest
    this.app.use('/api/v1/pacientes', rutaPacientes)
    this.app.use('/api/v1/turnos', rutaTurnos)

    // Manejo de errores 404 y 500
    this.app.use((req, res, next) => {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    });

    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    })


  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(
        `Server running on port ${this.port}, host: ${process.env.HOST}:${this.port}`
      )
    })
  }
}

module.exports = Server