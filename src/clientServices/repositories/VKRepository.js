import VK_ERRORS from '../../constants/clientConstants/vkErrors';

class VKRepository {
    static getUserById(id) {
        const { VK } = window;

        return new Promise((resolve, reject) => {
            VK.api('users.get',
                {
                    user_ids: [id],
                    fields: ['photo_50', 'photo_200_orig', 'photo_100'],
                    v: '5.73'
                }, data => {
                    if (data.response) {
                        resolve(data.response[0]);
                    } else {
                        reject(Error(VK_ERRORS.USER_NOT_FOUND));
                    }
                });
        });
    }

    static getVKSession() {
        const { VK } = window;

        return new Promise((resolve, reject) => {
            VK.Auth.getLoginStatus(status => {
                if (status.session) {
                    resolve(status.session);
                } else {
                    reject(new Error(VK_ERRORS.USER_NOT_LOGGED_IN));
                }
            });
        });
    }
}

export default VKRepository;
