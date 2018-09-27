import React, { PureComponent } from 'react';
import io from 'socket.io-client';

import API from '../../constants/clientConstants/api';

export default () => WrappedComponent => {
    class WithSocketHOC extends PureComponent {
        state = {
            socket: io(API.BASE_URL)
        }

        render() {
            const { socket } = this.state;

            return <WrappedComponent
                {...this.props}
                socket={socket}
            />;
        }
    }

    return WithSocketHOC;
};
