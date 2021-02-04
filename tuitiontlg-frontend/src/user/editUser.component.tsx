import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Col, Button } from 'react-bootstrap';
import '../home/home';
import { UserState } from '../redux/reducer';
import { changeUser } from '../redux/actions';
import userService from './user.service';
import { User } from './user';

const userProp = (state: UserState) => ({
    user: state.user,
});
const mapDispatch = {
    updateUser: (user: User) => changeUser(user),
};
const connector = connect(userProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function EditUserComponent(props: PropsFromRedux) {
    console.log('Edit User', props.user);

    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...props.user };
        u[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateUser(u);
    }

    function submitForm() {
        userService.updateUser(props.user).then(() => {
            console.log('submitForm: ');
            console.log(props.user);
            props.updateUser(new User());
            history.push('/');
        });
    }

    return (
        <div>
            <Form>
                <Form.Row>
                    <Col>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            disabled
                            name='username'
                            value={props.user.username}
                            onChange={handleFormInput}
                        />
                    </Col>
                    <Col>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name='password'
                                type='password'
                                placeholder='Password'
                                onChange={handleFormInput}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Button className='btn btn-danger' onClick={submitForm}>
                    Change
                </Button>
            </Form>
        </div>
    );
}

export default connector(EditUserComponent);
