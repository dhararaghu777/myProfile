import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import {Switch, Route, Redirect} from 'react-router-dom';
import SignIn from './container/Login/SignIn/SignIn';
import Auxilary from './container/Auxilary/Auxilary';
import SignUp from './container/Login/SignUp/SignUp';
import axios from './axios';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setError} from './store/userInfoSlice';
import Profile from './container/Profile/Profile';

function App() {

  const user = useSelector(state => state.userInfo.user);
  const token = useSelector(state => state.userInfo.token);
  const dispatch = useDispatch();

  useEffect(() => {

    const config = {
      headers: {
        "x-auth-token": token
      }
    }
     axios.get('/login', config)
     .then( res => {
       console.log(res.data);
       dispatch(setUser(res.data));
       dispatch(setError(""));
     })
     .catch( err => {
       console.log(err);
       dispatch(setError(err.response.data.errors[0].msg));
       dispatch(setUser(null));
     })

  }, [token]);

  return (
    <div className="App">
      <Switch>
          {
          /* authenticated routes */
            user && (

            /* Profile Page */
            <Route path={`/${user.username}`}>
              <Profile />
            </Route>
            )

           
          }

          {/* Un-authenticated routes */}
          <Route path="/signin">
              <SignIn />
          </Route>
          <Route path="/signup">
              <SignUp />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Redirect to ="/" />
      </Switch>
       
    </div>
  );
}

export default App;
