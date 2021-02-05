import React, {SyntheticEvent} from "react";
import {useHistory} from "react-router-dom";
import {connect, ConnectedProps, useSelector} from "react-redux";
import {Form, Col} from "react-bootstrap";
// Redux
import {MessageState, UserState} from '../redux/reducer';
import { changeMessage } from '../redux/actions';
// Messages
import {Message} from './message';
import messageService from './message.service';
// Other
import "../home/home";

const msgProp = (state: MessageState) => ({
    Message: state.message,
});
const mapDispatch = {
    updateMessage: (message: Message) => changeMessage(message),
};
const connector = connect(msgProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Form to send a new message
// Also used to send more information after making a decision about application
function NewMessageComponent(props: PropsFromRedux) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const history = useHistory();

    props.Message.sender = user.username;

    function handleFormInput(e: SyntheticEvent) {
        let msg: any = { ...props.Message };
        msg[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateMessage(msg);
    }

    function submitForm() {
        messageService.addMessage(props.Message).then(() => {
            props.updateMessage(new Message());
            alert("Message Sent");
        });
        history.push('/messages');
    }

    return (
        <div>
            <div className='col reimbursement card'>
                <br></br>
                <Form>
                    <Form.Row>
                        <Col>
                            <Form.Label>Sender:</Form.Label>
                            <Form.Control
                                disabled
                                name='sender'
                                value={user.username}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Recipient:</Form.Label>
                            <Form.Control
                                required
                                name='recipient'
                                placeholder='Username'
                                onChange={handleFormInput}
                            />
                        </Col>
                    </Form.Row>
                    <Form.Group controlId='body'>
                        <Form.Label>Body:</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='body'
                            onChange={handleFormInput}
                        />
                    </Form.Group>

                </Form>
                <br></br>
            </div>
            <br></br>
            <button className='btn btn-success' onClick={submitForm}>
                SEND
            </button>
        </div>
    );
}

export default connector(NewMessageComponent);
