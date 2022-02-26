import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import FullScreenImage from '../Components/FullScreenImage'
import CallIcon from '@mui/icons-material/Call';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';


const useStyles = makeStyles((theme) => ({
    MP_Details: {
        padding:'3rem 8rem',
        minHeight:'20rem',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'lightblue',

        [theme.breakpoints.down('sm')]:{
            padding: '3rem 3rem',
            minHeight: '10rem',
        }

    },
    Icon:{
        width:'2rem',
        height:'2rem',
        '& img':{
            width:'100%',
            height:'100%',
        },
        [theme.breakpoints.down('sm')]:{
            width:'1.5rem',
            height:'1.5rem',
        }
    },
    Text_1:{
        textAlign: 'justify',
        color:'#1D3557',
        [theme.breakpoints.down('sm')]:{
            fontSize: '1.2rem !important',
        }
    },
    Text_2:{
        [theme.breakpoints.down('sm')]:{
            fontSize: '1.1rem !important',
        }
    },
    EmailIcon:{
        width:'1.5rem',
        height:'1.5rem',
        '& img':{
            width:'100%',
            height:'100%',
        },
        [theme.breakpoints.down('sm')]:{
            width:'1.3rem',
            height:'1.3rem',
        }
    },
    Social:{
        display:'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]:{
            justifyContent: 'space-evenly',
        }
    },
    SocialIcon:{
        width: "2.5rem",
        height: "2.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        marginRight: "1.5rem !important",
        '& img':{
            width:'100%',
            height:'100%',
            '&:hover':{
                transform: "scale(1.2)"
            }
        },
        [theme.breakpoints.down('sm')]:{
            width:'1.5rem',
            height:'1.5rem',
            marginRight: "0 !important",
        }
    }
    
}))

function Details() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));
    const mobile = userProfile.profile.mobile
    const social = userProfile.profile.social;
    


  return (
      <Grid container className={classes.MP_Details}>
          <Grid item container sx={{ 
                alignItems: 'center',
                justifyContent: 'center'
                }}>
            <Grid item container sx={{ 
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                <Grid item className={classes.Icon} 
                    sx={{
                        marginRight:'0.3rem'
                    }}>
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452595/social-media_eta3cm.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Details
                    </Typography>
                </Grid>
                    
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Divider variant="fullWidth"
                            sx={{
                                marginTop:'0.2rem',
                                // width:'100%',
                                marginBottom: media?'0.5rem':'1.3rem'
                    }} />
            </Grid>
            <Grid item container >
                {
                (mobile.primary || mobile.secondary)&& 
                (<Grid item container>
                    <Grid item container>
                        <Typography variant="h6"
                            className={classes.Text_2}>
                            Contact
                        </Typography>
                    </Grid>
                    <Grid item container
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom:'0.5rem'
                        }}>
                        <Link href={'mailto: '+userProfile.user.email} 
                                className={classes.EmailIcon}
                                target='_blank'
                                sx={{
                                    marginRight:'0.7rem'
                                }}
                            >
                                <img src='https://res.cloudinary.com/raghudara/image/upload/v1645861429/email_1_bzxseo.png' 
                                    alt="email"/>
                        </Link>
                        <Typography variant="body1">
                            {userProfile.user.email}
                        </Typography>
                    </Grid>
                    
                    {mobile.primary &&(
                    <Grid item xs={12} sm={12} md={2}>
                        <Grid item container
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <CallIcon sx={{
                                marginRight:'0.3rem',
                                fontSize:media ? '1.2rem':'1.5rem'
                            }}/>
                            <Typography variant="subtitle2">
                                {mobile.primary}
                            </Typography>
                        </Grid>
                    </Grid>)
                    }
                    {mobile.secondary &&(
                    <Grid item xs={12} sm={12} md={2}>
                        <Grid item container
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <CallIcon sx={{
                                marginRight:'0.3rem',
                                fontSize:media ? '1.2rem':'1.5rem'
                            }}/>
                            <Typography variant="subtitle2">
                                {mobile.secondary}
                            </Typography>
                        </Grid>
                    </Grid>)
                    }
                    
                </Grid>
                )
                }
                {
                    <Grid item container sx={{ 
                        marginTop:'1rem',
                        
                    }} >
                        <Grid item container sx={{ marginBottom:'0.3rem'}}>
                            <Typography variant="h6"
                                className={classes.Text_2}>
                                Social Media
                            </Typography>
                        </Grid>
                        <Grid item container className={classes.Social}>
                        
                        {social.linkedIn &&
                        (<Link href={social.linkedIn} 
                                className={classes.SocialIcon}
                                target='_blank'>
                            <img src='https://res.cloudinary.com/raghudara/image/upload/v1643452596/linkedin_ohs085.png' 
                                 alt="social"/>
                        </Link>
                        )
                        }
                        {social.instagram &&
                        (<Link href={social.instagram} 
                                className={classes.SocialIcon}
                                target='_blank'>
                            <img src='https://res.cloudinary.com/raghudara/image/upload/v1645867601/instagram_1_jhuhyr.png' 
                                 alt="social"/>
                        </Link>
                        )
                        }
                        {social.github &&
                        (<Link href={social.github} 
                                className={classes.SocialIcon}
                                target='_blank'>
                            <img src='https://res.cloudinary.com/raghudara/image/upload/v1643452596/github_x6vzv5.png' 
                                 alt="social"/>
                        </Link>
                        )
                        }
                        {social.youtube &&
                        (<Link href={social.youtube} 
                                className={classes.SocialIcon}
                                target='_blank'>
                            <img src='https://res.cloudinary.com/raghudara/image/upload/v1643452595/youtube_cjbe4e.png' 
                                 alt="social"/>
                        </Link>
                        )
                        }
                        {social.facebook &&
                        (<Link href={social.facebook} 
                                className={classes.SocialIcon}
                                target='_blank'>
                            <img src='https://res.cloudinary.com/raghudara/image/upload/v1643452597/facebook_z51vgb.png' 
                                 alt="social"/>
                        </Link>
                        )
                        }
                        
                    </Grid>
                  </Grid>
                } 
            </Grid>   
        </Grid>
            
    </Grid>
  );
}

export default Details;
