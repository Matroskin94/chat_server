import ChatRepository from '../repositories/ChatRepository';

class ChatService {
    static onConnect(socket, userLogin) {
        return () => ChatRepository.handleConnect(socket, userLogin);
    }
}

export default ChatService;
