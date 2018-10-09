const dialogsController = require('../Controllers/Dialogs');

class DialogHandler {
	static handleGetConversation(socket, currentUserId, friendId) {
		return dialogsController.getConversation(currentUserId, friendId);
	}
}

exports.bindSocket = (socket, event) => (currentUserId, friendId) => {
	return DialogHandler[event](socket, currentUserId, friendId);
}

