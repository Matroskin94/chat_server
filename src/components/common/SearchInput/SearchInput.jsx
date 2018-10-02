import React from 'react';
import PropTypes from 'prop-types';

import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';

import { noop } from '../../../clientServices/utils/common';

import inputStyles from './inputStyles.less';

const SearchInput = ({
    placeholder,
    value,
    handleSearchChange,
    loading
}) => (
    <Form>
        <Form.Item hasFeedback validateStatus={loading ? 'validating' : ''}>
            <Input
                className={inputStyles.inputStyle}
                placeholder={placeholder}
                suffix={!loading && <Icon type='search' />}
                value={value}
                onChange={handleSearchChange}
            />
        </Form.Item>
    </Form>
);

SearchInput.defaultProps = {
    placeholder: 'Поиск',
    value: '',
    handleSearchChange: noop,
    loading: false
};

SearchInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleSearchChange: PropTypes.func,
    loading: PropTypes.bool
};

export default SearchInput;
