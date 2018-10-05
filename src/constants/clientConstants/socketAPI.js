const SOCKET_API = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    USER_CONNECTED: 'userConnected',
    GET_ONLINE_USERS: 'getOnlineUsers',
    ONLINE_USERS: 'onlineUsers',
    CONNECTED_USER: 'connectedUser',
    USER_LOGOUT: 'userLogout',
    USER_DISCONNECTED: 'userDisconnected',
    SEND_MESSAGE: 'sendMessage',
    RECIEVE_MESSAGE: 'recieveMessage',
    SEND_USER_TYPING: 'sendUserTiping',
    RECIEVE_USER_TYPING: 'recieveUserTyping',
    UPDATE_PROFILE: 'updateProfile',
    SEARCH_FRIENDS: 'searchFriends',
    RECIEVE_FRIENDS: 'recieveFriends',
    ADD_TO_FRIENDS: 'addToFriends',
    REMOVE_FROM_FRIENDS: 'removeFromFriends',
    GET_USER_FRIENDS: 'getUserFriends',
    RECIEVE_USER_FRIENDS: 'recieveUserFriends'
};

export default SOCKET_API;
