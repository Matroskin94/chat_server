/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

function configureServer() {
    const app = express();

    app.set('trust proxy', 1);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('../../public/'));
    app.use(session({
        secret: 'pritty kitty',
        resave: false,
        saveUninitialized: true,
        cookie: {
            domain: '127.0.0.1:8080'
            // secure: true with https enable to ture
        }
    }));
    app.use(cors(corsOptions));

    return app;
}

module.exports = configureServer;
