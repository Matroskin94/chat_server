import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'antd/lib/drawer';

import UserProfileContent from './UserProfileContent.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import withUser from '../../HOC/WithUser.jsx';
import withSocket from '../../HOC/WithSocket.jsx';

import vkService from '../../../clientServices/services/VKService';
import { noop } from '../../../clientServices/utils/common';

import profileStyles from './styles/profileStyles.less';

@withUser()
@withSocket()
class UserProfile extends PureComponent {
    static propTypes = {
        user: PropTypes.object, // withUserHOC
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        updateUser: PropTypes.func, // withUserHOC,
        socket: PropTypes.object // withSocketHOC
    };

    static defaultProps = {
        user: {},
        onClose: noop,
        visible: false,
        updateUser: noop,
        socket: null
    };

    state = {
        redactingFields: [],
        VKUserId: null,
        user: { ...this.props.user }
    };

    handleVKLogin = VKUserId => {
        const { updateUser, user: propsUser, socket } = this.props;

        return vkService.getUserById(VKUserId).then(VKuser => {
            const updatedProfile = {
                ...propsUser,
                ...VKuser
            };

            updateUser(socket, updatedProfile);
            this.setState(prevState => ({ user: { ...prevState.user, ...VKuser } }));
        });
    }

    handleInputChange = (field, value, cb = noop) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [field]: value
            }
        }), cb);
    }

    handleRedactClick = field => {
        const { redactingFields } = this.state;
        const itemIndex = redactingFields.indexOf(field);

        if (itemIndex > -1) {
            redactingFields.splice(itemIndex, 1);

            this.updateProfileField(field);
            this.setState({ redactingFields: redactingFields.slice(0) });
        } else {
            this.setState({ redactingFields: redactingFields.concat(field) });
        }
    }

    handleSwitchChange = field => {
        const { user } = this.state;

        this.handleInputChange(field, !user.isAvatarShow, () => {
            this.updateProfileField(field);
        });
    }

    handleVKProfileClick = () => {
        const { VKUserId } = this.state;

        if (VKUserId) {
            this.handleVKLogin(VKUserId);
        } else {
            vkService.loginVK().then(session => {
                this.handleVKLogin(session.mid);
            });
        }
    }

    updateProfileField = field => {
        const { user: propsUser, updateUser, socket } = this.props;
        const { user: stateUser } = this.state;
        const updatedUser = {
            ...propsUser,
            [field]: stateUser[field]
        };

        updateUser(socket, updatedUser);
    }

    setVKId = id => {
        this.setState({ VKUserId: id });
    }

    render() {
        const { visible, onClose } = this.props;
        const { user, redactingFields } = this.state;

        return (
            <Drawer
                title={<ProfileHeader
                    userLogin={user.userLogin}
                />}
                placement='top'
                height='auto'
                closable={false}
                visible={visible}
                onClose={onClose}
                className={profileStyles.profileDrawer}
            >
                <UserProfileContent
                    user={user}
                    onRedactClick={this.handleRedactClick}
                    onInputChange={this.handleInputChange}
                    onSwitchChange={this.handleSwitchChange}
                    redactingFields={redactingFields}
                    handleVKProfileClick={this.handleVKProfileClick}
                    setVKId={this.setVKId}
                />
            </Drawer>
        );
    }
}

export default UserProfile;
