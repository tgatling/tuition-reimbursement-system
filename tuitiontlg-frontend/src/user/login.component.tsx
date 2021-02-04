import { SyntheticEvent } from 'react';
import userService from './user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginAction } from '../redux/actions';

// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.loginUser;
    console.log(userSelector);
    const user = useSelector(userSelector);
    console.log('Login Component: ', user);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        console.log('Handle Form Input');
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.username = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(loginAction(u));
        console.log('User: ', user);
    }
    function submitForm() {
        console.log ('Submit Form');
        userService.login(user).then((returnUser) => {
            dispatch(getUser(returnUser));
            history.push('/');
        }).catch((err) => {
            alert('Incorrect Login.  Please Try Again.');
        });
    }
    return (
        
        <div className='col login card'>
           Username <input type='text' className='form-control' onChange={handleFormInput} name='username'/>
           <br/>
           Password <input type='password' className='form-control' onChange={handleFormInput} name='password'/>
           <br/>
           <button className='btn btn-success' onClick={submitForm}>Login</button>
        </div>
    );
}

export default LoginComponent;
