import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { makeStyles } from '@mui/styles'
import axios from '../../axios'
import { updateSocial, removeSocial } from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Social: {
    padding: '0.8rem 1rem',
    backgroundColor: '#fff',
    marginTop: '1rem',
    flexDirection: 'column',
    // borderRadius: '0.3rem',
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    position: 'relative',
  },

  Card: {
    padding: '0.5rem',
    margin: '0.5rem',
    '& span': {},
    '& div div': {
      fontSize: '1rem',
    },
    '&  div button': {},
  },
  Input: {
    flex: 1,
  },
  Text: {
    '& span': {
      fontSize: '0.8rem',
    },
    '& h6': {
      fontSize: '1rem',
      overflowWrap: 'break-word',
    },

    [theme.breakpoints.down('sm')]: {
      '& span': {
        fontSize: '0.7rem',
      },
      '& h6': {
        fontSize: '0.8rem',
      },
    },
  },
}))

function Social() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [load, setload] = useState(false)
  const token = useSelector((state) => state.userInfo.token)
  const socialObj = useSelector((state) => state.profileInfo.profile.social)
  const dispatch = useDispatch()
  const [addSocial, setaddSocial] = useState(false)
  const [youtube, setyoutube] = useState('')
  const [linkedIn, setlinkedIn] = useState('')
  const [facebook, setfacebook] = useState('')
  const [instagram, setinstagram] = useState('')
  const [github, setgithub] = useState('')

  const closeInputList = (e) => {
    setaddSocial(false)
    setyoutube('')
    setinstagram('')
    setlinkedIn('')
    setfacebook('')
    setgithub('')
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      youtube: youtube,
      instagram: instagram,
      facebook: facebook,
      linkedIn: linkedIn,
      github: github,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/social', data, config)
      dispatch(updateSocial(res.data))
      setload(false)
      setaddSocial(false)
    } catch (err) {
 
      setload(false)
      setaddSocial(false)
    }
  }

  const deleteSocial = async () => {
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/social/${0}`, config)
      dispatch(removeSocial())
      setload(false)
    } catch (err) {
  
      setload(false)
    }
  }

  const inputList = (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item container>
        <Typography variant='span' component='div'>
          Social Media Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='LinkedIn URL'
          focused
          fullWidth
          onChange={(e) => setlinkedIn(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='GitHub URL'
          focused
          fullWidth
          onChange={(e) => setgithub(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Instagram URL'
          focused
          fullWidth
          onChange={(e) => setinstagram(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Youtube URL'
          focused
          fullWidth
          onChange={(e) => setyoutube(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Facebook URL'
          focused
          fullWidth
          onChange={(e) => setfacebook(e.target.value)}
        />
      </Grid>

      <Grid item container>
        <Button
          variant='outlined'
          sx={{ marginRight: '1rem' }}
          onClick={onSubmitHandler}
        >
          Submit
        </Button>
        <Button variant='outlined' color='fifth' onClick={closeInputList}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  )

  return (
    <Grid container className={classes.Social}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addSocial && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddSocial(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addSocial && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {socialObj && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card className={classes.Card}>
              <CardActionArea>
                <CardContent>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>Instagram URL:</Typography>
                    <Typography variant='h6' gutterBottom>
                      <Link
                        href={socialObj.linkedIn}
                        underline='hover'
                        color='inherit'
                        target='_blank'
                      >
                        {socialObj.linkedIn}
                      </Link>
                    </Typography>
                  </Typography>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>GitHub URL:</Typography>
                    <Typography variant='h6' gutterBottom>
                      <Link
                        href={socialObj.github}
                        underline='hover'
                        color='inherit'
                        target='_blank'
                      >
                        {socialObj.github}
                      </Link>
                    </Typography>
                  </Typography>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>Youtube URL:</Typography>
                    <Typography variant='h6' gutterBottom>
                      <Link
                        href={socialObj.youtube}
                        underline='hover'
                        color='inherit'
                        target='_blank'
                      >
                        {socialObj.youtube}
                      </Link>
                    </Typography>
                  </Typography>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>Instagram URL:</Typography>
                    <Typography variant='h6' gutterBottom>
                      <Link
                        href={socialObj.instagram}
                        underline='hover'
                        color='inherit'
                        target='_blank'
                      >
                        {socialObj.instagram}
                      </Link>
                    </Typography>
                  </Typography>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>Facebook URL:</Typography>
                    <Typography variant='h6' gutterBottom>
                      <Link
                        href={socialObj.facebook}
                        underline='hover'
                        color='inherit'
                        target='_blank'
                      >
                        {socialObj.facebook}
                      </Link>
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant='outlined'
                  color='fifth'
                  className={classes.cardButton}
                  size={media ? 'small' : ''}
                  onClick={() => deleteSocial()}
                  sx={{
                    width: '40%',
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
      {load && <Spinner />}
    </Grid>
  )
}

export default Social
