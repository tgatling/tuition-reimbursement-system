import { useEffect } from 'react';
import {ReimbursementFormState} from '../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetForms } from '../other/thunks';
import {ReimbursementForm} from '../reimbursement/reimbursementForm';
import GradeDisplayComponent from './gradeDisplay.component';

// Benco tab to display all applications to confirm grades
function ConfirmGradeComponent() {
    const formSelector = (state: ReimbursementFormState) => state.forms;
    const forms = useSelector(formSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetForms());
    }, [dispatch]);
    

    
    return (
        <section>
            <br></br>
            <h3>Select the Application Id to continue: </h3>
            {forms.map((form: ReimbursementForm) => {
                return(
                    <GradeDisplayComponent key={'form-'+form.appId} formData={form}/>
                )
            })}
        </section>
        
    );
}
export default ConfirmGradeComponent;
