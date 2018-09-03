import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { noop } from '../../clientServices/utils/common';
import {
    checkAuthentication,
    loginSuccessAction
} from '../../clientServices/actions/ProfileActions';

function mapStateToProps(state) {
    return {
        user: {
            isOnline: state.profileReducer.isOnline,
            userLogin: state.profileReducer.userLogin,
            password: state.profileReducer.password
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        isAuthenticated: () => dispatch(checkAuthentication()),
        loginUser: user => dispatch(loginSuccessAction(user))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default () => WrappedComponent => {
    class WithUserHOC extends PureComponent {
        static propTypes = {
            checkAuthentication: PropTypes.func,
            user: PropTypes.object
        };

        static defaultProps = {
            checkAuthentication: noop,
            user: {}
        };

        handleAuthenticationCheck = () => {
            const { isAuthenticated, loginUser } = this.props;

            return isAuthenticated().then(response => {
                loginUser(response);
            }).catch(err => {
                throw err.data;
            });
        }

        render() {
            const { user } = this.props;

            return (
                <WrappedComponent
                    {...this.props}
                    user={user}
                    onCheckAuthentication={this.handleAuthenticationCheck}
                />
            );
        }
}
return WithUserHOC;
};
