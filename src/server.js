const WebSocket = require('ws');
const MongoClient = require('mongodb').MongoClient;

let server;

MongoClient.connect(
    'mongodb://localhost:27017/mongo_test',
    { useNewUrlParser: true, native_parser: true },
    (err, database) => {
        if (err) {
            return console.log(err);
        }
        const mongoTestDB = database.db('mongo_test')
        server = new WebSocket.Server({ port: 8000 });
        console.log('Server started');

        startService(mongoTestDB);
});

function startService(db) {
    server.on('connection', (ws, req) => {
        ws.on('message', message => {
            db.collection('messages').insert({ messageText: message }, (err, result) => {
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
    });
}


