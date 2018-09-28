/* eslint-disable */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userLogin: String,
    password: String,
    isOnline: Boolean,
    isAvatarShow: Boolean,
    vkId: Number,
    photo50: String,
    photo100: String,
    photo200orig: String,
    firstName: String,
    lastName: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
