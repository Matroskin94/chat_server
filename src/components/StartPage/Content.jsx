import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import authorization from '../HOC/Authorization.jsx';
import { noop } from '../../clientServices/utils/common';

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onLoginClick: PropTypes.func // Функция из LoginHOC для авторизации пользователя
    };

    static defaultProps = {
        onLoginClick: noop
    };

    state = {
        userLogin: '',
        password: '',
        profileError: ''
    }

    handleLoginClick = () => {
        const { password, userLogin } = { ...this.state };
        const { onLoginClick } = this.props;

        onLoginClick({ password, userLogin }).catch(error => {
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
                <input type='text' onChange={this.handleInputChange('userLogin')} />
                <p>Пароль</p>
                <input type='password' onChange={this.handleInputChange('password')} />
                <div>
                    <button type='button' onClick={this.handleLoginClick}>Войти</button>
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
