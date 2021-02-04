import {AppState, ReimbursementFormState} from '../redux/reducer';
import {AppAction, getAllApplications, ReimbursementFormAction, getAllReimbursementForms} from '../redux/actions';
import {ThunkAction} from 'redux-thunk';
import applicationService from '../application/application.service';
import reimbursementFormService from '../reimbursement/reimbursementForm.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AppAction>;
export type FormThunk<ReturnType = void> = ThunkAction<ReturnType, ReimbursementFormState, unknown, ReimbursementFormAction>;


export const thunkGetApplications = (): AppThunk => async dispatch => {
    const asyncResp = await applicationService.getAllApplications();
    dispatch(getAllApplications(asyncResp));
}

export const thunkGetForms = (): AppThunk => async dispatch => {
    const asyncResp = await reimbursementFormService.getAllForms();
    dispatch(getAllReimbursementForms(asyncResp));
}