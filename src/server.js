/* eslint-disable */

const http = require('http');
const socket = require('socket.io');

const db = require('./serverServices/db');
const userController = require('./serverServices/Controllers/Users');
const configureServer = require('./serverServices/serverConfiguration');

db.connect('mongodb://localhost:27017/mongo_test', startServer);

function startServer() {
    const app = configureServer();
    const server = http.Server(app);
    const io = socket(server);

    server.listen(8000);

    /* app.listen(8000, () => {
        console.log('Express server started');
    }); */

    // POST: /user - создание нового пользователя
    app.post('/user', userController.createUser);

    // POST: /checkUser - проверка наличия полльзователя и совпадения пароля
    app.post('/checkUser', userController.checkUser);

    io.on('connection', (socket) => {
        console.log('Client connected');
        // socket.on('disconnect', userController.logoutUser);
    });
}

// Поиск по ID
// const ObjectID = require('mongodb').ObjectID;
// db.collection('users').findOne({ _id: ObjectID(objID) }, callback(err, ress))

/* function startService(db) {
    server.on('connection', (ws, req) => {
        console.log('Client connected');
        ws.on('message', message => {
            db.collection('messages').insertOne({ messageText: message }, (err, result) => {
                if (err) {
                    console.log('ERROR!!', err);
                    result.sendStatus(500);
                    return;
                }
            });
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', (code, reason) => {
            console.log('Disconnected code', code);
            console.log('Disconnected reason', reason);
        });
    });
} */


