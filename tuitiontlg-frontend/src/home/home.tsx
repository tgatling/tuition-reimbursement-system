import React from "react";
import { useHistory } from "react-router-dom";
import PercentDisplayComponent from './percentDisplay.component';

function HomeComponent() {
    const history = useHistory();


    function goToGrading() {
        history.push("/grading");
    }

    return (
        <>
            <div>
                <div className='card bg-light'>
                    <div className='card-body'>
                        <p>
                            For many years, Visionary has been helping our
                            employees further their careers by offering tuition
                            reimbursement. Each employee is allowed to claim up
                            to $1000 in tuition reimbursement a year. Take
                            advantage of the opportunity by logging in and
                            submitting your application today.
                        </p>
                        <PercentDisplayComponent/>
                    </div>
                </div>
                <br></br>
                <button
                    type='button'
                    className='btn btn-outline-success'
                    onClick={goToGrading}
                >
                    View Grading Details
                </button>
            </div>
        </>
    );
}

export default HomeComponent;
