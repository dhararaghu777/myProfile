import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import {makeStyles} from '@mui/styles';
import { Button, Container, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import {NavLink} from 'react-router-dom';
const useStyles= makeStyles((theme) => ({

    AppBar: {
      
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 1.5rem',

        [theme.breakpoints.down('sm')]:{
            margin:'0'
        }
    },
    MyLogo:{
        flex:1,
        position: 'relative',
        
        '&:hover':{
            cursor: "pointer",
            
        }
    },
    content:{
        padding:'0 0.5rem',
        marginLeft:'1.5rem !important',
        '&:hover':{
            cursor: "pointer",
        
        },
        [theme.breakpoints.down('sm')]:{
            padding:'0',
        }
        
    },
    SpaceDiv:{
      marginBotton: '70px'
    },
    NavLink:{
      textTransform: "capitalize",
      textDecoration: "none",
      color: "inherit",
      
    }
}))

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Header(props) {

const classes= useStyles();


  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className={classes.AppBar} 
          sx={{backgroundColor:'#222831'}}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" 
                component="div"
                className={classes.MyLogo}
                color="white">
              My Profile
            </Typography>
            <Typography 
            component="div"
            sx={{}}
            className={classes.content}>
                <NavLink to="/" 
                  className={classes.NavLink}>Home</NavLink>
            </Typography>
            <Typography 
                component="div"
                sx={{}}
                className={classes.content}>
                <NavLink to="/admin"
                  className={classes.NavLink} >Admin</NavLink>
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
