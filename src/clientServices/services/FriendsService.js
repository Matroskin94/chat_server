import FriendsRepository from '../repositories/FriendsRepository';

class FriendsService {
    static searchFriends(socket, searchStr) {
        return FriendsRepository.searchFriends(socket, searchStr);
    }

    static addToFriends(socket, friendId) {
        return FriendsRepository.addToFriends(socket, friendId);
    }
}

export default FriendsService;
