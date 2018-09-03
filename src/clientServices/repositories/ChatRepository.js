import SOCKET_API from '../../constants/clientConstants/api';

class ChatRepository {
    static handleConnect(socket, userLogin) {
        socket.emit(SOCKET_API.USER_CONNECTED, userLogin);
        // socket.emit(SOCKET_API.GET_ONLINE_USERS);
    }
}

export default ChatRepository;
