import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Loader from '../common/Loader/Loader.jsx';

import { initSocketAction } from '../../clientServices/actions/NetworkActions';

import API from '../../constants/clientConstants/api';

export default () => WrappedComponent => {
    function mapStateToProps(state) {
        return {
            socket: state.networkReducer.socket
        };
    }
    function mapDispatchToProps(dispatch) {
        return {
            initSocket: socket => dispatch(initSocketAction(socket))
        };
    }
    @connect(mapStateToProps, mapDispatchToProps)
    class WithSocketHOC extends PureComponent {
        componentWillMount() {
            const { socket, initSocket } = this.props;

            if (!socket) {
                initSocket(io(API.BASE_URL));
            }
        }

        render() {
            const { socket } = this.props;

            if (socket) {
                return <WrappedComponent
                    {...this.props}
                    socket={socket}
                />;
            }

            return <Loader show />;
        }
    }

    return WithSocketHOC;
};
