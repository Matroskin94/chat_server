/* eslint-disable */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    session: String,
    express: Date
});

const SessionModel = mongoose.model('users', SessionSchema);

module.exports = SessionModel;
