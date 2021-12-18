import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../axios';


export const fetchProfile= createAsyncThunk(
    'fetchUpdatedProfile',
    async (token, thunkAPI) => {
        const config = {
            headers: {
              "x-auth-token": token
            }
        }

        const res = await axios.get('/profile', config);
        return res.data;
    }
)

//initial state
let initialState = {
    profile: null
}

const profile = createSlice({
    name : "user details",
    initialState,
    reducers: {
        setProfile : (state, action) => {

            state.profile = action.payload
        },
        profileLogout: (state, action)=>{
            state.profile= null;
        }
    },
    extraReducers: {
        [fetchProfile.fulfilled]: (state, action)=> {
            state.profile= action.payload;
        }
    }
})

export const {setProfile, profileLogout} = profile.actions;
export default profile.reducer;