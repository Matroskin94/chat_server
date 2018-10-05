/* eslint-disable */

exports.decrementTab = sess => {
    const parsedSession = JSON.parse(sess.session);

    parsedSession.tabsCount--;
    sess.session = JSON.stringify(parsedSession);

    return sess;
}

exports.updateSession = socket => {
    socket.request.session.save(err => {
        if (err) {
            console.log('UPDATE SESSION ERROR', err);
        }
    });
}