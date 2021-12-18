import {configureStore} from '@reduxjs/toolkit';
import userInfoSlice from './userInfoSlice';
import userDetailsSlice from './userProfileSlice';
import userProfile from './userProfileSlice';

export default configureStore({
    reducer :{
        userInfo: userInfoSlice,
        profileInfo: userProfile
    }
});
