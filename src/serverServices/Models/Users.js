const UserSchema = require('../DataShemes/UserSchema');
const SERVER_MESSAGES = require('../../constants/serverMessages');

exports.addUser = (creatingUser, cb) => {
    UserSchema.findOne({ name: creatingUser.name }).then(result => {
        if (!result) {
            const user = new UserSchema(creatingUser);

            user.save().then(() => {
                return cb('', user);
            }).catch(error => {
                return cb(SERVER_MESSAGES.ERROR_SAVING, '');
            });
        } else {
            return cb(SERVER_MESSAGES.USER_EXISTS, '');
        }
    });
}

exports.checkUser = (enteringUser, cb) => {
    UserSchema.findOne({ name: enteringUser.name }).then(resultUser => {
        if (!resultUser) {
            return cb(SERVER_MESSAGES.NO_USER, '');
        } else {
            if (String(enteringUser.password) !== String(resultUser.password)) {
                return cb(SERVER_MESSAGES.INCORRECT_PASS, '');
            } else {
                return cb('', resultUser);
            }
        }
    });
}
