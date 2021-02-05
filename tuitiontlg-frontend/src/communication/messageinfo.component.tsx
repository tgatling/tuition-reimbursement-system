import { Message } from './message';
import '../home/home';

interface msgProp{
    msgData: Message;
}

// Display of specific informatin regarding messages
function MessageInfoComponent(prop: msgProp) {

    return (
        <div className='border border-success'>
            <br></br>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Message Received: </th>
                        <th>{prop.msgData.msgDate}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Recipient: </th>
                        <td className='recipient' key = {'rec-'+prop.msgData.msgDate}>{prop.msgData.recipient}</td>
                    </tr>
                    <tr>
                        <th>Sender: </th>
                        <td className='sender' key={'send-'+prop.msgData.msgDate}>{prop.msgData.sender}</td>   
                    </tr>
                    <tr>
                        <th>Message: </th>
                        <td className='recipient' key = {'body-'+prop.msgData.msgDate}>{prop.msgData.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default MessageInfoComponent;
