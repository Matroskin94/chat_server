const UserSchema = require('../DataShemes/UserSchema');

exports.addUser = (creatingUser, cb) => {
    UserSchema.findOne({ name: creatingUser.name }).then(result => {
        if (!result) {
            const user = new UserSchema(creatingUser);

            user.save().then(() => {
                return cb('', user);
            }).catch(error => {
                return cb('ERROR_SAVING', '');
            });
        } else {
            return cb('USER_EXISTS', '');
        }
    });
}

exports.checkUser = (enteringUser, cb) => {
    UserSchema.findOne({ name: enteringUser.name }).then(resultUser => {
        if (!resultUser) {
            return cb('NO_USER', '');
        } else {
            if (String(enteringUser.password) !== String(resultUser.password)) {
                return cb('INCORRECT_PASS', '');
            } else {
                return cb('', resultUser);
            }
        }
    });
}
