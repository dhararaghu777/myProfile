import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
});

export const {setUser, setToken, setError} = userSlice.actions;
export default userSlice.reducer;