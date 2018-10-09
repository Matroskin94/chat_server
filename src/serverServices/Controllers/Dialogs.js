const dialogModel = require('../Models/Dialogs');

exports.getConversation = (currentUserId, friendId) => {
    return dialogModel.getConversation(currentUserId, friendId);
}