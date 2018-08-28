import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import initStore from '../store/appStore';

import StartPage from './StartPage.jsx';
import ChatPage from './ChatPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';

const store = initStore();

const AppRouter = props => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path='/'
                    component={StartPage}
                />
                <Route path='/registration' component={RegistrationPage} />
                <Route path='/chat' component={ChatPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default AppRouter;
