import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Avatar from 'antd/lib/avatar';

import RedactableRow from '../../common/RedactableRow/RedactableRow.jsx';

import profileStyles from './styles/profileStyles.less';

class UserProfile extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    static defaultProps = {
        user: {}
    };

    state = {
        redactingFields: [],
        name: 'UserName',
        surname: 'UserSurname'
    };

    handleInputChange = field => value => {
        this.setState({ [field]: value });
    }

    handleRedactClick = field => () => {
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
        const { name, surname, redactingFields } = this.state;

        return (
            <div className={profileStyles.container}>
                <Avatar
                    icon='user'
                    size={128}
                    className={profileStyles.avatar}
                />
                <div className={profileStyles.infoContainer}>
                    <RedactableRow
                        handleInputChange={this.handleInputChange('name')}
                        handleRedactClick={this.handleRedactClick('name')}
                        fieldValue={name}
                        isRedacting={redactingFields.includes('name')}
                    />
                    <RedactableRow
                        handleInputChange={this.handleInputChange('surname')}
                        handleRedactClick={this.handleRedactClick('surname')}
                        fieldValue={surname}
                        isRedacting={redactingFields.includes('surname')}
                    />
                </div>
            </div>
        );
    }
}

export default UserProfile;
