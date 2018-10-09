import omit from 'lodash/omit';

import {
    OPEN_MESSAGES,
    CLOSE_MESSAGES
} from '../../constants/clientConstants/actions';

const initialState = {
    isMessagesOpen: false,
    modalType: '',
    messageRecipient: {},
    dialogId: ''
};

export default function NotificationReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MESSAGES: {
            return {
                ...state,
                ...omit(action.payload, ['modalType']),
                modalType: action.payload.modalType,
                isMessagesOpen: true
            };
        }

        case CLOSE_MESSAGES: {
            return {
                ...state,
                isMessagesOpen: false
            };
        }

        default: {
            return { ...state };
        }
    }
}
