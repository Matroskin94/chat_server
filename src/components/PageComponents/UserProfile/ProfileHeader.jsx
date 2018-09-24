import React from 'react';
import PropTypes from 'prop-types';

import ProfileIcon from '../../common/Icons/ProfileIcon.jsx';

import headerStyles from './styles/headerStyles.less';

const ProfileHeader = ({ userLogin }) => (
    <div className={headerStyles.headerContainer}>
        <ProfileIcon fill='#CCCCCC' />
        <h4>{userLogin}</h4>
    </div>
);

ProfileHeader.propTypes = {
    userLogin: PropTypes.string
};

ProfileHeader.defaultProps = {
    userLogin: 'no user in props'
};

export default ProfileHeader;
