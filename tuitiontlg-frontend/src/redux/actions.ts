import {User} from '../user/user';
import {Application} from '../application/application';
import {ReimbursementForm} from '../reimbursement/reimbursementForm';
import {Message} from '../communication/message';

export enum UserActions{
    GetUser = 'GET_USER',
    LoginChange = 'LOGIN_CHANGE',
    ChangeUser = 'CHANGE_USER'
}

export enum ApplicationActions {
    GetApplication = 'GET_APPLICATION',
    GetMyApplications = 'GET_MY_APPLICATIONS',
    GetAllApplications = 'GET_ALL_APPLICATIONS',
    ChangeApplication = 'CHANGE_APPLICATION'
}

export enum ReimbursementFormActions{
    GetForm = 'GET_FORM',
    GetAllForms = 'GET_ALL_FORMS',
    ChangeForm = 'CHANGE_FORM'
}

export enum MessageActions{
    GetMessage = 'GET_MESSAGE',
    GetMyMessages = 'GET_MY_MESSAGES',
    ChangeMessage = 'CHANGE_MESSAGE'
}

// INTERFACES

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction extends AppAction {
    type: UserActions;
    payload: User;
}

export interface ApplicationAction extends AppAction {
    type: ApplicationActions;
    payload: Application | Application[];
}

export interface ReimbursementFormAction extends AppAction {
    type: ReimbursementFormActions;
    payload: ReimbursementForm | ReimbursementForm[];
}

export interface MessageAction extends AppAction {
    type: MessageActions;
    payload: Message | Message[];
}

// USER ACTION
export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}

export function loginAction(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.LoginChange,
        payload: user
    }
    return action;
}

export function changeUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.ChangeUser,
        payload: user
    }
    return action;
}

// APPLICATION ACTION
export function getApplication(message: Message): MessageAction {
    const action: MessageAction = {
        type: MessageActions.GetMessage,
        payload: message
    }
    return action;
}

export function getMyApplications(applications: Application[]): ApplicationAction{
    const action: ApplicationAction = {
        type: ApplicationActions.GetMyApplications,
        payload: applications
    }
    return action;
}

export function getAllApplications(applications: Application[]): ApplicationAction {
    const action: ApplicationAction = {
        type: ApplicationActions.GetAllApplications,
        payload: applications
    }
    return action;
}

export function changeApplication(application: Application): ApplicationAction {
    const action: ApplicationAction = {
        type: ApplicationActions.ChangeApplication,
        payload: application
    }
    return action;
}

// REIMBURSEMENT FORM ACTION
export function getReimbursementForm(form: ReimbursementForm): ReimbursementFormAction {
    const action: ReimbursementFormAction = {
        type: ReimbursementFormActions.GetForm,
        payload: form
    }
    return action;
}

export function getAllReimbursementForms(forms: ReimbursementForm[]): ReimbursementFormAction {
    const action: ReimbursementFormAction = {
        type: ReimbursementFormActions.GetAllForms,
        payload: forms
    }
    return action;
}

export function changeReimbursementForm(form: ReimbursementForm): ReimbursementFormAction {
    const action: ReimbursementFormAction = {
        type: ReimbursementFormActions.ChangeForm,
        payload: form
    }
    return action;
}

// MESSAGE ACTION
export function getMessage(message: Message): MessageAction {
    const action: MessageAction = {
        type: MessageActions.GetMessage,
        payload: message
    }
    return action;
}

export function getMyMessages(messages: Message[]): MessageAction{
    const action: MessageAction = {
        type: MessageActions.GetMyMessages,
        payload: messages
    }
    return action;
}

export function changeMessage(message: Message): MessageAction {
    const action: MessageAction = {
        type: MessageActions.ChangeMessage,
        payload: message
    }
    return action;
}