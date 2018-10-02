import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Loader from '../common/Loader/Loader.jsx';

import { initSocketAction, destroySocketAction } from '../../clientServices/actions/NetworkActions';

import API from '../../constants/clientConstants/api';

export default () => WrappedComponent => {
    function mapStateToProps(state) {
        return {
            socket: state.networkReducer.socket,
            isUserLoggedIn: state.profileReducer.isLoggedIn
        };
    }
    function mapDispatchToProps(dispatch) {
        return {
            initSocket: socket => dispatch(initSocketAction(socket)),
            destroySocket: () => dispatch(destroySocketAction())
        };
    }
    @connect(mapStateToProps, mapDispatchToProps)
    class WithSocketHOC extends PureComponent {
        componentWillMount() {
            const { socket, initSocket, isUserLoggedIn } = this.props;

            if (!socket && isUserLoggedIn) {
                initSocket(io(API.BASE_URL));
            }
        }

        destroySocket = () => {
            const { destroySocket, socket } = this.props;

            // destroySocket();
        }

        render() {
            const { socket } = this.props;

            if (socket) {
                return <WrappedComponent
                    {...this.props}
                    socket={socket}
                    destroySocket={this.destroySocket}
                />;
            }

            return <Loader show />;
        }
    }

    return WithSocketHOC;
};
