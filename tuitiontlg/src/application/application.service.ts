import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import { Application } from './application';
import dynamo from '../dynamo/dynamo';
import log from '../log';

class ApplicationService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async getAllApplications(): Promise <Application[]>{
        log.trace('Get All Application Function');
        const params = {
            TableName: 'APP_TABLE'
            
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Application[];
        });
    }

    // Get a set of applications by the employee that submitted it.
    async getApplicationByEmployee(submittedBy: string): Promise<Application[]>{
        log.trace('Get the application based off of the employee that submitted it.');
        const params = {
            TableName: 'APP_TABLE',
            IndexName: 'EmployeeIndex',
            KeyConditionExpression: '#employee = :employee',
            ExpressionAttributeNames: {
                '#employee': 'employee',
            },
            ExpressionAttributeValues:{
                ':employee': submittedBy,
            }
        };
        return await this.doc.query(params).promise().then((data) => {
            return data.Items as Application[];
        }). catch((err) => {
            log.error(err);
            return [];
        })
    }

    
    // Get a particular application by the id.
    async getApplicationById(id: string, employee: string): Promise <Application | null> {
        log.trace('Get Application by Id');
        const params = {
            TableName: 'APP_TABLE',
            Key: {
                'appId': id,
                'employee': employee
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item){
                log.debug('data.Item: ', JSON.stringify(data.Item));
                return data.Item as Application;
            } else{
                return null;
            }
        });
    }

    // Add an application to the system.
    async addApplication(application: Application): Promise<boolean> {
        const params = {
            TableName: 'APP_TABLE',
            Item: application,
            ConditionExpression: '#appId <> :appId',
            ExpressionAttributeNames: {
                '#appId': 'appId',
            },
            ExpressionAttributeValues: {
                ':appId': application.appId,
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            log.info('Successfully added application');
            return true;
        }).catch((err) => {
            log.debug('Failed to add application');
            log.error(err);
            return false;
        });
    }

    // Delete an application from the system.
    async removeApplication(application: Application): Promise<boolean>{
        log.trace('Remove Application Function')
        const params = {
            TableName: 'APP_TABLE',
            Key: {
                'appId': application.appId,
                'employee': application.employee
            }
        };
        return await this.doc.delete(params).promise().then((result) => {
            log.debug(result);
            log.info('Successfully deleted the application');
            return true;
        }).catch((err) => {
            log.error(err);
            return false;
        });
    }

    // Update car information
    async  updateApplication(application: Application): Promise<boolean>{
    const params = {
        TableName: 'APP_TABLE',
        Key: {
            'appId': application.appId
        },
        UpdateExpression: 'set amountGranted = :amountGranted, status = :status, approval = :approval, processId =  :processId',
        ExpressionAttributeValues: {
            ':amount': application.amountGranted,
            ':status': application.status,
            ':approval': application.approval,
            ':processId': application.processId,
        },
        ExpressionAttributeNames: {
            '#amount': 'amount',
            '#status': 'status',
            '#approval': 'approval',
            '#processId': 'processId'
        },
        ReturnValues: 'UPDATE_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            log.debug(data);
            return true;
        }).catch((err) => {
            log.error(err);
            return false;
        });
    }

} 

const applicationService = new ApplicationService();
export default applicationService;