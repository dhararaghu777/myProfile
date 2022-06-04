import { ClassNames } from '@emotion/react'
import { Grid, Link, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles=makeStyles((theme)=>({
    Icons:{
        width:'2.5rem',
        height:'2.5rem',
        [theme.breakpoints.down('sm')]:{
            width:'2rem',
            height:'2rem',
        }
    },
    ImageIcon:{
        width:'2.5rem',
        height:'2.5rem',
        [theme.breakpoints.down('sm')]:{
            width:'2rem',
            height:'2rem',
        },
        '& img':{
            width:'100%',
            height:'100%',
            objectFit:'cover',
        }
    }
}))

function Icons({info}) {

    const classes= useStyles()

  return (
    <Grid container 
        className={ClassNames.Icons}>
        <Tooltip title={info.type}>
            <Grid item className={classes.ImageIcon}
                  component={Link}
                  href={info.url}
                  target="_blank" >
                <img src={info.image} alt=""/>
            </Grid>
        </Tooltip>
    </Grid>
  )
}

export default Icons