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
        borderRadius: '0.5rem',
        '&:hover':{
            cursor: "pointer",
            // transition:'all 0.250s linear',
            // transform:'scale(1.05)',
            // border: '1px solid #fff',
        
        },
        [theme.breakpoints.down('sm')]:{
            padding:'0',
            // '&:hover':{
            //     transition:'none',
            //     border: 'none',
            //     transform:'scale(1)'
            // }
        }
        
    },
    SpaceDiv:{
      marginBotton: '70px'
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
            sx={{marginRight:'1.5rem'}}
            className={classes.content}>
                Home
            </Typography>
            <Typography 
                component="div"
                sx={{marginRight:'1.5rem'}}
                className={classes.content}>
                Admin
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
