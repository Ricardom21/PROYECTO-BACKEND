import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar el motor de plantillas Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware para manejar solicitudes JSON
app.use(express.json());

// Rutas de productos y carritos
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Ruta para los archivos estáticos
app.use(express.static(path.resolve(__dirname, 'public')));

// Manejo de conexiones de clientes con Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');



  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Ruta para la vista home
app.get('/', async (req, res) => {
  
  const products = []; 
  res.render('home', { products });
});

// Ruta para la vista realTimeProducts
app.get('/realtimeproducts', async (req, res) => {

  const products = []; 
  res.render('realTimeProducts', { products });
});

// Iniciar el servidor solo si estamos en un entorno Node.js
if (typeof process !== 'undefined') {
  server.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
  });
}

export default app;
