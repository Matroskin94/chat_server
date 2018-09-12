/* eslint-disable */

exports.decrementTab = sess => {
    const parsedSession = JSON.parse(sess.session);

    parsedSession.tabsCount--;
    sess.session = JSON.stringify(parsedSession);

    return sess;
}