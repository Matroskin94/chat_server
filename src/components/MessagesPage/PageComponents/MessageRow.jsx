import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import classnames from 'classnames';

import { noop } from '../../../clientServices/utils/common';

import messageStyles from '../styles/messageStyles.less';

const MessageRow = ({ message, handleMessageClick }) => {
    const isUnread = message.unreadCount !== 0;

    return (
        <Item
            className={classnames(
                [messageStyles.messageRow],
                { [messageStyles.messageUnreadRow]: isUnread }
            )}
            onClick={handleMessageClick(message)}
        >
            <Item.Meta
                avatar={
                    <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                title={message.userLogin}
                description='Last unread message'
            />
            <div hidden={!isUnread} className={messageStyles.unreadCountContainer}>
                <Avatar size='small'>{message.unreadCount}</Avatar>
            </div>
        </Item>
    );
};

MessageRow.propTypes = {
    message: PropTypes.object,
    handleMessageClick: PropTypes.func
};

MessageRow.defaultProps = {
    message: {},
    handleMessageClick: noop
};

export default MessageRow;
