import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from 'antd/lib/card';
import Divider from 'antd/lib/divider';
import List from 'antd/lib/list';

import MessageRow from './PageComponents/MessageRow.jsx';

import {
    openMessagesDrawer
} from '../../clientServices/actions/NotificationActions';
import { noop } from '../../clientServices/utils/common';

import commonMessagesTyles from './styles/commonMessagesStyles.less';

const messagesMock = [
    {
        userLogin: 'Frank',
        messageText: 'Last unread message',
        unreadCount: 0
    },
    {
        userLogin: 'Tony',
        messageText: 'Last unread message',
        unreadCount: 5
    }
];

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: recipientUser => dispatch(openMessagesDrawer(recipientUser))
    };
}


@connect(null, mapDispatchToProps)
class Content extends PureComponent {
    static propTypes = {
        openDrawer: PropTypes.func
    };

    static defaultProps = {
        openDrawer: noop
    }

    onMessageClick = message => () => {
        const { openDrawer } = this.props;

        openDrawer(message.userLogin); // TODO: передать _id пользователя
    }

    render() {
        return (
            <Fragment>
                <Divider>Сообщения</Divider>
                <Card className={commonMessagesTyles.container}>
                    <List
                        dataSource={messagesMock}
                        renderItem={item => (
                            <MessageRow
                                handleMessageClick={this.onMessageClick}
                                message={item}
                            />)}
                    />
                </Card>
            </Fragment>
        );
    }
}

export default Content;
