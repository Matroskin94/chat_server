/* eslint-disable */
const bcrypt = require('bcrypt');

const objectID = require('mongodb').ObjectID;
const UserSchema = require('../DataShemes/UserSchema');
const SERVER_MESSAGES = require('../../constants/serverMessages');

const saltRounds = 10;

exports.addUser = (creatingUser, cb) => {
    UserSchema.findOne({ userLogin: creatingUser.userLogin }).then(result => {
        if (!result) {
            return bcrypt.hash(creatingUser.password, saltRounds, function(err, hash) {
                const user = new UserSchema({
                    ...creatingUser,
                    password: hash,
                    isOnline: true
                });

                return user.save()
                    .then(() => cb('', user))
                    .catch(error => cb(SERVER_MESSAGES.ERROR_SAVING, ''));
            });
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

            bcrypt.compare(enteringUser.password, resultUser.password, (err, ress) => {
                if (ress) {
                    return cb('', resultUser);
                }

                return cb(SERVER_MESSAGES.INCORRECT_PASS, '');
            });
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

exports.getOnlineUsers = () => {
    return UserSchema.find({ isOnline: true }, (err, res) => {
        if (!err) {
            return res;
        }
    });
}
