import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'antd/lib/drawer';

import MessageInput from '../MessageInput/MessageInput.jsx';

import MessageList from './PageComponents/MessageList.jsx';

import privateMessageStyles from './styles/privateMessagesStyle.less';

import { noop } from '../../../clientServices/utils/common';
import {
    closeMessagesDrawer
} from '../../../clientServices/actions/NotificationActions';

const messagesMock = [
    {
        user: {
            userLogin: 'User Login',
            avatarURL: 'url'
        },
        isUnread: false,
        text: 'Message 1 bla bla bal',
        messageDate: '12 окт 2018 15:20:23'
    },
    {
        user: {
            userLogin: 'User Login',
            avatarURL: 'url'
        },
        isUnread: true,
        text: 'Message 2 la lala',
        messageDate: '12 окт 2018 15:21:22'
    },
    {
        user: {
            userLogin: 'Your Login',
            avatarURL: ''
        },
        isUnread: true,
        text: 'Long Long Long Long Long Long Long , Vesdfsdfry Verysdf Very Vesdfry Versdfsdf Very LONG TEXTVery Very Very Very Very Very LONG TEXTVery Very Very Very Very Very LONG TEXT',
        messageDate: '12 окт 2018 15:22:22'
    }

];

function mapDispatchToProps(dispatch) {
    return {
        closeDrawer: () => dispatch(closeMessagesDrawer())
    };
}

function mapStateToProps(state) {
    return {
        isMessagesOpen: state.notificationReducer.isMessagesOpen,
        messageRecipient: state.notificationReducer.messageRecipient,
        currentUser: {
            _id: state.profileReducer._id
        }
    };
}

@connect(mapStateToProps, mapDispatchToProps)
class PrivateMessages extends PureComponent {
    static propTypes = {
        closeDrawer: PropTypes.func,
        isMessagesOpen: PropTypes.bool
    };

    static defaultProps = {
        closeDrawer: noop,
        isMessagesOpen: false
    };

    state = {
        message: ''
    }

    onSendMessage = e => {
        e.preventDefault();
        console.log('SEND:', this.state.message);
    }

    onInputChange = e => {
        this.setState({ message: e.target.value });
    }

    handleCloseMessages = () => {
        const { closeDrawer } = this.props;

        closeDrawer();
    }

    render() {
        const { isMessagesOpen } = this.props;
        const { message } = this.state;

        return (
            <Drawer
                title='Сообщения'
                visible={isMessagesOpen}
                placement='left'
                width={380}
                onClose={this.handleCloseMessages}
                className={privateMessageStyles.drawerStyle}
            >
                <div className={privateMessageStyles.contentContainer}>
                    <MessageList messages={messagesMock} />
                    <MessageInput
                        handleSendMessage={this.onSendMessage}
                        handleInputChange={this.onInputChange}
                        message={message}
                    />
                </div>
            </Drawer>
        );
    }
}

export default PrivateMessages;
