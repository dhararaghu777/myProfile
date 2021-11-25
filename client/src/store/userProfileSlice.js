import {createSlice} from '@reduxjs/toolkit';

let initialState = {
    profile: null
}

const profile = createSlice({
    name : "user details",
    initialState,
    reducers: {
        setProfile : (state, action) => {

            state.profile = action.payload
        }
    }
})

export const {setProfile} = profile.actions;
export default profile.reducer;