import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import { Application } from './application';
import dynamo from '../dynamo/dynamo';
import log from '../log';

class ApplicationService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    // Get application for every candidate - can only be done by administrators.
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
    async getApplicationById(id: string): Promise <Application | null> {
        log.trace('Get Application by Id');
        log.debug(`id: ${id}`);
        const params = {
            TableName: 'APP_TABLE',
            Key: {
                'appId': id,
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item){
                log.debug('data.Item: ', JSON.stringify(data.Item));
                return data.Item as Application;
            } else{
                log.debug('returning null for get application by id');
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
    async removeApplication(id: number): Promise<boolean>{
        log.trace('Remove Application Function')
        const params = {
            TableName: 'APP_TABLE',
            Key: {
                'appId': id,
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
        UpdateExpression: `set employee=:emp, submitMonth=:sm, submitDate=:sd, 
        submitYear=:sy, status=:stat, processId=:pid, approval=:a, amountGranted=:ag`,
        ExpressionAttributeValues: {
            ':emp': application.employee,
            ':sm': application.submitMonth,
            ':sd': application.submitDate,
            ':sy': application.submitYear,
            ':stat': application.status,
            ':pid': application.processId,
            ':a': application.approval,
            ':ag': application.amountGranted
        },
        ExpressionAttributeNames: {
            '#employee': 'employee',
            '#submitMonth': 'submitMonth',
            '#submitDate': 'submitDate',
            '#submitYear': 'submitYear',
            '#status': 'status',
            '#processId': 'processId',
            '#approval': 'approval',
            '#amountGranted': 'amountGranted'
        },
        ReturnValues: 'UPDATE_NEW'
        };
        return await this.doc.update(params).promise().then((data) => {
            log.debug(data);
            return true;
        }).catch((err) => {
            log.trace('Error for update');
            log.error(err);
            return false;
        });
    }

} 

const applicationService = new ApplicationService();
export default applicationService;