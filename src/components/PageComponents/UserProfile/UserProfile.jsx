import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from 'antd/lib/drawer';

import UserProfileContent from './UserProfileContent.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import withSocket from '../../HOC/WithSocket.jsx';

import { initVKAction } from '../../../clientServices/actions/ProfileActions';
import vkService from '../../../clientServices/services/VKService';
import { noop } from '../../../clientServices/utils/common';

import SOCKET_API from '../../../constants/clientConstants/socketAPI';

import profileStyles from './styles/profileStyles.less';

function mapDispatchToProps(dispatch) {
    return {
        initVKUser: user => dispatch(initVKAction(user))
    };
}

@withSocket()
@connect(null, mapDispatchToProps)
class UserProfile extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
        onClose: PropTypes.func,
        visible: PropTypes.bool,
        initVKUser: PropTypes.func,
        socket: PropTypes.bool // withSocketHOC
    };

    static defaultProps = {
        user: {},
        onClose: noop,
        visible: false,
        initVKUser: noop,
        socket: null
    };

    state = {
        redactingFields: [],
        VKUserId: null,
        user: { ...this.props.user }
    };

    handleInputChange = (field, value) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [field]: value
            }
        }));
    }

    handleRedactClick = field => {
        const { redactingFields, user: stateUser } = this.state;
        const { user: propsUser } = this.props;
        const { socket } = this.props;
        const itemIndex = redactingFields.indexOf(field);

        if (itemIndex > -1) {
            redactingFields.splice(itemIndex, 1);
            const updatedUser = {
                ...propsUser,
                [field]: stateUser[field]
            };

            socket.emit(SOCKET_API.UPDATE_PROFILE, updatedUser);
            this.setState({ redactingFields: redactingFields.slice(0) });
        } else {
            this.setState({ redactingFields: redactingFields.concat(field) });
        }
    }

    handleVKProfileClick = () => {
        const { VKUserId } = this.state;

        if (VKUserId) {
            const { initVKUser } = this.props;

            vkService.getUserById(VKUserId).then(VKuser => {
                initVKUser(VKuser); // TODO: сохранить данные на сервере
                this.setState(prevState => ({ user: { ...prevState.user, ...VKuser } }));
            });
        }
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
                    redactingFields={redactingFields}
                    handleVKProfileClick={this.handleVKProfileClick}
                    setVKId={this.setVKId}
                />
            </Drawer>
        );
    }
}

export default UserProfile;
