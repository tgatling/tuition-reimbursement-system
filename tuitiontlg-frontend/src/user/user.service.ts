import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI + 'users';
    }

    getLogin(): Promise<User> {
        return axios.get(this.URI, { withCredentials: true }).then((result) => {
            return result.data;
        });
    }

    login(user: User): Promise<User> {

        return axios.post(this.URI, user, { withCredentials: true }).then((result) => result.data);
    }

    logout(): Promise<null> {
        return axios.delete(this.URI, { withCredentials: true }).then((result) => null);
    }

    updateUser(user: User): Promise<null> {
        return axios.put(this.URI, user).then((result) => null);
    }
}
export default new UserService();
