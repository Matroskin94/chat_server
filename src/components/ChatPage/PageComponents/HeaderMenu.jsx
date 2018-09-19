import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Badge from 'antd/lib/badge';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/badge/style';
import 'antd/lib/dropdown/style';

import FriendsIcon from '../../common/Icons/FriendsIcon.jsx';
import MessagesIcon from '../../common/Icons/MessagesIcon.jsx';

import headerStyles from '../styles/headerStyles.less';

const HeaderMenu = ({ isMobile }) => {
    const friends = (
        <Menu.Item key='1' className={headerStyles.menuItem}>
            <Badge count={112} overflowCount={9}>
                <FriendsIcon />
            </Badge>
            <span className={headerStyles.itemText}>Друзья</span>
        </Menu.Item>
    );
    const messages = (
        <Menu.Item key='2' className={headerStyles.menuItem}>
            <Badge count={112} overflowCount={9}>
                <MessagesIcon />
            </Badge>
            <span className={headerStyles.itemText}>Сообщения</span>
        </Menu.Item>
    );
    const menu = (
        <Menu
            className={classnames(
                headerStyles.menuContainer,
                { [headerStyles.vertical]: isMobile },
                { [headerStyles.horizontal]: !isMobile }
            )}
        >
            {friends}
            {messages}
        </Menu>
    );

    return isMobile ? (
        <Dropdown overlay={menu}>
            <Icon
                type='menu-unfold'
                theme='outlined'
            />
        </Dropdown>

    ) :
        (
            <Fragment>
                {menu}
            </Fragment>
        );
};

HeaderMenu.propTypes = {
    isMobile: PropTypes.bool
};

HeaderMenu.defaultProps = {
    isMobile: false
};

export default HeaderMenu;
