import * as Actions from './actions';
import {User} from '../user/user';
import {Application} from '../application/application';
import {ReimbursementForm} from '../reimbursement/reimbursementForm';
import {Message} from '../communication/message';

export interface UserState{
    user: User;
    loginUser: User;
}

export interface ApplicationState{
    applications: Application[];
    application: Application;
}

export interface ReimbursementFormState{
    forms: ReimbursementForm[];
    form: ReimbursementForm;
}

export interface MessageState{
    messages: Message[];
    message: Message;
}

export interface AppState extends UserState, ApplicationState, ReimbursementFormState, MessageState {}

const initialState: AppState = {
    user: new User(),
    loginUser: new User(),
    applications: [],
    application: new Application(),
    messages: [],
    message: new Message(),
    forms: [],
    form: new ReimbursementForm(),
}

const reducer = (state: AppState = initialState, action: Actions.AppAction): AppState => {
    console.log(action);
    const newState = {...state};

    switch (action.type){
        // USER
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.UserActions.ChangeUser:
            newState.user = action.payload as User;
            return newState;
        // APPLICATION
        case Actions.ApplicationActions.GetApplication:
            newState.application = action.payload as Application;
            return newState;
        case Actions.ApplicationActions.GetMyApplications:
            newState.applications = action.payload as Application[];
            return newState;
        case Actions.ApplicationActions.GetAllApplications:
            newState.applications = action.payload as Application[];
            return newState;
        case Actions.ApplicationActions.ChangeApplication:
            newState.application = action.payload as Application;
            return newState;
        // REIMBURSMENT FORM
        case Actions.ReimbursementFormActions.GetForm:
            newState.form = action.payload as ReimbursementForm;
            return newState;
        case Actions.ReimbursementFormActions.GetAllForms:
            newState.forms = action.payload as ReimbursementForm[];
            return newState;
        case Actions.ReimbursementFormActions.ChangeForm:
            newState.form = action.payload as ReimbursementForm;
            return newState;
        // MESSAGE
        case Actions.MessageActions.GetMessage:
            newState.message = action.payload as Message;
            return newState;
        case Actions.MessageActions.GetMyMessages:
            newState.messages = action.payload as Message[];
            return newState;
        case Actions.MessageActions.ChangeMessage:
            newState.message = action.payload as Message;
            return newState;
        default:
            return state;
    }
}
export default reducer;