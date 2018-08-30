import axios from 'axios';

class HttpProvider {
    static send(url, method = 'POST', data) {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        };

        return axios({
            url,
            withCredentials: true,
            method,
            headers,
            data: JSON.stringify(data)
        }).then(response => {
            if (response.status >= 400) {
                const error = new Error(response.statusText);

                error.response = response;
                throw error;
            }

            return response;
        }).catch(err => {
            throw err.response;
        });
    }

    static post(url, data = {}) {
        return this.send(url, 'POST', data);
    }
}

export default HttpProvider;
