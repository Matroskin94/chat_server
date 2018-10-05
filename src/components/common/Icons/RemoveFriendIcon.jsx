import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';

const RemoveFriendSVG = ({ fill, height, width }) => (
    <svg
        viewBox='0 0 374.144 374.144'
        width={width}
        height={height}
        fill={fill}
    >
        <g>
            <circle cx="108.75" cy="67.982" r="60"/>
            <path d="M274.715,167.303c-54.826,0-99.43,44.604-99.43,99.429s44.604,99.43,99.43,99.43s99.43-44.604,99.43-99.43
                S329.54,167.303,274.715,167.303z M336.215,281.732h-123v-30h123V281.732z"/>
            <path d="M108.75,157.982C48.689,157.982,0,206.671,0,266.732h145.285c0-32.364,11.941-61.991,31.647-84.709
                C158.281,166.99,134.571,157.982,108.75,157.982z"/>
        </g>
    </svg>
);

RemoveFriendSVG.propTypes = {
    fill: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

RemoveFriendSVG.defaultProps = {
    fill: '#FFF',
    width: '1.6em',
    height: '1.6em'
};

const RemoveFriendIcon = ({
    fill,
    width,
    height,
    ...props
}) => (
    <Icon
        component={() => (
            <RemoveFriendSVG
                fill={fill}
                width={width}
                height={height}
            />
        )}
        {...props}
    />
);

export default RemoveFriendIcon;
