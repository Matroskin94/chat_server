import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from 'antd/lib/avatar';
import Tooltip from 'antd/lib/tooltip';

import RedactableRow from '../../common/RedactableRow/RedactableRow.jsx';
import VKLogoIcon from '../../common/Icons/VKLogoIcon.jsx';
import vkService from '../../../clientServices/services/VKService';

import { noop } from '../../../clientServices/utils/common';

import profileStyles from './styles/profileStyles.less';

class UserProfileContent extends Component {
    static propTypes = {
        user: PropTypes.object,
        redactingFields: PropTypes.array,
        onInputChange: PropTypes.func,
        onRedactClick: PropTypes.func,
        handleVKProfileClick: PropTypes.func,
        setVKId: PropTypes.func
    };

    static defaultProps = {
        user: {},
        redactingFields: [],
        onInputChange: noop,
        onRedactClick: noop,
        handleVKProfileClick: noop,
        setVKId: noop
    };

    componentDidMount() {
        const { setVKId } = this.props;

        vkService.getVKSession().then(res => {
            setVKId(res.mid);
        }).catch(err => {
            setVKId(null);
        });
    }

    getUserIcon = () => {
        const { user } = this.props;

        if (user.photo100) {
            return (
                <Avatar
                    src={user.photo100}
                    size={100}
                    className={profileStyles.avatar}
                />);
        }

        return (
            <Avatar
                icon='user'
                size={100}
                className={profileStyles.avatar}
            />);
    }

    handleInputChange = field => value => {
        const { onInputChange } = this.props;

        onInputChange(field, value);
    }

    handleRedactClick = field => () => {
        const { onRedactClick } = this.props;

        onRedactClick(field);
    }

    render() {
        const { user, redactingFields, handleVKProfileClick } = this.props;

        return (
            <div className={profileStyles.container}>
                {this.getUserIcon()}
                <div className={profileStyles.infoContainer}>
                    <div className={profileStyles.infoRow}>
                        <p>Имя: </p>
                        <RedactableRow
                            handleInputChange={this.handleInputChange('firstName')}
                            handleRedactClick={this.handleRedactClick('firstName')}
                            fieldValue={user.firstName}
                            isRedacting={redactingFields.includes('firstName')}
                        />
                    </div>
                    <div className={profileStyles.infoRow}>
                        <p>Фамилия: </p>
                        <RedactableRow
                            handleInputChange={this.handleInputChange('lastName')}
                            handleRedactClick={this.handleRedactClick('lastName')}
                            fieldValue={user.lastName}
                            isRedacting={redactingFields.includes('lastName')}
                        />
                    </div>
                    <div className={profileStyles.infoRow}>
                        <p>Логин: </p>
                        <RedactableRow
                            handleInputChange={this.handleInputChange('userLogin')}
                            handleRedactClick={this.handleRedactClick('userLogin')}
                            fieldValue={user.userLogin}
                            isRedacting={redactingFields.includes('userLogin')}
                        />
                    </div>
                    <div className={profileStyles.infoRow}>
                        <Tooltip placement='bottom' title='Использовать данные профиля ВК'>
                            <VKLogoIcon onClick={handleVKProfileClick} />
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfileContent;
