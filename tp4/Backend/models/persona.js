class Persona {
  constructor(id, nombre, apellido, edad, email) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.email = email;
  }
}

// Datos de ejemplo - al menos 5 personas
const personas = [
  new Persona(1, "Juan", "García", 28, "juan.garcia@email.com"),
  new Persona(2, "María", "López", 32, "maria.lopez@email.com"),
  new Persona(3, "Carlos", "Rodríguez", 25, "carlos.rodriguez@email.com"),
  new Persona(4, "Ana", "Martínez", 29, "ana.martinez@email.com"),
  new Persona(5, "Luis", "Fernández", 35, "luis.fernandez@email.com"),
  new Persona(6, "Sofía", "González", 27, "sofia.gonzalez@email.com"),
  new Persona(7, "Diego", "Pérez", 31, "diego.perez@email.com")
];

module.exports = {
  Persona,
  personas
}; 