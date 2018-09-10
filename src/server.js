/* eslint-disable */

const http = require('http');
const socket = require('socket.io');

const db = require('./serverServices/db');
const userController = require('./serverServices/Controllers/Users');
const configureServer = require('./serverServices/serverConfiguration');

db.connect('mongodb://127.0.0.1:27017/mongo_test', startServer);

function startServer(mongoose) {
    const { app, io } = configureServer(mongoose);

    // POST: /user - создание нового пользователя
    app.post('/user', userController.createUser);

    // POST: /checkUser - проверка наличия полльзователя и совпадения пароля
    app.post('/checkUser', userController.checkUser);

    // POST: /isAuthenticated - проверка авторизирован ли пользователь
    app.post('/isAuthenticated', userController.isAuthenticated);

    io.on('connection', socket => {
        if (socket.request.session.passport) {
            const userLogin = socket.request.session.passport.user.userLogin;

            userController.setUserOnline(userLogin).then((res) => {
                socket.broadcast.emit('connectedUser', userLogin);
                userController.getOnlineUsers().then(result => {
                    socket.broadcast.emit('onlineUsers', result);
                });
            }).catch(err => {
                console.log(err);
            });
        }

        socket.on('getOnlineUsers', () => {
            userController.getOnlineUsers().then(result => {
                socket.emit('onlineUsers', result);
            });
        });

        socket.on('userConnected', userName => {
            socket.broadcast.emit('connectedUser', userName);
        });

        socket.on('sendMessage', message => {
            socket.broadcast.emit('recieveMessage', message);
        });

        socket.on('userLogout', () => {
            const userLogin = socket.request.session.passport.user.userLogin;

            socket.request.logout();
            socket.request.session.destroy(() => {
                return userController.isUserDisconnected(mongoose, userLogin).then( () => {
                    socket.broadcast.emit('userDisconnected', userLogin);
                }).catch(err => {
                    console.log(err);
                });
            });
            userController.disconnectUser(userLogin).then(() => {
                userController.getOnlineUsers().then(result => {
                    socket.broadcast.emit('onlineUsers', result);
                    socket.disconnect(true);
                });
            });
        });

        socket.on('disconnect', (reason) => {
            console.log('DISCONNECTED:', reason);
        });
    });
}

