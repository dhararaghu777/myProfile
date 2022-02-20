import React, {} from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import {useSelector} from 'react-redux'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const useStyles = makeStyles((theme) => ({
    About: {
        padding:'3rem 8rem',
        minHeight:'15rem',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'#efce',

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
        textAlign: 'justify',
        [theme.breakpoints.down('sm')]:{
            fontSize: '0.9rem !important',
        }
    }
}))

function About() {

    const classes = useStyles();
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));
    const userProfile= useSelector((state)=>state.myProfile);

  return (
      <Grid container className={classes.About}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1643452595/notepad_lrudaq.png" alt="About"
                    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            About
                    </Typography>
                </Grid>
                
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Divider variant="fullWidth"
                        sx={{
                            marginTop:'0.2rem',
                            marginBottom: media?'0.5rem':'0.8rem'
                        }}
                    />
            </Grid>
            
            <Grid item 
                sx={{
                    padding:'0 0.5rem'
                    }}
                xs={12} sm={12} md={12}>
                <Typography className={classes.Text_2} >
                    {userProfile.profile.about}
                </Typography>
            </Grid>
        </Grid>
      </Grid>
  );
}

export default About;
