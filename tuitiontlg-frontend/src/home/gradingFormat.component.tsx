import React from "react";

import "./home";

function GradingFormatComponent(){

    return(
        <div>
                        <h5><b>Grading Format</b></h5>

            <p>
                When applying for reimbursement, you must select how you are graded during the type of
                event that you have attending.  The table below provides details that will help you choose
                the correct option.  You can also submit details for particular events in the attachments
                or explain in the description how completion or grading is determined.  <i>Certain event types, such
                as those without a grading scale, may require presentations to management to determine reimbursement.</i>  If 
                you have any questions contact us by sending a message using the link above.
            </p>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Grade</th>
                        <th scope='col'>Pass/Fail</th>
                        <th scope='col'>Presentation Required</th>
                        <th scope='col'>Reimbursement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >
                            Event
                        </td>
                        <td>
                            Pass
                        </td>
                        <td>
                            No
                        </td>
                        <td>
                            Yes
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Credit-Only: Fail
                        </td>
                        <td>
                            Fail
                        </td>
                        <td>
                            No
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Graded: A+ to C-
                        </td>
                        <td>
                            Pass
                        </td>
                        <td>
                            No
                        </td>
                        <td>
                            Yes
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Graded: D to F
                        </td>
                        <td>
                            Fail
                        </td>
                        <td>
                            No
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            None
                        </td>
                        <td>
                            N/A
                        </td>
                        <td>
                            Yes
                        </td>
                        <td>
                            * Will be determined
                        </td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Event Type</th>
                        <th scope='col'>Presentation Required</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td >
                            University Course
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Seminar
                        </td>
                        <td>
                            Yes
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Certification Preparation Course
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Certification
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Technical Training
                        </td>
                        <td>
                            No
                        </td>
                    </tr>
                    <tr>
                        <td >
                            Other
                        </td>
                        <td>
                            Yes
                        </td>
                    </tr>
                </tbody>
            </table>
            <h4 className='text-danger'>*Without proof of passing grade, a presentation will be required</h4>
            <br></br>
            <br></br>
        </div>
    )
}
export default GradingFormatComponent;
