import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Header as AntHeader
} from 'antd/lib/layout';
import Divider from 'antd/lib/divider';

import LogoutIcon from '../../common/Icons/LogoutIcon.jsx';
import ProfileIcon from '../../common/Icons/ProfileIcon.jsx';
import HeaderMenu from '../HeaderMenu/HeaderMenu.jsx';
import UserProfile from '../UserProfile/UserProfile.jsx';

import withUser from '../../HOC/WithUser.jsx';
import withSocket from '../../HOC/WithSocket.jsx';

import { noop } from '../../../clientServices/utils/common';

import SOCKET_API from '../../../constants/clientConstants/socketAPI';

import headerStyles from './styles/headerStyles.less';

@withSocket()
@withUser()
class PageHeader extends PureComponent {
    static propTypes = {
        logOutUser: PropTypes.func, // withUser HOC
        socket: PropTypes.object,
        user: PropTypes.object,
        isMobile: PropTypes.bool

    };

    static defaultProps = {
        logOutUser: noop,
        socket: null,
        user: {},
        isMobile: false
    }

    state = {
        isProfileOpen: false
    }

    handleLogOut = () => {
        const { logOutUser, socket } = this.props;

        socket.emit(SOCKET_API.USER_LOGOUT);
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
                <UserProfile
                    user={user}
                    onClose={this.toggleProfile}
                    visible={isProfileOpen}
                />
            </AntHeader>
        );
    }
}

export default PageHeader;
