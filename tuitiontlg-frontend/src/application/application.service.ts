import axios from 'axios';
import { Application } from './application';
import{User} from '../user/user';

class ApplicationService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI+'applications';
    }

    getAllApplications(): Promise<Application []> {
        console.log('Get Request - All Applications');
        return axios.get(this.URI).then(result => result.data);
    } 

    getApplication(a: Application): Promise<Application> {
        console.log('GET APPLICATION -ID: ', a);
        return axios.get(this.URI+'/'+a).then(result=>result.data);
    }

    getMyApplications(u: User): Promise<Application[]>{
        console.log('Get Request - Get My Applications');
        return axios.get(this.URI+'/').then(result => result.data);
    }

    addApplication(a: Application): Promise<null> {
        return axios.post(this.URI, a).then(result => null);
    }

    updateApplication(a: Application): Promise<null> {
        return axios.put(this.URI, a.appId).then(result => null);
    }

    deleteApplication(a: Application): Promise<null> {
        console.log('axios delApp: ', a);
        return axios.delete(this.URI+'/'+a.appId, {withCredentials: true}).then(result => null)
    }
}

export default new ApplicationService();