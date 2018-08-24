import ProfileRepository from '../repositories/ProfileRepository';

class ProfileService {
    static login(user) {
        return ProfileRepository.login(user);
    }
}

export default ProfileService;
