import React from 'react';
import './ProfileDetails.css';
import {useDispatch, useSelector} from 'react-redux';

function ProfileDetails() {
    return (
        <div className="profile_details">
            <div className="name">
                <input type="text" name="name" className="" />
            </div>
        </div>
    )
}

export default ProfileDetails;
