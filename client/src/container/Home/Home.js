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
} from '@mui/material'
import theme from '../../components/Theme/Theme'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import UserCard from './UserCard'

const useStyles = makeStyles((theme) => ({
  Home: {
    padding: '3rem',
    [theme.breakpoints.down('sm')]: {
      padding: '1rem 0.5rem',
    },
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
}))

function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [email, setemail] = useState('')
  const [user, setuser] = useState(null)
  const [error, seterror] = useState(false)
  const [err_msg, seterr_msg] = useState('')

  const onChangeHandler = (e) => {
    setemail(e.target.value)

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
          console.log(res.data)
        })
        .catch((err) => {
          setuser(null)
          seterror(true)
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
      <Grid container item flexDirection='column' className={classes.searchSec}>
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
                label='Enter Email'
                fullWidth
                size={media ? 'small' : ''}
                sx={{}}
                onChange={onChangeHandler}
              />
            </form>
          </Grid>
          {/* <Grid  container item xs={2} sm={2}
                            className={classes.searchButton}
                            onClick={findAccount} >        
                        <SearchIcon fontSize={media ?'medium':'large'}
                                    color='primary'
                                     />
                    </Grid> */}
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
        <Grid item>{user && <UserCard user={user} />}</Grid>
      </Grid>
    </Grid>
  )
}

export default Home
