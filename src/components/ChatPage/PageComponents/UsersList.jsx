import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import classnames from 'classnames';

import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Sider } from 'antd/lib/layout';

import { noop } from '../../../clientServices/utils/common';

import userListStyles from '../styles/userListStyles.less';
import commonStyles from '../styles/commonStyles.less';

const UsersList = ({ usersList, isCollapsed, handleCollapse }) => {
    return (
        <Sider
            className={commonStyles.sider}
            collapsible
            collapsed={isCollapsed}
            onCollapse={handleCollapse}
            reverseArrow
        >
            <div className={
                classnames(
                    'logo',
                    userListStyles.header,
                    { [userListStyles.headerHidden]: isCollapsed }
                )}
            >
                {!isCollapsed ?
                    <h3>
                        Онлайн:&nbsp;
                        <b>
                            {usersList.length}
                        </b>
                    </h3> :
                    <Fragment>
                        <Icon type='team' />
                        &nbsp;
                        <b>
                            {usersList.length}
                        </b>
                    </Fragment>
                }
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
        </Sider>
    );
};

UsersList.propTypes = {
    usersList: PropTypes.array,
    handleCollapse: PropTypes.func,
    isCollapsed: PropTypes.bool
};

UsersList.defaultProps = {
    usersList: [],
    handleCollapse: noop,
    isCollapsed: false
};

export default UsersList;
