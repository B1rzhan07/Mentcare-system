import axios from 'axios';
export const BASE_URL = 'http://localhost:8800/api';
export default axios.create({
    baseURL: BASE_URL,

});