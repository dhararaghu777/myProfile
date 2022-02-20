import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    MP_Video: {
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
    EmbedYoutube :{

        [theme.breakpoints.down('sm')]:{
            float: "none",
            clear: "both",
            width: "100%!important",
            position: 'relative',
            paddingBottom: "56.25%",
            paddingTop: "25px",
            height:" 0 !important",
            "& iframe":{
               position:'absolute',
               top: 0,
               left:0,
               width:'100%',
               height:'100%'
            },
        }
        
        
    }
    
}))

function Video() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));

    

  return (
      <Grid container className={classes.MP_Video}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452595/video-player_yr1f4m.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Videos
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
                <Grid item container>
                    {userProfile && userProfile.profile.extra.personalVideos.map((item, i)=> (
                        <Grid item
                            key={item._id}
                            className={classes.EmbedYoutube}
                            sx={{
                                marginBottom:media ? '0.7rem':'1.5rem',
                                marginRight: media ? '0.5rem':'1.5rem',
                                width:'300px',
                                height:'200px'
                            }}
                            >
                            <iframe 
                                width='100%'
                                height='100%'
                                src={item.video}
                                frameBorder='0' 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture ;"
                                allowFullScreen={media? '0': '1'}
                                 ></iframe>
                            
                        </Grid>
                    ))}
                </Grid>
            </Grid>   
        </Grid>
      </Grid>
  );
}

export default Video;
