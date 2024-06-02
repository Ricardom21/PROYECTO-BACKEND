import mongoose from "mongoose";
import config from "../config.js";

export const conectiondb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log('conectado con base de datos')
    } catch (error){console.error('mongodb connection fail')}
}