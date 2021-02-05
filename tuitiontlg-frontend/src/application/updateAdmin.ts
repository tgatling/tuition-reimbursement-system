import {User} from '../user/user';
import {Application} from './application';

// Update application application information after approval to determine who made the decision
function updateAdmin(user: User, stage: number, app: Application){
    // Direct Supervisor Approval
    if(stage === 2){
        if(user.jobTitle === 'Direct Supervisor / Department Head'){
            app.approval.directSupervisor = user.username;
            app.approval.departmentHead = user.username;
        } else if(user.jobTitle === 'Direct Supervisor'){
            app.approval.directSupervisor = user.username;
        }
    }

    // Department Head Approval
    if(stage === 3){
        if(user.jobTitle === 'Department Head'){
            app.approval.departmentHead = user.username;
        }
    }

    //Benefits Coordinator Approval
    if(stage === 4){
        if(user.jobTitle === 'Benefits Coordinator'){
            app.approval.benefitCoordinator = user.username;
        }
    }

    return app;
}

export default updateAdmin;