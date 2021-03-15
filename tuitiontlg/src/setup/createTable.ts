import * as AWS from 'aws-sdk';
import log from '../log';
import userService from '../user/user.service';
import applicationService from '../application/application.service';
import reimbursementFormService from '../application/reimbursementForm.service';
import messageService from '../communication/message.service';
import {strDate} from '../communication/message';

// Set the region
AWS.config.update({ region: 'us-east-1' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// USER TABLE CREATION
const removeUsers = {
    TableName: 'USER_TABLE'
};


const userTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'username',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'username',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'USER_TABLE',
    StreamSpecification: {
        StreamEnabled: false
    }
    
};

ddb.deleteTable(removeUsers, function(err, data){
    if(err){
        log.error('Unable to delete user table.  Error JSON: ', JSON.stringify(err, null, 2));
    } else{
        log.trace('Deleted user table.  Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(() => {
        ddb.createTable(userTableSchema, (err, data)=> {
            if(err) {
                // log the error using logger; not done in this example
                log.error("Error", err);
            } else {
                log.trace('User Table Created', data);
                setTimeout(() => {
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
})

// APPLICATION TABLE
const removeApps = {
    TableName: 'APP_TABLE'
};

const appTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'appId',
            AttributeType: 'N'
        },
        {
            AttributeName: 'employee',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'appId',
            KeyType: 'HASH'
        },
        // {
        //     AttributeName: 'employee',
        //     KeyType: 'RANGE'
        // }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'APP_TABLE',
    StreamSpecification: {
        StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'EmployeeIndex',
            KeySchema: [
                {
                    AttributeName: 'employee',
                    KeyType: 'HASH'
                },
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits:1
            }
        }
    ]
    
};

ddb.deleteTable(removeApps, function(err, data){
    if(err){
        log.error('Unable to delete application table.  Error JSON: ', JSON.stringify(err, null, 2));
    } else{
        log.trace('Deleted application table.  Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(() => {
        ddb.createTable(appTableSchema, (err, data)=> {
            if(err) {
                // log the error using logger; not done in this example
                log.error("Error", err);
            } else {
                log.trace('Application Table Created', data);
                setTimeout(() => {
                    populateAppTable();
                }, 20000);
            }
        });
    }, 5000);
});




// FORM TABLE CREATION
const removeReimbursementForms = {
    TableName: 'FORM_TABLE'
};


const formTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'appId',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'appId',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'FORM_TABLE',
    StreamSpecification: {
        StreamEnabled: false
    }
    
};

ddb.deleteTable(removeReimbursementForms, function(err, data){
    if(err){
        log.error('Unable to delete user table.  Error JSON: ', JSON.stringify(err, null, 2));
    } else{
        log.trace('Deleted user table.  Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(() => {
        ddb.createTable(formTableSchema, (err, data)=> {
            if(err) {
                // log the error using logger; not done in this example
                log.error("Error", err);
            } else {
                log.trace('User Table Created', data);
                setTimeout(() => {
                    populateFormTable();
                }, 10000);
            }
        });
    }, 5000);
})

//MESSAGE TABLE
const removeMsgs = {
    TableName: 'MSG_TABLE'
};

const msgTableSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'msgDate',
            AttributeType: 'S'
        },
        {
            AttributeName: 'recipient',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'msgDate',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'recipient',
            KeyType: 'RANGE'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    TableName: 'MSG_TABLE',
    StreamSpecification: {
        StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: 'RecipientIndex',
            KeySchema: [
                {
                    AttributeName: 'recipient',
                    KeyType: 'HASH'
                },
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits:1
            }
        }
    ]
    
};

ddb.deleteTable(removeMsgs, function(err, data){
    if(err){
        log.error('Unable to delete message table.  Error JSON: ', JSON.stringify(err, null, 2));
    } else{
        log.trace('Deleted message table.  Table description JSON: ', JSON.stringify(data, null, 2));
    }
    setTimeout(() => {
        ddb.createTable(msgTableSchema, (err, data)=> {
            if(err) {
                // log the error using logger; not done in this example
                log.error("Error", err);
            } else {
                log.trace('Message Table Created', data);
                setTimeout(() => {
                    populateMsgTable();
                }, 25000);
            }
        });
    }, 5000);
});



// POPULATE TABLES
function populateUserTable(){
    userService.addUser({username: 'Millard', password: 'Enter', jobTitle: 'Benefits Coordinator', processId: 4, admin: true, access: 'granted'}).then(() => {});
    userService.addUser({username: 'Kim', password: 'Enter', jobTitle: 'Department Head', processId: 3, admin: true, access: 'granted'}).then(() => {});
    userService.addUser({username: 'Kaleb', password: 'Enter', jobTitle: 'Direct Supervisor / Department Head', processId: 3, admin: true, access: 'granted'}).then(() => {});
    userService.addUser({username: 'Tequesha', password: 'Enter', jobTitle: 'Direct Supervisor', processId: 2, admin: true, access: 'granted'}).then(() => {});
    userService.addUser({username: 'Jay', password: 'Pass1', jobTitle: 'Employee', processId: 1, admin: false, access: 'granted', availableR: 850, totalR: 1000, pendingR: 150, awardedR: 0}).then(() => {});
    userService.addUser({username: 'Dezi', password: 'Pass2', jobTitle: 'Employee', processId:1, admin: false, access: 'granted', availableR: 850,  totalR: 1000, pendingR: 150, awardedR: 0}).then(() => {});

}

function populateAppTable(){
    applicationService.addApplication({appId: 20, employee: 'Dezi', submitMonth: 5, submitDate: 30, submitYear: 2020, status: 'approved', processId: 5,
    approval: {directSupervisor: 'Kaleb', departmentHead: 'Kaleb', benefitCoordinator: 'Millard'}, amountGranted: 150}).then(() => {});

    applicationService.addApplication({appId: 25, employee: 'Dezi', submitMonth: 1, submitDate: 1, submitYear: 2020, status: 'approved', processId: 6,
    approval: {directSupervisor: 'Tequesha', departmentHead: 'Kim', benefitCoordinator: 'Millard'}, amountGranted: 225}).then(() => {});

    applicationService.addApplication({appId: 32, employee: 'Jay', submitMonth: 1, submitDate: 1, submitYear: 2021, status: 'pending', processId: 2,
    approval: {directSupervisor: 'pending', departmentHead: 'pending', benefitCoordinator: 'pending'}, amountGranted: 0}).then(() => {});
}

function populateFormTable(){
    reimbursementFormService.addForm({username: 'Dezi', firstName: 'Desmond', lastName: 'Boone', startMonth: 8, startDate: 14, startYear: 2020, timeHour: '08', timeMins: '00', timeOfDay: 'AM', location: 'Online Proctored', 
     description: 'AWS Certified Developer - Associate', cost: 150, gradingFormat: 'pass/fail', passingGrade: 'Default', gradeDecision: '', typeOfEvent: 'Certification',
     workJustification: 'This certificatation is intended to validate my technical skills so that I can grow my career.', processId: 5, eventAttachment: '', approvalAttachment:'', missedWork: 'None', appId: 20, calculation: 150,
     finalAttachment: '', reimbursed: false}).then(() => {});
    
     reimbursementFormService.addForm({username: 'Dezi', firstName: 'Desmond', lastName: 'Boone', startMonth: 3, startDate: 29, startYear: 2020, timeHour: '08', timeMins: '00', timeOfDay: 'PM', location: 'Online Proctored', 
     description: 'Preparation course for the AWS Certified Developer examination that was already approved.  Offers me a better chance of passing.', cost: 300, gradingFormat: 'pass/fail', gradeDecision: 'Passing', passingGrade: 'Default', 
     typeOfEvent: 'Certification Preparation Class', workJustification: 'This certificatation is intended to validate my technical skills so that I can grow my career. The preparation class will increase my chances of passing.', processId: 6, 
     eventAttachment:'C:\fakepath\Amazon AWS Certifications.pdf', approvalAttachment: 'C:\fakepath\Direct Supervisor Approval.msg', missedWork: 'None', appId: 25, calculation: 225,
     finalAttachment: 'C:\fakepath\Grade from Prep Class.pdf', reimbursed: true}).then(() => {});
    
     reimbursementFormService.addForm({username: 'Jay', firstName: 'Jayland', lastName: 'Boone', startMonth: 8, startDate: 14, startYear: 2021, timeHour: '12', timeMins: '00', timeOfDay: 'PM', location: 'Online Proctored', 
     description: 'AWS Certified Developer - Associate', cost: 150, gradingFormat: 'pass/fail', passingGrade: 'Default', gradeDecision: '', typeOfEvent: 'Certification',
     workJustification: 'This certificatation is intended to validate my technical skills so that I can grow my career.', processId: 2, eventAttachment:'C:\fakepath\Amazon AWS Certifications.pdf' , 
     approvalAttachment:'' , finalAttachment: '', missedWork: 'None', appId: 32, calculation: 150, reimbursed: false}).then(() => {});
}

function populateMsgTable(){
    messageService.addMessage({sender: 'Kim', recipient: 'Dezi', body: 'You application has just been sent to the Benefit Coordinator for the final stage.', msgDate: 'Mon Jun 01 2020 15:08:07 GMT-0500 (Eastern Standard Time)'}).then(() =>{});
    messageService.addMessage({sender: 'Millard', recipient: 'Dezi', body: 'Your application has been approved for the full $150.', msgDate: 'Mon Jun 08 2020 08:03:17 GMT-0500 (Eastern Standard Time)'}).then(() =>{});
    messageService.addMessage({sender: 'Dezi', recipient: 'Millard', body: 'Thank you all.  I appreciate it so much.', msgDate: 'Mon Jun 15 2020 11:38:56 GMT-0500 (Eastern Standard Time)'}).then(() =>{});
    messageService.addMessage({sender: 'Millard', recipient: 'Dezi', body: 'Be sure to submit documentation when the certification is completed.', msgDate: 'Wed Sep30 2020 08:13:56 GMT-0500 (Eastern Standard Time)'}).then(() =>{});
    messageService.addMessage({sender: 'Tequesha', recipient: 'Jay', body: 'Thank you for submitting your application.', msgDate: strDate}).then(() =>{});
}