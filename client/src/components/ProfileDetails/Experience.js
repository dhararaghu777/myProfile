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
  removeExperience,
  updateExperience,
} from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Experience: {
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

function Experience() {
  const classes = useStyles()

  const [load, setload] = useState(false)
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const token = useSelector((state) => state.userInfo.token)
  const experienceList = useSelector(
    (state) => state.profileInfo.profile.experience
  )
  const dispatch = useDispatch()
  const [addExperience, setaddExperience] = useState(false)
  const [company, setcompany] = useState('')
  const [location, setlocation] = useState('')
  const [position, setposition] = useState('')
  const [from, setfrom] = useState('')
  const [yoe, setyoe] = useState('')
  const [to, setto] = useState('')
  const [current, setcurrent] = useState(false)

  const closeInputList = (e) => {
    setaddExperience(false)
    setcompany('')
    setlocation('')
    setyoe('')
    setfrom('')
    setto('')
    setcurrent(false)
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      companyName: company,
      location: location,
      position: position,
      yoe: yoe,
      from: new Date(from),
      to: new Date(to),
      current: current,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/experience', data, config)
      dispatch(updateExperience(res.data))
      setload(false)
      setaddExperience(false)
    } catch (err) {
      
      setload(false)
      setaddExperience(false)
    }
  }

  const deleteExperience = async (id) => {
    const expId = id
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/experience/${expId}`, config)
      dispatch(removeExperience(expId))
      setload(false)
    } catch (err) {
     
      setload(false)
    }
  }

  const inputList = (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item container>
        <Typography variant='span' component='div'>
          Experience Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Company'
          focused
          fullWidth
          onChange={(e) => setcompany(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Position'
          focused
          fullWidth
          onChange={(e) => setposition(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Location'
          focused
          fullWidth
          onChange={(e) => setlocation(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Years of Experience'
          focused
          fullWidth
          error={/^([\d]+)([\.]{0,1})([\d]*)$/.test(yoe)===true ? false : true}
          helperText={/^([\d]+)([\.]{0,1})([\d]*)$/.test(yoe) ? '' : 'please enter valid experience'}
          onChange={(e) => setyoe(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='From Date'
          type='date'
          focused
          fullWidth
          onChange={(e) => setfrom(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='To'
          type='date'
          focused
          fullWidth
          onChange={(e) => setto(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={current}
                onChange={(e) => setcurrent(Boolean(e.target.checked))}
                name='current'
              />
            }
            label='Currently Working'
          />
        </FormControl>
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
    <Grid container className={classes.Experience}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addExperience && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddExperience(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addExperience && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {experienceList &&
          experienceList.map((item, i) => (
            <Grid key={item._id} item xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.Card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Position:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.position}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Company:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.companyName}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>
                        Years Of Experience:
                      </Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.yoe}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Location:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.location}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>From:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {new Date(item.from).getFullYear()}
                      </Typography>
                    </Typography>
                    {!item.current ? (
                      <Typography variant='div' className={classes.Text}>
                        <Typography variant='span'>To:</Typography>
                        <Typography variant='h6' gutterBottom>
                          {new Date(item.to).getFullYear()}
                        </Typography>
                      </Typography>
                    ) : (
                      <Typography variant='div' className={classes.Text}>
                        <Typography variant='span'>Current:</Typography>
                        <Typography variant='h6' gutterBottom>
                          {String(item.current)}
                        </Typography>
                      </Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant='outlined'
                    color='fifth'
                    className={classes.cardButton}
                    size={media ? 'small' : ''}
                    onClick={() => deleteExperience(item._id)}
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

export default Experience
