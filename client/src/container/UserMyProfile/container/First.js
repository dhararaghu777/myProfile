import React,{useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import Spinner from '../../../components/Spinner/Spinner';

const alternatePic =
  'https://res.cloudinary.com/raghudara/image/upload/v1638719809/programmer_agkrsx.png'

const useStyles = makeStyles((theme) => ({
  MyContainer: {
    height: '500px',
    backgroundColor: '#00ADB5',
    padding: '0 3rem',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
  },
  MyProfile: {
    height: '300px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  MyProfileImage: {
    width: '10rem',
    height: '10rem',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
  },
  MyProfileData:{
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

function First() {
  const classes = useStyles();
  const userProfile= useSelector((state)=>state.myProfile);
  console.log("First",userProfile);

  useEffect(() => {
   
  },[])

  return (
      <Grid container 
            direction="row"
            className={classes.MyContainer}>
            { userProfile ?
            (<Grid item container xs sm md
                    direction="row"
                    className={classes.MyProfile}>
                <Grid item  xs={12} sm={5} md={4}
                    className={classes.MyProfileImage}>
                        <img src={userProfile ?userProfile.user.image:alternatePic} alt='ProfileImage' />
                </Grid>
                <Grid item container xs={12} sm={7} md={8}
                    direction="row"
                    className={classes.MyProfileData}>
                <Grid item>
                    <Typography variant="body1" component="div">
                        Hi, There 👋
                    </Typography>
                    <Typography variant="h6" component="div">
                        I'm {userProfile.user.name}
                    </Typography>
                    <Typography variant="body1" component="div">
                        {userProfile.profile.about}
                    </Typography>
                </Grid>
                
                </Grid>
            </Grid>):<Spinner/>}
        </Grid>
  )
        
}

export default First
