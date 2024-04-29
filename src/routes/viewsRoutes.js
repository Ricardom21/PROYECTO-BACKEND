import  express from "express";
import fs from 'fs'
import config from "../config.js";

export const viewRouter = express.Router()

viewRouter.get('/',(req,res)=>{
    const productData = JSON.parse(fs.readFileSync(`${config.DIRNAME}/products.json`, "utf-8"))
res.render('home' , {title: 'home', products: productData, style:'index.css'})
})
