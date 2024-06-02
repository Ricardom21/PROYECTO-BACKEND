import express from "express";
import MessageDao from "../dao/messagesDao.js";

export const viewRouter = express.Router();
const messageDao = new MessageDao();

viewRouter.get('/', async (req, res) => {
    try {
        const messages = await messageDao.getMessages().populate("sender").populate("recipient");  // Aquí usamos populate
        res.render('home', { title: 'home', messages, style: 'index.css' });
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
        res.status(500).send('Error interno del servidor');
    }
});

viewRouter.get('/chat', (req, res) => {
    res.render('chat', {});
});

viewRouter.get('/realtimeproducts', (req, res) => {
    fs.readFile(`${config.DIRNAME}/products.json`, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo JSON de productos:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        const products = JSON.parse(data);
        res.render('realTimeProducts', { title: 'Real Time Products', products: products });
    });
});

