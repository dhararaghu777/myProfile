import { Button, Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {makeStyles} from '@mui/styles';
import axios from '../../axios';
import {updateMobile, removeMobile} from '../../store/userProfileSlice';


let useStyles = makeStyles((theme)=> ({
    Mobile: {
        padding: '0.8rem 1rem',
        backgroundColor:'#fff',
        marginTop:'1rem',
        flexDirection:'column',
        // borderRadius: '0.3rem',
        // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        position: 'relative',


    },

    Card: {
        padding: '0.5rem',
        margin: '0.5rem',
        '& span': {

        },
        '& div div': {
            fontSize:'1rem',
        },
        '&  div button': {
            
        }
    },
    Input: {
        flex:1
    }
}))

function Mobile() {

    const classes = useStyles();

    const [load, setload] = useState(false);
    const token = useSelector((state)=>state.userInfo.token);
    const mobileObj = useSelector(state=> state.profileInfo.profile.mobile);
    const dispatch = useDispatch();
    const [addMobile, setaddMobile] = useState(false);
    const [primary, setprimary] = useState("");
    const [secondary, setsecondary] = useState("");
    

    
    const closeInputList=(e)=>{
        setaddMobile(false);
        setprimary("");
        setsecondary('');
    }

    const onSubmitHandler = async (e)=> {
        
        setload(true);
        const data = {
            primary:primary,
            secondary:secondary
        }

        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.post('/profile/mobile', data, config);
            dispatch(updateMobile(data));
            setload(false);
            setaddMobile(false);
        } catch (err) {
            console.log(err);
            setload(false);
            setaddMobile(false);
        }
    }

    const deleteMobile= async ()=>{
      
        setload(true);
        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.delete(`profile/mobile/${0}`,config);
            dispatch(removeMobile());
            setload(false);
        }
        catch(err){
            console.log(err);
            setload(false);
        }
        
    }


    const inputList = (
        <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item container>
                <Typography variant="span" component="div">Mobile Numbers</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Primary Number"
                            focused
                            fullWidth
                            onChange={(e)=>setprimary(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Secondary Number"
                            focused
                            fullWidth
                            onChange={(e)=>setsecondary(e.target.value)}/>
            </Grid>
            
            <Grid item container >
                <Button variant='outlined'
                        sx={{marginRight:'1rem'}}
                        onClick={onSubmitHandler}>Submit</Button>
                <Button variant='outlined'
                        color="fifth"
                        onClick={closeInputList}
                        >Cancel</Button>
            </Grid>
        </Grid>
    )

    return (
        <Grid container
              className={classes.Skills}>
            <Grid item container sx={{alignItems:'center'}}>
                <Grid item sx={{flex:'0.4'}}>
                    { !addMobile &&
                        <Button variant='outlined' 
                                color='primary'
                                sx={{width:'50%'}}
                                onClick={(e)=>setaddMobile(true)}>
                            Add
                        </Button>
                    }
                </Grid>
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education Details Adding Section */}
                {
                    addMobile && inputList
                }
                
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education List */}
                {
                    mobileObj && (
                        <Grid  item xs={12} sm={12} md={6} lg={6} >
                            <Card className={classes.Card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="div" >
                                            <Typography variant="span">Primary Number:</Typography>
                                            <Typography variant='h6'
                                                        gutterBottom
                                                        component="div">
                                                {mobileObj.primary}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Secondary Number:</Typography>
                                            <Typography variant='h6'
                                                        gutterBottom
                                                        component="div">
                                                {mobileObj.secondary}
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant='outlined'
                                        color="fifth"
                                        className={classes.cardButton}
                                        onClick={
                                            ()=>deleteMobile()
                                        }
                                        sx={{
                                            width:'40%'}}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    
                    )
                }
                
            </Grid>
            {load && <Spinner/>}
        </Grid>
        
    )
}

export default Mobile;
