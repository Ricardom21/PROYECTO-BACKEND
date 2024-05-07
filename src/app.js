// Importaciones
import express from 'express';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
import config from './config.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import {viewRouter} from  './routes/viewsRoutes.js'

// Inicialización de la aplicación Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuración de las rutas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', viewRouter) 
// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));

// Creación del servidor HTTP
const httpServer = app.listen(config.PORT, () => {
    console.log(`Servidor activo en puerto http://localhost:${config.PORT}`);
});

// Configuración del servidor de Socket.IO
const socketServer = new Server(httpServer);
app.set('socketServer', socketServer);
// Configuración de eventos de socket
socketServer.on('connection', client => {
    console.log(`Cliente conectado, id ${client.id}, desde ${client.handshake.address}`);

    // Manejar eventos de actualización de productos
   
    // Manejar eventos de nuevos mensajes
    client.on('newMessage', data => {
        console.log(`Mensaje recibido desde ${client.id}: ${data}`);
        client.emit('newMessageConfirmation', 'OK');
    });
});
