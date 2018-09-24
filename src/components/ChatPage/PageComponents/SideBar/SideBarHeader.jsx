import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'antd/lib/icon';

import userListStyles from './styles/userListStyles.less';

const SideBarHeader = ({ isCollapsed, usersCount, isMobile }) => (
    <div className={
        classnames(
            'logo',
            { [userListStyles.headerMobile]: isMobile },
            { [userListStyles.header]: !isMobile },
            { [userListStyles.headerHidden]: isCollapsed }
        )}
    >
        {!isCollapsed ?
            <h3>
                Онлайн:&nbsp;
                <b>
                    {usersCount}
                </b>
            </h3> :
            <Fragment>
                <Icon type='team' />
                &nbsp;
                <b>
                    {usersCount}
                </b>
            </Fragment>
        }
    </div>
);

SideBarHeader.propTypes = {
    isCollapsed: PropTypes.bool,
    isMobile: PropTypes.bool,
    usersCount: PropTypes.number
};

SideBarHeader.defaultProps = {
    isCollapsed: true,
    isMobile: false,
    usersCount: 0
};

export default SideBarHeader;
