import axios from "../api/axios"
export default class UserService {

    static axiosUser() {
        return axios.get('/user')

    }
}