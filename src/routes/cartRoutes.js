import express from 'express';
import fs from 'fs';
import CartManager from '../cartManager.js';

const cart = new CartManager()

const CARTS_FILE = 'src/cart.json';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const carts = await cart.getCarts();
        const newCart = { id: Date.now().toString(), products: [] };
        carts.push(newCart);
        await cart.saveCarts(carts);
        res.status(201).send({ estado: 1, mensaje: "Carrito creado correctamente", carrito: newCart });
    } catch (error) {
        console.error("Error al crear el carrito:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al crear el carrito" });
    }
});

router.get('/', async (req, res) =>{
    try{
        const carts = JSON.parse(fs.promises.readFile(CARTS_FILE, 'utf-8'))
        res.json(carts)

    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send({ estado: 0, mensaje: "error al obtener los carritos" });
    }
})

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const carts = await cart.getCarts();
        const cart = carts.find(c => c.id === cartId);
        if (cart) {
            res.send({ estado: 1, carrito: cart });
        } else {
            res.status(404).send({ estado: 0, mensaje: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al obtener el carrito" });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
    try {
        const carts = await cart.getCarts();
        const cartIndex = carts.findIndex(c => c.id === cartId);
        if (cartIndex !== -1) {
            const cart = carts[cartIndex];
            cart.products.push({ id: productId, quantity: quantity });
            await saveCarts(carts);
            res.send({ estado: 1, mensaje: "Producto agregado al carrito correctamente" });
        } else {
            res.status(404).send({ estado: 0, mensaje: "Carrito no encontrado" });
        }
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).send({ estado: 0, mensaje: "Error al agregar el producto al carrito" });
    }
});

export default router;