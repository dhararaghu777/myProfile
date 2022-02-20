import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import FullScreenImage from '../Components/FullScreenImage'

const useStyles = makeStyles((theme) => ({
    MP_Images: {
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
    
    CardGrid:{

        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    Card:{
        
    },
    NameSection:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:'0.5rem 0',
        '& div': {
          
            fontSize:'1rem !important',
        },
        [theme.breakpoints.down('sm')]:{
           
        }
    }
}))

function Images() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));
    const [fullScreen, setfullscreen] =useState(false)
    const [item, setitem] = useState(null)
    const [showName, setshowName] = useState(false)
    const closeFullScreen= ()=>{
        setfullscreen(false);
        setitem(null);
    }
    
    const onClickImage= (item)=>{
        setitem(item)
        setfullscreen(true);
    }


  return (
      <Grid container className={classes.MP_Images}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452595/image_xcygm0.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Images
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
                <Grid item container
                    className={classes.CardGrid}>
                    {userProfile && userProfile.profile.extra.personalImages.map((item, i)=> (
                        <Grid item
                            key={item._id}
                            className={classes.Card}
                            onMouseOver={(e)=> setshowName(true)}
                            onMouseOut={(e)=> setshowName(false)}
                            sx={{
                                
                                marginBottom:media ? '0.7rem':'1.5rem',
                                marginRight: media ? '0.5rem':'1.5rem'
                            }}>
                            <Card sx={{ 
                                        minWidth: media ? 100 :200,
                                        padding:'0.5rem',
                                        '&:hover':{
                                            transistion:'all 0.25s linear',
                                            transform:'scale(1.01)'
                                        }
                                        }}
                                    onClick={(e)=> onClickImage(item)}
                                    >
                                <CardActionArea sx={{
                                    position:'relative'
                                }}>
                                    <CardMedia
                                        component="img"
                                        height={media? '90':"170"}
                                        image={item.image}
                                        alt="Personal Image"
                                        sx={{
                                            objectFit:'contain',
                                        }}
                                    />
                                    <Grid item sx={{
                                        position:'absolute',
                                        inset:0,
                                        display:showName?'flex':'none',
                                        backgroundColor:'rgba(0, 0, 0, 0.5)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        
                                    }}>
                                        <Typography 
                                            variant="body1"   
                                            component="div"
                                            sx={{
                                                color:'#fff'
                                            }}>
                                            {item.name}
                                        </Typography>
                                    </Grid>
                                    
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>   
        </Grid>
            {fullScreen && <FullScreenImage item={item} close={closeFullScreen}/>}
      </Grid>
  );
}

export default Images;
