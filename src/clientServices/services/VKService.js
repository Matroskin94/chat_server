import VKRepository from '../repositories/VKRepository';

class VKService {
    static getUserById(id) {
        return VKRepository.getUserById(id);
    }

    static getVKSession() {
        return VKRepository.getVKSession();
    }
}

export default VKService;
