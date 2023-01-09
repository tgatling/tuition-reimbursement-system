import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MessageInfoComponent from './messageinfo.component';

afterEach(cleanup);

describe('Test for Message Info Component', () => {

    it('it should render a message and the information associated with the message', () =>{
        const testMessage = {
            sender: 'Sender Name',
            recipient: 'Recipient Name',
            body: 'This is a test',
            msgDate: '04/27/21'
        }

        const {getByTestId} = render(<MessageInfoComponent msgData={testMessage}/>);
        
        expect(getByTestId('msg-date')).toHaveTextContent(testMessage.msgDate);
        expect(getByTestId('msg-recipient')).toHaveTextContent(testMessage.recipient);
        expect(getByTestId('msg-sender')).toHaveTextContent(testMessage.sender);
        expect(getByTestId('msg-body')).toHaveTextContent(testMessage.body);

    });
});