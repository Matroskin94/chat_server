import React, { PureComponent, Fragment } from 'react';
import Card from 'antd/lib/card';
import Divider from 'antd/lib/divider';
import Tabs, { TabPane } from 'antd/lib/tabs';
import List from 'antd/lib/list';
import 'antd/lib/list/style';

import FriendRow from './PageComponents/FriendRow.jsx';

import friendsStyles from './styles/friendsStyles.less';

class Content extends PureComponent {
    state = {
        friendsList: [
            {
                userLogin: 'Frank',
                name: 'Фёдор',
                surname: 'Васечкин'

            },
            {
                userLogin: 'Tony',
                name: 'Петя',
                surname: 'Добрый'
            }
        ],
        actions: ['sendMessage', 'removeFromFriends']
    }

    render() {
        const { friendsList, actions } = this.state;

        return (
            <Fragment>
                <Divider>Друзья</Divider>
                <Card className={friendsStyles.container}>
                    <Tabs defaultActiveKey='my_friends'>
                        <TabPane tab='Мои друзья' key='my_friends'>
                            <List
                                dataSource={friendsList}
                                renderItem={item => (<FriendRow actions={actions} friend={item} />)}
                            />
                        </TabPane>
                        <TabPane tab='Поиск друзей' key='search_friends'>
                            Search friends
                        </TabPane>
                    </Tabs>
                </Card>
            </Fragment>
        );
    }
}

export default Content;
