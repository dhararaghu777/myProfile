import React from 'react'
import {makeStyles} from '@mui/styles'
import { Container } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const useStyles=makeStyles((theme)=>({
    Footer:{
        background:'#151515e6',
        color:'#fff',
        height:'3rem',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        position:'fixed',
        left:0,
        right:0,
        bottom:0,
        [theme.breakpoints.down('sm')]: {
            // height:'3rem !important',
            
          },
    },
    Owner:{
        color:'#fff',
        '& a':{
            cursor:'pointer !important',
        }
    }
}))

function Footer() {

    const classes= useStyles()

  return (
    <Grid container className={classes.Footer} >
        <Grid item xs={12} sm={4} md={4} ls={4} 
            sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }} >
            <Typography variant="subtitle2">
                {`Copyright © `}
                <Typography variant="subtitle2" 
                            className={classes.Owner}
                            component={Link}
                            to='/admin'>
                    {`Raghu Dara`} 
                </Typography>
                {` ${new Date().getFullYear()}`}
            </Typography>
        </Grid>
    </Grid>
  )
}

export default Footer


