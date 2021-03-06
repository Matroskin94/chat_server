import {
    OPEN_MESSAGES,
    CLOSE_MESSAGES
} from '../../constants/clientConstants/actions';

export function openMessagesDrawer(messageRecipient) {
    return ({
        payload: messageRecipient,
        type: OPEN_MESSAGES
    });
}

export function closeMessagesDrawer() {
    return ({
        type: CLOSE_MESSAGES
    });
}
