/**
 * Configuración de la Base de Datos
 * 
 * Este módulo configura la conexión a la base de datos SQLite usando Sequelize.
 * Define la instancia de Sequelize y exporta la conexión para ser utilizada
 * por los modelos de la aplicación.
 * 
 * @requires sequelize - ORM para la interacción con la base de datos
 * @requires path - Para manejar rutas de archivos
 */

const { Sequelize } = require("sequelize");
const path = require("path");

/**
 * Instancia de Sequelize configurada para SQLite
 * 
 * La base de datos se almacena en un archivo SQLite en la carpeta 'database'
 * del proyecto. Si el archivo no existe, Sequelize lo creará automáticamente.
 * 
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../database/database.sqlite"),
  logging: false, // Desactivar logs de SQL en consola
});

/**
 * Función para probar la conexión a la base de datos
 * @returns {Promise<void>}
 * @throws {Error} Si no se puede conectar a la base de datos
 */
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    throw error;
  }
};

// Exportar la instancia de Sequelize y la función de prueba
module.exports = {
  sequelize,
  testConnection,
}; 