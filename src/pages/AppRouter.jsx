import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import initStore from '../store/appStore';

import StartPage from './StartPage.jsx';
import ChatPage from './ChatPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import AuthProvider from './AuthProvider.jsx';

import ROUTES from '../constants/clientConstants/routes';

import './index.css';

const store = initStore();

const AppRouter = props => (
    <Provider store={store}>
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route
                        exact
                        path={ROUTES.BASE}
                        component={StartPage}
                    />
                    <Route path={ROUTES.REGISTRATION} component={RegistrationPage} />
                    <Route path={ROUTES.CHAT} component={ChatPage} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    </Provider>
);

export default AppRouter;
