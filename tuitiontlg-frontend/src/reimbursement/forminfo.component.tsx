import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StageDisplayComponent from '../home/stagesDisplay.component';
import reimbursementFormService from '../reimbursement/reimbursementForm.service';
import myService from '../reimbursement/my.service';
import applicationService from '../application/application.service';
import {
    ReimbursementFormState,
    UserState,
    ApplicationState,
} from '../redux/reducer';
import { changeReimbursementForm, changeApplication } from '../redux/actions';
import { Application } from '../application/application';
import { ReimbursementForm } from './reimbursementForm';
import '../home/home.css';
import { Col, Form, Row } from 'react-bootstrap';

interface formProp {
    match: any;
}

// Information displayed from reimbursement form
function FormInfoComponent(prop: formProp) {
    const formSelector = (state: ReimbursementFormState) => state.form;
    const userSelector = (state: UserState) => state.user;
    const applicationSelector = (state: ApplicationState) => state.application;

    const form = useSelector(formSelector);
    const user = useSelector(userSelector);
    const application = useSelector(applicationSelector);

    const dispatch = useDispatch();
    const history = useHistory();

    if(user.jobTitle === 'N/A'){
        history.push('/');
    }


    useEffect(() => {
        reimbursementFormService
            .getForm(prop.match.params.id)
            .then((returnform) =>
                dispatch(changeReimbursementForm(returnform))
            );
    }, [dispatch, prop.match.params.id]);


    function handleDelete() {
        applicationService.deleteApplication(application).then(() => {
            dispatch(changeApplication(new Application()));
        });
        myService.deleteForm(form).then(() => {
            dispatch(changeReimbursementForm(new ReimbursementForm()));
            history.push('/myapplications');
        });
    }

    return (
        <div>
            <br></br>
            {StageDisplayComponent(form.processId)}
            <br></br>
            <Row>
                <Col>
                    <h4>
                        <b>Application: {form.appId}</b>
                    </h4>
                </Col>
                <Col>
                    <h4>
                        <b>Stage: {form.processId}</b>
                    </h4>
                </Col>
            </Row>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col' className=''></th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>First Name: </th>
                        <td className='firstName' key={'emp-' + form.appId}>
                            {form.firstName}
                        </td>
                    </tr>
                    <tr>
                        <th>Last Name: </th>
                        <td className='employee' key={'emp-' + form.appId}>
                            {form.lastName}
                        </td>
                    </tr>
                    <tr>
                        <th>Username: </th>
                        <td className='employee' key={'emp-' + form.appId}>
                            {form.username}
                        </td>
                    </tr>
                    <tr>
                        <th>Start Date: </th>
                        <td className='startdate' key={'stdate-' + form.appId}>
                            {form.startMonth}/{form.startDate}/{form.startYear}
                        </td>
                    </tr>
                    <tr>
                        <th>Time: </th>
                        <td className='time' key={'time-' + form.appId}>
                            {form.timeHour}:{form.timeMins} {form.timeOfDay}
                        </td>
                    </tr>
                    <tr>
                        <th>Location: </th>
                        <td className='location' key={'local-' + form.appId}>
                            {form.location}
                        </td>
                    </tr>
                    <tr>
                        <th>Description: </th>
                        <td className='description' key={'desc-' + form.appId}>
                            {form.description}
                        </td>
                    </tr>
                    <tr>
                        <th>Cost: </th>
                        <td className='cost' key={'cost-' + form.appId}>
                            {form.cost}
                        </td>
                    </tr>
                    <tr>
                        <th>Grading Format: </th>
                        <td className='format' key={'format-' + form.appId}>
                            {form.gradingFormat}
                        </td>
                    </tr>
                    <tr>
                        <th>Passing Grade: </th>
                        <td className='format' key={'format-' + form.appId}>
                            {form.passingGrade}
                        </td>
                    </tr>
                    <tr>
                        <th>Event Type: </th>
                        <td className='eventtype' key={'type-' + form.appId}>
                            {form.typeOfEvent}
                        </td>
                    </tr>
                    <tr>
                        <th>Work Justification: </th>
                        <td
                            className='justification'
                            key={'just-' + form.appId}
                        >
                            {form.workJustification}
                        </td>
                    </tr>
                    <tr>
                        <th>Missed Work: </th>
                        <td className='missedwork' key={'miss-' + form.appId}>
                            {form.missedWork}
                        </td>
                    </tr>
                    <tr>
                        <th className='text-danger'>
                            Estimated Reimbursement:{' '}
                        </th>
                        <th className='text-danger' key={'calc-' + form.appId}>
                            {form.calculation}
                        </th>
                    </tr>
                </tbody>
            </table>

            <br></br>
            <h5>Attachments:</h5>
            <br></br>
            <Row>
                <Col>
                    <p>Approval Attatchment: </p>
                    {form.approvalAttachment}
                    <br></br>
                </Col>
                <Col className='tab'>
                    <p>Event Attatchment: </p>
                    {form.eventAttachment}
                    <br></br>
                </Col>
                <Col>
                    <p>Grade/Presentation Attatchment: </p>
                    {form.finalAttachment}
                </Col>
            </Row>

            {user.admin === true && form.processId <= user.processId && (
                <div>
                    <br></br>
                    <Link
                        className='btn btn-success'
                        to={'/applications/' + form.appId + '/process'}
                    >
                        MAKE DECISION
                    </Link>
                </div>
            )}

            {form.processId === 5 && user.processId === 4 && (
                <div>
                    <br></br>
                    <Link
                        className='btn btn-success'
                        to={'/applications/' + form.appId + '/confirm'}
                    >
                        CONFIRM GRADE
                    </Link>
                </div>
            )}

            {user.admin === false && (
                <div>
                    <br></br>
                    <Link
                        className='btn btn-success'
                        to={'/applications/' + form.appId + '/changes'}
                    >
                        EDIT
                    </Link>
                    <button
                        type='button'
                        className='btn btn-danger tab'
                        onClick={handleDelete}
                    >
                        DELETE
                    </button>
                </div>
            )}
            <br></br>
        </div>
    );
}
export default FormInfoComponent;
