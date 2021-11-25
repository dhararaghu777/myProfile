import * as React from 'react';
import './UserCard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function UserCard(props) {
  return (
    <Card sx={{ maxWidth: "30rem" }}                className="Card">
      <div className="profile">
        <Avatar className="profile_pic"
            sx={{ bgcolor: deepOrange[500], width: 60, height: 60, fontSize: 35 }}
            alt="Remy Sharp"
            src="">
              {props.user.name.substring(0,1).toUpperCase()}
        </Avatar>
      </div>
      <div className="profile_name">
        <h5>{props.user.name}</h5>
      </div>
      <div className="profile_email">
        <p>{props.user.email}</p>
      </div>
      <Button className="profile_button" size="large">View Profile</Button>
    </Card>
  );
}
