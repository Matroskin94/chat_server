import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';
import uniq from 'lodash/uniq';

import {
    Content as AntContent
} from 'antd/lib/layout';
import {
    Button,
    Divider
} from 'antd';

import SideBar from './PageComponents/SideBar/SideBar.jsx';
import MessagesList from './PageComponents/MessagesList.jsx';
import MessageInput from '../PageComponents/MessageInput/MessageInput.jsx';

import withUser from '../HOC/WithUser.jsx';
import withSocket from '../HOC/WithSocket.jsx';

import { TypingUser, ActionMessage } from '../../clientServices/utils/common';

import SOCKET_API from '../../constants/clientConstants/socketAPI';

import messSound from '../../assets/Message_sound.mp3';
import servSound from '../../assets/ServiceMessage_sound.mp3';

import chatStyles from './styles/chatStyles.less';

@withSocket()
@withUser()
@withSizes(({ width }) => ({ isMobile: width < 580 }))
class Content extends Component {
    static propTypes = {
        user: PropTypes.object,
        isMobile: PropTypes.bool, // withSizes HOC,
        socket: PropTypes.bool // withSocketHOC
    };

    static defaultProps = {
        user: {},
        isMobile: false,
        socket: null
    }

    constructor(props) {
        super(props);
        const { isMobile } = this.props;

        this.state = {
            usersList: [],
            message: '',
            typingUsers: [],
            isTyping: false,
            messageList: [],
            isCollapsed: isMobile,
            typingTimer: null,
            messageSound: new Audio(messSound),
            serviceSound: new Audio(servSound)
        };
    }

    componentDidMount() {
        const { socket } = this.props;

        this.isComponentMounted = true;

        socket.emit(SOCKET_API.GET_ONLINE_USERS);

        socket.on(SOCKET_API.ONLINE_USERS, this.showOnlineUsers);

        socket.on(SOCKET_API.CONNECTED_USER, this.showUserAction(' присоединился к беседе.'));

        socket.on(SOCKET_API.USER_DISCONNECTED, this.showUserAction(' покинул к беседу.'));

        socket.on(SOCKET_API.RECIEVE_MESSAGE, this.addMessageToState);

        socket.on(SOCKET_API.RECIEVE_USER_TYPING, this.recieveUserTyping);

        window.addEventListener('resize', this.updateScreenSize);
    }

    componentWillUnmount() {
        const { typingTimer } = this.state;

        this.isComponentMounted = false;
        clearTimeout(typingTimer);
        window.removeEventListener('resize', this.updateScreenSize);
    }

    onCollapse = collapsed => {
        this.setState({ isCollapsed: collapsed });
    }

    onInputChange = e => {
        const { isTyping } = this.state;
        const { socket, user } = this.props;
        const userTyping = new TypingUser(user.userLogin, true);

        if (!isTyping) {
            socket.emit(SOCKET_API.SEND_USER_TYPING, userTyping);

            const typingTimer = setTimeout(() => {
                const userNotTyping = new TypingUser(user.userLogin, false);

                socket.emit(SOCKET_API.SEND_USER_TYPING, userNotTyping);
                this.setState({ isTyping: false });
            }, 4000);

            this.setState({ typingTimer, isTyping: true });
        }

        this.setState({
            message: e.target.value
        });
    }

    onSendMessage = e => {
        e.preventDefault();
        const { message } = this.state;
        const { socket, user } = this.props;

        if (message.trim() === '') {
            return;
        }

        const messageObj = {
            isServiseMessage: false,
            author: {
                _id: user._id,
                userLogin: user.userLogin,
                photo50: user.photo50
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

    handleOpenList = () => {
        this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
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
        const { user } = this.props;

        if (user.userLogin !== actingUser) {
            this.addMessageToState(message);
        }
    }

    showOnlineUsers = usersList => {
        if (this.isComponentMounted) {
            this.setState({ usersList });
        }
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
            <Fragment>
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
                    <MessageInput
                        handleSendMessage={this.onSendMessage}
                        handleInputChange={this.onInputChange}
                        message={message}
                    />
                </AntContent>
                <SideBar
                    isMobile={isMobile}
                    isCollapsed={isCollapsed}
                    usersList={usersList}
                    handleCollapse={onCollapse}
                />
            </Fragment>
        );
    }
}

export default Content;
