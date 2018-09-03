import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import history from '../HOC/History.jsx';
import withUser from '../HOC/WithUser.jsx';
import UsersList from './PageComponents/UsersList.jsx';

import { noop } from '../../clientServices/utils/common';
// import ChatService from '../../clientServices/services/ChatService';


import SOCKET_API from '../../constants/clientConstants/socketAPI';

import chatStyles from './styles/chatStyles.css';
import commonStyles from './styles/commonStyles.css';

@history()
@withUser()
class Content extends Component {
    static propTypes = {
        user: PropTypes.object,
        onCheckAuthentication: PropTypes.func, // withUser HOC
        historyPush: PropTypes.func

    };

    static defaultProps = {
        user: {},
        onCheckAuthentication: noop,
        historyPush: noop
    }

    state = {
        usersList: [],
        message: '',
        socket: null,
        messageList: []
    };

    componentDidMount() {
        const { onCheckAuthentication, historyPush } = this.props;

        onCheckAuthentication().then(res => {
            const sock = io('http://localhost:8000');

            this.setState({ socket: sock }, () => {
                const { socket } = this.state;

                socket.emit(SOCKET_API.GET_ONLINE_USERS);

                socket.on(SOCKET_API.ONLINE_USERS, this.showOnlineUsers);

                socket.on(SOCKET_API.CONNECTED_USER, this.showConnectedUser);

                socket.on(SOCKET_API.USER_DISCONNECTED, this.showDisconnectedUser);
            });
        }).catch(err => {
            historyPush({ url: '/' });
        });
    }

    handleInputChange = e => {
        this.setState({
            message: e.target.value
        });
    }

    handleSendMessage = () => {

    }

    handleLogOut = () => {
        const { socket } = this.state;

        socket.emit(SOCKET_API.USER_LOGOUT);
    }

    showConnectedUser = connectedUser => {
        const message = `${connectedUser} присоедиинился к беседе`;

        this.setState(prevState => ({
            messageList: prevState.messageList.concat(message)
        }));
    }

    showDisconnectedUser = disconnectedUser => {
        const message = `${disconnectedUser} покинул к беседу`;

        this.setState(prevState => ({
            messageList: prevState.messageList.concat(message)
        }));
    }

    showOnlineUsers = usersList => this.setState({ usersList })

    render() {
        const { message, messageList, usersList } = this.state;
        const { user } = this.props;

        return (
            <div className={commonStyles.container}>
                <div className={chatStyles.chatContainer}>
                    <h2>Чат</h2>
                    <button type='button' onClick={this.handleLogOut}>Выйти</button>
                    <h3>
                        Привет
                        {` ${user.userLogin}`}
                        !
                    </h3>
                    <input
                        type='text'
                        onChange={this.handleInputChange}
                        value={message}
                    />
                    <button type='button' onClick={this.handleSendMessage}>Отправить</button>
                    <h3>Сообщения</h3>
                    {messageList.map(item => (
                        <p key={uniqueId()}>
                            {item}
                        </p>
                    ))}
                </div>
                <UsersList usersList={usersList} />
            </div>
        );
    }
}

export default Content;
