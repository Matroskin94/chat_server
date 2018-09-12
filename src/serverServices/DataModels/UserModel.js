/* eslint-disable */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userLogin: String,
    password: String,
    isOnline: Boolean
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;
