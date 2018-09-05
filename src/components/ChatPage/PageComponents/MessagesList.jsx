import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { Card, Avatar, Alert } from 'antd';
import 'antd/lib/menu/style';


import RenderAlert from './RenderAlert.jsx';

import chatStyles from '../styles/chatStyles.less';

const MessagesList = ({ messagesList }) => {
    const renderMessage = message => {
        return message.isServiseMessage ?
            (<Alert
                key={uniqueId()}
                message={<RenderAlert message={message} />}
                type='info'
                showIcon
                className={chatStyles.cardStyle}
            />) :
            (
                <Card
                    className={chatStyles.cardStyle}
                    key={uniqueId()}
                >
                    <Card.Meta
                        avatar={
                            <Avatar
                                shape='square'
                                size={48}
                                icon='user'
                            />}
                        title={message.author.userLogin}
                        description={message.text}
                    />
                </Card>
            );
    };

    return (
        <div className={chatStyles.messagesContainer}>
            {messagesList.map(mess => renderMessage(mess))}
        </div>
    );
};

MessagesList.propTypes = {
    messagesList: PropTypes.array
};

MessagesList.defaultProps = {
    messagesList: []
};

export default MessagesList;
