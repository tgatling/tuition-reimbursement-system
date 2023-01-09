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
                        <th data-testid='msg-date'>{prop.msgData.msgDate}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Recipient: </th>
                        <td className='msg-recipient' data-testid='msg-recipient' key = {'rec-'+prop.msgData.msgDate}>{prop.msgData.recipient}</td>
                    </tr>
                    <tr>
                        <th>Sender: </th>
                        <td className='sender' data-testid='msg-sender' key={'send-'+prop.msgData.msgDate}>{prop.msgData.sender}</td>   
                    </tr>
                    <tr>
                        <th>Message: </th>
                        <td className='recipient' data-testid='msg-body' key = {'body-'+prop.msgData.msgDate}>{prop.msgData.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export default MessageInfoComponent;
