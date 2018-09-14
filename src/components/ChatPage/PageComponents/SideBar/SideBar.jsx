import React from 'react';
import PropTypes from 'prop-types';

import { noop } from '../../../../clientServices/utils/common';

import MobileSideBar from './MobileSideBar.jsx';
import DesktopSideBar from './DesktopSideBar.jsx';

const SideBar = ({
    usersList,
    isCollapsed,
    handleCollapse,
    isMobile
}) => {
    if (isMobile) {
        return (
            <MobileSideBar
                usersList={usersList}
                isCollapsed={isCollapsed}
                handleCollapse={handleCollapse}
                isMobile={isMobile}
            />
        );
    }

    return (
        <DesktopSideBar
            usersList={usersList}
            isCollapsed={isCollapsed}
            handleCollapse={handleCollapse}
            isMobile={isMobile}
        />
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
