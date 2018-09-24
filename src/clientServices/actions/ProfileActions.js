import { fetchStart, fetchEnd } from './NetworkActions';
import { LOGIN_SUCCESS, LOG_OUT } from '../../constants/clientConstants/actions';
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
