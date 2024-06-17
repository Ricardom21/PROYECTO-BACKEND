import express from 'express';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
import config from './config.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import {viewRouter} from  './routes/viewsRoutes.js'
import { conectiondb } from './db/mongodb.js';
import mensajesRoutes from './routes/messajesRoutes.js'
import messagesManager from './messajesManager.js'; // Importar el gestor de mensajes

// Inicialización de la aplicación Express
const app = express();
conectiondb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


// Configuración de las rutas
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', viewRouter);
app.use('/api/messages', mensajesRoutes);

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

// Configuración de archivos estáticos
app.use('/static', express.static(`${config.DIRNAME}/public`));

// Creación del servidor HTTP
const httpServer = app.listen(config.PORT, async () => {
    console.log(`Servidor activo en puerto http://localhost:${config.PORT}`);
});

// Configuración del servidor de Socket.IO
const socketServer = new Server(httpServer);
app.set('socketServer', socketServer);

// Configuración de eventos de socket
socketServer.on('connection', client => {
    console.log(`Cliente conectado, id ${client.id}, desde ${client.handshake.address}`);

    // Manejar eventos de nuevos mensajes
    client.on('newMessage', async data => {
        try {
            const newMessage = await messagesManager.handleSocketMessage(data);
            // Emitir el mensaje a todos los clientes conectados
            socketServer.emit('message', newMessage);
            client.emit('newMessageConfirmation', 'OK');
        } catch (error) {
            console.error("Error al manejar el nuevo mensaje:", error);
        }
    });
});  

