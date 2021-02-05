import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps, useSelector} from 'react-redux';
import { Form, Col, Row } from 'react-bootstrap';
// Redux
import { ReimbursementFormState, UserState } from '../redux/reducer';
import { changeReimbursementForm } from '../redux/actions';
// RF
import reimbursementFormService from './reimbursementForm.service';
import { ReimbursementForm } from './reimbursementForm';
import GradingFormatComponent from '../home/gradingFormat.component';
import StageDisplayComponent from '../home/stagesDisplay.component';
import applicationService from '../application/application.service';
import updateAdmin from '../application/updateAdmin';
//Other
import '../home/home';
import {Application} from '../application/application';


const formProp = (state: ReimbursementFormState) => ({
    reimbursementForm: state.form,
});
const mapDispatch = {
    updateForm: (form: ReimbursementForm) => changeReimbursementForm(form),
};
const connector = connect(formProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Administrators submit decisions based on stage of application
function FormDecisionComponent(props: PropsFromRedux) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    let passerApp = new Application();
    

    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let fm: any = { ...props.reimbursementForm };
        fm[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateForm(fm);
    }

    function submitForm(decision: string) {
        reimbursementFormService
            .updateForm(props.reimbursementForm)
            .then(() => {
                props.updateForm(new ReimbursementForm());
            });
            alert('Submitted. Form Decision: '+decision);
            history.push('/message/new')
    }

    function acceptForm(){
        props.reimbursementForm.processId = (user.processId + 1);
        passerApp.appId = props.reimbursementForm.appId;
        passerApp.employee = props.reimbursementForm.username;
        applicationService.getApplication(passerApp).then((application)=>{
            application.processId= props.reimbursementForm.processId;
            let app = updateAdmin(user, props.reimbursementForm.processId, application);
            applicationService.updateApplication(app).then(()=>{});
        });
        submitForm('Accepted');
    }

    function declineForm(){
        props.reimbursementForm.processId = 9;
        passerApp.appId = props.reimbursementForm.appId;
        passerApp.employee = props.reimbursementForm.username;
        applicationService.getApplication(passerApp).then((application)=>{
            application.processId= props.reimbursementForm.processId;
            let app = updateAdmin(user, props.reimbursementForm.processId, application);
            applicationService.updateApplication(app).then(()=>{});
        });
        submitForm('Declined');
        
    }

    let sMonth = props.reimbursementForm.startMonth.toString();
    let sDate = props.reimbursementForm.startDate.toString();
    let sYear = props.reimbursementForm.startYear.toString();
    let tHour = props.reimbursementForm.timeHour.toString();
    let tMins = props.reimbursementForm.timeMins.toString();
    let price = props.reimbursementForm.cost.toString();

    return (
        <div>
            <br></br>
            {StageDisplayComponent(props.reimbursementForm.processId)}
            <br></br>
            <div className='col reimbursement card'>
                <br></br>

                <Form>
                    <Row>
                        <Col>
                            <h4>
                                <b>
                                    Application: {props.reimbursementForm.appId}
                                </b>
                            </h4>
                        </Col>
                        <Col>
                            <h4>
                                <b>
                                    Stage: {props.reimbursementForm.processId}
                                </b>
                            </h4>
                        </Col>
                    </Row>
                    <p>* disabled field</p>

                    <Form.Row>
                        <Col>
                            <Form.Control
                                disabled
                                name='firstName'
                                value={props.reimbursementForm.firstName}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                disabled
                                name='lastName'
                                value={props.reimbursementForm.lastName}
                                onChange={handleFormInput}
                            />
                        </Col>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                disabled
                                name='username'
                                value={props.reimbursementForm.username}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col></Col>
                    </Form.Row>

                    <br></br>
                    <h5>
                        <b>Event Information:</b>
                    </h5>
                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            disabled
                            name='description'
                            onChange={handleFormInput}
                            placeholder={props.reimbursementForm.description}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                disabled
                                name='location'
                                placeholder={props.reimbursementForm.location}
                                onChange={handleFormInput}
                            />
                        </Col>
                    </Form.Row>

                    <br></br>
                    <label>Start Date: </label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                disabled
                                type='text'
                                name='startMonth'
                                placeholder={sMonth}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                disabled
                                name='startDate'
                                placeholder={sDate}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                disabled
                                name='startYear'
                                placeholder={sYear}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col></Col>
                        <Col>
                            <Form.Control
                                disabled
                                type='text'
                                name='cost'
                                placeholder={price}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <p>
                                <b>*Cost does not include course materials</b>
                            </p>
                        </Col>
                    </Form.Row>

                    <br></br>
                    <label>Start Time: </label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                disabled
                                type='text'
                                name='timeHour'
                                placeholder={tHour}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                disabled
                                name='timeMins'
                                placeholder={tMins}
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='AM'
                                name='timeOfDay'
                                id='formHorizontalRadios1'
                                onChange={handleFormInput}
                            />
                            <Form.Check
                                type='radio'
                                label='PM'
                                name='timeOfDay'
                                id='formHorizontalRadios2'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Form.Row>

                    <br></br>
                    <Form.Row className='align-items-center'>
                        <Col xs='auto' className='my-1'>
                            <Form.Control
                                disabled
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                custom
                                name='typeOfEvent'
                                onChange={handleFormInput}
                            >
                                <option
                                    onChange={handleFormInput}
                                    value={props.reimbursementForm.typeOfEvent}
                                >
                                    {props.reimbursementForm.typeOfEvent}
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='University Course'
                                >
                                    University Course
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Seminar'
                                >
                                    Seminar
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Certification Preparation Class'
                                >
                                    Certification Preparation Class
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Certification'
                                >
                                    Certification
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Technical Training'
                                >
                                    Technical Training
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Other'
                                >
                                    Other
                                </option>
                            </Form.Control>
                        </Col>
                        <Col></Col>
                        <Col xs='auto' className='my-1'>
                            <Form.Control
                                disabled
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                custom
                                name='gradingFormat'
                                onChange={handleFormInput}
                            >
                                <option
                                    onChange={handleFormInput}
                                    value={
                                        props.reimbursementForm.gradingFormat
                                    }
                                >
                                    {props.reimbursementForm.gradingFormat}
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Pass/Fail'
                                >
                                    Pass/Fail
                                </option>
                                <option
                                    onChange={handleFormInput}
                                    value='Graded'
                                >
                                    Graded
                                </option>
                                <option onChange={handleFormInput} value='None'>
                                    None
                                </option>
                            </Form.Control>
                            </Col>
                        <Col>
                            <Form.Control
                                disabled
                                name='passingGrade'
                                placeholder={props.reimbursementForm.passingGrade}
                                onChange={handleFormInput}
                            />
                        </Col>{' '}
                        <Col>* Default Below</Col>
                    </Form.Row>

                    <br></br>
                    <h5>
                        <b>Work Relation:</b>
                    </h5>
                    <Form.Group controlId='workJustification'>
                        <Form.Label>Work Justification: *</Form.Label>
                        <Form.Control
                            disabled
                            as='textarea'
                            rows={3}
                            name='workJustification'
                            placeholder={
                                props.reimbursementForm.workJustification
                            }
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group controlId='missedWork'>
                        <Form.Label>Work Expected to be Missed:</Form.Label>
                        <Form.Control
                            disabled
                            as='textarea'
                            rows={3}
                            name='missedWork'
                            placeholder={props.reimbursementForm.missedWork}
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.File
                            disabled
                            name='approvalAttachment'
                            id={'approvals' + props.reimbursementForm.appId}
                            label={
                                'Approval Attatchment: ' +
                                props.reimbursementForm.approvalAttachment
                            }
                            onChange={handleFormInput}
                        />
                        <br></br>
                        <Form.File
                            disabled
                            name='eventAttachment'
                            id={'approvals' + props.reimbursementForm.appId}
                            label={
                                'Event Attatchment: ' +
                                props.reimbursementForm.eventAttachment
                            }
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                </Form>
            </div>
            <br></br>
            {user.processId >= props.reimbursementForm.processId && (
                <div>
                <br></br>
                <button type='button' className='btn btn-outline-success' onClick={acceptForm}>
                    ACCEPT
                </button>
                <button
                    type='button'
                    className='btn btn-outline-danger tab'
                    onClick={declineForm}
                >
                    DECLINE
                </button>
            </div>
            )}

            <br></br>
            <br></br>
            <GradingFormatComponent />
        </div>
    );
}

export default connector(FormDecisionComponent);
