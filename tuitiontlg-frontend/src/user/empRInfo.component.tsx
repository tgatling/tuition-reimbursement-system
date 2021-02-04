import React from "react";
import { useSelector } from "react-redux";

import { UserState } from "../redux/reducer";
import "../home/home.css";

function EmpRInfoComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    return (
        <div>
            <br></br>
            <h4>Reimbursement Information: </h4>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col' className=''></th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Total Eligibility: </th>
                        <td>${user.totalR}</td>
                    </tr>
                    <tr>
                        <th>Pending Amount: </th>
                        <td>${user.pendingR}</td>
                    </tr>
                    <tr>
                        <th>Awarded Amount: </th>
                        <td>${user.awardedR}</td>
                    </tr>
                    <tr>
                        <th>Available Amount: </th>
                        <td>${user.availableR}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default EmpRInfoComponent;
