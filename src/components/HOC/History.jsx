import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default () => WrappedComponent => {
    class ChangeHistory extends PureComponent {
        static contextTypes = {
            router: PropTypes.object.isRequired
        }

        getURLParams = () => {
            const { router } = this.context;

            return router.route.match.params;
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
            return <WrappedComponent
                {...this.props}
                historyPush={this.historyPush}
                historyBack={this.historyBack}
                getURLParams={this.getURLParams}
            />;
        }
    }

    return ChangeHistory;
};
