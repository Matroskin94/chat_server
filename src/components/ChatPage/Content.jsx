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
    Button,
    Divider
} from 'antd';

import withUser from '../HOC/WithUser.jsx';
import SideBar from './PageComponents/SideBar/SideBar.jsx';
import MessagesList from './PageComponents/MessagesList.jsx';
import LogoutIcon from '../common/Icons/LogoutIcon.jsx';

import { noop } from '../../clientServices/utils/common';

import SOCKET_API from '../../constants/clientConstants/socketAPI';
import API from '../../constants/clientConstants/api';

import messSound from '../../assets/Message_sound.mp3';
import servSound from '../../assets/ServiceMessage_sound.mp3';

import chatStyles from './styles/chatStyles.less';
import commonStyles from './styles/commonStyles.less';


@withUser()
@withSizes(({ width }) => ({ isMobile: width < 580 }))
class Content extends Component {
    static propTypes = {
        user: PropTypes.object,
        logOutUser: PropTypes.func, // withUser HOC
        isMobile: PropTypes.bool // withSizes HOC

    };

    static defaultProps = {
        user: {},
        logOutUser: noop,
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

    handleOpenList = () => {
        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
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
        const { logOutUser } = this.props;

        socket.emit(SOCKET_API.USER_LOGOUT);

        this.setState({ socket: null }, () => {
            logOutUser();
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
        const { user, isMobile } = this.props;
        const onCollapse = isMobile ? this.handleOpenList : this.onCollapse;

        return (
            <Layout>
                <AntHeader className={commonStyles.header}>
                    <h3>
                        Привет
                        {` ${user.userLogin}`}
                        !
                    </h3>
                    <LogoutIcon
                        className={commonStyles.hoverPointer}
                        onClick={this.handleLogOut}
                    />
                </AntHeader>
                <Layout className={commonStyles.contentContainer}>
                    <AntContent className={chatStyles.chatContainer}>
                        <div className={chatStyles.chatHeader}>
                            <Divider>Чат Node.js</Divider>
                            <Button
                                hidden={!isMobile}
                                className={chatStyles.button}
                                onClick={this.handleOpenList}
                                shape='circle'
                                icon='team'
                                type='primary'
                            />
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
                                className={chatStyles.button}
                                type='primary'
                                shape='circle'
                                icon='notification'
                                onClick={this.handleSendMessage}
                                size='default'
                            />
                        </Form>
                    </AntContent>
                    <SideBar
                        isMobile={isMobile}
                        isCollapsed={isCollapsed}
                        usersList={usersList}
                        handleCollapse={onCollapse}
                    />
                </Layout>
            </Layout>
        );
    }
}

export default Content;
