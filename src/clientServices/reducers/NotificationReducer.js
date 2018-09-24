import {
    OPEN_MESSAGES,
    CLOSE_MESSAGES
} from '../../constants/clientConstants/actions';

const initialState = {
    isMessagesOpen: false,
    messageRecipient: {}
};

export default function NotificationReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MESSAGES: {
            return {
                ...state,
                messageRecipient: action.payload,
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
