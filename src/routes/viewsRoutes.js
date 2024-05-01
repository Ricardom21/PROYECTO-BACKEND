import  express from "express";
import fs from 'fs'
import config from "../config.js";

export const viewRouter = express.Router()

viewRouter.get('/',(req,res)=>{
    const productData = JSON.parse(fs.readFileSync(`${config.DIRNAME}/products.json`, "utf-8"))
res.render('home' , {title: 'home', products: productData, style:'index.css'})
})

viewRouter.get('/chat', (req,res) => {
    res.render('chat',{})
})

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