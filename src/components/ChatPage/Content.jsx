import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import {
    Header as AntHeader,
    Content as AntContent
} from 'antd/lib/layout';
import {
    Layout,
    Input,
    Form,
    Button
} from 'antd';

import witHistory from '../HOC/History.jsx';
import withUser from '../HOC/WithUser.jsx';
import UsersList from './PageComponents/UsersList.jsx';
import MessagesList from './PageComponents/MessagesList.jsx';

import { noop } from '../../clientServices/utils/common';

import SOCKET_API from '../../constants/clientConstants/socketAPI';
import API from '../../constants/clientConstants/api';

import messSound from '../../assets/Message_sound.mp3';
import servSound from '../../assets/ServiceMessage_sound.mp3';

import chatStyles from './styles/chatStyles.less';
import commonStyles from './styles/commonStyles.less';

@witHistory()
@withUser()
@withSizes(({ width }) => ({ isMobile: width < 580 }))
class Content extends Component {
    static propTypes = {
        user: PropTypes.object,
        logOutUser: PropTypes.func, // withUser HOC
        historyPush: PropTypes.func, // witHistory HOC
        isMobile: PropTypes.bool // withSizes HOC

    };

    static defaultProps = {
        user: {},
        logOutUser: noop,
        historyPush: noop,
        isMobile: false
    }

    state = {
        usersList: [],
        message: '',
        socket: null,
        messageList: [],
        isCollapsed: false,
        messageSound: new Audio(messSound),
        serviceSound: new Audio(servSound)
    };

    componentDidMount() {
        const sock = io(API.BASE_URL);
        const { isMobile } = this.props;

        this.setState({ socket: sock, isCollapsed: isMobile }, () => {
            const { socket } = this.state;

            socket.emit(SOCKET_API.GET_ONLINE_USERS);

            socket.on(SOCKET_API.ONLINE_USERS, this.showOnlineUsers);

            socket.on(SOCKET_API.CONNECTED_USER, this.showConnectedUser);

            socket.on(SOCKET_API.USER_DISCONNECTED, this.showDisconnectedUser);

            socket.on(SOCKET_API.RECIEVE_MESSAGE, this.addMessageToState);
        });

        window.addEventListener('resize', this.updateScreenSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateScreenSize);
    }

    onCollapse = collapsed => {
        this.setState({ isCollapsed: collapsed });
    }

    handleInputChange = e => {
        this.setState({
            message: e.target.value
        });
    }

    handleSendMessage = e => {
        e.preventDefault();
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
            messageList: prevState.messageList.concat(messageObj),
            message: ''
        }), () => {
            this.messageInputRef.scrollTop = this.messageInputRef.scrollHeight;
        });
    }

    handleLogOut = () => {
        const { socket } = this.state;
        const { historyPush, logOutUser } = this.props;

        socket.emit(SOCKET_API.USER_LOGOUT);

        this.setState({ socket: null }, () => {
            logOutUser();
            // historyPush({ url: '/' });
        });
    }

    setmessageInputRef = element => {
        this.messageInputRef = element;
    };

    updateScreenSize = () => {
        const { isMobile } = this.props;
        const { isCollapsed } = this.state;

        if (isMobile !== isCollapsed) {
            this.setState({ isCollapsed: isMobile });
        }
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
            this.messageInputRef.scrollTop = this.messageInputRef.scrollHeight;

            if (mess.isServiseMessage) {
                serviceSound.play();
            } else {
                messageSound.play();
            }
        });
    }

    render() {
        const {
            message,
            messageList,
            usersList,
            isCollapsed
        } = this.state;
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
                        <MessagesList
                            messagesList={messageList}
                            styles={chatStyles}
                            setInputRef={this.setmessageInputRef}
                        />
                        <Form onSubmit={this.handleSendMessage} className={chatStyles.inputContainer}>
                            <Input
                                placeholder='Сообщение...'
                                onChange={this.handleInputChange}
                                value={message}
                                onSubmit={this.handleSendMessage}
                            />
                            <Button
                                disabled={!message}
                                className={chatStyles.sendButton}
                                type='primary'
                                shape='circle'
                                icon='notification'
                                onClick={this.handleSendMessage}
                                size='default'
                            />
                        </Form>
                    </AntContent>
                    <UsersList
                        isCollapsed={isCollapsed}
                        usersList={usersList}
                        handleCollapse={this.onCollapse}
                    />
                </Layout>
            </Layout>
        );
    }
}

export default Content;
