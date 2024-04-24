import express from 'express';
import ProductManager from '../productManager.js';

const manager = new ProductManager();
const productRoutes = express.Router()


// Ruta para listar todos los productos
productRoutes.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.send({ estado: 1, productos: products });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al obtener los productos" });
    }
});

// Ruta para obtener un producto por ID
productRoutes.get('/:pid', async (req, res) => {
    const productId = Number( req.params.pid)
    try {
        const product = await manager.getProductById(productId);
        if (product) {
            res.send({ estado: 1, producto: product });
        } else {
            res.status(404).send({ estado: 0, mensaje: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al obtener el producto" });
    }
});

// Ruta para agregar un nuevo producto
productRoutes.post('/', async (req, res) => {
    const newProduct = req.body;
    try {
        await manager.addProduct(newProduct);
        res.status(201).send({ estado: 1, mensaje: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al agregar el producto" });
    }
});

// Ruta para actualizar un producto
productRoutes.put('/:pid', async (req, res) => {
    const productId = Number( req.params.pid)
    const updatedFields = req.body;
    try {
        await manager.updateProduct(productId, updatedFields);
        res.send({ estado: 1, mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al actualizar el producto" });
    }
});

// Ruta para eliminar un producto
productRoutes.delete('/:pid', async (req, res) => {
    const productId = Number( req.params.pid)
    try {
        await manager.deleteProduct(productId);
        res.send({ estado: 1, mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al eliminar el producto" });
    }
});



export default productRoutes
