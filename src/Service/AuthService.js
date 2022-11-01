import axios from "../api/axios";
export default class AuthService {
    static async login(email, password, role) {
        return axios.post('/user/login', { email, password, role }).then(response => response.data);
    }
    static async register(email, password) {
        return axios.post('/user/registration', { email, password }).then(response => response.data);
    }

}