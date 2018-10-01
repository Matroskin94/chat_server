/* eslint-disable */
const bcrypt = require('bcrypt');
const omit = require('lodash/omit');

const objectID = require('mongodb').ObjectID;
const UserModel = require('../DataModels/UserModel');
const SERVER_MESSAGES = require('../../constants/serverMessages');
const passport = require('passport');

const sessionUtils = require('../utils/sessionUtils.js');

const saltRounds = 10;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    return UserModel.findById(user._id, function(err, dbUser){
       done(err, dbUser);
    });
});

exports.isAuthenticated = (req, cb) => {
    if (req.isAuthenticated()) {
        if (!req.session.tabsCount) {
            req.session.tabsCount = 1;
        } else {
            req.session.tabsCount++;
        }

        return cb('', req.session.passport.user);
    }
    return cb({ message: SERVER_MESSAGES.NOT_AUTHENTICATED, code: 401}, '');
}

exports.addUser = (req, cb) => {
    const creatingUser = req.body;

    UserModel.findOne({ userLogin: creatingUser.userLogin }).then(result => {
        if (!result) {
            if (creatingUser.password === '') {
                return cb({
                    message: SERVER_MESSAGES.PASSWORD_REQUIRED,
                    field: 'password',
                    code: 500
                }, '');
            }

            return bcrypt.hash(creatingUser.password, saltRounds, function(err, hash) {
                const user = new UserModel({
                    ...creatingUser,
                    password: hash
                });
                const userCreeds = omit(user, ['password']);

                req.session.tabsCount = 1;
                req.login(userCreeds, err => {
                    if (err) {
                        return cb({ message: SERVER_MESSAGES.AUTHORIZATION_ERROR, code: 500 }, '');
                    }

                    return user.save()
                        .then(() => cb('', user))
                        .catch(error => cb({ message: SERVER_MESSAGES.ERROR_SAVING, code: 500 }, ''));
                });
            });
        }
        return cb({ message: SERVER_MESSAGES.USER_EXISTS, field: 'userLogin', code: 500 }, '');
    });
};

exports.checkUser = (req, cb) => {
    const enteringUser = req.body;

    UserModel.findOne({ userLogin: enteringUser.userLogin })
        .then(resUser => {
            if (!resUser) {
                return cb({message: SERVER_MESSAGES.NO_USER, field: 'userLogin', code: 500}, '');
            }

            return bcrypt.compare(enteringUser.password, resUser.password, (err, ress) => {
                if (ress) {
                    const userCreeds = omit(resUser, ['password']);

                    req.session.tabsCount = 1;
                    return req.login(userCreeds, err => {
                        if (err) {
                            return cb({ message: SERVER_MESSAGES.AUTHORIZATION_ERROR, code: 500 }, '');
                        }

                        return cb('', omit(resUser, ['password']));
                    });
                }

                return cb({ message: SERVER_MESSAGES.INCORRECT_PASS, field: 'password', code: 500 }, '');
            });
        }).catch( err => {
            return cb({ message: 'findOneAndUpdate ERROR', code: 500 }, '');
        });
};

exports.logoutUser = (userId, cb) => {
    UserModel.updateOne({ _id: objectID(userId) }, { isOnline: false }, (err, res) => {
        if (err) {
            console.log('LOGOUT ERROR', err);
        }
        console.log('User disconnected', res);
    });
};

exports.getOnlineUsers = () => {
    return UserModel.find({ isOnline: true }, (err, res) => {
        if (!err) {
            return res;
        }
    });
}

exports.isUserDisconnected = (mongoose, userLogin) => {
    const searchStr = `"userLogin":"${userLogin}"`;

    return new Promise((resolve, reject) => {
        mongoose.connection.db.collection('sessions')
        .find({ session: { $regex: searchStr } }, (err, resUser) => {
            if (resUser) {
                return resUser.toArray().then(res => {
                    const isDisconnected = res.every(item => {
                        if (item.session.indexOf(`"tabsCount":0`) > -1) {
                            return true;
                        }
                        return false;
                    });

                    if (isDisconnected) {
                        return module.exports.disconnectUser(userLogin).then(() => {
                            resolve(userLogin);
                        });
                    }
                    reject('NOT ALL SESSIONS CLOSED');
                });
            }
        });
    });
}

exports.disconnectUser = userLogin => {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ userLogin: userLogin }, { $set: { isOnline: false }})
        .then(resolve)
        .catch(err => {
            reject('UPDATING USER ERROR (NOT DISCONNECTED)');
        });
    });
}

exports.setUserOnline = userLogin => {
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ userLogin }, { isOnline: true }, (err, res) => {
            if (!res.isOnline) {
                resolve();
            }
            reject('USER ALREADY ONLINE');
        });
    });
}

exports.updateUser = updatedUser => {
    return new Promise((resolve, reject) => {
        UserModel.findByIdAndUpdate( updatedUser._id, updatedUser, (err, res) => {
            if (!err) {
                resolve(res);
            }

            reject('UPDATE USER ERROR', err);
        });
    });
}

exports.searchFriends = (searchStr, currentUserId) => {
    const regExp = new RegExp(searchStr, "i");
    const query = UserModel.find({
        _id: { $ne: currentUserId },
        $or: [
            { userLogin: regExp },
            { lastName: regExp },
            { firstName: regExp }
        ]
    }).select(['-password', '-__v']);
    const  promise = query.exec();

    return  promise.catch(err => {
        console.log('SEARCHING FRIENDS ERROR', err);
    });
}


exports.addToFriends = (currentUserId, friendId) => {
    const updateCurrentQuery = UserModel.findByIdAndUpdate(
        currentUserId,
        { $push: { friendsList: friendId } }
    );
    const updateFriendQuery = UserModel.findByIdAndUpdate(
        friendId,
        { $push: { friendsList: currentUserId } }
    );
    const promiseCurrentUser = updateCurrentQuery.exec();
    const promiseFriend = updateFriendQuery.exec();

    return  Promise.all([promiseCurrentUser, promiseFriend]).catch(err => {
        console.log('ADDING FRIEND ERROR', err);
    });
}
