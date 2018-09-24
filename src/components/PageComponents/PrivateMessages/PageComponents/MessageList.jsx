import React from 'react';
import PropTypes from 'prop-types';

import List, { Item } from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';

import messageListStyles from '../styles/messageListStyles.less';

const MessageList = ({ messages }) => (
    <div className={messageListStyles.messagesContainer}>
        <List
            itemLayout='horizontal'
            dataSource={messages}
            renderItem={item => (
                <Item extra={item.text}>
                    <Item.Meta
                        avatar={item.user.avatarURL ?
                            (<Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />) :
                            (<Avatar><Icon type="user" theme="outlined" /></Avatar>)
                        }
                        title={item.user.userLogin}
                        description={item.messageDate}
                    />
                </Item>
            )}
        />
    </div>
);

MessageList.propTypes = {
    messages: PropTypes.array
};

MessageList.defaultProps = {
    messages: []
};

export default MessageList;
