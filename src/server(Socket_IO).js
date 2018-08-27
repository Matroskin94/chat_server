const io = require('socket.io')();

(function(){
    const messageList = [];
    const date = {
        time: String
    }

    io.on('connection', (client) => {
        // Генерация событий для клиента
        client.on('subscribeToTimer', (interval) => {
            setInterval(() => {
              client.emit('timer', new Date()); // Отравляет клиенту событие timer
            }, interval);
        });
        client.on('sendMessage', message => {
            messageList.push(message);
            client.emit('getMessages', messageList);
        });
    });

    const port = 8000;
    io.listen(port);
})();