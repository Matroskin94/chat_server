import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'antd/lib/drawer';

import UserProfileContent from './UserProfileContent.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import withSocket from '../../HOC/WithSocket.jsx';

import { updateProfileAction } from '../../../clientServices/actions/ProfileActions';
import vkService from '../../../clientServices/services/VKService';
import { noop } from '../../../clientServices/utils/common';

import SOCKET_API from '../../../constants/clientConstants/socketAPI';

import profileStyles from './styles/profileStyles.less';

function mapDispatchToProps(dispatch) {
    return {
        updateProfile: user => dispatch(updateProfileAction(user))
    };
}

@withSocket()
@connect(null, mapDispatchToProps)
class UserProfile extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        updateProfile: PropTypes.func,
        socket: PropTypes.bool // withSocketHOC
    };

    static defaultProps = {
        user: {},
        onClose: noop,
        visible: false,
        updateProfile: noop,
        socket: null
    };

    state = {
        redactingFields: [],
        VKUserId: null,
        user: { ...this.props.user }
    };

    handleVKLogin = VKUserId => {
        const { updateProfile, socket } = this.props;
        const { user: propsUser } = this.props;

        return vkService.getUserById(VKUserId).then(VKuser => {
            const updatedProfile = {
                ...propsUser,
                ...VKuser
            };

            updateProfile(VKuser); // TODO: сохранить данные на сервере
            socket.emit(SOCKET_API.UPDATE_PROFILE, updatedProfile);
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
        const { socket, user: propsUser, updateProfile } = this.props;
        const { user: stateUser } = this.state;
        const updatedUser = {
            ...propsUser,
            [field]: stateUser[field]
        };

        updateProfile(updatedUser);
        socket.emit(SOCKET_API.UPDATE_PROFILE, updatedUser);
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
