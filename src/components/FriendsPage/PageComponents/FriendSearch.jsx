import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex'

import Divider from 'antd/lib/divider';
import List from 'antd/lib/list';
import 'antd/lib/list/style';

import SearchInput from '../../common/SearchInput/SearchInput.jsx';
import FriendRow from './FriendRow.jsx';
import withSocket from '../../HOC/WithSocket.jsx';
import withUser from '../../HOC/WithUser.jsx';

import FriendsService from '../../../clientServices/services/FriendsService';
import { updateTimer, getFriendsActions } from '../../../clientServices/utils/common';

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
        friendsList: []
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
        const { socket, user } = this.props;
        const { friendsList } = this.state;
        const updatedProfile = {
            ...user,
            friendsList: user.friendsList.concat(friend._id)
        };
        const friendsWithActions = getFriendsActions(updatedProfile.friendsList, friendsList);

        socket.emit(SOCKET_API.UPDATE_PROFILE, updatedProfile);
        socket.emit(SOCKET_API.ADD_TO_FRIENDS, friend._id);

        this.setState({ friendsList: friendsWithActions });
    }

    handleRemoveFriend = friend => {
        const { friendsList } = this.state;
        const { socket } = this.props;
        const updatingList = JSON.parse(JSON.stringify(friendsList));
        const friendIndex = findIndex(updatingList, ['_id', friend._id]);

        updatingList[friendIndex].actions.pop();
        updatingList[friendIndex].actions.push('addToFriends');
        this.setState({ friendsList: updatingList });

        socket.emit(SOCKET_API.REMOVE_FROM_FRIENDS, friend._id);
    }

    updateFriendList = friendsList => {
        const { user } = this.props;
        const friendsWithActions = getFriendsActions(user.friendsList, friendsList);

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
                                onRemoveFriend={this.handleRemoveFriend}
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
