import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducers from './reducers';

export default function initStore() {
    const store = createStore(
        combineReducers,
        applyMiddleware(thunk, logger)
    );

    return store;
}
