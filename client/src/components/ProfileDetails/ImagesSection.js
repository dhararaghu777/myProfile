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
import { updateImage, removeImage } from '../../store/userProfileSlice'

let useStyles = makeStyles((theme) => ({
  Images: {
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
  Info: {
    fontSize: '0.9rem',
    color: 'green',
  },
  SubInfo: {
    fontSize: '0.8rem',
    color: 'green',
  },
}))

function Images() {
  const classes = useStyles()

  const [load, setload] = useState(false)
  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))
  const token = useSelector((state) => state.userInfo.token)
  const imagesList = useSelector(
    (state) => state.profileInfo.profile.extra.personalImages
  )
  const dispatch = useDispatch()
  const [addImage, setaddImage] = useState(false)
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [image, setimage] = useState('')

  const closeInputList = (e) => {
    setaddImage(false)
    setname('')
    setdescription('')
    setimage('')
  }

  const onSubmitHandler = async (e) => {
    setload(true)
    const data = {
      name: name,
      description: description,
      image: image,
    }

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profile/extraImage', data, config)
      dispatch(updateImage(res.data))
      setload(false)
      setaddImage(false)
    } catch (err) {
      setload(false)
      setaddImage(false)
    }
  }

  const deleteImage = async (id) => {
    const imgId = id
    setload(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.delete(`profile/extraImage/${imgId}`, config)
      dispatch(removeImage(imgId))
      setload(false)
    } catch (err) {

      setload(false)
    }
  }

  const inputList = (
    <Grid container columnSpacing={2} rowSpacing={2}>
      <Grid item container>
        <Typography variant='span' component='div'>
          Image Details
        </Typography>
      </Grid>
      <Grid item container direction='column'>
        <div className={classes.Info}>
          You can use <a href="https://cloudinary.com/invites/lpov9zyyucivvxsnalc5/eficcrbbaafjmpusmhfj?t=default" target="_blank"  rel="noreferrer">Cloudinary</a> website to store photos online free
        </div>

      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Heading'
          focused
          fullWidth
          onChange={(e) => setname(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Details'
          focused
          fullWidth
          onChange={(e) => setdescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className={classes.Input}>
        <TextField
          variant='filled'
          color='secondary'
          label='Image URL'
          focused
          fullWidth
          onChange={(e) => setimage(e.target.value)}
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
    <Grid container className={classes.Images}>
      <Grid item container sx={{ alignItems: 'center' }}>
        <Grid item sx={{ flex: '0.4' }}>
          {!addImage && (
            <Button
              variant='outlined'
              color='primary'
              sx={{ width: '50%' }}
              size={media ? 'small' : ''}
              onClick={(e) => setaddImage(true)}
            >
              Add
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education Details Adding Section */}
        {addImage && inputList}
      </Grid>
      <Grid item container sx={{ marginBottom: '1rem' }}>
        {/* Education List */}
        {imagesList &&
          imagesList.map((item, i) => (
            <Grid key={item._id} item xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.Card}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Heading:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.name}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Details:</Typography>
                      <Typography variant='h6' gutterBottom>
                        {item.description}
                      </Typography>
                    </Typography>
                    <Typography variant='div' className={classes.Text}>
                      <Typography variant='span'>Image URL:</Typography>
                      <Typography variant='h6' gutterBottom>
                        <Link
                          href={item.skillImage}
                          underline='hover'
                          color='inherit'
                          target='_blank'
                        >
                          {item.image}
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
                    onClick={() => deleteImage(item._id)}
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

export default Images
