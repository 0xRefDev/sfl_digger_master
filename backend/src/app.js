import express from 'express';
import corsMiddleware from './middlewares/cors.js';
import sflRoutes from './routes/sflRoutes.js';

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.options('*', corsMiddleware);

app.use('/api/digData', sflRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Ocurrió un error'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});