/*eslint-disable*/

const db = require('./serverServices/db');
const userController = require('./serverServices/Controllers/Users');
const configureServer = require('./serverServices/serverConfiguration');
const initSocket = require('./serverServices/socketServer');

const SERVER_MESSAGES = require('./constants/serverMessages');

function startServer(mongoose) {
    const app = configureServer(mongoose);

    // POST: /user - создание нового пользователя
    app.post('/user', userController.createUser);

    // POST: /checkUser - проверка наличия полльзователя и совпадения пароля
    app.post('/checkUser', userController.checkUser);

    // POST: /isAuthenticated - проверка авторизирован ли пользователь
    app.post('/isAuthenticated', userController.isAuthenticated);

    initSocket(app.get('io'), app.get('mongoose'));
}

db.connect('mongodb://127.0.0.1:27017/mongo_test', startServer);
