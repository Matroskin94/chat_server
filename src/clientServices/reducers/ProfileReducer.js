import {
    LOGIN_SUCCESS,
    LOG_OUT,
    UPDATE_PROFILE,
    UPDATE_USER_FRIENDS
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
    isLoggedIn: false,
    isAvatarShow: false,
    friendsList: [],
    friendsData: []
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

        case UPDATE_PROFILE: {
            return {
                ...state,
                ...action.payload
            };
        }

        case UPDATE_USER_FRIENDS: {
            return {
                ...state,
                friendsData: action.payload
            };
        }

        default: {
            return { ...state };
        }
    }
}
