import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import userListStyles from '../styles/userListStyles.css';

const UsersList = ({ usersList }) => {
    return (
        <div className={userListStyles.userList}>
            <h3>Пользователи онлайн</h3>
            {usersList.map(user => (
                <p key={uniqueId()}>{user}</p>
            ))}
        </div>
    );
};

UsersList.propTypes = {
    usersList: PropTypes.array
};

UsersList.defaultProps = {
    usersList: []
};

export default UsersList;
