import { fetchStart, fetchEnd } from './NetworkActions';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../constants/clientConstants/constants';
import ProfileService from '../common/ProfileService';

export function loginSuccessAction(userData) {
    const userState = {
        failedReason: '',
        ...userData.data
    };

    return ({
        type: LOGIN_SUCCESS,
        payload: userState
    });
}

export function loginFailedAction(reason) {
    const userState = {
        failedReason: reason
    };

    return ({
        type: LOGIN_FAILED,
        payload: userState
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
