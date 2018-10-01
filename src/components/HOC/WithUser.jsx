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
            _id: state.profileReducer._id,
            userLogin: state.profileReducer.userLogin,
            password: state.profileReducer.password,
            vkId: state.profileReducer.vkId,
            photo50: state.profileReducer.photo50,
            photo200orig: state.profileReducer.photo200orig,
            photo100: state.profileReducer.photo100,
            firstName: state.profileReducer.firstName,
            lastName: state.profileReducer.lastName,
            isAvatarShow: state.profileReducer.isAvatarShow,
            friendsList: state.profileReducer.friendsList
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
