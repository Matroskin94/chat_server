import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import uniq from 'lodash/uniq';

import {
    Content as AntContent
} from 'antd/lib/layout';
import {
    Layout,
    Input,
    Form,
    Button,
    Divider
} from 'antd';

import SideBar from './PageComponents/SideBar/SideBar.jsx';
import MessagesList from './PageComponents/MessagesList.jsx';
import PageHeader from '../PageComponents/PageHeader/PageHeader.jsx';

import withUser from '../HOC/WithUser.jsx';
import withSocket from '../HOC/WithSocket.jsx';

import { TypingUser, ActionMessage, noop } from '../../clientServices/utils/common';

import SOCKET_API from '../../constants/clientConstants/socketAPI';

import messSound from '../../assets/Message_sound.mp3';
import servSound from '../../assets/ServiceMessage_sound.mp3';

import chatStyles from './styles/chatStyles.less';
import commonStyles from './styles/commonStyles.less';

@withSocket()
@withUser()
@withSizes(({ width }) => ({ isMobile: width < 580 }))
class Content extends Component {
    static propTypes = {
        onCheckAuthentication: PropTypes.func,
        logOutUser: PropTypes.func,
        user: PropTypes.object,
        isMobile: PropTypes.bool, // withSizes HOC,
        socket: PropTypes.bool // withSocketHOC

    };

    static defaultProps = {
        onCheckAuthentication: noop,
        logOutUser: noop,
        user: {},
        isMobile: false,
        socket: null
    }

    state = {
        usersList: [],
        message: '',
        socket: null,
        typingUsers: [],
        isTyping: false,
        messageList: [],
        isCollapsed: false,
        messageSound: new Audio(messSound),
        serviceSound: new Audio(servSound)
    };

    componentDidMount() {
        const { isMobile, socket: sock } = this.props;

        this.setState({ socket: sock, isCollapsed: isMobile }, () => {
            const { socket } = this.state;

            socket.emit(SOCKET_API.GET_ONLINE_USERS);

            socket.on(SOCKET_API.ONLINE_USERS, this.showOnlineUsers);

            socket.on(SOCKET_API.CONNECTED_USER, this.showUserAction(' присоединился к беседе.'));

            socket.on(SOCKET_API.USER_DISCONNECTED, this.showUserAction(' покинул к беседу.'));

            socket.on(SOCKET_API.RECIEVE_MESSAGE, this.addMessageToState);

            socket.on(SOCKET_API.RECIEVE_USER_TYPING, this.recieveUserTyping);
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
        const { socket, isTyping } = this.state;
        const { user } = this.props;
        const userTyping = new TypingUser(user.userLogin, true);

        if (!isTyping) {
            this.setState({ isTyping: true });
            socket.emit(SOCKET_API.SEND_USER_TYPING, userTyping);

            setTimeout(() => {
                const userNotTyping = new TypingUser(user.userLogin, false);

                socket.emit(SOCKET_API.SEND_USER_TYPING, userNotTyping);
                this.setState({ isTyping: false });
            }, 4000);
        }
        this.setState({
            message: e.target.value
        });
    }

    handleSendMessage = e => {
        e.preventDefault();
        const { socket, message } = this.state;
        const { user } = this.props;

        if (message.trim() === '') {
            return;
        }

        const messageObj = {
            isServiseMessage: false,
            author: {
                _id: user._id,
                userLogin: user.userLogin
            },
            text: message
        };
        const userNotTyping = new TypingUser(user.userLogin, false);

        socket.emit(SOCKET_API.SEND_USER_TYPING, userNotTyping);
        socket.emit(SOCKET_API.SEND_MESSAGE, messageObj);

        this.setState(prevState => ({
            isTyping: false,
            messageList: prevState.messageList.concat(messageObj),
            message: ''
        }), () => {
            this.messageInputRef.scrollTop = this.messageInputRef.scrollHeight;
        });
    }

    recieveUserTyping = typingUser => {
        if (typingUser.isTyping) {
            this.setState(prevState => {
                const updatedTypingList = uniq(prevState.typingUsers.concat(typingUser.userLogin));

                return { typingUsers: updatedTypingList };
            });
        } else {
            const { typingUsers } = this.state;
            const updatedTypingList = typingUsers.filter(item => (
                item !== typingUser.userLogin
            ));

            this.setState({ typingUsers: updatedTypingList });
        }
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

    showUserAction = text => actingUser => {
        const message = new ActionMessage(actingUser, text);
        const { user, onCheckAuthentication, logOutUser } = this.props;

        if (user.userLogin === actingUser) {
            onCheckAuthentication().then(() => {
                this.addMessageToState(message);
            }).catch(() => {
                logOutUser();
            });
        } else {
            this.addMessageToState(message);
        }
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
            isCollapsed,
            typingUsers
        } = this.state;
        const { isMobile } = this.props;
        const onCollapse = isMobile ? this.handleOpenList : this.onCollapse;

        return (
            <Layout>
                <PageHeader isMobile={isMobile} />
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
                            typingUsers={typingUsers}
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
