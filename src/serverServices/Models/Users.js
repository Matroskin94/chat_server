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

exports.addUser = (req, cb) => {
    const creatingUser = req.body;

    UserSchema.findOne({ userLogin: creatingUser.userLogin }).then(result => {
        if (!result) {
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
                        return cb(SERVER_MESSAGES.AUTHORIZATION_ERROR, '');
                    }

                    return user.save()
                        .then(() => cb('', user))
                        .catch(error => cb(SERVER_MESSAGES.ERROR_SAVING, ''));
                });
            });
        }
        return cb(SERVER_MESSAGES.USER_EXISTS, '');
    });
};

exports.checkUser = (req, cb) => {
    const enteringUser = req.body;

    UserSchema.findOne({ userLogin: enteringUser.userLogin })
        .then(resUser => {
            if (!resUser) {
                return cb(SERVER_MESSAGES.NO_USER, '');
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
                            return cb(SERVER_MESSAGES.AUTHORIZATION_ERROR, '');
                        }

                        return cb('', resUser);
                    });
                }

                return cb(SERVER_MESSAGES.INCORRECT_PASS, '');
            });
        }).catch( err => {
            return cb('findOneAndUpdate ERROR', '');
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
            console.log('UPDATING USER ERROR (NOT DISCONNECTED)');
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
