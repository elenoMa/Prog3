const express = require('express');
const personasRouter = require('./routes/personas');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/personas', personasRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
}); 