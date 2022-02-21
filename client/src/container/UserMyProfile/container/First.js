import React,{useEffect} from 'react'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import Spinner from '../../../components/Spinner/Spinner';

const alternatePic =
  'https://res.cloudinary.com/raghudara/image/upload/v1638719809/programmer_agkrsx.png'

const useStyles = makeStyles((theme) => ({
  MyContainer: {
    minHeight: 'calc( 100vh - 64px)',
    backgroundColor: '#00ADB5',
    // backgroundColor: '#222831',
    padding: '0 3rem',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // backgroundImage:"url('https://images.unsplash.com/photo-1615818499660-30bb5816e1c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGRpZ2l0YWx8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]:{
      minHeight: 'calc( 100vh - 56px)',
    },
    
  },
  MyProfile: {
    height: '25rem',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('md')]:{

    },
    [theme.breakpoints.down('sm')]:{
      height: '25rem',
    }
    
  },
  MyProfileImageGrid:{
      justifyContent: 'flex-end',
      paddingRight: "3rem",
      borderRight:'1px solid #cfcfcf',
  
      
      [theme.breakpoints.down('md')]:{

      },
      [theme.breakpoints.down('sm')]:{
        paddingRight: "0",
        justifyContent: 'center',
        borderRight:'none',
      }

  },
  MyProfileImage: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& div': {
      maxWidth: '15rem',
      maxHeight: '18rem',
      minWidth: '10rem',
      minHeight: '13rem',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '0.15rem',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
      [theme.breakpoints.down('sm')]:{
        minWidth: '8rem',
        minHeight: '11rem',
        maxWidth: '10rem',
        maxHeight: '13rem',
      }
    },

  },
  MyProfileDataGrid:{
    paddingLeft: '3rem',

    [theme.breakpoints.down('md')]:{

    },
    [theme.breakpoints.down('sm')]:{
      justifyContent: 'center',
      paddingLeft: '0'
    }

    
  },
  MyProfileData:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  Text1:{
      fontSize:'1.2rem !important',
      fontFamily:'cursive !important',
      fontWeight:'400',
      [theme.breakpoints.down(750)]:{

      },
      [theme.breakpoints.down('sm')]:{
        fontSize:'1rem !important',

      }
  },
  Text2:{
    fontSize:'2rem !important',
    padding:'0.2rem 0',
    [theme.breakpoints.down(750)]:{
      fontSize:'1.8rem !important',
    },
    [theme.breakpoints.down(650)]:{
      fontSize:'1.6rem !important',
    },
    [theme.breakpoints.down('sm')]:{
      fontSize:'1.4rem !important',

    }
    
  },
  Text3:{
    fontSize:'1rem !important',
    fontWeight:'500 !important',
    [theme.breakpoints.down('sm')]:{
      fontSize:'0.9rem !important',
    }
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
                <Grid item  xs={12} sm={5} md={5}
                      container
                      className={classes.MyProfileImageGrid}>
                      <Grid item className={classes.MyProfileImage}>
                          <div>
                            <img src={userProfile.user.image ? userProfile.user.image:alternatePic} 
                            alt='ProfileImage' 
                            />
                          </div>
                      </Grid>   
                </Grid>
                <Grid item container xs={12} sm={7} md={7}
                    direction="row"
                    className={classes.MyProfileDataGrid}>
                    <Grid item
                          className={classes.MyProfileData}>
                        <Typography  variant="body1"
                              component="div"
                              className={classes.Text1}>
                            Hi, There 👋
                        </Typography>
                        <Typography variant="h6" 
                              component="div"
                              className={classes.Text2}>
                            <span>I'm </span>
                            <b>{userProfile.user.name}</b>
                        </Typography>
                        <Typography variant="body1"
                              component="div"
                              className={classes.Text3}>
                            {userProfile.user.heading}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>):<Spinner/>}
        </Grid>
  )
        
}

export default First