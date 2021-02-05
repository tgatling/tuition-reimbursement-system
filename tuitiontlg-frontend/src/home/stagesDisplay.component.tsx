import React from 'react';

// Explaination for stages of the application process
function StageDisplayComponent(stage: number) {
    return (
        <div className='col stage-card border'>
            <div>
                <h5>Stages of the Reimbursement Process </h5>
                <p>
                    1: Submission | 2: Direct Sup. | 3: Dep. Head | 4: Benefits
                    Coord. | 5: Completion | 6: Grade Confirmation | 7:
                    Presentation Analysis | 8: Approval / Reimbursement | 9: Denial
                </p>
            </div>
        </div>
    );
}

export default StageDisplayComponent;
