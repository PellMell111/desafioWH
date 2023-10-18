const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const productsModule = require('./public/js/products');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.get('/', (req, res) => {
    const products = productsModule.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
    const products = productsModule.getProducts();
    res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
    socket.on('addProduct', (newProduct) => {
        productsModule.addProduct(newProduct);
        io.emit('updateProducts', newProduct);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});