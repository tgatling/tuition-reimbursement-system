import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Form, Col, Row } from 'react-bootstrap';
// Redux
import { ReimbursementFormState, UserState } from '../redux/reducer';
import { changeReimbursementForm } from '../redux/actions';
// RF
import reimbursementFormService from '../reimbursement/reimbursementForm.service';
import { ReimbursementForm } from '../reimbursement/reimbursementForm';
//Other
import '../home/home';
import GradingFormatComponent from '../home/gradingFormat.component';
import StageDisplayComponent from '../home/stagesDisplay.component';
import applicationService from '../application/application.service';
import {Application} from '../application/application';

const formProp = (state: ReimbursementFormState) => ({
    reimbursementForm: state.form,
});
const mapDispatch = {
    updateForm: (form: ReimbursementForm) => changeReimbursementForm(form),
};
const connector = connect(formProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function GradeDecisionComponent(props: PropsFromRedux) {
    let userSelector = (state: UserState) => state.user;
    let user = useSelector(userSelector);
    let passerApp = new Application();

    const history = useHistory();
    
    if(user.jobTitle === 'N/A'){
        history.push('/');
    }

    function handleFormInput(e: SyntheticEvent) {
        let fm: any = { ...props.reimbursementForm };
        fm[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateForm(fm);
    }

    function submitForm() {
        props.reimbursementForm.processId++
        reimbursementFormService
            .updateForm(props.reimbursementForm)
            .then(() => {
                props.updateForm(new ReimbursementForm());
                history.push('/message/new');
            });
    }

    function passing() {
        props.reimbursementForm.processId = 8;
        props.reimbursementForm.gradeDecision = 'Passing';
        passerApp.appId = props.reimbursementForm.appId;
        passerApp.employee = props.reimbursementForm.username;
        applicationService.getApplication(passerApp).then((application)=>{
            application.status = 'Approved';
            application.processId= props.reimbursementForm.processId;
            applicationService.updateApplication(application).then(()=>{});
        });
        submitForm();
    }

    function failing() {
        props.reimbursementForm.processId = 9;
        props.reimbursementForm.gradeDecision = 'Failing';
        passerApp.appId = props.reimbursementForm.appId;
        passerApp.employee = props.reimbursementForm.username;
        applicationService.getApplication(passerApp).then((application)=>{
            application.status = 'Denied';
            application.processId= props.reimbursementForm.processId;
            applicationService.updateApplication(application).then(()=>{});
        });
        submitForm();
    }

    

    let sMonth = props.reimbursementForm.startMonth.toString();
    let sDate = props.reimbursementForm.startDate.toString();
    let sYear = props.reimbursementForm.startYear.toString();

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
                    <p>* required field</p>

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
                            </Form.Control>
                        </Col>
                        <Col></Col>
                    </Form.Row>
                    <br></br>
                    <Form.Row className='align-items-center'>
                        <Col>
                            <Form.File
                                disabled
                                name='finalAttachment'
                                id={
                                    'confirmation' +
                                    props.reimbursementForm.appId
                                }
                                label={
                                    'Grade/Presentation Attatchment: ' +
                                    props.reimbursementForm.finalAttachment
                                }
                                onChange={handleFormInput}
                            />
                        </Col>
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
                                placeholder={
                                    props.reimbursementForm.passingGrade
                                }
                                onChange={handleFormInput}
                            />
                        </Col>{' '}
                        <Col></Col>
                    </Form.Row>
                    <br></br>
                </Form>
            </div>
            <br></br>
            {props.reimbursementForm.processId === 5 && (
                <div>
                    <br></br>
                    <Row>
                        <button
                            
                            type='button'
                            className='btn btn-outline-success tab'
                            onClick={passing}
                        >
                            PASSING
                        </button>
                        <br></br>
                        <button
                            
                            type='button'
                            className='btn btn-outline-danger tab'
                            onClick={failing}
                        >
                            FAILING
                        </button>
                    </Row>
                </div>
            )}

            <br></br>
            <br></br>
            <GradingFormatComponent />
        </div>
    );
}

export default connector(GradeDecisionComponent);
