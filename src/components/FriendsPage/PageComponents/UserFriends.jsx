import React from 'react';
import PropTypes from 'prop-types';

import List from 'antd/lib/list';
import 'antd/lib/list/style';

import FriendRow from './FriendRow.jsx';

import { noop } from '../../../clientServices/utils/common';

const UserFriends = ({ friendsList, onRemoveFriend }) => (
    <List
        locale={{ emptyText: 'У вас нет друзей' }}
        dataSource={friendsList}
        renderItem={item => (
            <FriendRow
                actions={item.actions}
                friend={item}
                onAddFriend={noop}
                onRemoveFriend={onRemoveFriend}
            />)}
    />
);

UserFriends.propTypes = {
    friendsList: PropTypes.array,
    onRemoveFriend: PropTypes.func
};

UserFriends.defaultProps = {
    friendsList: [],
    onRemoveFriend: noop
};

export default UserFriends;
