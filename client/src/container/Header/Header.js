import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Button,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import AccountMenu from './AccountMenu'
import Drawer from './Drawer'

let useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
  },
  logo: {
    flex: 1,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '800',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',

    '& button, & a': {
      textTransform: 'none',
      fontSize: '1.05rem',
      borderRadius: '0.5rem',
      color: 'white',
      margin: '0 0.5rem',
    },
  },

  tab: {},
}))

function Header() {
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const location = useLocation()
  const user = useSelector((state) => state.userInfo.user)
  const classes = useStyles()

  const navbar = (
    <>
      <Box className={classes.tabs}>
        <Button
          component={Link}
          to='/'
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to='/admin'
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Admin
        </Button>
        {user ? (
          <AccountMenu />
        ) : (
          <Button
            component={Link}
            to='/signin'
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            SignIn
          </Button>
        )}
      </Box>
    </>
  )

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography
          className={classes.logo}
          component={Link}
          to='/'
          variant='h5'
        >
          My Profile
        </Typography>

        {media ? <Drawer /> : navbar}
      </Toolbar>
    </AppBar>
  )
}

export default Header
