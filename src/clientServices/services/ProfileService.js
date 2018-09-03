import ProfileRepository from '../repositories/ProfileRepository';

class ProfileService {
    static login(user) {
        return ProfileRepository.login(user);
    }

    static register(user) {
        return ProfileRepository.register(user);
    }

    static checkAuthentication() {
        return ProfileRepository.isAuthenticated();
    }
}

export default ProfileService;
