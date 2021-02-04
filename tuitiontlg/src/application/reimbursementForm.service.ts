import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import {ReimbursementForm} from './reimbursementForm';
import log from '../log';

class ReimbursementFormService {
    private doc: DocumentClient;
    constructor(){
        this.doc = dynamo;
    }

    async getForms(): Promise <ReimbursementForm[]>{
        log.trace('Get Form Function');
        const params = {
            TableName: 'FORM_TABLE'
            
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as ReimbursementForm[];
        });
    }

    // Get the form by application id
    async getFormById(appId: number): Promise <ReimbursementForm | null> {
        log.trace('Get Form By Id Function');
        const params = {
            TableName: 'FORM_TABLE',
            Key: {
                'appId': appId,
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if(data && data.Item){
                log.debug('data.Item: ', JSON.stringify(data.Item));
                return data.Item as ReimbursementForm;
            } else{
                return null;
            }
        });
    }

    // Add reimbursement form to the system
    async addForm(reimbursementForm: ReimbursementForm): Promise<boolean> {
        const params = {
            TableName: 'FORM_TABLE',
            Item: reimbursementForm,
            ConditionExpression: '#appId <> :appId',
            ExpressionAttributeNames: {
                '#appId': 'appId',
            },
            ExpressionAttributeValues: {
                ':appId': reimbursementForm.appId,
            }
        };
        return await this.doc.put(params).promise().then((result) => {
            log.info('Successfully added reimbursement form');
            return true;
        }).catch((err) => {
            log.debug('Failed to add reimbursement form');
            log.error(err);
            return false;
        });
    }

    async updateForm(form: ReimbursementForm): Promise<boolean> {
        log.debug(form);
        const params = {
            TableName: 'FORM_TABLE',
            Key: {
                'appId': form.appId
            },
            UpdateExpression: `set #startMonth=:sm, #startDate=:sd, #startYear=:sy, 
            #timeHour=:th, #timeMins=:tm, #timeOfDay=:tod, #location=:l, 
            #description=:d, #cost=:c, #gradingFormat=:gf, #typeOfEvent=:te, 
            #workJustification=:wj, #missedWork=:mw, #eventAttachment=:ea, 
            #approvalAttachment=:aa, #processId=:pid, #passingGrade=:pg, #calculation=:ca,
            #finalAttachment=:fa, #gradeDecision=:gd, #reimbursed=:r`,
            ExpressionAttributeValues: {
                ':sm': form.startMonth,
                ':sd': form.startDate,
                ':sy': form.startYear,
                ':th': form.timeHour,
                ':tm': form.timeMins,
                ':tod': form.timeOfDay,
                ':l': form.location,
                ':d': form.description,
                ':c': form.cost,
                ':gf': form.gradingFormat,
                ':pg': form.passingGrade,
                ':te': form.typeOfEvent,
                ':wj': form.workJustification,
                ':pid': form.processId,
                ':ea': form.eventAttachment,
                ':aa': form.approvalAttachment,
                ':mw': form.missedWork,
                ':ca': form.calculation,
                ':fa': form.finalAttachment,
                ':gd': form.gradeDecision,
                ':r': form.reimbursed

            },
            ExpressionAttributeNames: {
                '#startMonth': 'startMonth',
                '#startDate': 'startDate',
                '#startYear': 'startYear',
                '#timeHour': 'timeHour',
                '#timeMins': 'timeMins',
                '#timeOfDay': 'timeOfDay',
                '#location': 'location',
                '#description': 'description',
                '#cost': 'cost',
                '#gradingFormat': 'gradingFormat',
                '#passingGrade': 'passingGrade',
                '#typeOfEvent': 'typeOfEvent',
                '#workJustification': 'workJustification',
                '#processId':'processId',
                '#eventAttachment': 'eventAttachment',
                '#approvalAttachment': 'approvalAttachment',
                '#missedWork': 'missedWork',
                '#calculation': 'calculation',
                '#finalAttachment': 'finalAttachment',
                '#gradeDecision': 'gradeDecision',
                '#reimbursed': 'reimbursed'
                
            },
            ReturnValue: 'UPDATED_NEW'
        };
    
        return await this.doc.update(params).promise().then(() => {
            log.info('Reimbursement Form Updated.');
            return true;
        }).catch((error) => {
            log.error(error);
            return false;
        })
    }

    async deleteForm(appId: string): Promise<Boolean> {
        const params = {
            TableName: 'FORM_TABLE',
            Key: {
                'appId': appId
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            log.error(err);
            return false;
        });
    }
} 



const reimbursementFormService = new ReimbursementFormService();
export default reimbursementFormService;