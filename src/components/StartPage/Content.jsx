import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import login from '../HOC/Login.jsx';
import { noop } from '../../clientServices/utils/common';

@login()
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
        password: ''
    }

    handleLoginClick = () => {
        const { password, name } = { ...this.state };

        this.props.onLoginClick({ password, name }).catch(error => {
            this.setState({ isProfileError: true });
        });
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    render() {
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
            </div>
        );
    }
}

export default Content;
