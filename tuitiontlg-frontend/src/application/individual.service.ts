import axios from 'axios';
import { Application } from './application';
import{User} from '../user/user';

class IndividualService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI+'employee';
    }

    getMyApplications(u: User): Promise<Application[]>{
        console.log('Get Request - Get My Applications');
        return axios.get(this.URI+'/'+u.username).then(result => result.data);
    }
}

export default new IndividualService();