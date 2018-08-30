/* eslint-disable */

const http = require('http');
const socket = require('socket.io');
const path = require('path');

const db = require('./serverServices/db');
const userController = require('./serverServices/Controllers/Users');
const configureServer = require('./serverServices/serverConfiguration');

db.connect('mongodb://127.0.0.1:27017/mongo_test', startServer);

function startServer(mongoose) {
    const app = configureServer(mongoose);
    const server = http.Server(app);
    const io = socket(server);

    server.listen(8000);

    // POST: /user - создание нового пользователя
    app.post('/user', userController.createUser);

    // POST: /checkUser - проверка наличия полльзователя и совпадения пароля
    app.post('/checkUser', userController.checkUser);

    io.on('connection', (socket) => {
        console.log('Client connected');
        userController.getOnlineUsers().then(result => {
            socket.broadcast.emit('onlineUsers', result);
        });
        // socket.on('disconnect', userController.logoutUser);
        socket.on('getOnlineUsers', () => {
            userController.getOnlineUsers().then(result => {
                socket.emit('onlineUsers', result);
            });
        });

        socket.on('userConnected', userName => {
            console.log('userName', userName);
            socket.broadcast.emit('connectedUser', userName);
        });
    });
}

