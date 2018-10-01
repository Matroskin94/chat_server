import SOCKET_API from '../../constants/clientConstants/socketAPI';

class FriendsRepository {
    static searchFriends(socket, searchStr) {
        socket.emit(SOCKET_API.SEARCH_FRIENDS, searchStr);
    }

    static addToFriends(socket, friendId) {
        socket.emit(SOCKET_API.ADD_TO_FRIENDS, friendId);
    }
}

export default FriendsRepository;
