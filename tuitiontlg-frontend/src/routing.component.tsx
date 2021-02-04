import React from 'react';
import {
    Route,
    BrowserRouter,
    Redirect,
    Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// REDUX
import { getUser } from './redux/actions';
import { UserState } from './redux/reducer';
//PAGE
import './home/home.css';
import HomeComponent from './home/home';
import ErrorBoundaryComponent from './error.component';
//USER
import { User } from './user/user';
import userService from './user/user.service';
import EmployeeInfoComponent from './user/employeeInfo.component';
import EditUserComponent from './user/editUser.component';
import LoginComponent from './user/login.component';
// APPLICATIONS
import ApplicationComponent from './application/application.component';
import MyAppsComponent from './application/myapps.component';
// FORMS
import FormInfoComponent from './reimbursement/forminfo.component';
import AddFormComponent from './reimbursement/addForm.component';
import GradingFormatComponent from './home/gradingFormat.component';
import EditFormComponent from './reimbursement/editForm.component';
import ApplyCalculationsComponent from './system/applyCalc.component';
import formDecisionComponent from './reimbursement/formDecision.component';
// MESSAGES
import MyMessageComponent from './communication/mymessages.component';
import newMessageComponent from './communication/newMessage.component';
import ConfirmGradeComponent from './completion/confirmGrade.component';
import gradeDecisionComponent from './completion/gradeDecision.component';


export default function RouterComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    function logout() {
        let loggedOut = new User();
        loggedOut.username = '';
        loggedOut.jobTitle = 'N/A'
        userService.logout().then(() => {
            dispatch(getUser(loggedOut));
        });
    }

    return (
        <BrowserRouter>
            <div>
                <header>
                    <nav id='nav' className='navbar navbar-dark bg-dark'>
                        <ul className='nav nav-tabs'>
                            <li className='nav-item'>
                                <a
                                    className='nav-link active text-success'
                                    href='/'
                                >
                                    HOME
                                </a>
                            </li>
                            {user.jobTitle === 'Employee' && (
                                <li className='nav-item'>
                                    <a
                                        className='nav-link text-success'
                                        href='/apply'
                                    >
                                        APPLY
                                    </a>
                                </li>
                            )}
                            {user.jobTitle === 'Employee' && (
                                <li className='nav-item'>
                                    <a
                                        className='nav-link text-success'
                                        href='/myapplications'
                                    >
                                        MY APPLICATIONS
                                    </a>
                                </li>
                            )}
                            {user.admin === true && (
                                <li className='nav-item'>
                                    <a
                                        className='nav-link text-success'
                                        href='/applications'
                                    >
                                        VIEW APPLICATIONS
                                    </a>
                                </li>
                            )}
                            {user.processId === 4 && (
                                <li className='nav-item'>
                                    <a
                                        className='nav-link text-success'
                                        href='/grading/confirm'
                                    >
                                        CONFIRM GRADES
                                    </a>
                                </li>
                            )}
                            {user.access === 'granted' && (
                                <li className='nav-item'>
                                    <a
                                        className='nav-link text-success'
                                        href='/messages'
                                    >
                                        MESSAGES
                                    </a>
                                </li>
                            )}
                            <li className='nav-item'>
                                {user.username ? (
                                    <button
                                        className='nav-link text-success'
                                        onClick={logout}
                                    >
                                        LOGOUT
                                    </button>
                                ) : (
                                    <a
                                        className='nav-link text-success'
                                        href='/login'
                                    >
                                        LOGIN
                                    </a>
                                )}
                            </li>
                        </ul>
                        <div className='text-success'>
                            <Link
                                className='text-success'
                                to={'/employee/info/' + user.username}
                            >
                                Welcome {user.username}
                            </Link>
                            <p>Role: {user.jobTitle}</p>
                        </div>
                    </nav>
                    <h1 className='site-name'>
                        Visionary Tuition Reimbursement
                    </h1>
                    <p className='potential'>
                        ...because we know your true potential.
                    </p>
                </header>
                <ErrorBoundaryComponent>
                    <Route exact path='/' component={HomeComponent} />
                    <Route exact path='/grading' component={GradingFormatComponent} />
                    <Route path='/login' component={LoginComponent} />
                    <Route path='/applications/:id/confirm' component={gradeDecisionComponent} />                  
                   
                    <Route
                        exact
                        path='/grading/confirm'
                        render={() =>
                            user.jobTitle === 'N/A' ? (
                                <Redirect to='/' />
                            ) : (
                                <ConfirmGradeComponent />
                            )
                        }
                    />
                    
                    <Route
                        exact
                        path='/myapplications'
                        render={() =>
                            user.jobTitle === 'N/A' ? (
                                <Redirect to='/' />
                            ) : (
                                <MyAppsComponent />
                            )
                        }
                    />

                    <Route
                        exact
                        path='/messages'
                        render={() =>
                            user.jobTitle === 'N/A' ? (
                                <Redirect to='/' />
                            ) : (
                                <MyMessageComponent />
                            )
                        }
                    />
                    <Route
                        exact
                        path='/employee/info/:username'
                        render={() =>
                            user.jobTitle === 'N/A' ? (
                                <Redirect to='/' />
                            ) : (
                                <EmployeeInfoComponent />
                            )
                        }
                    />
                    <Route
                        exact
                        path='/apply/calculations'
                        render={() =>
                            user.jobTitle === 'N/A' ? (
                                <Redirect to='/' />
                            ) : (
                                <ApplyCalculationsComponent />
                            )
                        }
                    />
                    
                    <Route path='/pwdchg' component={EditUserComponent} />

                    <Route exact path='/apply' component={AddFormComponent} />
                    <Route
                        exact
                        path='/applications/:id/changes'
                        component={EditFormComponent}
                    />
                    <Route
                        exact
                        path='/applications/:id/process'
                        component={formDecisionComponent}
                    />
                    <Route
                        exact
                        path='/message/new'
                        component={newMessageComponent}
                    />

                    <Route
                        exact
                        path='/applications'
                        render={() =>
                            user.jobTitle === 'Employee' ? (
                                <Redirect to='/' />
                            ) : user.jobTitle ==='N/A'? (
                                <Redirect to='/' />

                            ):(
                                <ApplicationComponent />
                            )
                        }
                    />

                    <Route
                        exact
                        path='/form/:id'
                        component={FormInfoComponent}
                    />
                </ErrorBoundaryComponent>
            </div>
        </BrowserRouter>
    );
}
