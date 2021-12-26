import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchUser = createAsyncThunk(
    'fetchUpdatedUser',
    async (token, thunkAPI) => {
        const config = {
            headers: {
              "x-auth-token": token
            }
        }

        const res = await axios.get('/login', config);
        console.log({
            token: token,
            user: res.data
        })
        return res.data;
    }
)


//intial state
let initialState = {
    user: null,
    token: "",
    error: ""
}

const userSlice= createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        
        setUser: (state,action)=>{
            console.log(action.payload);
            state.user = action.payload;
        },

        setToken: (state, action) => {
            //console.log(action.payload);
            state.token = action.payload;
        },
        setError : (state, action) => {
            state.error = action.payload;
        },
        userLogout: (state, action) => {
            state.token="";
            state.user= null;
        },
        changeUserName: (state, action)=> {
            state.user.name= action.payload;
        },
        removeProfilePic: (state, action) =>{
            state.user.image="";
        }
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state,action)=>{
            state.user= action.payload;
        }
    }
});


export const {setUser, setToken, setError, userLogout,
changeUserName, removeProfilePic} = userSlice.actions;

export default userSlice.reducer;