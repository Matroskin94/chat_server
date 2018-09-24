import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

const SendMessageSVG = ({ fill, height, width }) => (
    <svg
        viewBox='0 0 26.63 26.63'
        width={width}
        height={height}
        fill={fill}
    >
        <g>
            <path d="M25.505,1.564H1.126C0.505,1.564,0,2.068,0,2.69v17.116c0,0.621,0.504,1.126,1.126,1.126h13.516
                l5.184,3.873c0.7,0.523,1.272,0.236,1.272-0.638v-3.236h4.406c0.621,0,1.126-0.504,1.126-1.126V2.689
                C26.63,2.068,26.126,1.564,25.505,1.564z M7.174,12.855c-0.962,0-1.741-0.78-1.741-1.741c0-0.962,0.78-1.741,1.741-1.741
                s1.741,0.78,1.741,1.741C8.914,12.075,8.135,12.855,7.174,12.855z M13.316,12.855c-0.962,0-1.741-0.78-1.741-1.741
                c0-0.962,0.78-1.741,1.741-1.741s1.741,0.78,1.741,1.741S14.278,12.855,13.316,12.855z M19.458,12.855
                c-0.962,0-1.741-0.78-1.741-1.741c0-0.962,0.78-1.741,1.741-1.741s1.741,0.78,1.741,1.741S20.42,12.855,19.458,12.855z"/>
        </g>
    </svg>
);

SendMessageSVG.propTypes = {
    fill: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

SendMessageSVG.defaultProps = {
    fill: '#FFF',
    width: '1.6em',
    height: '1.6em'
};

const SendMessageIcon = ({
    fill,
    width,
    height,
    ...props
}) => (
    <Icon
        component={() => (
            <SendMessageSVG
                fill={fill}
                width={width}
                height={height}
            />
        )}
        {...props}
    />
);

export default SendMessageIcon;