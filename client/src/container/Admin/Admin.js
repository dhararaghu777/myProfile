import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles'
import { Container } from '@mui/system'
import { Button, Grid, Typography, Link, useTheme, useMediaQuery, ImageList, ImageListItem } from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Icons from './Icons';
import axios from '../../axios'
import Spinner from '../../components/Spinner/Spinner'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';

const useStyles= makeStyles((theme)=>({
    AdminMain:{
        // padding:'0 3rem'
    },
    Admin:{
        padding:'0 3rem',
        height:'500px',
        boxSizing:'border-box',
        backgroundColor:'#E8F0F2',
        clipPath: "ellipse(84% 100% at 22.8% 0%)",
        [theme.breakpoints.down('sm')]:{
            clipPath: "ellipse(100% 100% at 40% 0%)",
            padding:0,
            height:'450px',

        }
    },
    AdminPhotoMain:{
        borderRight:'2px solid #fff',
        display: "flex",
        alignItems: "center",
        justifyContent: 'flex-end',
        paddingRight: "4rem",
        [theme.breakpoints.down('sm')]:{
            border:'none',
            paddingRight: "0",
            justifyContent: 'center',
        }
    },

    AdminPhoto:{
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
    AdminDetails:{
        paddingLeft:'4rem',
        
        [theme.breakpoints.down('sm')]:{
            padding:0,
            marginTop:'-4rem !important',
            alignItems:'center',
            justifyContent:'center',
            textAlign:'center'
            
        }
    },
    lineHeight:{
        lineHeight:"1.7 !important"
    },
    DetailButtons:{
        margin:'0.5rem 0 !important',
        [theme.breakpoints.down('sm')]:{
            alignItems:'center',
            justifyContent:'center',
            // gap:'1.5rem !important'
        }
    },
    AdminName:{
        lineHeight:"1.7 !important",
        color:'#053742',
        [theme.breakpoints.down('sm')]:{
             fontSize:'1.4rem !important'
        }
    },
    AdminStatus:{
        lineHeight:"1.7 !important",
        color:'#2E4C6D',
        [theme.breakpoints.down('sm')]:{
            fontSize:'0.9rem !important'
       }
    }
}))


function Admin() {

    const classes= useStyles()
    const theme= useTheme()
    const media= useMediaQuery(theme.breakpoints.down('sm'))
    const adminData= useSelector((state)=>state.adminInfo.admin)
    const [spin, setspin] = useState(true)
    const dispatch= useDispatch()


    useEffect(async ()=>{
        if(!adminData)
            setspin(true)
        else
            setspin(false)
    },[adminData])

  return (
    <Grid container sx={{
        margin:0
    }}
    className={classes.AdminMain}>
        {spin && <Spinner/>}
        {adminData && 
        <>
        <Grid  container
                display='flex'
                alignItems='center'
                justifyContent='center'
                sx={{
                    // minHeight:'25rem',
                }}
                className={classes.Admin} >
            <Grid item container 
                xs={12} sm={5} md={5} lg={5}
                className={classes.AdminPhotoMain}>
                <Grid item className={classes.AdminPhoto}>
                    <img src={adminData.adminImage} alt='admin'/>
                </Grid>
            </Grid>
            
            <Grid item container xs={12} sm={7} md={7} lg={7}
                className={classes.AdminDetails}>
                
                <Grid item >
                    <Typography variant="h4" 
                            component="div"
                            className={classes.AdminName}>
                        {/* <span>I'm </span> */}
                        <b>{adminData.name}</b>
                    </Typography>
                    <Typography variant="subtitle1"
                            component="div"
                            className={classes.AdminStatus}>
                        {adminData.status} 😍
                    </Typography>
                </Grid>
                <Grid item container
                      sx={{
                          gap:'1.3rem'
                      }}
                      className={classes.DetailButtons}>
                    <Grid item>
                        <Button component={Link}
                                variant='outlined'
                                color='primary'
                                size={media? 'small': 'medium'}
                                href={adminData.website}>Website</Button>
                    </Grid>
                    <Grid item >
                        <Button component={Link}
                                variant='outlined'
                                color='seventh'
                                size={media? 'small': 'medium'}
                                href="https://github.com/dhararaghu777"
                                target="_blank">GitHub</Button>
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
        <Container>
            <Grid container 
                sx={{
                    padding:'3rem 0',
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                
                <Grid item  xs={12} sm={8} md={8} lg={8}
                        sx={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'center',
                            gap: media ? '1rem':'3rem'
                        }}>
                    {
                        adminData.social.map((data)=>(
                            <Grid item key={data._id}>
                                <Icons info={data}/>
                            </Grid>
                        ))
                    }
                    <Grid item>
                        <Icons info={{
                            type:'Email',
                            image:'https://res.cloudinary.com/raghudara/image/upload/v1645861402/gmail_bbzfad.png',
                            url:`mailto:${adminData.email}`
                        }}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        </>}
        
    </Grid>
  )
}

export default Admin