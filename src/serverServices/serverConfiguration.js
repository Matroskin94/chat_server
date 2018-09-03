/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const socket = require('socket.io');

const corsOptions = {
  origin: ['http://localhost:8080', 'http://127.0.0.1:8081'], // app port Не работает если указать 127.0.0.1
  optionsSuccessStatus: 200,
  credentials: true
}

function configureServer(mongoose) {
    const app = express();
    const server = http.Server(app);
    const io = socket(server);
    const sessionMiddleware = session({
        cookie: {
            secure: false
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        name: 'Client session',
        secret: 'pritty kitty',
        resave: false,
        secure: false,
        saveUninitialized: false
    });

    io.use(function(socket, next) {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors(corsOptions));
    app.set('trust proxy', true);
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    server.listen(8000);

    return { app, io };
}

module.exports = configureServer;
