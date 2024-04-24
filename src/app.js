import express from 'express';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 

const PORT = 3000;
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.listen( PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});