import React, { useState, useEffect } from 'react'
import { TiArrowRightThick } from 'react-icons/ti'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import axios from '../../axios'
import {
  Button,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
  Divider,
} from '@mui/material'
import theme from '../../components/Theme/Theme'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import UserCard from './UserCard'
import Spinner from '../../components/Spinner/Spinner'
import LeftCard from './LeftCard'
import RightCard from './RightCard'
import {cardData} from './cardData'


const useStyles = makeStyles((theme) => ({
  Home: {
    // backgroundImage:'url("https://res.cloudinary.com/raghudara/image/upload/v1653225476/background_z2w3tb.jpg")',
    backgroundSize:'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    padding: '3rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
    // minHeight:'calc(100vh - 7rem)',
    // [theme.breakpoints.down('sm')]: {
    //   minHeight:'calc(100vh - 6.5rem)',
    // },
  },
  searchSec: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
      '& svg': {
        color: '#E63946',
      },
    },
  },
  UserCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Divider:{
    margin:'3rem 0 !important',
    alignItems:'center',
    justifyContent:'center',
    '& hr':{
      width:'0%'
    },
    [theme.breakpoints.down('sm')]:{
      margin:'1rem 0 !important'
    }
  },
  Label:{
    [theme.breakpoints.down('sm')]:{
      '& label':{
        fontSize:'0.8rem !important'
      }
    }
  }
}))

function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [email, setemail] = useState('')
  const [user, setuser] = useState(null)
  const [error, seterror] = useState(false)
  const [err_msg, seterr_msg] = useState('')
  const [spin, setspin] = useState(false)

  const onChangeHandler = (e) => {
    setemail(e.target.value)
    setuser(null)
    seterror(false)
  }

  // validate email
  const validateEmail = (data) => {
    const myEmail = /^[A-z0-9._%+-]+@[A-Z0-9.-]+\.[A-z]{2,}$/i

    if (!myEmail.test(data)) {
      return false
    } else {
      return true
    }
  }

  // find User Account
  const findAccount = (e) => {
    e.preventDefault()

    if (email !== '' && validateEmail(email)) {
      setspin(true)
      const data = {
        email: email,
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      }
      axios
        .post('/users', data, config)
        .then((res) => {
          setuser(res.data)
          seterror(false)
          setspin(false)
        })
        .catch((err) => {
          setuser(null)
          seterror(true)
          setspin(false)
          seterr_msg('Invalid Email Address')
        })
    } else {
      seterror(true)
      if (email === '') seterr_msg('Email is required')
      else seterr_msg('Invalid Email Address')
    }
  }

  return (
    <Grid container className={classes.Home}>
      <Grid  item container flexDirection='column' className={classes.searchSec}>
        <Grid
          container
          item
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            width: media ? '80%' : '50%',
          }}
        >
          <Grid item xs={10} sm={10}>
            <form onSubmit={findAccount}>
              <TextField
                variant='outlined'
                label='Enter email and press enter'
                fullWidth
                size={media ? 'small' : ''}
                sx={{}}
                className={classes.Label}
                onChange={onChangeHandler}
              />
            </form>
          </Grid>
        </Grid>
        {error && (
          <Grid item>
            <Typography sx={{ color: '#E63946', marginTop: '1rem' }}>
              *{err_msg}
            </Typography>
          </Grid>
        )}
      </Grid>
      
      <Grid
        item
        container
        className={classes.UserCard}
        sx={{
          margin: media ? '2rem 0 0' : '3rem 0 0',
        }}
      >
        {spin && <Spinner/>}
        <Grid item>{user && <UserCard user={user} />}</Grid>
      </Grid>
      <Grid item container sx={{
            alignItems:'center',
          }}>
          <Grid item container
                className={classes.Divider}>
            <Divider variant='middle'/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}  
                sx={{
                  alignItems:'center',
                  justifyContent:'center',
                }} >
              <LeftCard card={cardData[0]}/>
          </Grid>
          <Grid item container
                className={classes.Divider}>
            <Divider variant='middle'/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}  
                sx={{
                  alignItems:'center',
                  justifyContent:'center',
                }} >
              <RightCard card={cardData[1]}/>
          </Grid>
          <Grid item container
                className={classes.Divider}>
            <Divider variant='middle'/>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}  
                sx={{
                  alignItems:'center',
                  justifyContent:'center',
                }} >
              <LeftCard card={cardData[2]}/>
          </Grid>
          <Grid item container
                className={classes.Divider}>
            <Divider variant='middle'/>
          </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
