import React, { Component } from 'react';
import { uniqueId } from 'lodash';

class Content extends Component {
    state = {
        userName: 'Unauthorized',
        status: 'DISCONNECTED',
        message: '',
        messageList: []
    };

    setStatus = status => {
        this.setState({
            status
        });
    }

    handleInputChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        const { userName, message, messageList, status } = this.state;

        return (
            <div>
                <h2>Чат</h2>
                <h3>{status}</h3>
                <input type='text' onChange={this.handleInputChange} value={message}></input>
                <button>Отправить</button>
                <p>Привет {userName}!</p>
                <h3>Сообщения</h3>
                {messageList.map(item => (
                    <p key={uniqueId()}>{item}</p>
                ))}
            </div>
        );
    }
}

export default Content;
