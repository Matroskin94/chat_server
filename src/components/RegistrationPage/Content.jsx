import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Content extends PureComponent {

    render() {

        return (
            <div>
                <h1>Регистрация</h1>
                <p>Логин</p>
                <input type='text' name='user' />
                <p>Пароль</p>
                <input type='text' name='user' />
                <div>
                    <button>Зарегистрироваться</button>
                </div>
            </div>
        );
    }
}

export default Content;
