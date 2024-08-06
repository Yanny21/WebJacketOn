import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/webJacketOn/server/api.php',
});

export default api;
