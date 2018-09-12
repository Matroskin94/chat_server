/* eslint-disable */

const findSession = (mongoose, sessionId) => {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.collection('sessions')
        .findOne({ _id: sessionId }, (err, resSession) => {
            if (resSession) {
                resolve(resSession);
            }
            reject(err);
        });
    })
}

const updateSesionInDB = (mongoose, sessionId, parsedSession) => {
    return new Promise((resolve, reject) => {
        mongoose.connection.db.collection('sessions')
        .findOneAndUpdate(
            { '_id': sessionId },
            { $set: { session: JSON.stringify(parsedSession) } },
            { returnOriginal:false },
            (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
        });
    });
}

const updateSession = (mongoose, sessionId, updateFunctinon) => {
    return findSession(mongoose, sessionId).then(sess => {
        const parsedSession = JSON.parse(sess.session);

        return updateSesionInDB(mongoose, sessionId, updateFunctinon(parsedSession));
    }).catch(err => {
        console.log('DISCONNECTING TABS ERROR', err);
    });
}

const decrementSessionTabs = (session) => {
    session.tabsCount--;

    return session;
}

const incrementSessionTabs = (session) => {
    session.tabsCount++;

    return session;
}

exports.disconnectUserTab = (mongoose, sessionId) => {
    return updateSession(mongoose, sessionId, decrementSessionTabs);
}

exports.connectUserTab = (mongoose, sessionId) => {
    return updateSession(mongoose, sessionId, incrementSessionTabs);
}

exports.clearSessionCollection = (mongoose) => {
    mongoose.connection.db.collection('sessions').remove();
}
