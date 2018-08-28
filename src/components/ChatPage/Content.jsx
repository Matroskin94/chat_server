import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

import withUser from '../HOC/WithUser.jsx';
import UsersList from './PageComponents/UsersList.jsx'

import chatStyles from './styles/chatStyles.css';
import commonStyles from './styles/commonStyles.css';

@withUser()
class Content extends Component {
    static propTypes = {
        user: PropTypes.object
    };

    static defaultProps = {
        user: {}
    }

    state = {
        status: 'DISCONNECTED',
        message: '',
        messageList: []
    };

    componentDidMount() {
        const socket = io('http://localhost:8000');

        socket.on('connect', () => { console.log('Client connected'); });
    }

    handleInputChange = e => {
        this.setState({
            message: e.target.value
        });
    }

    setStatus = status => {
        this.setState({
            status
        });
    }

    render() {
        const { message, messageList, status } = this.state;
        const { user } = this.props;

        return (
            <div className={commonStyles.container}>
                <div className={chatStyles.chatContainer}>
                    <h2>Чат</h2>
                    <h3>{status}</h3>
                    <input
                        type='text'
                        onChange={this.handleInputChange}
                        value={message}
                    />
                    <button type='button'>Отправить</button>
                    <p>
                        Привет
                        {` ${user.userLogin}`}
                        !
                    </p>
                    <h3>Сообщения</h3>
                    {messageList.map(item => (
                        <p key={uniqueId()}>{item}</p>
                    ))}
                </div>
                <UsersList />
            </div>
        );
    }
}

export default Content;
