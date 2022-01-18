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
import {
  updateAchievement,
  removeAchievement,
} from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Achievements: {
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

function Achievements() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [load, setload] = useState(false)
  const token = useSelector((state) => state.userInfo.token)
  const achievementsList = useSelector(
    (state) => state.profileInfo.profile.achievements
  )
  const dispatch = useDispatch()
  const [addAchievement, setaddAchievement] = useState(false)
  const [achievementName, setachievementName] = useState('')
  const [achievementDetails, setachievementDetails] = useState('')
  const [date, setdate] = useState('')

  const closeInputList = (e) => {
    setaddAchievement(false)
    setachievementName('')
    setachievementDetails('')
    setdate('')
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      name: achievementName,
      details: achievementDetails,
      date: date,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/achievements', data, config)
      dispatch(updateAchievement(res.data))
      setload(false)
      setaddAchievement(false)
    } catch (err) {
      console.log(err)
      setload(false)
      setaddAchievement(false)
    }
  }

  const deleteAchievement = async (id) => {
    const achId = id
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/achievements/${achId}`, config)
      dispatch(removeAchievement(achId))
      setload(false)
    } catch (err) {
      console.log(err)
      setload(false)
    }
  }

  const inputList = (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item container>
        <Typography variant='span' component='div'>
          Achievement Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Name'
          focused
          fullWidth
          onChange={(e) => setachievementName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Details'
          focused
          fullWidth
          multiline
          onChange={(e) => setachievementDetails(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Date'
          type='date'
          focused
          fullWidth
          onChange={(e) => setdate(e.target.value)}
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
    <Grid container className={classes.Achievements}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addAchievement && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddAchievement(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addAchievement && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {achievementsList &&
          achievementsList.map((item, i) => (
            <Grid key={item._id} item xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.Card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Name:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.name}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Details:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.details}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Date:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.date}
                      </Typography>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant='outlined'
                    color='fifth'
                    size={media ? 'small' : ''}
                    className={classes.cardButton}
                    onClick={() => deleteAchievement(item._id)}
                    sx={{
                      width: '40%',
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      {load && <Spinner />}
    </Grid>
  )
}

export default Achievements
