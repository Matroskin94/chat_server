import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default () => WrappedComponent => {
    class ChangeHistory extends PureComponent {
        static contextTypes = {
            router: PropTypes.object.isRequired
        }

        getURLParams = () => this.context.router.route.match.params

        historyPush = ({ url, query = '' }) => {
            this.context.router.history.push(`${url}${query}`);
        }

        historyBack = () => {
            this.context.router.history.goBack();
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
