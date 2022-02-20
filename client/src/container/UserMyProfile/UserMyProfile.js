import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../axios'
import { setMyProfile } from '../../store/myProfileSlice';
import Header from './container/Header';
import { Container, Grid } from '@mui/material';
import {makeStyles} from '@mui/styles'
import First from './container/First';
import About from './container/About'
import Spinner from '../../components/Spinner/Spinner';
import Experience from './container/Experience';
import Education from './container/Education';
import Project from './container/Project';
import Skill from './container/Skill';
import Achievement from './container/Acheivement';
import Images from './container/Images';
import Video from './container/Video'

const useStyles = makeStyles((theme) => ({
    UserMyProfile: {
      position: 'relative',
    },
    SubGrid:{

    }
}))

function UserMyProfile() {

  const classes = useStyles();
  const params = useParams()
  const dispatch = useDispatch();
  const [userData, setuserData] = useState(false);
  const userProfile= useSelector((state)=>state.myProfile);

  // Access user data
  useEffect(() => {
    const { username } = params
    const data = {
      username: username,
    }

    axios
      .post('/myprofile', data)
      .then((res) => {
        console.log(res.data)
        dispatch(
          setMyProfile({
            user: res.data.user,
            profile: res.data.profile,
          })
        )
        setuserData(true);
      })
      .catch((err) => {
        console.log('error execting');
        setuserData(false);
      })
  }, [])

  return (
      <Grid container className={classes.UserMyProfile}>
          <Header />
          {
            userData? (
              <>
                <First/>
               {userProfile.profile.about.length > 0 ? <About />:null}
               {userProfile.profile.experience.length > 0 ? <Experience />: null}
               {userProfile.profile.education.length > 0 ? <Education />: null}
               {userProfile.profile.projects.length > 0 ? <Project />: null}
               {userProfile.profile.skills.length > 0 ? <Skill />: null}
               {userProfile.profile.achievements.length > 0 ? <Achievement />: null}
               {userProfile.profile.extra.personalImages.length > 0 ? <Images />: null}
               {userProfile.profile.extra.personalVideos.length > 0 ? <Video />: null}
              </>
            ):<Spinner/>
          }
      </Grid>
      )
}

export default UserMyProfile;
