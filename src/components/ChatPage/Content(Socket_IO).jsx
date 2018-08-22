import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import { subscribeToTimer, sendMessage, getMessages } from '../../serverServices/api(Socket_IO)';

class Content extends Component {
    constructor(){
        super();
        subscribeToTimer((err, timestamp) => this.setState({
            timestamp
        }));
        getMessages((err, messageList) => this.setState({
            messageList
        }));
    }

    state = {
      timestamp: 'no timestamp yet',
      message: '',
      messageList: []
    };

    handleInputChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSendMessage = () => {
        sendMessage(this.state.message);
    }

    render() {
        const { timestamp, message, messageList } = this.state;

        return (
            <div>
                <h2>Чат</h2>
                <input type='text' onChange={this.handleInputChange} value={message}></input>
                <button onClick={this.handleSendMessage}>Отправить</button>
                <p>Текущее время: {timestamp}</p>
                <h3>Сообщения</h3>
                {messageList.map(item => (
                    <p key={uniqueId()}>{item}</p>
                ))}
            </div>
        );
    }
}

export default Content;
