import express from 'express';
import exphbs from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 

const PORT = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());

// Rutas de productos y carritos
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


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

// Iniciamos el servidor
server.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});


