import express from 'express';
import ProductManager from '../productManager.js';
import { Server } from 'socket.io';

const manager = new ProductManager();
const productRoutes = express.Router();

// Ruta para listar todos los productos
productRoutes.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al obtener los productos" });
    }
});


// Ruta para agregar un nuevo producto
productRoutes.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        // Agrega el producto utilizando el manager de productos
        await manager.addProduct(newProduct);

        const socketServer = req.app.get('socketServer');
        socketServer.emit('productUpdate', newProduct);

        res.status(201).send({ estado: 1, mensaje: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al agregar el producto" });
    }
});

// Ruta para eliminar un producto
productRoutes.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    try {
        // Elimina el producto utilizando el manager de productos
        await manager.deleteProduct(productId);

        // Emitir un evento WebSocket para notificar a los clientes sobre el producto eliminado
        const io = req.app.get('socketServer');
        io.emit('productDeleted', productId);

        res.send({ estado: 1, mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al eliminar el producto" });
    }
});

export default productRoutes;

