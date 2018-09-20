import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Header as AntHeader
} from 'antd/lib/layout';
import Divider from 'antd/lib/divider';
import Drawer from 'antd/lib/drawer';
// import 'antd/lib/drawer/style';

import LogoutIcon from '../common/Icons/LogoutIcon.jsx';
import ProfileIcon from '../common/Icons/ProfileIcon.jsx';
import HeaderMenu from './PageComponents/HeaderMenu/HeaderMenu.jsx';
import UserProfile from '../PageComponents/UserProfile/UserProfile.jsx';
import ProfileHeader from '../PageComponents/UserProfile/ProfileHeader.jsx';

import withUser from '../HOC/WithUser.jsx';

import { noop } from '../../clientServices/utils/common';

import headerStyles from './styles/headerStyles.less';

@withUser()
class Header extends PureComponent {
    static propTypes = {
        logOutUser: PropTypes.func, // withUser HOC
        onLogout: PropTypes.func,
        user: PropTypes.object,
        isMobile: PropTypes.bool

    };

    static defaultProps = {
        logOutUser: noop,
        onLogout: noop,
        user: {},
        isMobile: false
    }

    state = {
        isProfileOpen: false
    }

    handleLogOut = () => {
        const { logOutUser, onLogout } = this.props;

        onLogout();
        logOutUser();
    }

    toggleProfile = () => {
        this.setState(prevState => ({ isProfileOpen: !prevState.isProfileOpen }));
    }

    render() {
        const { user, isMobile } = this.props;
        const { isProfileOpen } = this.state;

        return (
            <AntHeader className={headerStyles.header}>
                <div className={headerStyles.headerLeft}>
                    <ProfileIcon fill='white' onClick={this.toggleProfile} />
                    <h3>
                        {` ${user.userLogin}`}
                    </h3>
                    <Divider type='vertical' className={headerStyles.divider} />
                    <HeaderMenu isMobile={isMobile} />
                </div>
                <LogoutIcon
                    className={headerStyles.hoverPointer}
                    onClick={this.handleLogOut}
                />
                <Drawer
                    title={<ProfileHeader userLogin={user.userLogin} />}
                    placement='top'
                    height='auto'
                    closable={false}
                    onClose={this.toggleProfile}
                    visible={isProfileOpen}
                >
                    <UserProfile user={user} />
                </Drawer>
            </AntHeader>
        );
    }
}

export default Header;
