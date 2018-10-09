const DialogModel = require('../DataModels/DialogModel');
const UserModel = require('../DataModels/UserModel');

exports.getConversation = (currentUserId, friendId) => {
    const findConversation = DialogModel.find(
        { $or: [
        	{ $and: [
        		{ user1: currentUserId },
        		{ user2: friendId }
        	]},
        	{ $and: [
	        		{ user1: friendId },
	        		{ user2: currentUserId }
	        ]},
        	]}
    );

    const promiseGetConversation = findConversation.exec().then(res => {
    	console.log('res.length', res.length);
    	if (res.length === 0) {
    		const dialog = new DialogModel({
                user1: currentUserId,
                user2: friendId,
                messages: []
            });

            return dialog.save()
            	.then(res => {
            		console.log('RES', res);
            		const updateQuery = UserModel.updateMany(
            			{ _id: { $in: [currentUserId, friendId] } },
            			{ $push: { dialogList: res._id } },
            		);

            		return updateQuery.exec().catch(err => console.log('UPDATEERROR', err));
            	})
            	.catch(error => console.log('CREATING DIALOF ERROR', error));
    	}
    }).catch(err => {
    	console.log('FIND CONVERSATION ERROR');
    });
}