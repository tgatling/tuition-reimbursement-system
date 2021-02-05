import React, { useEffect } from 'react';
import './App.css';
import{useDispatch} from 'react-redux';
//My Files
import{ getUser } from './redux/actions';
import RouterComponent from './routing.component';
import userService from './user/user.service';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    userService.getLogin().then((user) => {
      dispatch(getUser(user));
    });
  }, [dispatch]);

  return (
    <div className='container'>
      <RouterComponent></RouterComponent>
    </div>
  );
}

export default App;
