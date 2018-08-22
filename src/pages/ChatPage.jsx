import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../components/ChatPage/Header.jsx';
import Content from '../components/ChatPage/Content(WS).jsx';

class ChatPage extends PureComponent {

    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        );
    }
}

export default ChatPage;
