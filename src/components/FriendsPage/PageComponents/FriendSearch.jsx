import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Divider from 'antd/lib/divider';
import List from 'antd/lib/list';
import 'antd/lib/list/style';

import SearchInput from '../../common/SearchInput/SearchInput.jsx';
import FriendRow from './FriendRow.jsx';
import withSocket from '../../HOC/WithSocket.jsx';
import withUser from '../../HOC/WithUser.jsx';

import FriendsService from '../../../clientServices/services/FriendsService';
import { updateTimer } from '../../../clientServices/utils/common';

import SOCKET_API from '../../../constants/clientConstants/socketAPI';

import friendsStyles from '../styles/friendsStyles.less';

@withUser()
@withSocket()
class FriendSearch extends PureComponent {
    static defaultProps = {
        socket: null,
        user: null
    }

    static propTypes = {
        socket: PropTypes.object,
        user: PropTypes.object
    }

    state = {
        searchField: '',
        typingTimer: 0,
        friendsList: [],
        vkFriends: [ // TODO: Убрать после реализации друзей ВК
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
    };

    componentDidMount() {
        const { socket } = this.props;

        socket.on(SOCKET_API.RECIEVE_FRIENDS, this.updateFriendList);
    }

    handleSearchChange = e => {
        const { typingTimer } = this.state;
        const { socket } = this.props;
        const searchWord = e.target.value;

        const currentTimer = updateTimer(typingTimer, 500, () => {
            FriendsService.searchFriends(socket, searchWord);
            this.setState({ typingTimer: null });
        });

        this.setState({
            searchField: searchWord,
            typingTimer: currentTimer
        });
    }

    handleAddFriend = friend => {
        const { socket } = this.props;

        socket.emit(SOCKET_API.ADD_TO_FRIENDS, friend._id);
    }

    updateFriendList = friendsList => {
        const { user } = this.props;
        const friendsWithActions = friendsList.map(item => {
            const actions = ['sendMessage'];

            if (user.friendsList.includes(item._id)) {
                actions.push('removeFromFriends');
            } else {
                actions.push('addToFriends');
            }

            return {
                ...item,
                actions
            };
        });

        this.setState({ friendsList: friendsWithActions });
    }

    render() {
        const {
            searchField,
            friendsList,
            typingTimer
        } = this.state;
        const isLodaing = !!typingTimer;

        return (
            <div>
                <SearchInput
                    placeholder='Введите имя или никнейм друга'
                    value={searchField}
                    handleSearchChange={this.handleSearchChange}
                    loading={isLodaing}
                />
                <div className={friendsStyles.listContainer}>
                    <List
                        locale={{ emptyText: 'Список пуст' }}
                        dataSource={friendsList}
                        renderItem={item => (
                            <FriendRow
                                actions={item.actions}
                                friend={item}
                                onAddFriend={this.handleAddFriend}
                                onRemoveFriend={() => {}}
                            />)}
                    />
                    {/* <Divider>Вконтакте </Divider>
                    <List
                        dataSource={vkFriends}
                        renderItem={item => (<FriendRow actions={actions} friend={item} />)}
                    /> */}
                </div>

            </div>
        );
    }
}

export default FriendSearch;
