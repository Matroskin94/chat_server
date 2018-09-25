import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from 'antd/lib/avatar';

import RedactableRow from '../../common/RedactableRow/RedactableRow.jsx';

import { noop } from '../../../clientServices/utils/common';
import vkService from '../../../clientServices/services/VKService';

import profileStyles from './styles/profileStyles.less';

class UserProfileContent extends Component {
    static propTypes = {
        user: PropTypes.object,
        redactingFields: PropTypes.array,
        onInputChange: PropTypes.func,
        onRedactClick: PropTypes.func
    };

    static defaultProps = {
        user: {},
        redactingFields: [],
        onInputChange: noop,
        onRedactClick: noop
    };

    state = {
        VKuser: null
    };

    componentDidMount() {
        vkService.getVKSession()
            .then(res => res.mid)
            .then(id => {
                return vkService.getUserById(id).then(VKuser => {
                    this.setState({ VKuser });
                });
            }).catch(err => {
                console.log('ERR', err);
            });
    }

    getUserIcon = () => {
        const isUserLoaded = this.state.VKuser !== null;

        if (!isUserLoaded) {
            return (
                <Avatar
                    icon='user'
                    size={100}
                    className={profileStyles.avatar}
                />);
        }
        const { VKuser: { photo_100 } } = this.state;

        return (
            <Avatar
                src={photo_100}
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
        const { user, redactingFields } = this.props;

        return (
            <div className={profileStyles.container}>
                {this.getUserIcon()}
                <div className={profileStyles.infoContainer}>
                    <RedactableRow
                        handleInputChange={this.handleInputChange('name')}
                        handleRedactClick={this.handleRedactClick('name')}
                        fieldValue={user.name}
                        isRedacting={redactingFields.includes('name')}
                    />
                    <RedactableRow
                        handleInputChange={this.handleInputChange('surname')}
                        handleRedactClick={this.handleRedactClick('surname')}
                        fieldValue={user.surname}
                        isRedacting={redactingFields.includes('surname')}
                    />
                    <RedactableRow
                        handleInputChange={this.handleInputChange('userLogin')}
                        handleRedactClick={this.handleRedactClick('userLogin')}
                        fieldValue={user.userLogin}
                        isRedacting={redactingFields.includes('userLogin')}
                    />
                </div>
            </div>
        );
    }
}

export default UserProfileContent;
