import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        user: {
            userLogin: state.profileReducer.userLogin,
            password: state.profileReducer.password
        }
    };
}

@connect(mapStateToProps, null)
export default () => WrappedComponent => {
    class WithUserHOC extends PureComponent {
        static propTypes = {
            user: PropTypes.object
        };

        static defaultProps = {
            user: {}
        };

        render() {
            const { user } = this.props;

            return (
                <WrappedComponent {...this.props} user={user} />
            );
        }
}
return WithUserHOC;
};
