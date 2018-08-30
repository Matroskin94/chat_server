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
                    password: hash,
                    isOnline: true
                });

                req.login(user._id, err => {
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

exports.checkUser = (enteringUser, cb) => {
    UserSchema.findOneAndUpdate({ userLogin: enteringUser.userLogin }, { isOnline: true })
        .then(resultUser => {
            if (!resultUser) {
                return cb(SERVER_MESSAGES.NO_USER, '');
            }

            bcrypt.compare(enteringUser.password, resultUser.password, (err, ress) => {
                if (ress) {
                    req.login(resultUser._id, err => {
                        if (err) {
                            return cb(SERVER_MESSAGES.AUTHORIZATION_ERROR, '');
                        }

                        return cb('', resultUser);
                    });
                }

                return cb(SERVER_MESSAGES.INCORRECT_PASS, '');
            });
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
