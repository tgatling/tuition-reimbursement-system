import axios from 'axios';
import { Application } from './application';
import{User} from '../user/user';

class ApplicationService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI+'applications';
    }

    getAllApplications(): Promise<Application []> {
        return axios.get(this.URI).then(result => result.data);
    } 

    getApplication(app: Application): Promise<Application> {
        console.log('getApplication');
        return axios.get(this.URI+'/'+app.appId).then(result=>result.data);
    }

    getMyApplications(user: User): Promise<Application[]>{
        return axios.get(this.URI+'/').then(result => result.data);
    }

    addApplication(app: Application): Promise<null> {
        return axios.post(this.URI, app).then(result => null);
    }

    updateApplication(app: Application): Promise<boolean> {
        return axios.put(this.URI, app).then(result => result.data);
    }

    deleteApplication(id: number): Promise<null> {
        console.log('Delete app: ', id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }
}

export default new ApplicationService();