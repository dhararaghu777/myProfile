import React, {useState, useEffect} from 'react';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import './Profile.css';
import ProfileDetails from '../../components/ProfileDetails/ProfileDetails';
import {useDispatch, useSelector} from 'react-redux';
import {setProfile} from '../../store/userProfileSlice';


function Profile() {

    const token = useSelector(state => state.userInfo.token);

    useEffect(()=>{

        
    })

    return (
        <div className = "Profile">
            <div className="profile_section">
                <ProfileInfo />
                <ProfileDetails />
            </div>
            <div className="skill_section">

            </div>
            <div className="exprerience_section">

            </div>
            <div className="projects_section">

            </div>

        </div>
    )
}

export default Profile;
