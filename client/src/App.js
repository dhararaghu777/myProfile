import React, {useState, useEffect, useCallback} from 'react';
import Header from './container/Header/Header';
import Home from './container/Home/Home';
import {Routes, Route} from 'react-router-dom';
import SignIn from './container/Login/SignIn/SignIn';
import Auxilary from './container/Auxilary/Auxilary';
import SignUp from './container/Login/SignUp/SignUp';
import axios from './axios';
import {useSelector, useDispatch} from 'react-redux';
import {setUser, setError, setToken} from './store/userInfoSlice';
import {setProfile} from './store/userProfileSlice';
import Profile from './container/Profile/Profile';
import {ThemeProvider} from '@mui/material';
import theme from './components/Theme/Theme';
import { Navigate, useNavigate , useLocation} from 'react-router-dom';
import Cookies from 'js-cookie';


 function App() {

  const location = useLocation();
  const user = useSelector(state => state.userInfo.user);
  const token = useSelector(state => state.userInfo.token);
  const dispatch = useDispatch();


  //fetching user data
  const userAPI = useCallback(async () => {
    const config = {
      headers: {
        "x-auth-token": token
      }
    }

    try {
      
      const res = await axios.get('/login', config);
      dispatch(setUser(res.data));
      dispatch(setError(""));
      console.log('user',res);

    } catch (err) {
      if(err)
      {
         console.log(err);
         dispatch(setError(err.response.data.errors[0].msg));
         dispatch(setUser(null));
      }
    }
    
  }, [token])

  //useEffect for user API calls
  useEffect( () => {

    userAPI();
    
  }, [userAPI]);


  //check token in cookies
  useEffect(()=>{
     const cookieToken = Cookies.get('token');
    if(cookieToken)
    {
      dispatch(setToken(cookieToken));
    }
  },[]);



  //fetching profile data
  const profileAPI = useCallback(async () => {
    const config = {
      headers: {
        "x-auth-token": token
      }
    }

    try {
      
      const res = await axios.get('/profile', config);
      dispatch(setProfile(res.data));
      dispatch(setError(""));
      console.log('profile',res);

    } catch (err) {
      if(err)
      {
         console.log(err);
         dispatch(setError(err.response.data.errors[0].msg));
         dispatch(setProfile(null));
      }
    }
    
  }, [token])

  //useEffect for profile API calls
  useEffect( () => {

    profileAPI();

  }, [profileAPI]);



  return (
    <ThemeProvider theme={theme}>
      <Routes>
          {
          /* authenticated routes */
            user && (

            /* Profile Page */
            <Route path={`/${user.username}`} element={ 
            <Auxilary>
              <Header />
              <Profile />
            </Auxilary>} />)
          }

          {/* Un-authenticated routes */}
          <Route path="/signin" element={ <SignIn />} />
          <Route path="/signup"element={ <SignUp />} />
          <Route path="/" element={
            <Auxilary>
              <Header />
              {/* <Home /> */}
            </Auxilary>
            }
          />
          <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
