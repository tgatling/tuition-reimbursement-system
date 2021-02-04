import { DocumentClient } from "aws-sdk/clients/dynamodb";
import dynamo from "../dynamo/dynamo";
import { User } from "./user";
import log from "../log";

class UserService {
    private doc: DocumentClient;
    constructor() {
        this.doc = dynamo;
    }

    async getUsers(): Promise<User[]> {
        log.trace("Get Users Function");
        const params = {
            TableName: "USER_TABLE",
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        });
    }

    // Get the user by username
    async getUserByName(username: String): Promise<User | null> {
        log.trace("Get User By Name Function");
        const params = {
            TableName: "USER_TABLE",
            Key: {
                username: username,
            },
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                log.debug("data.Item: ", JSON.stringify(data.Item));
                return data.Item as User;
            } else {
                return null;
            }
        });
    }

    // Add user to the system
    async addUser(user: User): Promise<boolean> {
        log.trace("Add User Function");
        const params = {
            TableName: "USER_TABLE",
            Item: user,
            ConditionExpression: "#username <> :username",
            ExpressionAttributeNames: {
                "#username": "username",
            },
            ExpressionAttributeValues: {
                ":username": user.username,
            },
        };
        return await this.doc.put(params).promise().then((result) => {
            log.info("Successfully added user");
            return true;
        }).catch((err) => {
            log.debug("Failed to add user");
            log.error(err);
            return false;
        });
    }

    async  updateUser(user: User): Promise<boolean>{
        const params = {
            TableName: 'USER_TABLE',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set password = :password, availableR = :availableR, pendingR = :pendingR, awardedR = :awardedR',
            ExpressionAttributeValues: {
                ':password': user.password,
                ':availableR': user.availableR,
                ':pendingR': user.pendingR,
                ':awardedR': user.awardedR,
            },
            ReturnValues: 'UPDATED_NEW'
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

const userService = new UserService();
export default userService;
