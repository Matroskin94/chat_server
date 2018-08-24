import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from './History.jsx';
import { noop } from '../../clientServices/utils/common';
import { loginRequestAction } from '../../clientServices/actions/ProfileActions';

function mapDispatchToProps(dispatch) {
    return {
        loginUser: user => dispatch(loginRequestAction(user))
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
    class LoginHOC extends PureComponent {
        static propTypes = {
            isFetching: PropTypes.bool,
            historyPush: PropTypes.func, // Функция из HOC changeHistory для перехода на страницы
            loginUser: PropTypes.func,
            enterUser: PropTypes.func
        };
        static defaultProps = {
            isFetching: false,
            historyPush: noop,
            loginUser: noop,
            enterUser: noop
        };

        handleLoginClick = user => {
            return this.props.loginUser(user).then(response => {
                // this.props.enterUser(response);
                // this.props.historyPush({ url: '/chat' });
                console.log('RESPONSE FROM LOGIN', response);
            }).catch(err => {
                console.log('ERRRORRR!!!!', err);
            });
        }

        render() {
            return <WrappedComponent
                {...this.props}
                isFetching={this.props.isFetching}
                onLoginClick={this.handleLoginClick}
            />;
        }
}

return LoginHOC;
};
