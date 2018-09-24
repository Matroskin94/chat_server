import { combineReducers } from 'redux';
import NetworkReducer from '../clientServices/reducers/NetworkReducer';
import ProfileReducer from '../clientServices/reducers/ProfileReducer';
import NotificationReducer from '../clientServices/reducers/NotificationReducer';

export default combineReducers({
    networkReducer: NetworkReducer,
    profileReducer: ProfileReducer,
    notificationReducer: NotificationReducer
});
