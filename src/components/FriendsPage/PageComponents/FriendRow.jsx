import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Item } from 'antd/lib/list';
import Badge from 'antd/lib/badge';
import Tooltip from 'antd/lib/tooltip';

import ProfileIcon from '../../common/ProfileIcon/ProfileIcon.jsx';
import FriendActions from './FriendActions.jsx';

import { noop } from '../../../clientServices/utils/common';

import friendActions from '../styles/friendActions.less';
import friendsStyles from '../styles/friendsStyles.less';

const FriendRow = ({
    friend,
    actions,
    onAddFriend,
    onRemoveFriend
}) => (
    <Item className={friendActions.friendRow}>
        <Item.Meta
            avatar={
                <ProfileIcon
                    size={32}
                    user={friend}
                    shape='circle'
                />
            }
            title={
                <Fragment>
                    {friend.userLogin}
                    <Tooltip placement='top' title='Онлайн'>
                        <Badge
                            hidden={!friend.isOnline}
                            className={friendsStyles.nickname}
                            status='processing'
                        />
                    </Tooltip>
                </Fragment>
            }
            description={`${friend.firstName} ${friend.lastName}`}
        />
        <FriendActions
            friend={friend}
            actions={actions}
            onAddFriend={onAddFriend}
            onRemoveFriend={onRemoveFriend}
        />
    </Item>
);

FriendRow.propTypes = {
    friend: PropTypes.object,
    actions: PropTypes.array,
    onAddFriend: PropTypes.func,
    onRemoveFriend: PropTypes.func
};

FriendRow.defaultProps = {
    friend: {},
    actions: [],
    onAddFriend: noop,
    onRemoveFriend: noop
};

export default FriendRow;
