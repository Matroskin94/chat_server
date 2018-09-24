import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import {
    Layout
} from 'antd';

import PageHeader from '../PageHeader/PageHeader.jsx';
import PrivateMessages from '../PrivateMessages/PrivateMessages.jsx';

import commonStyles from './commonStyles.less';


@withSizes(({ width }) => ({ isMobile: width < 580 }))
class Content extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isMobile: PropTypes.bool // withSizes HOC,

    };

    static defaultProps = {
        isMobile: false
    }

    render() {
        const { isMobile, children } = this.props;

        return (
            <Layout>
                <PageHeader isMobile={isMobile} />
                <Layout className={commonStyles.contentContainer}>
                    {children}
                </Layout>
                <PrivateMessages />
            </Layout>
        );
    }
}

export default Content;
