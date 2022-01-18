import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfoSlice'
import userProfile from './userProfileSlice'
import myProfileSlice from './myProfileSlice'

export default configureStore({
  reducer: {
    userInfo: userInfoSlice,
    profileInfo: userProfile,
    myProfile: myProfileSlice,
  },
})
