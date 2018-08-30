import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import withUser from '../HOC/WithUser.jsx';
import UsersList from './PageComponents/UsersList.jsx';

import chatStyles from './styles/chatStyles.css';
import commonStyles from './styles/commonStyles.css';

@withUser()
class Content extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    static defaultProps = {
        user: {}
    }

    state = {
        usersList: [],
        message: '',
        socket: null,
        messageList: []
    };

    componentDidMount() {
        const sock = io('http://localhost:8000');
        const { user } = this.props;

        this.setState({ socket: sock }, () => {
            const { socket } = this.state;

            socket.on('connect', () => {
                socket.emit('userConnected', user.userLogin);
                socket.emit('getOnlineUsers');
            });

            socket.on('onlineUsers', data => {
                this.setState({ usersList: data });
            });

            socket.on('connectedUser', connectedUser => {
                const message = `${connectedUser} присоедиинился к беседе`;

                this.setState(prevState => ({
                    messageList: prevState.messageList.concat(message)
                }));
            });
        });
    }

    handleInputChange = e => {
        this.setState({
            message: e.target.value
        });
    }

    handleSendMessage = () => {

    }

    render() {
        const { message, messageList, usersList } = this.state;
        const { user } = this.props;

        return (
            <div className={commonStyles.container}>
                <div className={chatStyles.chatContainer}>
                    <h2>Чат</h2>
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
