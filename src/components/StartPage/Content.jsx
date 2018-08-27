import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import authorization from '../HOC/Authorization.jsx';
import { noop } from '../../clientServices/utils/common';

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onLoginClick: PropTypes.func, // Функция из LoginHOC для авторизации пользователя
        isFetching: PropTypes.bool // Переменная ожидания ответа от сервера
    };
    static defaultProps = {
        onLoginClick: noop,
        isFetching: false
    };

    state = {
        name: '',
        password: '',
        profileError: ''
    }

    handleLoginClick = () => {
        const { password, name } = { ...this.state };

        this.props.onLoginClick({ password, name }).catch(error => {
            this.setState({ profileError: error.message });
        });
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    render() {
        const { profileError } = this.state;
        const isProfileError = !!profileError;

        return (
            <div>
                <h1>Вход</h1>
                <p>Пользователь</p>
                <input type='text' onChange={this.handleInputChange('name')} />
                <p>Пароль</p>
                <input type='password' onChange={this.handleInputChange('password')} />
                <div>
                    <button onClick={this.handleLoginClick}>Войти</button>
                    <Link to='/registration'>Регистрация</Link>
                </div>
                <div hidden={!isProfileError}>
                    {profileError}
                </div>
            </div>
        );
    }
}

export default Content;
