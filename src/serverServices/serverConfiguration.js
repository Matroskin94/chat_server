/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}

function configureServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('../../public/'));
    app.use(cors(corsOptions));

    return app;
}

module.exports = configureServer;
