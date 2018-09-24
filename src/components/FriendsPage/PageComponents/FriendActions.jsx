import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from 'antd/lib/divider';
import Tooltip from 'antd/lib/tooltip';

import SendMessageIcon from '../../common/Icons/SendMessageIcon.jsx';
import AddFriendIcon from '../../common/Icons/AddFriendIcon.jsx';
import RemoveFriendIcon from '../../common/Icons/RemoveFriendIcon.jsx';

import { noop } from '../../../clientServices/utils/common';
import { openMessagesDrawer } from '../../../clientServices/actions/NotificationActions';

import COLOR from '../../../constants/clientConstants/colors';

import friendActionsStyle from '../styles/friendActions.less';

const FriendActions = ({ actions, friend, openDrawer }) => {
    const handleSendMessage = () => {
        openDrawer(friend);
    };

    return (
        <div className={friendActionsStyle.actionsContainer}>
            { actions.includes('sendMessage') ? (
                <Tooltip title='Отправить сообщение'>
                    <SendMessageIcon
                        onClick={handleSendMessage}
                        fill={COLOR.GRAY}
                        height='1.4em'
                        width='1.4em'
                    />
                </Tooltip>
            ) : null}
            { actions.length > 1 ? (
                <Divider className={friendActionsStyle.actionsDivider} type='vertical' />
            ) : null}
            { actions.includes('addToFriends') ? (
                <Tooltip title='Добавить в друзья'>
                    <AddFriendIcon
                        fill={COLOR.GRAY}
                        height='1.4em'
                        width='1.4em'
                    />
                </Tooltip>
            ) : null}
            { actions.includes('removeFromFriends') ? (
                <Tooltip title='Убрать из друзей'>
                    <RemoveFriendIcon
                        fill={COLOR.GRAY}
                        height='1.4em'
                        width='1.4em'
                    />
                </Tooltip>
            ) : null}
        </div>
    );
};

FriendActions.propTypes = {
    actions: PropTypes.array,
    friend: PropTypes.object,
    openDrawer: PropTypes.func
};

FriendActions.defaultProps = {
    actions: [],
    friend: {},
    openDrawer: noop
};

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: messageRecipient => dispatch(openMessagesDrawer(messageRecipient))
    };
}

export default connect(null, mapDispatchToProps)(FriendActions);
