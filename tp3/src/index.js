/**
 * Punto de entrada principal de la aplicación
 * 
 * Este archivo inicia el servidor y maneja la conexión a la base de datos.
 * También configura el manejo de señales del proceso para un cierre graceful.
 * 
 * @requires ./server - Configuración del servidor Express
 * @requires ./models/sqlite/config/db - Configuración de la base de datos
 */

const seedEstadosTurno = require('./models/sqlite/config/seeder/seedEstadosTurno.js');
const Server = require('./server.js');
const { connectDB } = require('./models/sqlite/config/db.js');


(async () => {
    await connectDB();
    await seedEstadosTurno();
})();

const server = new Server("ejs");

server.listen();

/**
 * Función para cerrar la aplicación de manera graceful
 * @param {string} signal - Señal recibida
 */
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} recibida. Cerrando aplicación...`);
    try {
        await connectDB();
        console.log('Conexión a la base de datos cerrada.');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la aplicación:', error);
        process.exit(1);
    }
};

// Manejar señales de terminación
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));