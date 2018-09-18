import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router';

import withUser from '../components/HOC/WithUser.jsx';

import Loader from '../components/common/Loader/Loader.jsx';

import { noop } from '../clientServices/utils/common';

import ROUTES from '../constants/clientConstants/routes';

@withRouter
@withUser()
class AuthProvider extends PureComponent {
    static propTypes = {
        onCheckAuthentication: PropTypes.func, // HOC withUser
        isLoggedIn: PropTypes.bool,
        location: PropTypes.object,
        children: PropTypes.element.isRequired
    };

    static defaultProps = {
        location: {},
        isLoggedIn: false,
        onCheckAuthentication: noop
    }

    state = {
        isWaiting: true
    }

    componentDidMount() {
        const { onCheckAuthentication } = this.props;

        onCheckAuthentication().then(() => {
            this.setState({ isWaiting: false });
        }).catch(err => {
            this.setState({ isWaiting: false });
        });
    }

    render() {
        const { children, location, isLoggedIn } = this.props;
        const { isWaiting } = this.state;
        const isClosedPage = location.pathname !== ROUTES.BASE
            && location.pathname !== ROUTES.REGISTRATION;

        if (isWaiting) {
            return <Loader show={Boolean(true)} />;
        }

        if ((isLoggedIn) && location.pathname !== ROUTES.CHAT) {
            return <Redirect to={{ pathname: ROUTES.CHAT }} />;
        }

        if (!isLoggedIn && isClosedPage) {
            return <Redirect to={{ pathname: ROUTES.BASE }} />;
        }

        return children;
    }
}

export default AuthProvider;
