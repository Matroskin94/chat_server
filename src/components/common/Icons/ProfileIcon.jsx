import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';

const ProfileSVG = ({ fill }) => (
    <svg viewBox='0 20 311.541 311.541' width='1.6em' height='1.6em' fill={fill}>
        <g>
            <path d="M155.771,26.331C69.74,26.331,0,96.071,0,182.102c0,37.488,13.25,71.883,35.314,98.761    c3.404-27.256,30.627-50.308,68.8-61.225c13.946,12.994,31.96,20.878,51.656,20.878c19.233,0,36.894-7.487,50.698-19.936    c38.503,11.871,65.141,36.27,66.017,64.63c24.284-27.472,39.056-63.555,39.056-103.108    C311.541,96.071,241.801,26.331,155.771,26.331z M155.771,222.069c-9.944,0-19.314-2.732-27.634-7.464    c-20.05-11.409-33.855-34.756-33.855-61.711c0-38.143,27.583-69.176,61.489-69.176c33.909,0,61.489,31.033,61.489,69.176    c0,27.369-14.237,51.004-34.786,62.215C174.379,219.523,165.346,222.069,155.771,222.069z"/>
        </g>
    </svg>
);

ProfileSVG.propTypes = {
    fill: PropTypes.string
};

ProfileSVG.defaultProps = {
    fill: '#FFF'
};

const ProfileIcon = ({ fill, ...props }) => {
    return (
        <Icon
            component={() => (<ProfileSVG fill={fill} />)}
            {...props}
        />
    );
};

export default ProfileIcon;
