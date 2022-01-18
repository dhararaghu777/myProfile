import * as React from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { userLogout } from '../../store/userInfoSlice'
import { profileLogout } from '../../store/userProfileSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const getData = (user) => {
  const signIn = {
    name: 'SignIn',
    url: '/signin',
    icon: <LoginIcon />,
  }
  const profile = {
    name: 'Profile',
    url: `/${user && user.username}`,
    icon: <AccountCircleIcon />,
  }

  const routerData = [
    {
      name: 'Home',
      url: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'Admin',
      url: '/admin',
      icon: <ManageAccountsIcon />,
    },
    user ? profile : signIn,
  ]

  return routerData
}

export default function SwipeableTemporaryDrawer() {
  const user = useSelector((state) => state.userInfo.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const routerData = getData(user)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const logoutHandler = () => {
    try {
      Cookies.remove('token')
      dispatch(userLogout())
      dispatch(profileLogout())
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {routerData.map((text, index) => (
          <ListItem button key={index} component={Link} to={`${text.url}`}>
            <ListItemIcon>{text.icon}</ListItemIcon>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user && (
        <List>
          <ListItem button key={0} onClick={logoutHandler}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      )}
    </Box>
  )

  return (
    <div>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
        onClick={toggleDrawer('right', true)}
      >
        <MenuIcon sx={{ fontSize: '2rem' }} />
      </IconButton>
      <SwipeableDrawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </div>
  )
}
