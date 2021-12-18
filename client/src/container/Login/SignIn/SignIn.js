import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../../../axios';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../../../store/userInfoSlice';
import './SignIn.css';
import { NavLink,useLocation, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        Raghu Dara
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
//------------------------------------

//SingIn function

export default function SignIn() {

  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.userInfo.user);
  // const location = useLocation();

  const [error, seterror] = React.useState("");

  const dispatch = useDispatch();


  // login function
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    //user details
    const details = {
      email: data.get('email'),
      password: data.get('password'),
    }

    // login api call
    axios.post('/login', details)
    .then((res) => {
        seterror("");
        dispatch(setToken(res.data.token));
        Cookies.set('token', res.data.token, {expires: 1});
        navigate(`/`);
       
    })
    .catch((err)=>{
      console.log(err.response);
      if(err.response)
      {
        seterror(err.response.data.errors[0].msg);
      }
      
    })
  };

  return (
    <ThemeProvider theme={theme} className="SignIn">
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <div className="error_msg">{error}</div>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link  variant="body2">
                  <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}