import openSocket from 'socket.io-client';

const socket = openSocket('http://127.0.0.1:8000');

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp)); // Реакция на событие timer
    socket.emit('subscribeToTimer', 1000); // Отправляет событие subscribeToTimer для подписки на таймер
}

function sendMessage(message) {
    socket.emit('sendMessage', message);
}

function getMessages(cb) {
    socket.on('getMessages', messages => cb(null, messages));
}

export { subscribeToTimer, sendMessage, getMessages };
