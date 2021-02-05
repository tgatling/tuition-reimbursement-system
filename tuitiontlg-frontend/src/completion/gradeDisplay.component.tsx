import { useHistory } from 'react-router-dom';

import { ReimbursementForm } from '../reimbursement/reimbursementForm';

interface formProp{
    formData: ReimbursementForm;
}

// Display for confirming grades tab for BenCo
// Buttons to determine which application have reached grade confirmation stage
function GradeDisplayComponent(prop: formProp) {


    const history = useHistory();
    

    function goToApplication() {
        history.push('/form/' + prop.formData.appId);
    }

    return (
        <div>
        <div className='col border app-card'>
            <div>
            <br></br>
            {prop.formData.processId === 5 &&(
                <button className='btn btn-danger' key={'id'+prop.formData.appId} onClick={goToApplication}>
                Application: {prop.formData.appId}
                </button>
            )}
            {prop.formData.processId !== 5 &&(
                <button className='btn btn-success' key={'id'+prop.formData.appId} onClick={goToApplication}>
                Application: {prop.formData.appId}
            </button>
            )}
            
            <br></br><br></br>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Employee</th>
                        <th scope='col'>Start Date</th>
                        <th scope='col'>Stage</th>
                        <th scope='col'>Grade Decision</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='employee' key = {'emp-'+prop.formData.appId}>{prop.formData.username}</td>
                        <td className='startdate' key = {'sdate-'+prop.formData.appId}>
                            {prop.formData.startMonth}/
                            {prop.formData.startDate}/
                            {prop.formData.startYear}
                        </td>
                        <td className='processId' key={'stat-'+prop.formData.appId}>{prop.formData.processId}</td>
                        <td className='gradeConfirmed' key={'amt-'+prop.formData.appId}>
                            {prop.formData.gradeDecision}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>         
            <br></br>
        </div>
        <br></br>
        </div>
    );
}
export default GradeDisplayComponent;
