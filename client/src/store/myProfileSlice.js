import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  user: null,
  profile: null,
}

const myProfile = createSlice({
  name: 'myProfile',
  initialState,
  reducers: {
    setMyProfile: (state, action) => {
      state.user = action.payload.user
      state.profile = action.payload.profile
    },
  },
})

export const { setMyProfile } = myProfile.actions
export default myProfile.reducer
