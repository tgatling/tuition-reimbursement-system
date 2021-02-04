import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import messageService from './message.service';
import { MessageState, UserState } from '../redux/reducer';
import { getMyMessages } from '../redux/actions';
import MessageInfoComponent from './messageinfo.component';
import '../home/home.css';

function MyMessageComponent() {
    console.log('MyMsgComponent');
    const messageSelector = (state: MessageState) => state.messages;
    const userSelector = (state: UserState) => state.user;
    const messages = useSelector(messageSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    console.log('Message Component User: ', user);

    useEffect(() => {
        messageService
            .getMyMessages(user)
            .then((returnMsgs) => dispatch(getMyMessages(returnMsgs)));
    }, [dispatch, user]);

    return (
        <div>
            <Link className='btn btn-success' to={'/message/new'}>
                Compose
            </Link>
            <br></br>
            <br></br>
            {messages.map((msg) => {
                return (
                    <MessageInfoComponent
                        key={'msg-' + msg.msgDate}
                        msgData={msg}
                    />
                );
            })}
        </div>
    );
}
export default MyMessageComponent;
