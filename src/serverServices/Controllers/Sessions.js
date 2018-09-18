/* eslint-disable */

const sessionModel = require('../Models/Sessions');

exports.disconnectUserTab = (mongoose, sesionId) => {
    return sessionModel.disconnectUserTab(mongoose, sesionId);
}

exports.connectUserTab = (mongoose, sesionId) => {
    return sessionModel.disconnectUserTab(mongoose, sesionId);
}

