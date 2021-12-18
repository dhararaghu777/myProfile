import React, {useState, useEffect} from 'react';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import {useDispatch, useSelector} from 'react-redux';
import {setProfile} from '../../store/userProfileSlice';
import { Grid } from '@mui/material';
import {makeStyles} from '@mui/styles';
import Spinner from '../../components/Spinner/Spinner';

let useStyles = makeStyles((theme)=> ({
    profile: {
        padding: '2rem 3rem',
        position: 'relative',
        
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem'
        }
    },

}))

function Profile() {

    const classes = useStyles();
    const token = useSelector(state => state.userInfo.token);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        setloading(true);
        setTimeout(()=>{
            setloading(prev=>false);
        },1500)
    }, [])

    return (
        <Grid container className={classes.profile}  >
            <ProfileInfo />
            {/* <ProfileDetails /> */}
           {loading && <Spinner /> }
        </Grid>
    )
}

export default Profile;
