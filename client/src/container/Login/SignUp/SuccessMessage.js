import { Button, Grid, Link, Typography, useTheme, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Container } from '@mui/system'
import React from 'react'


const useStyles= makeStyles((theme)=>({
    SuccessGrid:{
        width: "20rem",
        height: "12rem",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor:'#fff',
        borderRadius:'1rem',
        [theme.breakpoints.down('sm')]:{
            width: "15rem",
            height: "10rem",
            borderRadius:'0.7rem',
        }
    }
}))

function SuccessMessage({close,spinner}) {

    const classes= useStyles()
    const theme= useTheme()
    const media= useMediaQuery(theme.breakpoints.down('sm'))

    const closeHandler=()=>{
        spinner(true)
        close(false)
        setTimeout(()=>{
            spinner(false)
        }, 1000)
    }

  return (
    <Grid container sx={{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        inset:0,
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        zIndex:100,

    }}>
        <Grid Container sx={{
            flexDirection:'column',
            gap:'0.8rem'
        }}
            className={classes.SuccessGrid}>
            <Grid item >
                <Typography component='div'
                            variant={media ? 'subtitle2':"subtitle1"}
                            >
                    Successfully Registered 👌😍
                </Typography>
            </Grid>
            <Grid item container sx={{
                alignItems:'center',
                justifyContent:'center',
                gap:'0.5rem'
            }}>
                <Button component={Link}
                        href="/"
                        color='primary'
                        variant='contained'
                        size={media ? 'small':'medium'}
                        onClick={closeHandler}>
                    Go Home
                </Button>
                <Button component={Link}
                        href="/signin"
                        color='secondary'
                        variant='contained'
                        size={media ? 'small':'medium'}
                        onClick={closeHandler}>
                    Sign In
                </Button>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default SuccessMessage