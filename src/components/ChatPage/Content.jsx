import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
// import Sound from 'react-sound';

import Button from 'antd/lib/button';
import {
    Header as AntHeader,
    Sider,
    Content as AntContent
} from 'antd/lib/layout';
import { Layout, Input } from 'antd';
import 'antd/lib/menu/style';
import 'antd/lib/layout/style';
import 'antd/lib/button/style';
import 'antd/lib/input/style';

import history from '../HOC/History.jsx';
import withUser from '../HOC/WithUser.jsx';
import UsersList from './PageComponents/UsersList.jsx';
import MessagesList from './PageComponents/MessagesList.jsx';

import { noop } from '../../clientServices/utils/common';

import SOCKET_API from '../../constants/clientConstants/socketAPI';
import API from '../../constants/clientConstants/api';

import messSound from '../../assets/Message_sound.mp3';
import servSound from '../../assets/ServiceMessage_sound.mp3';

import chatStyles from './styles/chatStyles.less';
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
        messageList: [],
        messageSound: new Audio(messSound),
        serviceSound: new Audio(servSound)
    };

    componentDidMount() {
        const { onCheckAuthentication, historyPush } = this.props;

        onCheckAuthentication().then(res => {
            const sock = io(API.BASE_URL);

            this.setState({ socket: sock }, () => {
                const { socket } = this.state;

                socket.emit(SOCKET_API.GET_ONLINE_USERS);

                socket.on(SOCKET_API.ONLINE_USERS, this.showOnlineUsers);

                socket.on(SOCKET_API.CONNECTED_USER, this.showConnectedUser);

                socket.on(SOCKET_API.USER_DISCONNECTED, this.showDisconnectedUser);

                socket.on(SOCKET_API.RECIEVE_MESSAGE, this.addMessageToState);
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
        const { socket, message } = this.state;
        const { user } = this.props;

        const messageObj = {
            isServiseMessage: false,
            author: {
                _id: user._id,
                userLogin: user.userLogin
            },
            text: message
        };

        socket.emit(SOCKET_API.SEND_MESSAGE, messageObj);
        this.setState(prevState => ({
            messageList: prevState.messageList.concat(messageObj)
        }));
    }

    handleLogOut = () => {
        const { socket } = this.state;
        const { historyPush } = this.props;

        socket.emit(SOCKET_API.USER_LOGOUT);

        this.setState({ socket: null }, () => {
            historyPush({ url: '/' });
        });
    }

    showConnectedUser = connectedUser => {
        const message = {
            isServiseMessage: true,
            author: { userLogin: connectedUser },
            text: ' присоедиинился к беседе'
        };

        this.addMessageToState(message);
    }

    showDisconnectedUser = disconnectedUser => {
        const message = {
            isServiseMessage: true,
            author: { userLogin: disconnectedUser },
            text: ' покинул к беседу'
        };

        this.addMessageToState(message);
    }

    showOnlineUsers = usersList => {
        this.setState({ usersList });
    }

    addMessageToState = mess => {
        const { messageSound, serviceSound } = this.state;

        this.setState(prevState => ({
            messageList: prevState.messageList.concat(mess)
        }), () => {
            if (mess.isServiseMessage) {
                serviceSound.play();
            } else {
                messageSound.play();
            }
        });
    }

    render() {
        const { message, messageList, usersList } = this.state;
        const { user } = this.props;

        return (
            <Layout>
                <AntHeader className={commonStyles.header}>
                    <h3>
                        Привет
                        {` ${user.userLogin}`}
                        !
                    </h3>
                    <Button onClick={this.handleLogOut}>Выйти</Button>
                </AntHeader>
                <Layout className={commonStyles.contentContainer}>
                    <AntContent className={chatStyles.chatContainer}>
                        <div className={chatStyles.chatHeader}>
                            <h3>
                                Чат Node.js
                            </h3>
                            <hr />
                        </div>
                        <MessagesList messagesList={messageList} styles={chatStyles} />
                        <Input.Search
                            className={chatStyles.inputContainer}
                            placeholder='Сообщение...'
                            enterButton='Отправить'
                            size='large'
                            onSearch={this.handleSendMessage}
                            type='text'
                            onChange={this.handleInputChange}
                            value={message}
                        />
                    </AntContent>
                    <Sider className={commonStyles.sider}>
                        <UsersList usersList={usersList} />
                    </Sider>
                </Layout>
            </Layout>
        );
    }
}

export default Content;
