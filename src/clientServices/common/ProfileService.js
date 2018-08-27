import ProfileRepository from '../repositories/ProfileRepository';

class ProfileService {
    static login(user) {
        return ProfileRepository.login(user);
    }

    static register(user) {
        return ProfileRepository.register(user);
    }
}

export default ProfileService;
