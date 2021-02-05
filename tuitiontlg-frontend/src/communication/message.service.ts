import axios from 'axios';
import { Message } from './message';
import{User} from '../user/user';

class MessageService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI+'messages';
    } 

    getMessage(msg: Message): Promise<Message> {
        return axios.get(this.URI+'/'+msg.msgDate).then(result=>result.data);
    }

    getMyMessages(user: User): Promise<Message[]>{
        return axios.get(this.URI+'/'+user.username).then(result => result.data);
    }

    addMessage(msg: Message): Promise<null> {
        return axios.post(this.URI, msg).then(result => null);
    }

    deleteMessage(msg: Message): Promise<null> {
        return axios.delete(this.URI+'/'+msg.msgDate, {withCredentials: true}).then(result => null)
    }
}

export default new MessageService();