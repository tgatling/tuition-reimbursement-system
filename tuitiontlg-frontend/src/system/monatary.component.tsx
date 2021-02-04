import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Form, Col} from 'react-bootstrap';
import '../home/home';
import { UserState } from '../redux/reducer';
import { changeUser } from '../redux/actions';
import { User } from '../user/user';

const userProp = (state: UserState) => ({
    user: state.user,
});
const mapDispatch = {
    updateUser: (user: User) => changeUser(user),
};
const connector = connect(userProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MonetaryComponent(props: PropsFromRedux) {
    
    return (
        <div>
            <Form>
                <h5><b>Current Reimbursement Availability</b></h5>
                <br></br>
                
                <Form.Row>
                    <Col>
                        <Form.Label>Available</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>Total</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>Pending</Form.Label>
                    </Col>
                    <Col>
                        <Form.Label>Awarded</Form.Label>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col>
                        <Form.Control
                            disabled
                            name='availableR'
                            value={props.user.availableR}
                        />
                    </Col>
                    <p><b>=</b></p>
                    <Col>
                        <Form.Control
                            disabled
                            name='totalR'
                            value={props.user.totalR}
                        />
                    </Col>
                    <p><b>-</b></p>
                    <Col>
                        <Form.Control
                            disabled
                            name='pendingR'
                            value={props.user.pendingR}
                        />
                    </Col>
                    <p><b>-</b></p>
                    <Col>
                        <Form.Control
                            disabled
                            name='awardedR'
                            value={props.user.awardedR}
                        />
                    </Col>
                </Form.Row>
            </Form>
            <br></br>
        </div>
    );
}

export default connector(MonetaryComponent);
