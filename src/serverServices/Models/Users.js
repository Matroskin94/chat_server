/* eslint-disable */
const bcrypt = require('bcrypt');

const objectID = require('mongodb').ObjectID;
const UserSchema = require('../DataShemes/UserSchema');
const SERVER_MESSAGES = require('../../constants/serverMessages');
const passport = require('passport');

const saltRounds = 10;

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

exports.isAuthenticated = (req, cb) => {
    if (req.isAuthenticated()) {
        return cb('', req.session.passport.user);
    }
    return cb({ message: SERVER_MESSAGES.NOT_AUTHENTICATED, code: 401}, '');
}

exports.addUser = (req, cb) => {
    const creatingUser = req.body;

    UserSchema.findOne({ userLogin: creatingUser.userLogin }).then(result => {
        if (!result) {
            if (creatingUser.password === '') {
                return cb({
                    message: SERVER_MESSAGES.PASSWORD_REQUIRED,
                    field: 'password',
                    code: 500
                }, '');
            }

            return bcrypt.hash(creatingUser.password, saltRounds, function(err, hash) {
                const user = new UserSchema({
                    ...creatingUser,
                    password: hash
                });
                const userCreeds = {
                    _id: user._id,
                    userLogin: user.userLogin,
                    password: user.password,
                };

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

    UserSchema.findOne({ userLogin: enteringUser.userLogin })
        .then(resUser => {
            if (!resUser) {
                return cb({message: SERVER_MESSAGES.NO_USER, field: 'userLogin', code: 500}, '');
            }

            return bcrypt.compare(enteringUser.password, resUser.password, (err, ress) => {
                if (ress) {
                    const userCreeds = {
                        _id: resUser._id,
                        userLogin: resUser.userLogin,
                        password: resUser.password,
                    };

                    return req.login(userCreeds, err => {
                        if (err) {
                            return cb({ message: SERVER_MESSAGES.AUTHORIZATION_ERROR, code: 500 }, '');
                        }

                        return cb('', resUser);
                    });
                }

                return cb({ message: SERVER_MESSAGES.INCORRECT_PASS, field: 'password', code: 500 }, '');
            });
        }).catch( err => {
            return cb({ message: 'findOneAndUpdate ERROR', code: 500 }, '');
        });
};

exports.logoutUser = (userId, cb) => {
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

exports.isUserDisconnected = (mongoose, userLogin) => {
    const searchStr = `"userLogin":"${userLogin}"`;

    return new Promise((resolve, reject) => {
        mongoose.connection.db.collection('sessions')
        .findOne({ session: { $regex: searchStr } }, (err, resUser) => {
            if (resUser) reject('NOT ALL SESSIONS CLOSED');
            resolve(userLogin);
        });
    });
}

exports.disconnectUser = userLogin => {
    return new Promise((resolve, reject) => {
        UserSchema.findOneAndUpdate({ userLogin: userLogin }, { $set: { isOnline: false }})
        .then(resolve)
        .catch(err => {
            reject('UPDATING USER ERROR (NOT DISCONNECTED)');
        });
    });
}

exports.setUserOnline = userLogin => {
    return new Promise((resolve, reject) => {
        UserSchema.findOneAndUpdate({ userLogin }, { isOnline: true }, (err, res) => {
            if (!res.isOnline) {
                resolve();
            }
            reject('USER ALREADY ONLINE');
        });
    });
}
