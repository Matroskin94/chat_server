import React from 'react';
import PropTypes from 'prop-types';

import uniqueId from 'lodash/uniqueId';

import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';

const UserList = ({ users }) => (
    <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['4']}
        selectable={false}
    >
        {users.map(user => (
            <Menu.Item key={uniqueId()}>
                <Icon type='user' />
                <span className='nav-text'>{user.userLogin}</span>
            </Menu.Item>
        ))}
    </Menu>
);

UserList.propTypes = {
    users: PropTypes.array
};

UserList.defaultProps = {
    users: []
};

export default UserList;
