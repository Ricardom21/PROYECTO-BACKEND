import express from 'express';
import ProductManager from './productManager.js';

const PORT = 3000;
const app = express();
const manager = new ProductManager('./products.json');

app.get('/products', async (req, res) =>{
    try {
        const products = await manager.getProducts();
        res.send({ estado: 1, "carga útil": products }); // Asignar los productos a la clave "carga útil"
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al obtener los productos" });
    }
});

app.listen(PORT, () => {console.log(`Servidor activo en puerto ${PORT}`);});
