import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../axios'
import { setMyProfile } from '../../store/myProfileSlice';
import Header from './container/Header';
import { Container, Grid } from '@mui/material';
import {makeStyles} from '@mui/styles'
import First from './container/First';
import Spinner from '../../components/Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
    UserMyProfile: {
      position: 'relative',
    },
    SubGrid:{

    }
}))

function UserMyProfile() {

  const classes = useStyles();
  const params = useParams()
  const dispatch = useDispatch();
  const [userData, setuserData] = useState(false);

  // Access user data
  useEffect(() => {
    const { username } = params
    const data = {
      username: username,
    }

    axios
      .post('/myprofile', data)
      .then((res) => {
        console.log(res.data)
        dispatch(
          setMyProfile({
            user: res.data.user,
            profile: res.data.profile,
          })
        )
        setuserData(true);
      })
      .catch((err) => {
        console.log('error execting');
        setuserData(false);
      })
  }, [])

  return (
      <Grid container className={classes.UserMyProfile}>
          <Header />
          {
            userData? (
              <>
                <First/>
              </>
            ):<Spinner/>
          }
      </Grid>
      )
}

export default UserMyProfile;
