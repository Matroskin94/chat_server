import React from 'react';
import PropTypes from 'prop-types';

import chatStyles from '../styles/chatStyles.less';

const RenderAlert = ({ message }) => (
    <p className={chatStyles.notification}>
        <span>{message.author.userLogin}</span>
        {message.text}
    </p>
);

RenderAlert.propTypes = {
    message: PropTypes.object
};

RenderAlert.defaultProps = {
    message: {}
};

export default RenderAlert;
