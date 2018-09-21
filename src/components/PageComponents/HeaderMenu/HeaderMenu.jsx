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
import ChatsIcon from '../../common/Icons/ChatsIcon.jsx';

import headerMenuStyles from './styles/headerMenuStyles.less';

const HeaderMenu = ({ isMobile }) => {
    const friends = (
        <Menu.Item key='1' className={headerMenuStyles.menuItem}>
            <Badge count={99} overflowCount={9}>
                <FriendsIcon />
            </Badge>
            <span className={headerMenuStyles.itemText}>Друзья</span>
        </Menu.Item>
    );
    const messages = (
        <Menu.Item key='2' className={headerMenuStyles.menuItem}>
            <Badge count={99} overflowCount={9}>
                <MessagesIcon />
            </Badge>
            <span className={headerMenuStyles.itemText}>Сообщения</span>
        </Menu.Item>
    );
    const chats = (
        <Menu.Item key='3' className={headerMenuStyles.menuItem}>
            <Badge count={0} overflowCount={9}>
                <ChatsIcon />
            </Badge>
            <span className={headerMenuStyles.itemText}>Чаты</span>
        </Menu.Item>
    );
    const menu = (
        <Menu
            className={classnames(
                headerMenuStyles.menuContainer,
                { [headerMenuStyles.vertical]: isMobile },
                { [headerMenuStyles.horizontal]: !isMobile }
            )}
        >
            {messages}
            {friends}
            {chats}
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
