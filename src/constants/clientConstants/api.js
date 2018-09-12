const HOST = process.env.REACT_APP_HOST || '';
const PORT = '8000';
const BASE_URL = `${HOST}${PORT ? `:${PORT}` : ''}`;

const API = {
    BASE_URL,
    USER: `${BASE_URL}/user`,
    CHECK_USER: `${BASE_URL}/checkUser`,
    CHECK_AUTHENTICATION: `${BASE_URL}/isAuthenticated`
};

export default API;
