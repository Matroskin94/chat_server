import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { noop } from '../../clientServices/utils/common';
import {
    checkAuthentication,
    logOutAction
} from '../../clientServices/actions/ProfileActions';

import NETWORK_ERROR from '../../constants/clientConstants/errors';

function mapStateToProps(state) {
    return {
        user: {
            userLogin: state.profileReducer.userLogin,
            password: state.profileReducer.password
        },
        isLoggedIn: state.profileReducer.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        isAuthenticated: () => dispatch(checkAuthentication()),
        logOutUser: () => dispatch(logOutAction())
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default () => WrappedComponent => {
    class WithUserHOC extends PureComponent {
        static propTypes = {
            checkAuthentication: PropTypes.func,
            user: PropTypes.object,
            isLoggedIn: PropTypes.bool
        };

        static defaultProps = {
            checkAuthentication: noop,
            user: {},
            isLoggedIn: false
        };

        handleAuthenticationCheck = () => {
            const { isAuthenticated } = this.props;

            return isAuthenticated().catch(err => {
                if (err) {
                    throw err.data;
                } else {
                    throw new Error(NETWORK_ERROR);
                }
            });
        }

        render() {
            const { user, logOutUser, isLoggedIn } = this.props;

            return (
                <WrappedComponent
                    {...this.props}
                    user={user}
                    isLoggedIn={isLoggedIn}
                    logOutUser={logOutUser}
                    onCheckAuthentication={this.handleAuthenticationCheck}
                />
            );
        }
}
return WithUserHOC;
};
