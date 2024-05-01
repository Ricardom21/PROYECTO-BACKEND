import express from 'express';
import productRoutes from './routes/productRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js'; 
import config from './config.js';
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import { viewRouter } from './routes/viewsRoutes.js';


const app = express();

//MIDLEWERE
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//RUTAS
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/', viewRouter) 

//rutas estaticas para archivos estaticos
app.use('/static', express.static(`${config.DIRNAME}/public`) )

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('views',`${config.DIRNAME}/views`)
app.set('view engine','handlebars')

const httpServer = app.listen( config.PORT, () => {
  console.log(`Servidor activo en puerto http://localhost:${config.PORT}`);
});

const socketServer = new Server(httpServer);
app.set('secketServer' , socketServer)
// escucho eventos de conexion
socketServer.on('connection', client => {
    console.log('cliente conectado, id ${socket.id} desde ${socket.handshake.address}');

client.on('newMessage', data => {
    console.log(`Mensaje recibido desde ${client.id}: ${data}`);
        client.emit('newMessageConfirmation', 'OK');
})
})