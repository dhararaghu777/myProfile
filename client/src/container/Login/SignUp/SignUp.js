import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from '../../../axios'
import { makeStyles } from '@mui/styles'
import HomeIcon from '@mui/icons-material/Home'

const useStyles = makeStyles((theme) => ({
  errorMsg: {
    padding: '0.5rem 0',
    color: 'red',
  },
  link1: {
    // textDecoration:'none',
  },
  link2: {
    // textDecoration:'none',
    color: '#E63946',
  },
}))

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit'>Raghu Dara</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()
//-----------------------------------------

//SingUp
export default function SignUp() {
  const classes = useStyles()
  const navigate= useNavigate()
  const [status, setstatus] = React.useState('')
  const [error, seterror] = React.useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      fullname: data.get('fullname'),
    })

    const details = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('fullname'),
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    axios
      .post('/signin', details, config)
      .then((res) => {
        console.log(res.data)
        setstatus(res.data.response)
        seterror('')
        //add spinner and successfull template before navigate to Home page
        navigate('/signin')
      })
      .catch((err) => {
        console.log(err.response.data.errors[0].msg)
        seterror(err.response.data.errors[0].msg)
        setstatus('')
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {error && <div className={classes.errorMsg}>{error}</div>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete='given-name'
                  name='fullname'
                  required
                  fullWidth
                  id='firstName'
                  label='Full Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <Typography variant='body2' color='primary'>
                  <NavLink to='/' className={classes.link1}>
                    Go home
                  </NavLink>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='body2' color='fifth'>
                  <NavLink to='/signin' className={classes.link2}>
                    Already have an account? Sign in
                  </NavLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
