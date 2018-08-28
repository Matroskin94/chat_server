import httpProvider from '../httpProvider';
import API from '../../constants/clientConstants/api';

class ProfileRepository {
    static login(user) {
        return httpProvider.post(API.CHECK_USER, user);
    }

    static register(user) {
        return httpProvider.post(API.USER, user);
    }
}

export default ProfileRepository;
