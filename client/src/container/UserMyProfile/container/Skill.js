import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Card, CardContent, CardMedia, Container, Divider, Grid, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import {useSelector} from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import {getImageUrl} from '../Components/GetImageUrl';


const useStyles = makeStyles((theme) => ({
    MP_Skill: {
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
    Paper:{
        width:'6.5rem',
        height:'6.5rem',
        [theme.breakpoints.down('sm')]:{
            width:'4rem',
            height:'4rem',
        },
       
    },
    PLImage:{
        width:'100%',
        height:'100%',
    },
    StarIcon:{
        color:'gold',
        fontSize:'1.2rem !important',
        [theme.breakpoints.down('sm')]:{
           fontSize: '0.7rem !important',
        },
    }

}))

function Skill() {

    const classes = useStyles();
    const userProfile= useSelector((state)=>state.myProfile);
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));


    const getRatings=(item)=>{
        let value=1
        switch(item.level){
            case 'Beginner':
                value =2
                break
            case 'Intermediate':
                value =3
                break
            case 'Advanced':
                value =4
                break
            case 'Expert':
                value =5
                break
            default:break
        }
        const ratings= new Array(value).fill().map((_,i)=>(
            <StarIcon key={i}
                className={classes.StarIcon}/>
        ))
        return ratings
    }
    
  return (
      <Grid container className={classes.MP_Skill}>
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
                    <img src="https://res.cloudinary.com/raghudara/image/upload/v1644142530/coding_k0ijvu.png" alt="About"
    
                    />
                </Grid>
                <Grid item>
                    <Typography variant="h5"
                                className={classes.Text_1}>
                            Technical Skills
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
                    {userProfile && userProfile.profile.skills.map((item, i)=> (
                        <Grid item 
                            sx={{
                                // padding:'0.5rem',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                            xs={6} sm={4} md={3} lg={2} 
                            key={item._id}>
                                <Grid item container
                                    sx={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Box component='div' 
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            
                                        }}
                                        className={classes.Paper}>
                                        <img src={getImageUrl(item)} alt="pl"
                                        className={classes.PLImage}/>
                                    </Box>
                                </Grid>
                                <Typography variant="subtitle1"
                                    className={classes.Subtitle1}
                                    component="div">
                                    {item.skillName}
                                </Typography>
                                <Typography variant="span"
                                    sx={{
                                        lineHeight:media?'0.5':'1.5'
                                    }}
                                    component="div"
                                    >
                                       {getRatings(item)} 
                                </Typography>
                                
                        </Grid>
                    ))}
                </Grid>
            </Grid>   
        </Grid>
      </Grid>
  );
}

export default Skill;
