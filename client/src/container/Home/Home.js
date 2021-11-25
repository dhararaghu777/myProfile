import React, {useState, useEffect} from 'react';
import './Home.css';
import { TiArrowRightThick } from "react-icons/ti";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserCard from '../../components/UserCard/UserCard';
import axios from '../../axios';


function Home() {

    const [email, setemail] = useState("");
    const [user, setuser] = useState(null);
    const [error, seterror] = useState(false);
    const [err_msg, seterr_msg] = useState("")

    const findAccount = ()=>{

        const data = {
            email: email
        }

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        }
        axios.post('/users', data, config)
        .then(res=>{
            setuser(res.data);
            seterror(false);
        })
        .catch(err=>{
            setuser(null);
            seterror(true);
        });
    }

    return (
        <div className="Home">
            <div className="Home_box">
                <div className="search_container_parent">
                    <div className="search_container">
                        <div className="search_text">Search Profile Here</div>
                        <div className="search_input">
                            <TextField
                                required
                                id="outlined-required"
                                className="input"
                                label="Enter email"
                                type="email"
                                onChange={(e)=>setemail(e.target.value)} 
                            />
                            <ArrowForwardIosIcon className="icon" 
                                onClick={findAccount} />
                        </div>
                    </div>
                    
                </div>
                <div className="Home_users">
                    {
                       ( user && (
                            <UserCard user={user}/>
                        ) )
                       || 
                       ( error && 
                        <div className="error_msg">No user found with above email</div>
                       )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
