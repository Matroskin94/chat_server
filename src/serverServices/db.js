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
        console.log('Connection opened');
        done();
    }).on('error', (err) => {
        console.log('ERROR', err);
    });
};
