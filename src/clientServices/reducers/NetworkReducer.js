import {
    FETCH_START,
    FETCH_END,
    INIT_SOCKET,
    DESTROY_SOCKET
} from '../../constants/clientConstants/actions';

const initialState = {
    isFetching: false,
    socket: null
};

export default function NetworkReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_START: {
            return {
                ...state,
                isFetching: true
            };
        }

        case FETCH_END: {
            return {
                ...state,
                isFetching: false
            };
        }

        case INIT_SOCKET: {
            return {
                ...state,
                socket: action.payload
            };
        }

        case DESTROY_SOCKET: {
            return {
                ...state,
                socket: null
            };
        }

        default: {
            return { ...state };
        }
    }
}
