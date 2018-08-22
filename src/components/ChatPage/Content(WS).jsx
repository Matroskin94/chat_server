import React, { Component } from 'react';
import { uniqueId } from 'lodash';

class Content extends Component {
    constructor(){
        super();
        this.ws = new WebSocket('ws://localhost:8000');
        this.ws.onopen = () => this.setStatus('ONLINE');

        this.ws.onclose = () => this.setStatus('Disconnected');

        this.ws.onmessage = response => this.printMessage(response.data);
    }

    state = {
      timestamp: 'no timestamp yet',
      status: 'DISCONNECTED',
      message: '',
      messageList: []
    };

    setStatus = status => {
        this.setState({
            status
        });
    }

    printMessage = value => {

        this.setState(prevState => ({
            messageList: prevState.messageList.concat(value)
        }));
    }

    handleInputChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    sendMessage = e => {
        this.ws.send(this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        const { timestamp, message, messageList, status } = this.state;
        console.log('messageList', messageList);

        return (
            <div>
                <h2>Чат</h2>
                <h3>{status}</h3>
                <input type='text' onChange={this.handleInputChange} value={message}></input>
                <button onClick={this.sendMessage}>Отправить</button>
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
