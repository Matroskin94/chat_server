import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from './History.jsx';
import { noop } from '../../clientServices/utils/common';
import {
    loginRequestAction,
    registrationRequestAction
} from '../../clientServices/actions/ProfileActions';

import NETWORK_ERROR from '../../constants/clientConstants/errors';

function mapDispatchToProps(dispatch) {
    return {
        checkUser: user => dispatch(loginRequestAction(user)),
        registerUser: user => dispatch(registrationRequestAction(user))
    };
}

function mapStateToProps(state) {
    return {
        isFetching: state.networkReducer.isFetching
    };
}

@connect(mapStateToProps, mapDispatchToProps)
@history()
export default () => WrappedComponent => {
    class AuthorizationHOC extends PureComponent {
        static propTypes = {
            isFetching: PropTypes.bool,
            historyPush: PropTypes.func, // Функция из HOC changeHistory для перехода на страницы
            checkUser: PropTypes.func,
            enterUser: PropTypes.func
        };

        static defaultProps = {
            isFetching: false,
            historyPush: noop,
            checkUser: noop,
            enterUser: noop
        };

        handleLoginClick = user => {
            const { checkUser } = this.props;

            return checkUser(user).catch(err => {
                if (err) {
                    throw err.data;
                }

                throw NETWORK_ERROR;
            });
        }

        handleRegistrationClick = user => {
            const { registerUser, historyPush } = this.props;

            return registerUser(user).then(response => {
                historyPush({ url: '/chat' });
            }).catch(err => {
                throw err.data;
            });
        }

        render() {
            const { isFetching } = this.props;

            return <WrappedComponent
                {...this.props}
                isFetching={isFetching}
                onLoginClick={this.handleLoginClick}
                onRegistrationClick={this.handleRegistrationClick}
            />;
        }
}

return AuthorizationHOC;
};
