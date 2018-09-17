import React from 'react';
import PropTypes from 'prop-types';

import PencilIcon from '../Icons/PencilIcon.jsx';

import styles from './styles.css';

const Marker = ({ show }) => {
    const marker = show ?
        (
            <div className={styles.animationContainer}>
                <div className={styles.dotsContainer}>
                    <span />
                    <span />
                    <span />
                </div>
                <PencilIcon />
            </div>
        ) : null;

    return marker;
};

Marker.propTypes = {
    show: PropTypes.bool
};

Marker.defaultProps = {
    show: true
};

export default Marker;
