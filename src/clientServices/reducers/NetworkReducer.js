import {
    FETCH_START,
    FETCH_END
} from '../../constants/clientConstants/constants';

const initialState = {
    isFetching: false
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

        default: {
            return { ...state };
        }
    }
}
