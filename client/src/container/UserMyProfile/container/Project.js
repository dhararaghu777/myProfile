import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    MP_Project: {
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
    ProjectGrid:{
        padding:'0 0.5rem'
    },
    ProjectData: {
        marginBottom:"0.2rem !important",
        [theme.breakpoints.down('sm')]:{
            
        }
    },

    
    ProjectName:{
        fontSize:'1.2rem !important',
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

function Project() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));

    const getProjInfo=(d)=>{
        let res=""
        const fromDate = new Date(d.from)
        const from= moment(fromDate).format('MMM YYYY')
        const toDate = new Date(d.to)
        const now = new Date()
        let months
        res+=from
        if(d.current){
            res+=' - Present'
            months = ((now.getFullYear() - fromDate.getFullYear()) * 12)+(now.getMonth() - fromDate.getMonth()+ 1);
            
            res+=' : '+months+" Months"
        }
        else{
            const to= moment(toDate).format('MMM YYYY')
            res+=" - "+to;
            months = ((toDate.getFullYear() - fromDate.getFullYear()) * 12)+(toDate.getMonth() - fromDate.getMonth()+ 1);
            res+=' : '+months+" Months"
        }
       
        return res
    }

  return (
      <Grid container className={classes.MP_Project}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452597/idea_smlioq.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Projects
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
                    {userProfile && userProfile.profile.projects.map((item, i)=> (
                        <Grid item container
                            key={item._id}
                            className={classes.ProjectGrid}
                            sx={{
                                marginBottom:media ? '0.5rem':'1.3rem'
                            }}>
                            <Grid item container
                                className={classes.ProjectData}
                                >
                                <Typography variant="h6"
                                    component="div"
                                    className={classes.ProjectName}
                                    >
                                        {item.projectName}
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
                                        getProjInfo(item)
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
                                <Button href={item.projectUrl}
                                        target="_blank"
                                        color="info"
                                        className={classes.ViewButton}>
                                    View project
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

export default Project;
