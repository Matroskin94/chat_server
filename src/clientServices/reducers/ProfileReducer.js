import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../constants/clientConstants/constants';

const initialState = {
    isAuthenticated: true,
    password: '',
    userLogin: 'not authorized',
    failedReason: ''
};

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                ...action.payload
            };
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                ...action.payload
            };
        }

        default: {
            return { ...state };
        }
    }
}
