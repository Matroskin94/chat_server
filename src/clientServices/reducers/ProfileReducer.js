import {
    LOGIN_SUCCESS,
    LOG_OUT,
    INIT_VK_USER
} from '../../constants/clientConstants/actions';

const initialState = {
    _id: 0,
    vkId: 0,
    photo50: '',
    photo200orig: '',
    photo100: '',
    firstName: 'UserNameReduser',
    lastName: 'UserLastnameReducer',
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

        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false
            };
        }

        case INIT_VK_USER: {
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
