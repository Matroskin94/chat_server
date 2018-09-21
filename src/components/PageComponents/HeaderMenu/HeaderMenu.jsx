import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Badge from 'antd/lib/badge';
import Dropdown from 'antd/lib/dropdown';
import 'antd/lib/badge/style';
import 'antd/lib/dropdown/style';

import FriendsIcon from '../../common/Icons/FriendsIcon.jsx';
import MessagesIcon from '../../common/Icons/MessagesIcon.jsx';
import ChatsIcon from '../../common/Icons/ChatsIcon.jsx';

import ROUTES from '../../../constants/clientConstants/routes';

import headerMenuStyles from './styles/headerMenuStyles.less';

const HeaderMenu = ({ isMobile, location }) => {
    const friends = (
        <Menu.Item key={ROUTES.FRIENDS} className={headerMenuStyles.menuItem}>
            <Link to={ROUTES.FRIENDS}>
                <Badge count={99} overflowCount={9}>
                    <FriendsIcon />
                </Badge>
                <span className={headerMenuStyles.itemText}>Друзья</span>
            </Link>
        </Menu.Item>
    );
    const messages = (
        <Menu.Item key={ROUTES.MESSAGES} className={headerMenuStyles.menuItem}>
            <Link to={ROUTES.MESSAGES}>
                <Badge count={99} overflowCount={9}>
                    <MessagesIcon />
                </Badge>
                <span className={headerMenuStyles.itemText}>Сообщения</span>
            </Link>
        </Menu.Item>
    );
    const chats = (
        <Menu.Item key={ROUTES.CHAT} className={headerMenuStyles.menuItem}>
            <Link to={ROUTES.CHAT}>
                <Badge count={0} overflowCount={9}>
                    <ChatsIcon />
                </Badge>
                <span className={headerMenuStyles.itemText}>Чаты</span>
            </Link>
        </Menu.Item>
    );
    const menu = (
        <Menu
            className={classnames(
                headerMenuStyles.menuContainer,
                { [headerMenuStyles.vertical]: isMobile },
                { [headerMenuStyles.horizontal]: !isMobile }
            )}
            defaultSelectedKeys={[location.pathname]}
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
    isMobile: PropTypes.bool,
    location: PropTypes.object
};

HeaderMenu.defaultProps = {
    isMobile: false,
    location: {}
};

export default withRouter(HeaderMenu);
