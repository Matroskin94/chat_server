import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({ user }) => (
    <div>
        ProfileData
    </div>
);

UserProfile.propTypes = {
    user: PropTypes.object
};

UserProfile.defaultProps = {
    user: {}
};

export default UserProfile;
