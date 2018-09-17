import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Header as AntHeader
} from 'antd/lib/layout';

import LogoutIcon from '../common/Icons/LogoutIcon.jsx';

import withUser from '../HOC/WithUser.jsx';

import { noop } from '../../clientServices/utils/common';

import commonStyles from './styles/commonStyles.less';

@withUser()
class Header extends PureComponent {
    static propTypes = {
        logOutUser: PropTypes.func, // withUser HOC
        onLogout: PropTypes.func,
        user: PropTypes.object

    };

    static defaultProps = {
        logOutUser: noop,
        onLogout: noop,
        user: {}
    }

    handleLogOut = () => {
        const { logOutUser, onLogout } = this.props;

        onLogout();
        logOutUser();
    }

    render() {
        const { user } = this.props;

        return (
            <AntHeader className={commonStyles.header}>
                <h3>
                    Привет
                    {` ${user.userLogin}`}
                    !
                </h3>
                <LogoutIcon
                    className={commonStyles.hoverPointer}
                    onClick={this.handleLogOut}
                />
            </AntHeader>
        );
    }
}

export default Header;
