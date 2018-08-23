import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Content extends PureComponent {

    render() {

        return (
            <div>
                <h1>Вход</h1>
                <p>Пользователь</p>
                <input type='text' name='user' />
                <p>Пароль</p>
                <input type='text' name='user' />
                <div>
                    <button>Войти</button>
                    <Link to='/registration'>Регистрация</Link>
                </div>
            </div>
        );
    }
}

export default Content;
