import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withSizes from 'react-sizes';

import Layout from 'antd/lib/layout';
import 'antd/lib/layout/style';

import PageHeader from '../PageHeader/PageHeader.jsx';
import PrivateMessages from '../PrivateMessages/PrivateMessages.jsx';

import VK_API from '../../../constants/clientConstants/vkAPI';

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

    componentDidMount() {
        const { VK } = window;

        VK.init({ apiId: VK_API.APP_ID, access_token: VK_API.APP_TOKEN });
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
