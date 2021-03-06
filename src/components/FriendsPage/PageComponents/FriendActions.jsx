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
import COMMON from '../../../constants/clientConstants/common';

import friendActionsStyle from '../styles/friendActions.less';

const FriendActions = ({
    actions,
    friend,
    openDrawer, // open throw store
    onAddFriend,
    onRemoveFriend
}) => {
    const handleSendMessage = () => {
        openDrawer(friend);
    };

    const handleAddToFriends = () => {
        onAddFriend(friend);
    };

    const handleRemoveFromFriends = () => {
        onRemoveFriend(friend);
    };

    return (
        <div className={friendActionsStyle.actionsContainer}>
            { actions.includes(COMMON.SEND_MESSAGE) ? (
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
            { actions.includes(COMMON.ADD_TO_FRIENDS) ? (
                <Tooltip title='Добавить в друзья'>
                    <AddFriendIcon
                        onClick={handleAddToFriends}
                        fill={COLOR.GRAY}
                        height='1.4em'
                        width='1.4em'
                    />
                </Tooltip>
            ) : null}
            { actions.includes(COMMON.REMOVE_FROM_FRIENDS) ? (
                <Tooltip title='Убрать из друзей'>
                    <RemoveFriendIcon
                        onClick={handleRemoveFromFriends}
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
    openDrawer: PropTypes.func,
    onAddFriend: PropTypes.func,
    onRemoveFriend: PropTypes.func
};

FriendActions.defaultProps = {
    actions: [],
    friend: {},
    openDrawer: noop,
    onAddFriend: noop,
    onRemoveFriend: noop
};

function mapDispatchToProps(dispatch) {
    return {
        openDrawer: messageRecipient => dispatch(openMessagesDrawer(messageRecipient))
    };
}

export default connect(null, mapDispatchToProps)(FriendActions);
