import {
    FETCH_START,
    FETCH_END,
    INIT_SOCKET,
    DESTROY_SOCKET
} from '../../constants/clientConstants/actions';

export function fetchStart() {
    return ({
        type: FETCH_START
    });
}

export function fetchEnd() {
    return ({
        type: FETCH_END
    });
}

export function initSocketAction(socket) {
    return ({
        type: INIT_SOCKET,
        payload: socket
    });
}

export function destroySocketAction() {
    return ({
        type: DESTROY_SOCKET
    });
}
