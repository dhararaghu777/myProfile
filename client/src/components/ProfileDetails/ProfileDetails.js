import { Button, Grid } from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RingLoader, ClipLoader, PulseLoader, ScaleLoader, PuffLoader, HashLoader, FadeLoader, ClimbingBoxLoader} from 'react-spinners';
import Spinner from '../Spinner/Spinner';


function ProfileDetails() {

    const [load, setload] = useState(false)
    const changeHandler = ()=>{
        setload(!load);
    }

    return (
        <Grid container sx={{height:'30rem'}}>
            {/* <Grid item className="profile_details" sx={{
                background: 'lightblue',
                // width:'400px'
            }}>
                <Spinner />
                <Button>Spinner Test</Button>
                
            </Grid>
            <Grid item>
                <Button onClick={changeHandler}>Click</Button>
            </Grid> */}
        </Grid>
        
    )
}

export default ProfileDetails;
