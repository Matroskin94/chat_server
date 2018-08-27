import { combineReducers } from 'redux';
import NetworkReducer from '../clientServices/reducers/NetworkReducer';
import ProfileReducer from '../clientServices/reducers/ProfileReducer';

export default combineReducers({
    networkReducer: NetworkReducer,
    profileReducer: ProfileReducer
});
