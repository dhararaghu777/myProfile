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
  InputLabel,
  Link,
  MenuItem,
  Select,
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
import { updateSkill, removeSkill } from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Skills: {
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

function Skills() {
  const classes = useStyles()
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const [load, setload] = useState(false)
  const token = useSelector((state) => state.userInfo.token)
  const skillList = useSelector((state) => state.profileInfo.profile.skills)
  const dispatch = useDispatch()
  const [addSkill, setaddSkill] = useState(false)
  const [skillName, setSkillName] = useState('')
  const [level, setlevel] = useState('')

  const closeInputList = (e) => {
    setaddSkill(false)
    setSkillName('')
    setlevel('')
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      skillName: skillName,
      level: level,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/skills', data, config)
      console.log('Updated Skills', res.data)
      dispatch(updateSkill(res.data))
      setload(false)
      setaddSkill(false)
    } catch (err) {
      console.log(err)
      setload(false)
      setaddSkill(false)
    }
  }

  const deleteSkill = async (id) => {
    const skillId = id
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/skills/${skillId}`, config)
      dispatch(removeSkill(skillId))
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
          Skill Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Skill Name'
          focused
          fullWidth
          onChange={(e) => setSkillName(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Skill Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            color='secondary'
            value={level}
            label="skill level"
            onChange={(e) => setlevel(e.target.value)}
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value='Advanced'>Advanced</MenuItem>
            <MenuItem value='Expert'>Expert</MenuItem>
          </Select>
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
    <Grid container className={classes.Skills}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addSkill && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddSkill(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addSkill && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {skillList &&
          skillList.map((item, i) => (
            <Grid key={item._id} item xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.Card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Skill Name:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.skillName}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Skill Level:</Typography>
                      <Typography variant='h6' gutterBottom>
                        <Link
                          href={item.level}
                          underline='hover'
                          color='inherit'
                          target='_blank'
                        >
                          {item.level}
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
                    onClick={() => deleteSkill(item._id)}
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

export default Skills
