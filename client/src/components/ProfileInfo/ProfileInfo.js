import React, { useState, useEffect } from 'react'
// import LoadingButton from '@mui/lab/LoadingButton';
import { LoadingButton } from '@mui/lab'
import SaveIcon from '@mui/icons-material/Save'
import Avatar from '@mui/material/Avatar'
import { deepOrange, green } from '@mui/material/colors'
import axios from '../../axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  ButtonGroup,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box} from '@mui/system'
import { styled } from '@mui/material/styles'
import { useTheme } from '@emotion/react'
import Spinner from '../Spinner/Spinner'
import {
  fetchUser,
  changeUserName,
  removeProfilePic,
} from '../../store/userInfoSlice'

const Input = styled('input')({
  display: 'none',
})

let useStyles = makeStyles((theme) => ({
  profileInfo: {
    // minHeight: '20rem',
    backgroundColor: '#fff',
    padding: '0.5rem',
    borderRadius: '0.3rem',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    position: 'relative',
  },
  item: {
    padding: '1rem',
  },

  imageSection: {},

  imageBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& div': {
      maxWidth: '10rem',
      maxHeight: '13rem',
      minWidth: '8rem',
      minHeight: '11rem',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: '0.5rem',
    },
  },
  profilePic: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  filesGrid: {
    // flex: 1,
    [theme.breakpoints.down('sm')]: {
      paddingTop: '1.5rem !important',
    },
  },
  filesStack: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },

  fileButtons: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  buttonBox: {
    width: '50%',
    padding: '0.3rem 0',
    '& button': {
      color: 'white',
      marginRight: '0.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '& span': {
        display: 'inline-block',
        width: '100%',
        color: 'white',
        marginBottom: '0.8rem',
      },
    },
  },
}))

function ProfileInfo() {
  const classes = useStyles()

  const theme = useTheme()
  const media = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useDispatch()
  const [edit, setedit] = useState(false)
  const token = useSelector((state) => state.userInfo.token)
  const user = useSelector((state) => state.userInfo.user)
  const profile = useSelector((state) => state.profileInfo.profile)
  const [name, setname] = useState(user.name)
  const [loading, setloading] = useState(false)
  const [photo, setphoto] = useState()
  const [heading, setheading] = useState()

  const alternatePic =
    'https://res.cloudinary.com/raghudara/image/upload/v1638719809/programmer_agkrsx.png'

  //store file
  const handlePhoto = (e) => {
    const image = e.target.files[0]
    const maxSize = 1024 * 1024
    if (image.size > maxSize) {
      alert('Please select a image less than 1 MB')
      return
    }
    setphoto(image);
    console.log("image",image);
  }

  //upload profilepic
  const submitPic = async (e) => {
    e.preventDefault()

    setloading(true)

    const form = new FormData()
    form.append('profile', photo, 'profile')

    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/profilePic', form, config)
      console.log(res.data)

      dispatch(fetchUser(token))

      setloading((prev) => false)
      setphoto(null)
    } catch (err) {
      console.log(err)
      setloading((prev) => false)
      setphoto(null)
    }
  }

  //update user's name
  const updateUser = async (e) => {
    setloading(true)
    const config = {
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    }

    const data = {
      name: name,
      heading: heading,
    }

    try {
      const res = await axios.post('/users/name', data, config)
      setedit(false)

      dispatch(changeUserName(data))
      setloading((prev) => false)
    } catch (err) {
      setloading((prev) => false)
      setedit(false)
      console.log(err)
    }
  }

  //remove profile pic
  const deleteProfilePic = async () => {
    setloading(true)
    const config = {
      headers: {
        'x-auth-token': token,
      },
    }

    try {
      const res = await axios.post('/users/remove', {}, config)

      dispatch(removeProfilePic())
      setloading(false)
    } catch (err) {
      console.log(err)
      setloading(false)
    }
  }

  return (
    <Grid container className={classes.profileInfo}>
      <Grid item xs={12} sm={12} md={5} className={classes.item}>
        <Grid container className={classes.imageSection} spacing={1}>
          <Grid item xs={12} sm={6} md={6} className={classes.imageBox}>
            <div>
              <img
                src={user.image ? user.image : alternatePic}
                alt='profile'
                className={classes.profilePic}
              />
            </div>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={6}
            className={classes.filesGrid}
          >
            <Stack
              className={classes.filesStack}
              alignItems='center'
              justifyContent='center'
              spacing={2}
            >
              {/* <form encType='multipart/form-data'>
                                <input 
                                    type="file" 
                                    name="profile"
                                    onChange={handlePhoto}
                                />
                            </form> */}
              <label
                htmlFor='contained-button-file'
                className={classes.fileButtons}
              >
                <form encType='multipart/form-data'>
                  <Input
                    accept='image/*'
                    id='contained-button-file'
                    multiple
                    type='file'
                    onChange={handlePhoto}
                  />
                </form>
                <Button
                  variant='outlined'
                  component='span'
                  sx={{ width: `${media && '75%'}` }}
                >
                  {photo ? ' Added ' : 'Add Pic'}
                </Button>
              </label>
              <Button
                color='primary'
                variant='contained'
                onClick={submitPic}
                sx={{ width: `${media && '75%'}` }}
                disabled={photo == null}
              >
                Upload
              </Button>
              <Button
                color='fifth'
                variant='outlined'
                sx={{ width: `${media && '75%'}` }}
                onClick={deleteProfilePic}
              >
                Remove
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Grid item sx={{padding:'0.4rem'}}>
          <Typography sx={{color:'green'}}
                variant="caption">
            *Better upload .PNG file for your profile pic
          </Typography>
      </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={7} className={classes.item}>
        <Grid container item spacing={2} columns={12} columnSpacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              id='name'
              label='Name'
              name='name'
              defaultValue={user.name}
              onChange={(e) => setname(e.target.value)}
              InputProps={{
                readOnly: !edit,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label='Email'
              defaultValue={user.email}
              id='email'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label='User Name'
              name='username'
              defaultValue={user.username}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label='Profile URL'
              defaultValue={'www.myprofile.com/user/'+user.username}
              name='profileUrl'
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ margin: '1rem 0' }}>
          <TextField
            id='heading'
            label='Heading'
            name='heading'
            defaultValue={user.heading}
            onChange={(e) => setheading(e.target.value)}
            InputProps={{
              readOnly: !edit,
            }}
            fullWidth
          />
        </Grid>
        <Grid container item sx={{ margin: '2rem 0' }}>
          {!edit ? (
            <Button
              variant='contained'
              color='primary'
              sx={{ width: '25%' }}
              onClick={(e) => setedit(!edit)}
            >
              Edit
            </Button>
          ) : (
            <Box className={classes.buttonBox}>
              <Button variant='contained' color='primary' onClick={updateUser}>
                Update
              </Button>
              <Button
                variant='contained'
                color='fifth'
                onClick={(e) => setedit(false)}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      
      {loading && <Spinner />}
    </Grid>
  )
}

export default ProfileInfo
