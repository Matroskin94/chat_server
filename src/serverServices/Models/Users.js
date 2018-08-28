/* eslint-disable */

const objectID = require('mongodb').ObjectID;
const UserSchema = require('../DataShemes/UserSchema');
const SERVER_MESSAGES = require('../../constants/serverMessages');

exports.addUser = (creatingUser, cb) => {
    UserSchema.findOne({ userLogin: creatingUser.userLogin }).then(result => {
        if (!result) {
            const user = new UserSchema({
                ...creatingUser,
                isOnline: true
            });

            user.save()
                .then(() => cb('', user))
                .catch(error => cb(SERVER_MESSAGES.ERROR_SAVING, ''));
        }
        return cb(SERVER_MESSAGES.USER_EXISTS, '');
    });
};

exports.checkUser = (enteringUser, cb) => {
    UserSchema.findOneAndUpdate({ userLogin: enteringUser.userLogin }, { isOnline: true })
        .then(resultUser => {
            if (!resultUser) {
                return cb(SERVER_MESSAGES.NO_USER, '');
            }
            if (String(enteringUser.password) !== String(resultUser.password)) {
                return cb(SERVER_MESSAGES.INCORRECT_PASS, '');
            }

            return cb('', resultUser);
        });
};

// Поиск по ID
// const ObjectID = require('mongodb').ObjectID;
// db.collection('users').findOne({ _id: ObjectID(objID) }, callback(err, ress))

exports.logoutUser = (userId, cb) => {
    console.log('UserId', userId);
    UserSchema.updateOne({ _id: objectID(userId) }, { isOnline: false }, (err, res) => {
        if (err) {
            console.log('LOGOUT ERROR', err);
        }
        console.log('User disconnected', res);
    });
};
