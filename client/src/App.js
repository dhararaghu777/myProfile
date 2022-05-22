import React, { useState, useEffect, useCallback } from 'react'
import Header from './container/Header/Header'
import Home from './container/Home/Home'
import { Routes, Route } from 'react-router-dom'
import SignIn from './container/Login/SignIn/SignIn'
import Auxilary from './container/Auxilary/Auxilary'
import SignUp from './container/Login/SignUp/SignUp'
import axios from './axios'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setError, setToken } from './store/userInfoSlice'
import { setProfile } from './store/userProfileSlice'
import Profile from './container/Profile/Profile'
import { ThemeProvider } from '@mui/material'
import theme from './components/Theme/Theme'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import UserMyProfile from './container/UserMyProfile/UserMyProfile'
import Footer from './container/Footer/Footer'

function App() {
  const location = useLocation()
  const user = useSelector((state) => state.userInfo.user)
  const token = useSelector((state) => state.userInfo.token)
  const dispatch = useDispatch()

  //check token in cookies
  useEffect(() => {
    const cookieToken = Cookies.get('token')
    if (cookieToken) {
      dispatch(setToken(cookieToken))
    }
  }, [])

  //fetching user data
  const userAPI = useCallback(async () => {
    if (token) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      }

      try {
        const res = await axios.get('/login', config)
        dispatch(setUser(res.data))
        dispatch(setError(''))
        console.log('user', res)
      } catch (err) {
        if (err) {
          console.log(err)
          dispatch(setError(err.response.data.errors[0].msg))
          dispatch(setUser(null))
        }
      }
    }
  }, [dispatch, token])

  //useEffect for user API calls
  useEffect(() => {
    if(token) userAPI();
  }, [userAPI, token])

  //fetching profile data
  const profileAPI = useCallback(async () => {
    if (token) {
      const config = {
        headers: {
          'x-auth-token': token,
        },
      }

      try {
        const res = await axios.get('/profile', config)
        dispatch(setProfile(res.data))
        dispatch(setError(''))
        console.log('profile', res)
      } catch (err) {
        if (err) {
          console.log(err)
          dispatch(setError(err.response.data.errors[0].msg))
          dispatch(setProfile(null))
        }
      }
    }
  }, [dispatch, token])

  //useEffect for profile API calls
  useEffect(() => {
    if(token) profileAPI();
  }, [profileAPI, token])

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {
          /* authenticated routes */
          user && (
            /* Profile Page */
            <Route
              path={`/${user.username}`}
              element={
                <Auxilary>
                  <Header />
                  <Profile />
                </Auxilary>
              }
            />
          )
        }

        {/* Un-authenticated routes */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/'
          element={
            <Auxilary>
              <Header />
              <Home />
              <Footer/>
            </Auxilary>
          }
        />
        <Route path='user/:username' element={<UserMyProfile />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
