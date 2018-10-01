import React from 'react';
import PropTypes from 'prop-types';

import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style';

const ProfileIcon = ({ user, size, shape }) => {
    if (!user.photo50 || !user.isAvatarShow) {
        return (
            <Avatar
                shape={shape}
                size={size}
                icon='user'
            />
        );
    }

    return (
        <Avatar
            shape={shape}
            size={size}
            src={user.photo50}
        />
    );
};

ProfileIcon.propTypes = {
    user: PropTypes.object,
    size: PropTypes.number,
    shape: PropTypes.string
};

ProfileIcon.defaultProps = {
    user: {},
    size: 48,
    shape: 'square'
};

export default ProfileIcon;
