import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Card, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import {getImageUrl} from '../Components/GetImageUrl';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    MP_Achievement: {
        padding:'3rem 8rem',
        minHeight:'20rem',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'#ccc',

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
    Subtitle1:{
        // color:'#222831',
        fontWeight:'750 !important',
        textTransform:'capitalize',
        [theme.breakpoints.down('sm')]:{
            fontWeight:'550 !important',
            fontSize: '0.8rem !important',
        }
    },
    Subtitle2:{
        // color:'#222831',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.8rem !important',
        }
    },
    AchievementGrid:{
        padding:'0 0.5rem'
    },
    AchievementData: {
        marginBottom:"0.2rem !important",
        [theme.breakpoints.down('sm')]:{
            
        }
    },
    AchievementName:{
        fontSize:'1.15rem !important',
        color:'#222831',
        [theme.breakpoints.down('sm')]:{
            fontSize:'0.9rem !important'
        }
    },
    Duration:{
        
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.8rem !important',
        }
    },
    Details:{
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.85rem !important',
        }
    },
    ViewButton:{
        textTransform:'Capitalize !important',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.7rem !important',
        }
    }

}))

function Achievement() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));

    const getTime= (item)=>{
        let res= moment(item.date).format('DD MMM YYYY');
        return res
    }
    
  return (
      <Grid container className={classes.MP_Achievement}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452596/badge_fxfixd.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Acheivements
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
            <Grid item container
                sx={{
                    marginBottom:media ? '0.5rem':'1.3rem'
                }} >
                <Grid item container rowSpacing={media? 2:4}
                    sx={{ 
                       
                    }}>
                    {userProfile && userProfile.profile.achievements.map((item, i)=> (
                        <Grid item container
                        key={item._id}
                        className={classes.AchievementGrid}
                        sx={{
                            marginBottom:media ? '0.5rem':'1.3rem'
                        }}>
                        <Grid item container
                            className={classes.AchievementData}
                            >
                            <Typography variant="h6"
                                component="div"
                                className={classes.AchievementName}
                                >
                                    {item.name}
                                </Typography>
                        </Grid>
                        <Grid item container
                            className={classes.ProjectData}
                            >
                            <Typography variant="subtitle2"
                                className={classes.Duration}
                                component="div"
                                color='text.secondary'>
                                {
                                    getTime(item)
                                }
                            </Typography>
                        </Grid>
                        <Grid item container
                            sx={{
                                marginBottom:'0.5rem'
                            }}>
                            <Typography variant="body1"
                            component="div"
                            className={classes.Details}>
                                {item.details}
                            </Typography>
                        </Grid>
                        <Grid item container
                            className={classes.ProjectData}>
                            <Button href={item.url}
                                    target="_blank"
                                    color="info"
                                    className={classes.ViewButton}>
                                View Achievement
                            </Button>
                        </Grid>
                        <Grid item container>
                            <Divider sx={{
                                width:'100%'
                            }}/>
                        </Grid>
                    </Grid>
                    ))}
                </Grid>
            </Grid>   
        </Grid>
      </Grid>
  );
}

export default Achievement;
