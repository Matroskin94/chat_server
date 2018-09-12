/* eslint-disable */

const sessionModel = require('../Models/Sessions');

exports.disconnectUserTab = (mongoose, sesionId) => {
    return sessionModel.disconnectUserTab(mongoose, sesionId);
}

exports.connectUserTab = (mongoose, sesionId) => {
    return sessionModel.disconnectUserTab(mongoose, sesionId);
}

exports.clearSessionCollection = mongoose => (req, res) => {
    res.status(200).send('SESSIONS CLEARED');
    return sessionModel.clearSessionCollection(mongoose);
}
