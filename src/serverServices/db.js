/* eslint-disable */

const mongoose = require('mongoose');

const state = {
    db: null
};

exports.connect = (dbURL, done) => {
    if (state.db) {
        done();
    }

    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        native_parser: true
    });

    mongoose.connection.once('open', () => {
        console.log('Mongoose connected');
        done();
    }).on('error', (err) => {
        console.log('Mongoose cjnnection ERROR', err);
    });
};
