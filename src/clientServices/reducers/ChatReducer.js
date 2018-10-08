import {
    ADD_MESSAGE_TO_CHAT,
} from '../../constants/clientConstants/actions';

const initialState = {
    chatMessages: []
};

export default function NetworkReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE_TO_CHAT: {
            return {
                ...state,
                chatMessages: state.chatMessages.concat(action.payload)
            };
        }

        default: {
            return { ...state };
        }
    }
}
