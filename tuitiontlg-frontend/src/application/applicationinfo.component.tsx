import { useHistory } from 'react-router-dom';

import { Application } from './application';

interface appProp {
    appData: Application;
}

function ApplicationInfoComponent(prop: appProp) {
    const history = useHistory();

    function goToApplication() {
        history.push('/form/' + prop.appData.appId);
    }

    return (
        <div>
            <div className='col border app-card'>
                <div>
                    <br></br>
                    <button
                        className='btn btn-success'
                        key={'id' + prop.appData.appId}
                        onClick={goToApplication}
                    >
                        Application: {prop.appData.appId}
                    </button>
                    <br></br>
                    <br></br>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Employee</th>
                                <th scope='col'>Date Submitted</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Amount Granted</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className='employee'
                                    key={'emp-' + prop.appData.appId}
                                >
                                    {prop.appData.employee}
                                </td>
                                <td
                                    className='submitdates'
                                    key={'sdate-' + prop.appData.appId}
                                >
                                    {prop.appData.submitMonth}/
                                    {prop.appData.submitDate}/
                                    {prop.appData.submitYear}
                                </td>
                                <td
                                    className='status'
                                    key={'stat-' + prop.appData.appId}
                                >
                                    {prop.appData.status}
                                </td>
                                <td
                                    className='amountgranted'
                                    key={'amt-' + prop.appData.appId}
                                >
                                    {prop.appData.amountGranted}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>
                        <b>Approval Decisions</b>
                    </h5>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Direct Supervisor</th>
                                <th scope='col'>Department Head</th>
                                <th scope='col'>Benefit Coordinator</th>
                                <th scope='col'>Stage</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className='dirsup'
                                    key={'dirsupapp-' + prop.appData.appId}
                                >
                                    {prop.appData.approval.directSupervisor}
                                </td>
                                <td
                                    className='dephead'
                                    key={'depheadapp-' + prop.appData.appId}
                                >
                                    {prop.appData.approval.departmentHead}
                                </td>
                                <td
                                    className='benco'
                                    key={'bencoapp-' + prop.appData.appId}
                                >
                                    {prop.appData.approval.benefitCoordinator}
                                </td>
                                <td
                                    className='stage'
                                    key={'stage-' + prop.appData.appId}
                                >
                                    {prop.appData.processId}
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
export default ApplicationInfoComponent;
