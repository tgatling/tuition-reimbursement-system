import { useEffect } from 'react';
import { ApplicationState} from '../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';

import ApplicationInfoComponent from './applicationinfo.component';
import { thunkGetApplications } from '../other/thunks';

function ApplicationComponent() {
    const applicationSelector = (state: ApplicationState) => state.applications;
    const applications = useSelector(applicationSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetApplications());
    }, [dispatch]);
    

    
    return (
        <section>
            <br></br>
            <h3>Select the Application Id to continue: </h3>
            {applications.map((app) => {
                return(
                    <ApplicationInfoComponent key={'app-'+app.appId} appData={app}/>
                )
            })}
        </section>
        
    );
}
export default ApplicationComponent;
