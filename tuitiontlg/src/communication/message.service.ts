import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import { Message } from './message';
import dynamo from '../dynamo/dynamo';
import log from '../log';

class MessageService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async getAllMessages(): Promise <Message[]>{
        log.trace('Get All Messages Function');
        const params = {
            TableName: 'MSG_TABLE'
            
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Message[];
        });
    }

    // Get a set of applications by the employee that submitted it.
    async getMessagesByRecipient(recipient: string): Promise<Message[]>{
        log.trace('Get the message sent by specific employee.');
        const params = {
            TableName: 'MSG_TABLE',
            IndexName: 'RecipientIndex',
            KeyConditionExpression: '#recipient = :recipient',
            ExpressionAttributeNames: {
                '#recipient': 'recipient',
            },
            ExpressionAttributeValues:{
                ':recipient': recipient,
            }
        };
        return await this.doc.query(params).promise().then((data) => {
            return data.Items as Message[];
        }). catch((err) => {
            log.error(err);
            return [];
        })
    }

    // Add an application to the system.
    async addMessage(message: Message): Promise<boolean> {
        const params = {
            TableName: 'MSG_TABLE',
            Item: message,
            ConditionExpression: '#msgDate <> :msgDate',
            ExpressionAttributeNames: {
                '#msgDate': 'msgDate',
            },
            ExpressionAttributeValues: {
                ':msgDate': message.msgDate,
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            log.info('Successfully added message');
            return true;
        }).catch((err) => {
            log.debug('Failed to add message');
            log.error(err);
            return false;
        });
    }

    // Delete an message from the system.
    async removeMessage(message: Message): Promise<boolean>{
        log.trace('Remove Message Function')
        const params = {
            TableName: 'MSG_TABLE',
            Key: {
                'msgDate': message.msgDate,
                'recipient': message.recipient
            }
        };
        return await this.doc.delete(params).promise().then((result) => {
            log.debug(result);
            log.info('Successfully deleted the message');
            return true;
        }).catch((err) => {
            log.error(err);
            return false;
        });
    }

    
} 

const messageService = new MessageService();
export default messageService;