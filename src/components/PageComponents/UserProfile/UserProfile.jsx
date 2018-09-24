import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'antd/lib/drawer';

import UserProfileContent from './UserProfileContent.jsx';
import ProfileHeader from './ProfileHeader.jsx';

import { noop } from '../../../clientServices/utils/common';


class UserProfile extends Component {
    static propTypes = {
        user: PropTypes.object,
        onClose: PropTypes.func,
        visible: PropTypes.bool
    }

    static defaultProps = {
        user: {},
        onClose: noop,
        visible: false
    }

    state = {
        redactingFields: [],
        user: {
            name: 'UserName',
            surname: 'UserSurname'
        }
    };

    componentDidMount() {
        const { user } = this.props;

        this.setState(prevState => ({
            ...prevState,
            user: {
                ...user,
                ...prevState.user // TODO: Убрать когда будет приходить нормальный ответ с сервера
            }
        }));
    }

    handleInputChange = (field, value) => {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [field]: value
            }
        }));
    }

    handleRedactClick = field => {
        const { redactingFields } = this.state;
        const itemIndex = redactingFields.indexOf(field);

        if (itemIndex > -1) {
            redactingFields.splice(itemIndex, 1);
            this.setState({ redactingFields });
        } else {
            this.setState({ redactingFields: redactingFields.concat(field) });
        }
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
            >
                <UserProfileContent
                    user={user}
                    onRedactClick={this.handleRedactClick}
                    onInputChange={this.handleInputChange}
                    redactingFields={redactingFields}
                />
            </Drawer>
        );
    }
}

export default UserProfile;
