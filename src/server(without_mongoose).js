/* eslint-disable */

const express = require('express');
const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let server;

MongoClient.connect(
    'mongodb://127.0.0.1:27017/mongo_test',
    { useNewUrlParser: true, native_parser: true },
    (err, database) => {
        if (err) {
            return err;
        }
        const mongoTestDB = database.db('mongo_test');
        // server = new WebSocket.Server({ port: 8000 });

        startServer(mongoTestDB);
        // startService(mongoTestDB);
});

function startServer(database) {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(8000, () => {
        console.log('Express server started');
    });

    // POST /user - создание(регистрация) пользователя
    app.post('/user', (req, res) => {
        const user = req.body;
        database.collection('users').find({ name: user.name }).toArray((err, docs) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (docs.length === 0) {
                database.collection('users').insertOne(user, (err, result) => {
                    if (err) {
                        return res.sendStatus(500);
                    }
                    res.send(user);
                });
            } else {
                return res.status(500).send('User already exsists');
            }
        });
        //res.send('Hello from server');
    });
}



