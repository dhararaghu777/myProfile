import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../axios'
import { setMyProfile } from '../../store/myProfileSlice';
import Header from './container/Header';
import { Container, Grid, Typography } from '@mui/material';
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
import Details from './container/Details'
import Footer from '../Footer/Footer';


const useStyles = makeStyles((theme) => ({
    UserMyProfile: {
      position: 'block',
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
  const [error, seterror] = useState(false)
  const [spin, setspin]= useState(false)

  // Access user data
  useEffect(() => {
    setspin(true)
    const { username } = params
    const data = {
      username: username,
    }

    axios
      .post('/myprofile', data)
      .then((res) => {
        
        dispatch(
          setMyProfile({
            user: res.data.user,
            profile: res.data.profile,
          })
        )
        setuserData(true);
        setspin(false)
      })
      .catch((err) => {
       
        setuserData(false);
        seterror(true)
        setspin(false)
      })
  }, [])

  return (
      <Grid container className={classes.UserMyProfile}>
        <Header />
        {spin && <Spinner/>}
        {error && 
          <Grid container sx={{
                alignItems:'center',
                justifyContent:'center',
                margin:'10rem 0'
              }}>
              <Typography variant='h5' color="secondary">
                  Sorry, something went wrong 😥
              </Typography>
          </Grid>}
          {
            userData && (
              <>
                <First/>
               {userProfile.profile.about && userProfile.profile.about.length > 0 ? <About />:null}
               {userProfile.profile.experience && userProfile.profile.experience.length > 0 ? <Experience />: null}
               {userProfile.profile.education &&  userProfile.profile.education.length > 0 ? <Education />: null}
               {userProfile.profile.projects && userProfile.profile.projects.length > 0 ? <Project />: null}
               {userProfile.profile.skills && userProfile.profile.skills.length > 0 ? <Skill />: null}
               {userProfile.profile.achievements && userProfile.profile.achievements.length > 0 ? <Achievement />: null}
               {userProfile.profile.extra && userProfile.profile.extra.personalImages.length > 0 ? <Images />: null}
               {userProfile.profile.extra && userProfile.profile.extra.personalVideos.length > 0 ? <Video />: null}
               <Details/>
               <Footer/>
              </>
            )
          }
      </Grid>
      )
}

export default UserMyProfile;
