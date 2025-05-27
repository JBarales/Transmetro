const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/municipalidades', require('./routes/municipalidad.routes'));
app.use('/api/estaciones', require('./routes/estacion.routes'));
app.use('/api/lineas', require('./routes/linea.routes'));
app.use('/api/buses', require('./routes/bus.routes'));
app.use('/api/parqueos', require('./routes/parqueo.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/conductor', require('./routes/conductor.routes'));
app.use('/api/policia', require('./routes/policia.routes'));
app.use('/api/roles', require('./routes/rol.routes'));


// Iniciar servidor y sincronizar base
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Base de datos sincronizada");
  app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  });
});