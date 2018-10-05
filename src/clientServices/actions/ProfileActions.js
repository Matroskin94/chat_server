import { fetchStart, fetchEnd } from './NetworkActions';
import {
    LOGIN_SUCCESS,
    LOG_OUT,
    UPDATE_PROFILE,
    UPDATE_USER_FRIENDS
} from '../../constants/clientConstants/actions';
import ProfileService from '../services/ProfileService';

export function loginSuccessAction(userData) {
    const userState = {
        ...userData.data
    };

    return ({
        type: LOGIN_SUCCESS,
        payload: userState
    });
}

export function logOutAction() {
    return ({
        type: LOG_OUT
    });
}

export function updateProfileAction(userData) {
    return {
        type: UPDATE_PROFILE,
        payload: userData
    };
}

export function updateFriendsAction(friends) {
    return {
        type: UPDATE_USER_FRIENDS,
        payload: friends
    };
}

export function loginRequestAction(user) {
    return dispatch => {
        dispatch(fetchStart());

        return ProfileService.login(user).then(response => {
            dispatch(fetchEnd());
            dispatch(loginSuccessAction(response));
            return response;
        }).catch(error => {
            dispatch(fetchEnd());

            throw error;
        });
    };
}

export function registrationRequestAction(user) {
    return dispatch => {
        dispatch(fetchStart());

        return ProfileService.register(user).then(response => {
            dispatch(fetchEnd());
            dispatch(loginSuccessAction(response));
            return response;
        }).catch(error => {
            dispatch(fetchEnd());

            throw error;
        });
    };
}

export function checkAuthentication() {
    return dispatch => {
        dispatch(fetchStart());

        return ProfileService.checkAuthentication().then(response => {
            dispatch(fetchEnd());
            dispatch(loginSuccessAction(response));

            return response;
        }).catch(error => {
            dispatch(fetchEnd());

            throw error;
        });
    };
}
