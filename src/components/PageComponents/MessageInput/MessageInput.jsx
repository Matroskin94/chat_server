import React from 'react';
import PropTypes from 'prop-types';

import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';

import { noop } from '../../../clientServices/utils/common';

import inputMessageStyles from './styles/inputMessageStyles.less';

const MessageInput = ({ handleSendMessage, handleInputChange, message }) => (
    <Form onSubmit={handleSendMessage} className={inputMessageStyles.inputContainer}>
        <Input
            placeholder='Сообщение...'
            onChange={handleInputChange}
            value={message}
            onSubmit={handleSendMessage}
        />
        <Button
            disabled={!message}
            className={inputMessageStyles.button}
            type='primary'
            shape='circle'
            icon='notification'
            onClick={handleSendMessage}
            size='default'
        />
    </Form>
);

MessageInput.propTypes = {
    handleSendMessage: PropTypes.func,
    handleInputChange: PropTypes.func,
    message: PropTypes.string
};

MessageInput.defaultProps = {
    handleSendMessage: noop,
    handleInputChange: noop,
    message: ''
};

export default MessageInput;
