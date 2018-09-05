import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style';

const UsersList = ({ usersList }) => {
    return (
        <Fragment>
            <div className='logo'>
                <h3>Пользователи онлайн</h3>
            </div>
            <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={['4']}
                selectable={false}
            >
                {usersList.map(user => (
                    <Menu.Item key={uniqueId()}>
                        <Icon type='user' />
                        <span className='nav-text'>{user.userLogin}</span>
                    </Menu.Item>
                ))}
            </Menu>
        </Fragment>
    );
};

UsersList.propTypes = {
    usersList: PropTypes.array
};

UsersList.defaultProps = {
    usersList: []
};

export default UsersList;
