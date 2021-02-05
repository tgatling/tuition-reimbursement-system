import axios from 'axios';
import{ReimbursementForm} from '../reimbursement/reimbursementForm';

class myService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI+'form';
    }

    deleteForm(form: ReimbursementForm): Promise<null> {
        return axios.delete(this.URI+'/'+form.appId, {withCredentials: true}).then(result => null)
    }
}

export default new myService();