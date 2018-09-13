import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Loader = ({ show }) => {
    const loader = show ?
        (
            <div className={styles.container}>
                <div className={classnames(styles.loader_5, styles.center)}>
                    <span />
                </div>
            </div>
        ) : null;

    return loader;
};

Loader.propTypes = {
    show: PropTypes.bool
};

Loader.defaultProps = {
    show: false
};

export default Loader;
