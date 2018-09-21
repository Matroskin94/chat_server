import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';

import FriendActions from './FriendActions.jsx';

const FriendRow = ({ friend, actions }) => (
    <Item>
        <Item.Meta
            avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
            }
            title={friend.userLogin}
            description={`${friend.name} ${friend.surname}`}
        />
        <FriendActions actions={actions} />
    </Item>
);

FriendRow.propTypes = {
    friend: PropTypes.object,
    actions: PropTypes.array
};

FriendRow.defaultProps = {
    friend: {},
    actions: []
};

export default FriendRow;
