export const noop = () => {};

export function updateTimer(timerId, interval, cb) {
    if (timerId) {
        clearTimeout(timerId);
    }

    const currentTimer = setTimeout(cb, interval);

    return currentTimer;
}

export function getFriendsActions(userFriendsIds, friendsList) {
    return friendsList.map(item => {
        const actions = ['sendMessage'];

        if (userFriendsIds.includes(item._id)) {
            actions.push('removeFromFriends');
        } else {
            actions.push('addToFriends');
        }

        return {
            ...item,
            actions
        };
    });
}

export function TypingUser(userLogin, isTyping) {
    this.userLogin = userLogin;
    this.isTyping = isTyping;
}

export function ActionMessage(userLogin, text) {
    this.isServiseMessage = true;
    this.author = { userLogin };
    this.text = text;
}
