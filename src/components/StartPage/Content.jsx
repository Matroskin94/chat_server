import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    Form,
    Icon,
    Input,
    Button,
    Card
} from 'antd';

import authorization from '../HOC/Authorization.jsx';

import { noop } from '../../clientServices/utils/common';

import styles from './styles.less';

const FormItem = Form.Item;

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onLoginClick: PropTypes.func, // Функция из LoginHOC для авторизации пользователя
        form: PropTypes.object
    };

    static defaultProps = {
        onLoginClick: noop,
        form: {}
    };

    state = {
        userLogin: '',
        password: '',
        profileError: '',
        errorFields: {
            userLogin: '',
            password: ''
        }
    }

    handleLoginClick = () => {
        const { password, userLogin } = { ...this.state };
        const { onLoginClick } = this.props;

        onLoginClick({ password, userLogin }).then(() => {
            this.setState({
                profileError: '',
                errorFields: { userLogin: '', password: '' }
            });
        }).catch(error => {
            this.setState({
                profileError: error.message,
                errorFields: { [error.field]: 'error' }
            });
        });
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    render() {
        const { profileError, errorFields } = this.state;

        return (
            <div className={styles.pageContainer}>
                <Card title='Вход' className={styles.formContainer}>
                    <Form>
                        <FormItem
                            validateStatus={errorFields.userLogin}
                            help={errorFields.userLogin ? profileError : ''}
                        >
                            <Input
                                prefix={<Icon type='user' className={styles.icon} />}
                                placeholder='Логин'
                                onChange={this.handleInputChange('userLogin')}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={errorFields.password}
                            help={errorFields.password ? profileError : ''}
                        >
                            <Input
                                prefix={<Icon type='lock' className={styles.icon} />}
                                type='password'
                                placeholder='Пароль'
                                onChange={this.handleInputChange('password')}
                            />
                        </FormItem>
                        <FormItem>
                            <Button
                                type='primary'
                                onClick={this.handleLoginClick}
                                className={styles.loginButton}
                            >
                                Войти
                            </Button>
                            Или
                            <Link to='/registration'> зарегистрироваться</Link>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Content;
