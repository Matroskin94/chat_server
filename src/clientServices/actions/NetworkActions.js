import {
    FETCH_START,
    FETCH_END
} from '../../constants/clientConstants/constants';

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
