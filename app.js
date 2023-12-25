const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config(); // Load environment variables

const port = process.env.PORT || 8080;
const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: '*' }
});

io.on("connection", (socket) => {
    socket.on('send_cart', function (data) {
        io.emit('listen_cart', data);
    })
});

const clientRoutes = require('./routes/client');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const publicRoutes = require('./routes/public');
const customerRoutes = require('./routes/customer');

app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyparser.json({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        httpServer.listen(port, function () {
            console.log('Server Running on Port ' + port);
        });
    }
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', clientRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', publicRoutes);
app.use('/api', customerRoutes);

module.exports = app;