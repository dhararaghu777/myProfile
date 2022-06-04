import { configureStore } from '@reduxjs/toolkit'
import userInfoSlice from './userInfoSlice'
import userProfile from './userProfileSlice'
import myProfileSlice from './myProfileSlice'
import adminSlice from './adminSlice'

export default configureStore({
  reducer: {
    userInfo: userInfoSlice,
    profileInfo: userProfile,
    myProfile: myProfileSlice,
    adminInfo: adminSlice
  },
})
