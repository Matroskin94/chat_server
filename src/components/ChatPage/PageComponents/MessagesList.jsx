import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Alert from 'antd/lib/alert';
import Card from 'antd/lib/card';
import 'antd/lib/menu/style';
import 'antd/lib/card/style';
import 'antd/lib/alert/style';

import RenderAlert from './RenderAlert.jsx';
import Marker from '../../common/Marker/Marker.jsx';
import ProfileIcon from '../../common/ProfileIcon/ProfileIcon.jsx';

import { noop } from '../../../clientServices/utils/common';

import chatStyles from '../styles/chatStyles.less';

class MessagesList extends PureComponent {
    static propTypes = {
        messagesList: PropTypes.array,
        typingUsers: PropTypes.array,
        setInputRef: PropTypes.func
    };

    static defaultProps = {
        setInputRef: noop,
        messagesList: [],
        typingUsers: []
    };

    renderMessage = message => (message.isServiseMessage ?
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
                    avatar={<ProfileIcon size={48} user={message.author} />}
                    title={message.author.userLogin}
                    description={message.text}
                />
            </Card>
        )
    );

    render() {
        const { messagesList, setInputRef, typingUsers } = this.props;

        return (
            <Fragment>
                <div ref={setInputRef} className={chatStyles.messagesContainer}>
                    {messagesList.map(mess => this.renderMessage(mess))}
                </div>
                <div className={classnames(
                    chatStyles.markerContainer,
                    { [chatStyles.transparent]: typingUsers.length === 0 }
                )}
                >
                    <Marker />
                    <p>
                        {typingUsers.map(user => (<b key={uniqueId()}>{`${user} `}</b>))}
                        набирает сообщение.
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default MessagesList;
