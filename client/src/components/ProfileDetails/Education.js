import { Button, Card, CardActionArea, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {makeStyles} from '@mui/styles';
import axios from '../../axios';
import {updateEducation,removeEducation} from '../../store/userProfileSlice';


let useStyles = makeStyles((theme)=> ({
    Education: {
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

function Education() {

    const classes = useStyles();

    const [load, setload] = useState(false);
    const token = useSelector((state)=>state.userInfo.token);
    const educationList = useSelector(state=> state.profileInfo.profile.education);
    const dispatch = useDispatch();
    const [addEducation, setaddEducation] = useState(false);
    const [college, setcollege] = useState("");
    const [degree, setdegree] = useState("");
    const [department, setdepartment] = useState("");
    const [yop, setyop] = useState("");
    const [percentage, setpercentage] = useState("");
    const [cgpa, setcgpa] = useState("");

    
    const closeInputList=(e)=>{
        setaddEducation(false);
        setcollege('');
        setdegree('');
        setdepartment('');
        setcgpa('');
        setpercentage('');
        setyop(''); 
    }

    const onSubmitHandler = async (e)=> {
        
        setload(true);
        const data = {
            college: college,
            degree: degree,
            yop: yop,
            percentage: percentage,
            cgpa: cgpa,
            stream: department
        }

        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.post('/profile/education', data, config);
            dispatch(updateEducation(data));
            setload(false);
            setaddEducation(false);
        } catch (err) {
            console.log(err);
            setload(false);
            setaddEducation(false);
        }
    }

    const deleteEducation= async (id)=>{
        const eduId= id;
        setload(true);
        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.delete(`profile/education/${eduId}`,config);
            dispatch(removeEducation(eduId));
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
                <Typography variant="span" component="div">Education Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Degree"
                            focused
                            fullWidth
                            onChange={(e)=>setdegree(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="College"
                            focused
                            fullWidth
                            onChange={(e)=>setcollege(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Department"
                            focused
                            fullWidth
                            onChange={(e)=>setdepartment(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input} >
                <TextField variant="filled" 
                            color='secondary'
                            label="Year of PassedOut"
                            focused
                            fullWidth
                            onChange={(e)=>setyop(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Percentage"
                            focused
                            fullWidth
                            onChange={(e)=>setpercentage(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="CGPA"
                            focused
                            fullWidth
                            onChange={(e)=>setcgpa(e.target.value)}/>
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
              className={classes.Education}>
            <Grid item container sx={{alignItems:'center'}}>
                <Grid item sx={{flex:'0.4'}}>
                    { !addEducation &&
                        <Button variant='outlined' 
                                color='primary'
                                sx={{width:'50%'}}
                                onClick={(e)=>setaddEducation(true)}>
                            Add
                        </Button>
                    }
                </Grid>
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education Details Adding Section */}
                {
                    addEducation && inputList
                }
                
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education List */}
                {
                    educationList && educationList.map((item, i)=> (
                        <Grid key={item._id} item xs={12} sm={12} md={6} lg={6} >
                            <Card className={classes.Card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="div" >
                                            <Typography variant="span">Degree:</Typography>
                                            <Typography variant='h6'
                                                        gutterBottom
                                                        component="div">
                                                {item.degree}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">College:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom
                                                component="div">
                                                    {item.college}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Year Of PassedOut:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom
                                                component="div">
                                                    {item.yop}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Department:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom
                                                component="div">
                                                    {item.stream}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Percentage:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom 
                                                component="div">
                                                    {item.percentage}%
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">CGPA:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom 
                                                component="div">
                                                    {item.cgpa}/10
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant='outlined'
                                        color="fifth"
                                        className={classes.cardButton}
                                        onClick={
                                            ()=>deleteEducation(item._id)
                                        }
                                        sx={{
                                            width:'40%'}}>Delete</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    
                    ))
                }
                
            </Grid>
            {load && <Spinner/>}
        </Grid>
        
    )
}

export default Education;

