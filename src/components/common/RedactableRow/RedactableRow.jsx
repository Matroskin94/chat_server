import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from 'antd/lib/input';

import PencilIcon from '../Icons/PencilIcon.jsx';

import { noop } from '../../../clientServices/utils/common';

import rowStyles from './rowStyles.less';

class RedactableRow extends PureComponent {
    static propTypes = {
        handleInputChange: PropTypes.func,
        handleRedactClick: PropTypes.func,
        fieldValue: PropTypes.string,
        isRedacting: PropTypes.bool
    };

    static defaultProps = {
        handleInputChange: noop,
        handleRedactClick: noop,
        fieldValue: '',
        isRedacting: false
    }

    handleInputChange = e => {
        const { handleInputChange } = this.props;

        handleInputChange(e.target.value);
    }

    handleRedactClick = () => {
        const { handleRedactClick } = this.props;

        handleRedactClick();
    }

    render() {
        const { fieldValue, isRedacting } = this.props;

        return (
            <div className={rowStyles.fieldRow}>
                {isRedacting ?
                    (<Input
                        size='small'
                        value={fieldValue}
                        onChange={this.handleInputChange}
                    />) :
                    (<p>{fieldValue}</p>)
                }

                <PencilIcon onClick={this.handleRedactClick} fill='#CCCCCC' />
            </div>
        );
    }
}

export default RedactableRow;
