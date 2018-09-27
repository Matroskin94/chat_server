/*eslint-disable*/

const userController = require('../serverServices/Controllers/Users');
const sessionController = require('../serverServices/Controllers/Sessions');
const SERVER_MESSAGES = require('../constants/serverMessages');

function initSocket(io, mongoose) {
    io.on('connection', socket => {
        if (socket.request.session.passport) {
            const { userLogin } = socket.request.session.passport.user;

            userController.setUserOnline(userLogin).then(res => {
                socket.broadcast.emit('connectedUser', userLogin);
                userController.getOnlineUsers().then(result => {
                    socket.broadcast.emit('onlineUsers', result);
                });
            }).catch(err => {
                console.log(err);
            });
        }

        socket.on('getOnlineUsers', () => {
            userController.getOnlineUsers().then(result => {
                socket.emit('onlineUsers', result);
            });
        });

        socket.on('userConnected', userName => {
            socket.broadcast.emit('connectedUser', userName);
        });

        socket.on('sendMessage', message => {
            socket.broadcast.emit('recieveMessage', message);
        });

        socket.on('sendUserTiping', user => {
            socket.broadcast.emit('recieveUserTyping', user);
        });

        socket.on('userLogout', () => {
            const { userLogin } = socket.request.session.passport.user;
            const { sessionID } = socket.request;

            socket.request.logout();
            socket.request.session.destroy(() => {
                return userController.isUserDisconnected(mongoose, userLogin).then(() => {
                    socket.broadcast.emit('userDisconnected', userLogin);
                }).catch(err => {
                    console.log(err);
                });
            });
            userController.disconnectUser(userLogin).then(() => {
                userController.getOnlineUsers().then(result => {
                    socket.broadcast.emit('onlineUsers', result);
                    socket.disconnect(true);
                });
            });
        });

        socket.on('updateProfile', updatedUser => {
            socket.request.session.passport.user = updatedUser;
            socket.request.session.save(err => {
                socket.request.session.reload();
            });
            return userController.updateUser(updatedUser);
        });

        socket.on('disconnecting', reason => {
            if (SERVER_MESSAGES.SESSION_DESTROYED !== reason && socket.request.session) {
                const { userLogin } = socket.request.session.passport.user;

                sessionController.disconnectUserTab(mongoose, socket.request.sessionID).then(res => {
                    const { tabsCount } = res ? JSON.parse(res.value.session) : { tabsCount: -1 };

                    if (tabsCount === 0) {
                        return userController.isUserDisconnected(mongoose, userLogin).then(() => {
                            socket.broadcast.emit('userDisconnected', userLogin);
                            userController.getOnlineUsers().then(result => {
                                socket.broadcast.emit('onlineUsers', result);
                            });
                        }).catch(err => {
                            console.log('DISCONNECTING ERROR', err);
                        });
                    }
                });
            }
        });
    });

    io.sockets.on('session:reload', sid => {
        const clients = io.sockets.clients();
        console.log('SID', sid);
        console.log('IO CLIENTS', clients);
    });
}

module.exports = initSocket;
