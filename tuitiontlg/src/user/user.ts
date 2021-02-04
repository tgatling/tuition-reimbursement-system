import userService from './user.service';
import log from '../log';

export class User{
    public username: string = '';
    public password: string = '';
    public jobTitle?: string = 'None';
    public processId?: number = 0;
    public admin?: boolean = false;
    public access?: string = 'denied';
    public availableR?: number = 1000;
    public totalR?: number = 1000;
    public pendingR?: number = 0;
    public awardedR?: number = 0;
    
}

let allUsers: User[] = [];

// Register new user account
export function registerUser(username: string, password: string) {
    log.trace('Register User');
    let registeringUser = new User();
    registeringUser.username = username;
    registeringUser.password = password;

    userService.addUser(registeringUser).then((userAdded) => {
        log.debug('User Added:', userAdded)
        if (userAdded) {
            log.info('User has been registered.')
            //TODO: USER HAS BEEN REGISTERED.  EMPLOYEE LOGIN SCREEN? NEXT?
        } else {
            log.info('User already exists.')
            //TODO: USER IS ALREADY REGISTERED. MESSAGE?
        }
    });
}

// Login checks to see if username and password match.
export async function login(username: string, password: string): Promise<User | null> {
    log.trace('Login Function');
    log.debug(`Username: ${username}, Password: ${password}`);
    return await userService.getUserByName(username).then((loggedUser) => {
        if (loggedUser && loggedUser.password === password) {
            log.info('loggedUser: ', loggedUser);
            return loggedUser;
        } else {
            return null;
        }
    });
}

// Check for the job title of user.
export async function checkJobTitle(username: string) {
    log.trace('Check Job Title Function');
    return await userService.getUserByName(username).then((user) => {
        if (user != null) {
            log.info('Job Title: ', user.jobTitle);
            return user.jobTitle;
        } else {
            log.debug('User does not exist');
            return null;
        }
    });
}

// LOGOUT - Leaves employee page and goes back to homescreen/login
export function logout() {
    log.trace('Logout Function');
    log.info('User has logged out.');
    //TODO: WHAT TO DO WHEN USER LOGS OUT? HOMEPAGE?
}