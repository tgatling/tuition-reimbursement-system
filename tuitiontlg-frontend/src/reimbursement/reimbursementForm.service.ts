import axios from 'axios';
import { ReimbursementForm } from './reimbursementForm';

class ReimbursementFormService{
    private URI: string;
    constructor(){
        this.URI = 'http://localhost:3000/reimbursements';
    }

    addForm(form: ReimbursementForm): Promise<ReimbursementForm> {
        return axios.post(this.URI, form, {withCredentials: true}).then(result => result.data);
    }

    getForm(id: number): Promise<ReimbursementForm>{
        console.log('service-getForm', id);
        console.log('axios', axios.get(this.URI+'/'+id).then(result => result.data))
        return axios.get(this.URI+'/'+id).then(result => result.data);
    }

    updateForm(form: ReimbursementForm): Promise<null> {
        return axios.put(this.URI, form).then(result => null);
    }

    getAllForms(): Promise<ReimbursementForm []> {
        console.log('Get Request - All Forms');
        return axios.get(this.URI).then(result => result.data);
    }
  

}
export default new ReimbursementFormService();