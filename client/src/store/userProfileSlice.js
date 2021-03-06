import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const fetchProfile = createAsyncThunk(
  'fetchUpdatedProfile',
  async (token, thunkAPI) => {
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    const res = await axios.get('/profile', config)
    return res.data
  }
)

//initial state
let initialState = {
  profile: null,
}

const profile = createSlice({
  name: 'user details',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    profileLogout: (state, action) => {
      state.profile = null
    },
    updateEducation: (state, action) => {
      state.profile.education = action.payload
    },
    removeEducation: (state, action) => {
      const id = action.payload
      const index = state.profile.education.findIndex((item) => item._id === id)
      state.profile.education.splice(index, 1)
    },
    updateExperience: (state, action) => {
      state.profile.experience = action.payload
    },
    removeExperience: (state, action) => {
      const id = action.payload
      const index = state.profile.experience.findIndex(
        (item) => item._id === id
      )
      state.profile.experience.splice(index, 1)
    },
    updateProject: (state, action) => {
      state.profile.projects = action.payload
    },
    removeProject: (state, action) => {
      const id = action.payload
      const index = state.profile.projects.findIndex((item) => item._id === id)
      state.profile.projects.splice(index, 1)
    },
    updateSkill: (state, action) => {
      state.profile.skills = action.payload
    },
    removeSkill: (state, action) => {
      const id = action.payload
      const index = state.profile.skills.findIndex((item) => item._id === id)
      state.profile.skills.splice(index, 1)
    },
    updateAchievement: (state, action) => {
      state.profile.achievements = action.payload
    },
    removeAchievement: (state, action) => {
      const id = action.payload
      const index = state.profile.achievements.findIndex(
        (item) => item._id === id
      )
      state.profile.achievements.splice(index, 1)
    },
    updateSocial: (state, action) => {
      state.profile.social = action.payload
    },
    removeSocial: (state, action) => {
      state.profile.social = {
        linked: '',
        youtube: '',
        facebook: '',
        github: '',
        instagram: '',
      }
    },
    updateMobile: (state, action) => {
      state.profile.mobile = action.payload
    },
    removeMobile: (state, action) => {
      state.profile.mobile = {
        primary: '',
        secondary: '',
      }
    },
    updateImage: (state, action) => {
      state.profile.extra.personalImages = action.payload
    },
    removeImage: (state, action) => {
      const id = action.payload
      const index = state.profile.extra.personalImages.findIndex(
        (item) => item._id === id
      )
      state.profile.extra.personalImages.splice(index, 1)
    },
    updateVideo: (state, action) => {
      state.profile.extra.personalVideos = action.payload
    },
    removeVideo: (state, action) => {
      const id = action.payload
      const index = state.profile.extra.personalVideos.findIndex(
        (item) => item._id === id
      )
      state.profile.extra.personalVideos.splice(index, 1)
    },
    updateAbout: (state, action) => {
      state.profile.about = action.payload
    },
    removeAbout: (state, action) => {
      state.profile.about = ''
    },
  },
  extraReducers: {
    [fetchProfile.fulfilled]: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const {
  setProfile,
  profileLogout,
  updateEducation,
  removeEducation,
  removeExperience,
  updateExperience,
  updateProject,
  removeProject,
  updateSkill,
  removeSkill,
  updateAchievement,
  removeAchievement,
  updateSocial,
  removeSocial,
  updateMobile,
  removeMobile,
  updateImage,
  removeImage,
  updateVideo,
  removeVideo,
  updateAbout,
  removeAbout,
} = profile.actions
export default profile.reducer
