import { LOGIN_SUCCESS, LOGIN_FAILED, LOG_OUT } from '../../constants/clientConstants/actions';

const initialState = {
    _id: 0,
    password: '',
    userLogin: 'not authorized',
    isLoggedIn: false
};

export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoggedIn: true
            };
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                ...action.payload
            };
        }

        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false
            };
        }

        default: {
            return { ...state };
        }
    }
}
