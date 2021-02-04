import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import individualService from '../application/individual.service';
import {ApplicationState, UserState } from '../redux/reducer';
import { getMyApplications } from '../redux/actions';
import ApplicationInfoComponent from './applicationinfo.component';
import '../home/home.css';

function MyAppsComponent() {
    console.log('MyAppsComponent');
    const applicationSelector = (state: ApplicationState) => state.applications;
    const userSelector = (state: UserState) => state.user;
    const applications = useSelector(applicationSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        individualService.getMyApplications(user).then((returnApps) =>
            dispatch(getMyApplications(returnApps))
        );
    }, [dispatch, user]);

    console.log('after useEffect apps: ', applications);

    
    return (
        <div>
            {applications.map((app) => {
                return(
                    <ApplicationInfoComponent key={'app-'+app.appId} appData={app}/>
                )
            })}
        </div>
    );
}
export default MyAppsComponent;
