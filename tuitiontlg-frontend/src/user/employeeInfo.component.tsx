import React from 'react';
import { useSelector } from 'react-redux';

import { UserState } from '../redux/reducer';
import '../home/home.css';
import EmpRInfoComponent from './empRInfo.component';
import { Link } from 'react-router-dom';

function EmployeeInfoComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    return (
        <div>
            <br></br>
            <h4>Account Information: </h4>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col' className=''></th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Username: </th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Password: </th>
                        <td>
                            <i>
                                <Link className='text-success' to={'/pwdchg'}>
                                    Change Password
                                </Link>
                            </i>
                        </td>
                    </tr>
                    <tr>
                        <th>Job Title: </th>
                        <td>{user.jobTitle}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            {user.admin === false && <EmpRInfoComponent />}
        </div>
    );
}

export default EmployeeInfoComponent;
