import VKRepository from '../repositories/VKRepository';

class VKService {
    static getUserById(id) {
        return VKRepository.getUserById(id);
    }

    static getVKSession() {
        return VKRepository.getVKSession();
    }

    static loginVK() {
        return VKRepository.loginVK();
    }
}

export default VKService;
