const express = require('express');
const sequelize = require('../config/database');
const loggerMiddleware = require('./middlewares/logger');
const peliculasRoutes = require('./routes/peliculasRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000; // Render asigna el puerto solo, en tu compu será el 3000

app.use(express.json());
app.use(loggerMiddleware);

// Conexión de rutas
app.use('/api/auth', authRoutes);
app.use('/api/peliculas', peliculasRoutes);

// Sincronizar Base de datos y arrancar
sequelize.sync().then(() => {
  console.log('Base de datos conectada correctamente.');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('Error al conectar la base de datos:', err);
});