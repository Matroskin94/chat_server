/* eslint-disable */

const userModel = require('../Models/Users');

function sendResult(err, result, reponse) {
    if (err) {
        return reponse.status(err.code).send(err);
    }

    return reponse.status(200).send(result);
}

exports.isAuthenticated = (req, res) => {
    userModel.isAuthenticated(req, (err, result) => sendResult(err, result, res))
}

exports.createUser = (req, res) => {
    userModel.addUser(req, (err, result) => sendResult(err, result, res));
};

exports.checkUser = (req, res) => {
    userModel.checkUser(req, (err, result) => sendResult(err, result, res));
};

exports.logoutUser = userId => {
    userModel.logoutUser(userId);
};

exports.getOnlineUsers = () => {
    return userModel.getOnlineUsers();
}

exports.isUserDisconnected = (mongoose, userLogin) => {
    return userModel.isUserDisconnected(mongoose, userLogin);
}

exports.setUserOnline = userLogin => {
    return userModel.setUserOnline(userLogin);
}

exports.disconnectUser = userLogin => {
    return userModel.disconnectUser(userLogin);
}

exports.updateUser = updatedUser => {
    return userModel.updateUser(updatedUser);
}
