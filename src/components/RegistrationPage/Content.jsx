import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import 'antd/lib/form/style';

import authorization from '../HOC/Authorization.jsx';
import { noop } from '../../clientServices/utils/common';

import styles from './styles.less';

const FormItem = Form.Item;

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onRegistrationClick: PropTypes.func // Функция из LoginHOC для авторизации пользователя
    };

    static defaultProps = {
        onRegistrationClick: noop
    };

    state = {
        userLogin: '',
        password: '',
        registrationError: {
            userLogin: '',
            password: ''
        },
        errorFields: {
            userLogin: '',
            password: ''
        }
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    handleRegistrationClick = () => {
        const { password, userLogin } = { ...this.state };
        const { onRegistrationClick } = this.props;

        onRegistrationClick({ password, userLogin }).then(() => {
            this.setState({
                registrationError: { userLogin: '', password: '' },
                errorFields: { userLogin: '', password: '' }
            });
        }).catch(error => {
            this.setState({
                registrationError: { [error.field]: error.message },
                errorFields: { [error.field]: 'error' }
            });
        });
    }

    render() {
        const { registrationError, errorFields } = this.state;

        return (
            <div className={styles.pageContainer}>
                <Card title='Регистрация' className={styles.formContainer}>
                    <Form>
                        <FormItem
                            validateStatus={errorFields.userLogin}
                            help={errorFields.userLogin ? registrationError.userLogin : ''}
                        >
                            <Input
                                prefix={<Icon type='user' className={styles.icon} />}
                                placeholder='Логин'
                                onChange={this.handleInputChange('userLogin')}
                            />
                        </FormItem>
                        <FormItem
                            validateStatus={errorFields.password}
                            help={errorFields.password ? registrationError.password : ''}
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
                                htmlType='submit'
                                onClick={this.handleRegistrationClick}
                                className={styles.loginButton}
                            >
                                Зарегистрироваться
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Content;
