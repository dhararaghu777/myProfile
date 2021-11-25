import React,{useState, useEffect} from 'react';
// import LoadingButton from '@mui/lab/LoadingButton';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';
import  axios from '../../axios';
import {useSelector} from 'react-redux';
import './ProfileInfo.css';




function ProfileInfo() {

    
    const token = useSelector(state => state.userInfo.token);
    const user = useSelector(state => state.userInfo.user);
    const [loading, setloading] = useState(false);
    const [photo, setphoto] = useState();

    const handlePhoto = (e)=>{
        setphoto(e.target.files[0]);
    }


    const submitPic= (e)=>{
        e.preventDefault();

        const form = new FormData();
        form.append("profile", photo, 'profile');

        const config = {
            headers: {
                'x-auth-token': token,
                'Content-type': 'application/json'
            }
        }

        axios.post('/pics/profile', form, config)
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    }



    return (
        <div className="ProfileInfo">
            <div className="profile_pic">
                <div className="image_div">
                    {/* <img src="" alt="" className="pic" /> */}
                    <Avatar sx={
                            { 
                                bgcolor: deepOrange[500], 
                                width: 120, 
                                height: 120,
                                fontSize: 100, 
                            }} variant="square">
                        {user.name.substring(0,1).toUpperCase()}
                    </Avatar>
                </div>
                
            </div>
            <div className="profile_buttons">
                <form encType='multipart/form-data'>
                    <input 
                        type="file" 
                        name="profile"
                        onChange={handlePhoto}
                    />
                </form>
                <LoadingButton
                    color="secondary"
                    onClick={submitPic}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained" >
                    Save
                </LoadingButton>
            </div>
        </div>
    )
}

export default ProfileInfo;
