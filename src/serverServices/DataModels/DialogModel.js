const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	dialogId: Schema.Types.ObjectId,
	sender: Schema.Types.ObjectId,
	text: String
});

const DialogSchema = new Schema({
    user1: Schema.Types.ObjectId,
    user2: Schema.Types.ObjectId,
    messages: [
    	MessageSchema
    ]
});

const DialogModel = mongoose.model('dialogs', DialogSchema);

module.exports = DialogModel;