const express = require('express');
const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let server;

MongoClient.connect(
    'mongodb://localhost:27017/mongo_test',
    { useNewUrlParser: true, native_parser: true },
    (err, database) => {
        if (err) {
            return console.log(err);
        }
        const mongoTestDB = database.db('mongo_test');
        // server = new WebSocket.Server({ port: 8000 });
        // console.log('Server started');
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


