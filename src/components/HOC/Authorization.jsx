import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from './History.jsx';
import { noop } from '../../clientServices/utils/common';
import {
    loginRequestAction,
    registrationRequestAction
} from '../../clientServices/actions/ProfileActions';

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
            return this.props.checkUser(user).then(response => {
                // this.props.enterUser(response);
                // this.props.historyPush({ url: '/chat' });
            }).catch(err => {
                throw err.data;
            });
        }

        handleRegistrationClick = user => {
            return this.props.registerUser(user).then(response => {
                // return response;
            }).catch(err => {
                throw err.data;
            });
        }

        render() {
            return <WrappedComponent
                {...this.props}
                isFetching={this.props.isFetching}
                onLoginClick={this.handleLoginClick}
                onRegistrationClick={this.handleRegistrationClick}
            />;
        }
}

return AuthorizationHOC;
};
