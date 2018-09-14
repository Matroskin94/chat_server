import React from 'react';
import PropTypes from 'prop-types';

import { Sider } from 'antd/lib/layout';

import { noop } from '../../../../clientServices/utils/common';

import SideBarHeader from './SideBarHeader.jsx';
import UserList from './UserList.jsx';

import commonStyles from '../../styles/commonStyles.less';

const DesktopSideBar = ({
    usersList,
    isCollapsed,
    handleCollapse,
    isMobile
}) => {
    return (
        <Sider
            className={commonStyles.sider}
            collapsible
            collapsed={isCollapsed}
            onCollapse={handleCollapse}
            reverseArrow
        >
            <SideBarHeader
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                usersCount={usersList.length}
            />
            <UserList users={usersList} />
        </Sider>
    );
};

DesktopSideBar.propTypes = {
    usersList: PropTypes.array,
    handleCollapse: PropTypes.func,
    isCollapsed: PropTypes.bool,
    isMobile: PropTypes.bool
};

DesktopSideBar.defaultProps = {
    usersList: [],
    handleCollapse: noop,
    isCollapsed: false,
    isMobile: false
};

export default DesktopSideBar;
