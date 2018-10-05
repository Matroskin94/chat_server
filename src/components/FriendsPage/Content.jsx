import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';

import Card from 'antd/lib/card';
import Divider from 'antd/lib/divider';
import Tabs, { TabPane } from 'antd/lib/tabs';

import FriendSearch from './PageComponents/FriendSearch.jsx';
import UserFriends from './PageComponents/UserFriends.jsx';
import withUser from '../HOC/WithUser.jsx';
import withSocket from '../HOC/WithSocket.jsx';

import FriendsService from '../../clientServices/services/FriendsService';
import { getFriendsActions, updateTimer, noop } from '../../clientServices/utils/common';
import { updateFriendsAction } from '../../clientServices/actions/ProfileActions';

import SOCKET_API from '../../constants/clientConstants/socketAPI';
import COMMON from '../../constants/clientConstants/common';

import friendsStyles from './styles/friendsStyles.less';


function mapDispatchToProps(dispatch) {
    return {
        updateFriendsList: friends => dispatch(updateFriendsAction(friends))

    };
}

@connect(null, mapDispatchToProps)
@withSocket()
@withUser()
class Content extends PureComponent {
    static propTypes = {
        socket: PropTypes.object,
        user: PropTypes.object,
        updateFriendsList: PropTypes.func
    }

    static defaultProps = {
        socket: null,
        user: {},
        updateFriendsList: noop
    }

    state = {
        searchField: '',
        userFriends: [],
        friendsSearchList: []
    }

    componentDidMount() {
        const { socket, user } = this.props;

        this.setState({ userFriends: user.friendsData });
        socket.emit(SOCKET_API.GET_USER_FRIENDS);
        socket.on(SOCKET_API.RECIEVE_FRIENDS, this.updateSearchList);
        socket.on(SOCKET_API.RECIEVE_USER_FRIENDS, this.updateUserFriends);
        socket.on(SOCKET_API.CONNECTED_USER, this.getUserFriends);
        socket.on(SOCKET_API.USER_DISCONNECTED, this.getUserFriends);
    }

    componentWillUnmount() {
        const { socket } = this.props;

        socket.removeListener(SOCKET_API.GET_USER_FRIENDS);
        socket.removeListener(SOCKET_API.RECIEVE_FRIENDS, this.updateSearchList);
        socket.removeListener(SOCKET_API.RECIEVE_USER_FRIENDS, this.updateUserFriends);
        socket.removeListener(SOCKET_API.CONNECTED_USER, this.getUserFriends);
        socket.removeListener(SOCKET_API.USER_DISCONNECTED, this.getUserFriends);
    }

    getUserFriends = () => {
        const { socket } = this.props;

        socket.emit(SOCKET_API.GET_USER_FRIENDS);
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

    handleAddFriend = listType => friend => {
        const { socket, user } = this.props;
        const { [listType]: processingList } = this.state;
        const updatedProfile = {
            ...user,
            friendsList: user.friendsList.concat(friend._id)
        };
        const friendsWithActions = getFriendsActions(updatedProfile.friendsList, processingList);

        socket.emit(SOCKET_API.ADD_TO_FRIENDS, friend._id);
        socket.emit(SOCKET_API.UPDATE_PROFILE, updatedProfile);
        socket.emit(SOCKET_API.GET_USER_FRIENDS);

        this.setState({ [listType]: friendsWithActions });
    }

    handleRemoveFriend = listType => friend => {
        const { [listType]: processingList, searchField } = this.state;
        const { socket } = this.props;
        const updatingList = JSON.parse(JSON.stringify(processingList));
        const friendIndex = findIndex(updatingList, ['_id', friend._id]);

        if (listType !== 'userFriends') {
            updatingList[friendIndex].actions.pop();
            updatingList[friendIndex].actions.push(COMMON.ADD_TO_FRIENDS);
            this.setState({ [listType]: updatingList });
        }

        socket.emit(SOCKET_API.REMOVE_FROM_FRIENDS, friend._id);
        socket.emit(SOCKET_API.GET_USER_FRIENDS);

        if (listType === 'userFriends') {
            FriendsService.searchFriends(socket, searchField);
        }
    }

    updateSearchList = friendsList => {
        const { user } = this.props;
        const friendsWithActions = getFriendsActions(user.friendsList, friendsList);

        this.setState({ friendsSearchList: friendsWithActions });
    }

    updateUserFriends = userFriends => {
        const { updateFriendsList } = this.props;
        const friendsWithActions = userFriends.map(item => {
            item.actions = [COMMON.REMOVE_FROM_FRIENDS, COMMON.SEND_MESSAGE];

            return item;
        });

        this.setState({ userFriends: friendsWithActions });
        updateFriendsList(friendsWithActions);
    }

    render() {
        const {
            friendsSearchList,
            searchField,
            typingTimer,
            userFriends
        } = this.state;
        const isLodaing = !!typingTimer;
        const { user } = this.props;

        return (
            <Fragment>
                <Divider>Друзья</Divider>
                <Card className={friendsStyles.container}>
                    <Tabs defaultActiveKey='my_friends'>
                        <TabPane tab='Мои друзья' key='my_friends'>
                            <UserFriends
                                friendsList={userFriends}
                                onRemoveFriend={this.handleRemoveFriend('userFriends')}
                            />
                        </TabPane>
                        <TabPane tab='Поиск друзей' key='search_friends'>
                            <FriendSearch
                                user={user}
                                isLodaing={isLodaing}
                                searchField={searchField}
                                friendsList={friendsSearchList}
                                onAddFriend={this.handleAddFriend('friendsSearchList')}
                                onRemoveFriend={this.handleRemoveFriend('friendsSearchList')}
                                onSearchChange={this.handleSearchChange}
                            />
                        </TabPane>
                    </Tabs>
                </Card>
            </Fragment>
        );
    }
}

export default Content;
