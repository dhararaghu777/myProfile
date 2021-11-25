import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="Header">
            <div className="Header_logo"><Link to="/">my profile</Link></div>
            <div className="Header_nav">
                <div className="nav_item"><Link to="/signin">SignIn</Link></div>
            </div>
        </div>
    )
}

export default Header;
