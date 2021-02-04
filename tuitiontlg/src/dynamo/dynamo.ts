import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1',
    endpoint: 'http://dynamodb.us-east-1.amazonaws.com'
});

export default docClient;