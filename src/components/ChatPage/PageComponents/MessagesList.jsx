import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import { Card, Avatar, Alert } from 'antd';
import 'antd/lib/menu/style';

import RenderAlert from './RenderAlert.jsx';

import { noop } from '../../../clientServices/utils/common';

import chatStyles from '../styles/chatStyles.less';

const MessagesList = ({ messagesList, setInputRef }) => {
    const renderMessage = message => (message.isServiseMessage ?
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
        )
    );

    return (
        <div ref={setInputRef} className={chatStyles.messagesContainer}>
            {messagesList.map(mess => renderMessage(mess))}
        </div>
    );
};

MessagesList.propTypes = {
    messagesList: PropTypes.array,
    setInputRef: PropTypes.func
};

MessagesList.defaultProps = {
    setInputRef: noop,
    messagesList: []
};

export default MessagesList;
