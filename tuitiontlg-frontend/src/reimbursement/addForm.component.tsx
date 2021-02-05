import React, { SyntheticEvent, useState } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Form, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../home/home';
// Redux
import { ReimbursementFormState, UserState } from '../redux/reducer';
import { changeReimbursementForm } from '../redux/actions';
// RF
import reimbursementFormService from './reimbursementForm.service';
import { ReimbursementForm } from './reimbursementForm';
import { Application } from '../application/application';
import applicationService from '../application/application.service';
// Calculations and Grading
import GradingFormatComponent from '../home/gradingFormat.component';
import MonetaryComponent from '../system/monatary.component';
import determineCov from './determineCov';
import userService from '../user/user.service';

const formProp = (state: ReimbursementFormState) => ({
    reimbursementForm: state.form,
});

const mapDispatch = {
    updateForm: (form: ReimbursementForm) => changeReimbursementForm(form),
};
const connector = connect(formProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Submit a reimbursement form
function AddFormComponent(props: PropsFromRedux) {
    const [validated, setValidated] = useState(false);
    let userSelector = (state: UserState) => state.user;
    let user = useSelector(userSelector);
    let history = useHistory();
    let date = new Date();

    function handleFormInput(e: SyntheticEvent) {
        let fm: any = { ...props.reimbursementForm };
        fm[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateForm(fm);
    }

    function submitForm() {
        props.reimbursementForm.processId++;
        createNewApp();
        calculate();
        reimbursementFormService.addForm(props.reimbursementForm).then(() => {
            props.updateForm(new ReimbursementForm());
        });
        alert('Form Submitted');
        history.push('/myapplications');
    }

    function createNewApp() {
        let newApp = new Application();
        if (props.reimbursementForm.appId !== undefined) {
            newApp.appId = props.reimbursementForm.appId;
            newApp.employee = props.reimbursementForm.username;
            let month = date.getMonth();
            newApp.submitMonth = month++;
            newApp.submitDate = date.getDate();
            newApp.submitYear = date.getFullYear();
        }
        applicationService.addApplication(newApp).then(() => {
        });
    }

    function calculate() {
        let cost = determineCov(
            props.reimbursementForm.typeOfEvent,
            props.reimbursementForm.cost,
            user.availableR
        );
        if (cost !== undefined) {
            user.pendingR = user.pendingR + cost;
            user.availableR = user.totalR - user.pendingR - user.awardedR;
        }
        userService.updateUser(user);
        props.reimbursementForm.calculation = cost;

    }

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            submitForm();
        }
        setValidated(true);
    };

    return (
        <div>
            <br></br>
            <MonetaryComponent />
            <div className='col reimbursement card'>
                <br></br>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <br></br>
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
                    <Form.Row>
                        <Col>
                            <p>* required field</p>
                        </Col>
                        <Col></Col>
                    </Form.Row>

                    <Form.Row>
                        <Col>
                            <Form.Control
                                required
                                name='firstName'
                                placeholder='First name *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                name='lastName'
                                placeholder='Last name *'
                                onChange={handleFormInput}
                            />
                        </Col>
                    </Form.Row>
                    <br></br>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                required
                                name='username'
                                placeholder='Username'
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
                            required
                            name='description'
                            onChange={handleFormInput}
                            placeholder={`Please include any necessary details that will help with during the decision process.  This may include information regarding the type of event, grading or completion, cost, or any other details about the event itself.`}
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                required
                                name='location'
                                placeholder='Location *'
                                onChange={handleFormInput}
                            />
                        </Col>
                    </Form.Row>

                    <br></br>
                    <label>Start Date: </label>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                required
                                type='text'
                                name='startMonth'
                                placeholder='Month *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                name='startDate'
                                placeholder='Date *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                name='startYear'
                                placeholder='Year *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col></Col>
                        <Col>
                            <Form.Control
                                required
                                type='text'
                                name='cost'
                                placeholder='$ Cost *'
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
                                required
                                type='text'
                                name='timeHour'
                                placeholder='Hour *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                required
                                name='timeMins'
                                placeholder='Minutes *'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Check
                                    required
                                    type='radio'
                                    label='AM'
                                    name='timeOfDay'
                                    id='formHorizontalRadios1'
                                    value='AM'
                                    onChange={handleFormInput}
                                />
                                <Form.Check
                                    type='radio'
                                    label='PM'
                                    name='timeOfDay'
                                    id='formHorizontalRadios2'
                                    value='PM'
                                    onChange={handleFormInput}
                                />
                            </Form.Group>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Form.Row>

                    <br></br>
                    <Form.Row className='align-items-center'>
                        <Col xs='auto' className='my-1'>
                            <Form.Control
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                required
                                custom
                                name='typeOfEvent'
                                onChange={handleFormInput}
                            >
                                <option
                                    onChange={handleFormInput}
                                    value='Choose...'
                                >
                                    Choose Event Type *
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
                                required
                                as='select'
                                className='mr-sm-2'
                                id='inlineFormCustomSelect'
                                custom
                                name='gradingFormat'
                                onChange={handleFormInput}
                            >
                                <option
                                    onChange={handleFormInput}
                                    value='Choose...'
                                >
                                    Choose Grading Format *
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
                                required
                                name='passingGrade'
                                placeholder='Passing Grade'
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
                            required
                            as='textarea'
                            rows={3}
                            name='workJustification'
                            placeholder='Explain how this is related to your work and how will help you reach your career goals.'
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group controlId='missedWork'>
                        <Form.Label>Work Expected to be Missed:</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='missedWork'
                            placeholder='List any work that will be missed as a result of this event.'
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.File
                                name='approvalAttachment'
                                id={'approvals' + props.reimbursementForm.appId}
                                label='Approval Attatchment:'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <Form.File
                                name='eventAttachment'
                                id={'events' + props.reimbursementForm.appId}
                                label='Event Attatchment:'
                                onChange={handleFormInput}
                            />
                        </Col>
                        <Col>
                            <p></p>
                            <button className='btn btn-success'>SUBMIT</button>
                        </Col>
                    </Form.Row>
                    <br></br>
                </Form>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <GradingFormatComponent />
        </div>
    );
}

export default connector(AddFormComponent);
