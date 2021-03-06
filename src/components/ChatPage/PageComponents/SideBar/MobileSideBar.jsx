import React from 'react';
import PropTypes from 'prop-types';

import Drawer from 'antd/lib/drawer';
import 'antd/lib/drawer/style';

import { noop } from '../../../../clientServices/utils/common';

import UserList from './UserList.jsx';
import SideBarHeader from './SideBarHeader.jsx';

import sideBarStyles from './styles/sideBarSyles.less';

const SideBar = ({
    usersList,
    isCollapsed,
    handleCollapse,
    isMobile
}) => {
    return (
        <Drawer
            title={(
                <SideBarHeader
                    isCollapsed={isCollapsed}
                    isMobile={isMobile}
                    usersCount={usersList.length}
                />
            )}
            className={sideBarStyles.drawerStyles}
            placement='right'
            closable={false}
            onClose={handleCollapse}
            visible={!isCollapsed}
            width={200}
        >
            <UserList users={usersList} />
        </Drawer>
    );
};

SideBar.propTypes = {
    usersList: PropTypes.array,
    handleCollapse: PropTypes.func,
    isCollapsed: PropTypes.bool,
    isMobile: PropTypes.bool
};

SideBar.defaultProps = {
    usersList: [],
    handleCollapse: noop,
    isCollapsed: false,
    isMobile: false
};

export default SideBar;
