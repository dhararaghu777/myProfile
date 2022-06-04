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
  useTheme,
  useMediaQuery,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { makeStyles } from '@mui/styles'
import axios from '../../axios'
import { updateAbout, removeAbout } from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Mobile: {
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

function About() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [load, setload] = useState(false)
  const token = useSelector((state) => state.userInfo.token)
  const aboutObj = useSelector((state) => state.profileInfo.profile.about)
  const dispatch = useDispatch()
  const [addAbout, setaddAbout] = useState(false)
  const [about, setabout] = useState('')

  const closeInputList = (e) => {
    setaddAbout(false)
    setabout('')
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      about: about,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/about', data, config)
      dispatch(updateAbout(res.data))
      setload(false)
      setaddAbout(false)
    } catch (err) {
      
      setload(false)
      setaddAbout(false)
    }
  }

  const deleteAbout = async () => {
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/about/${0}`, config)
      dispatch(removeAbout())
      setload(false)
    } catch (err) {
     
      setload(false)
    }
  }

  const inputList = (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item container>
        <Typography variant='span' component='div'>
          About Yourself
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='About'
          focused
          fullWidth
          onChange={(e) => setabout(e.target.value)}
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
    <Grid container className={classes.Skills}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addAbout && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddAbout(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addAbout && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {aboutObj && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Card className={classes.Card}>
              <CardActionArea>
                <CardContent>
                  <Typography variant='div' className={classes.Text}>
                    <Typography variant='span'>About Yourself:</Typography>
                    <Typography variant='h6' gutterBottom>
                      {aboutObj}
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
                  onClick={() => deleteAbout()}
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

export default About
