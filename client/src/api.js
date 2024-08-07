import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost/webJacketOn/server/api.php',
});

export default api;
