import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'

const useStyles = makeStyles((theme) => ({
    MP_Education: {
        padding:'3rem 8rem',
        minHeight:'20rem',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'lightgreen',

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
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.9rem !important',
        }
    },
    Subtitle2:{
        // color:'#222831',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.8rem !important',
        }
    }
}))

function Education() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));

    const getEduInfo=(edu)=>{
        let res=""
        res+='CGPA: '+edu.cgpa+" - "+edu.yop
        return res
    }

  return (
      <Grid container className={classes.MP_Education}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452598/icons8-education-64_mrnya1.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Education
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
                <Grid item xs={12} sm={12} md={12}>
                    {userProfile && userProfile.profile.education.map((item, i)=> (
                        <Grid item container
                            key={item._id}
                            sx={{
                                marginBottom:media ? '0.5rem':'1.3rem'
                            }}>
                            <Card sx={{ display: 'flex', 
                                        flex:1,
                                        flexDirection:'row-reverse' 
                                    }}
                                 key={item._id}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    textAlign:media ? 'start':'end',
                                    flex:1 
                                    }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" 
                                            variant="subtitle1"
                                            className={classes.Subtitle1}
                                            sx={{fontWeight:450}}
                                                >
                                            {item.college}
                                        </Typography>
                                        <Typography variant="subtitle1"
                                        className={classes.Subtitle1} component="div">
                                            {item.degree}
                                        </Typography>
                                        <Typography variant="body2"
                                        className={classes.Subtitle1} component="div">
                                            {item.stream}
                                        </Typography>
                                        <Typography variant="subtitle2"
                                         className={classes.Subtitle2}
                                          component="div"
                                          color='text.secondary'>
                                            {
                                                getEduInfo(item)
                                            }
                                        </Typography>
                                        {/* <Typography variant="subtitle2"
                                                component="div"
                                                className={classes.Subtitle2}
                                                color='text.secondary'>
                                            {item.location}
                                        </Typography> */}
                                    </CardContent>
                                </Box>
                               {media?null: <CardMedia
                                    component="img"
                                    sx={{ width: 130,
                                        objectFit:'contain',
                                        marginLeft:'1rem'}}
                                    image="https://res.cloudinary.com/raghudara/image/upload/v1643452596/education_i8tgmb.png"
                                    alt="Company"
                                />}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>   
        </Grid>
      </Grid>
  );
}

export default Education;
