import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default () => WrappedComponent => {
    class ChangeHistory extends PureComponent {
        static contextTypes = {
            router: PropTypes.object.isRequired
        }

        getRouteInfo = () => {
            const { router } = this.context;

            return router.route.match;
        }

        historyPush = ({ url, query = '' }) => {
            const { router } = this.context;

            router.history.push(`${url}${query}`);
        }

        historyBack = () => {
            const { router } = this.context;

            router.history.goBack();
        }

        render() {
            const routeInfo = this.getRouteInfo();

            return <WrappedComponent
                {...this.props}
                historyPush={this.historyPush}
                historyBack={this.historyBack}
                routeInfo={routeInfo}
            />;
        }
    }

    return ChangeHistory;
};
