import uniq from 'lodash/uniq';

import {
    ADD_MESSAGE_TO_CHAT
} from '../../constants/clientConstants/actions';

export function addChatMessageAction(message) {
	const id = uniq();

    return ({
        type: ADD_MESSAGE_TO_CHAT,
        payload: { id, ...message }
    });
}
