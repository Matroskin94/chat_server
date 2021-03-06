import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import 'antd/lib/form/style';

import authorization from '../HOC/Authorization.jsx';
import Loader from '../common/Loader/Loader.jsx';

import { noop } from '../../clientServices/utils/common';

import styles from './styles.less';

const FormItem = Form.Item;

@authorization()
class Content extends PureComponent {
    static propTypes = {
        onLoginClick: PropTypes.func, // Функция из authorization для авторизации пользователя
        form: PropTypes.object,
        isFetching: PropTypes.bool // authorization HOC
    };

    static defaultProps = {
        onLoginClick: noop,
        isFetching: false,
        form: {}
    };

    state = {
        userLogin: '',
        password: '',
        profileError: '',
        errorFields: {
            userLogin: '',
            password: '',
            noField: ''
        }
    }

    handleLoginClick = e => {
        e.preventDefault();

        const { password, userLogin } = { ...this.state };
        const { onLoginClick } = this.props;

        onLoginClick({ password, userLogin }).catch(error => {
            this.setState({
                profileError: error.message,
                errorFields: { [error.field]: 'error' }
            });
        });
    }

    handleInputChange = field => event => this.setState({ [field]: event.target.value })

    render() {
        const { profileError, errorFields } = this.state;
        const { isFetching } = this.props;

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
                                htmlType='submit'
                                onClick={this.handleLoginClick}
                                className={styles.loginButton}
                            >
                                Войти
                            </Button>
                            Или
                            <Link to='/registration'> зарегистрироваться</Link>
                            <div hidden={!errorFields.noField} className={styles.commonError}>
                                {profileError}
                            </div>
                        </FormItem>
                    </Form>
                </Card>
                <Loader show={isFetching} />
            </div>
        );
    }
}

export default Content;
