/*import express from 'express';
import sequelize from './database.js';
import Pelicula from './model/pelicula.js'; 
import { validarTokenJWT } from './middlewares/auth.js'; 

const app = express();
app.use(express.json());

try {
  await sequelize.authenticate();
  console.log('Conexión con PostgreSQL establecida correctamente.');
  await sequelize.sync(); 
} catch (error) {
  console.error('Error al inicializar la base de datos:', error);
}

// --- CONTROLES DE ACCESO CON JWT ---
// Aplicamos el candado del Token de forma global a partir de aquí
app.use('/peliculas', validarTokenJWT);

// --- CRUD BÁSICO DE PELÍCULAS ---
app.get('/peliculas', async (req, res) => {
  const peliculas = await Pelicula.findAll();
  res.json(peliculas);
});

app.get('/peliculas/:id', async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  pelicula ? res.json(pelicula) : res.status(404).json({ error: 'Película no encontrada' });
});

app.post('/peliculas', async (req, res) => {
  try {
    const nuevaPelicula = await Pelicula.create(req.body);
    res.status(201).json(nuevaPelicula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/peliculas/:id', async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  if (pelicula) {
    await pelicula.update(req.body);
    res.json(pelicula);
  } else {
    res.status(404).json({ error: 'Película no encontrada' });
  }
});

app.delete('/peliculas/:id', async (req, res) => {
  const borrado = await Pelicula.destroy({ where: { id: req.params.id } });
  res.json({ eliminado: !!borrado });
});

// --- ENRUTAMIENTO BASE ---
app.get('/', (req, res) => {
  res.send('API de Avengers funcionando...');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API lista en el puerto ${PORT}`));
*/

import express from 'express';
import sequelize from './config/database.js';
import Pelicula from './modules/Pelicula.js'; 
import { validarTokenJWT } from './middlewares/auth.js'; 
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const LLAVE_JWT = 'super_secret_avengers_jwt';

try {
  await sequelize.authenticate();
  console.log('Conexión con PostgreSQL establecida correctamente.');
  await sequelize.sync(); 
} catch (error) {
  console.error('Error al inicializar la base de datos:', error);
}

// --- RUTA DE LOGIN (Genera el Token) ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'shield' && password === 'avengers2026') {
    const token = jwt.sign(
      { user: username, role: 'ADMIN' },
      LLAVE_JWT,
      { expiresIn: '2h' }
    );
    return res.json({ token });
  }
  res.status(401).json({ error: 'Credenciales inválidas.' });
});

// --- RUTAS PÚBLICAS (Se pueden ver en el Navegador) ---
app.get('/api/peliculas', async (req, res) => {
  const peliculas = await Pelicula.findAll();
  res.json(peliculas);
});

app.get('/api/peliculas/:id', async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  pelicula ? res.json(pelicula) : res.status(404).json({ error: 'Película no encontrada' });
});

// --- RUTAS PROTEGIDAS CON JWT (Solo Postman con Token) ---
app.post('/api/peliculas', validarTokenJWT, async (req, res) => {
  try {
    const nuevaPelicula = await Pelicula.create(req.body);
    res.status(201).json(nuevaPelicula);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/peliculas/:id', validarTokenJWT, async (req, res) => {
  const pelicula = await Pelicula.findByPk(req.params.id);
  if (pelicula) {
    await pelicula.update(req.body);
    res.json(pelicula);
  } else {
    res.status(404).json({ error: 'Película no encontrada' });
  }
});

app.delete('/api/peliculas/:id', validarTokenJWT, async (req, res) => {
  const borrado = await Pelicula.destroy({ where: { id: req.params.id } });
  res.json({ eliminado: !!borrado });
});

app.get('/', (req, res) => {
  res.send('API de Avengers funcionando correctamente...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));