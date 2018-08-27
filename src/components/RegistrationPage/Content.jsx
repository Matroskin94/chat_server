import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import authorization from '../HOC/Authorization.jsx';
import { noop } from '../../clientServices/utils/common';

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onRegistrationClick: PropTypes.func, // Функция из LoginHOC для авторизации пользователя
        isFetching: PropTypes.bool // Переменная ожидания ответа от сервера
    };
    static defaultProps = {
        onRegistrationClick: noop,
        isFetching: false
    };

    state = {
        name: '',
        password: '',
        registrationError: ''
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    handleRegistrationClick = () => {
        const { password, name } = { ...this.state };

        this.props.onRegistrationClick({ password, name }).catch(error => {
            this.setState({ registrationError: error.message });
        });
    }

    render() {
        const { registrationError } = this.state;
        const isRegistrationError = !!registrationError;

        return (
            <div>
                <h1>Регистрация</h1>
                <p>Логин</p>
                <input type='text' onChange={this.handleInputChange('name')} />
                <p>Пароль</p>
                <input type='password' onChange={this.handleInputChange('password')} />
                <div>
                    <button onClick={this.handleRegistrationClick}>Зарегистрироваться</button>
                </div>
                <div hidden={!isRegistrationError}>
                    {registrationError}
                </div>
            </div>
        );
    }
}

export default Content;
