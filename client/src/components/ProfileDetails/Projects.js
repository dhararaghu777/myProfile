import { Button, Card, CardActionArea, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../Spinner/Spinner';
import {makeStyles} from '@mui/styles';
import axios from '../../axios';
import {updateProject, removeProject} from '../../store/userProfileSlice';


let useStyles = makeStyles((theme)=> ({
    Projects: {
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

function Projects() {

    const classes = useStyles();

    const [load, setload] = useState(false);
    const token = useSelector((state)=>state.userInfo.token);
    const projectList = useSelector(state=> state.profileInfo.profile.projects);
    const dispatch = useDispatch();
    const [addProject, setaddProject] = useState(false);
    const [projectName, setprojectName] = useState("");
    const [projectUrl, setprojectUrl] = useState("");
    const [duration, setduration] = useState("");
    const [from, setfrom] = useState("");
    const [to, setto] = useState("");
    const [current, setcurrent] = useState(false);

    
    const closeInputList=(e)=>{
        setaddProject(false);
        setprojectName('');
        setprojectUrl('');
        setduration('');
        setfrom('');
        setto('');
        setcurrent(false); 
    }

    const onSubmitHandler = async (e)=> {
        
        setload(true);
        const data = {
            projectName: projectName,
            projectUrl: projectUrl,
            duration:duration,
            from: new Date(from),
            to: new Date(to),
            current: current
        }

        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.post('/profile/projects', data, config);
            dispatch(updateProject(data));
            setload(false);
            setaddProject(false);
        } catch (err) {
            console.log(err);
            setload(false);
            setaddProject(false);
        }
    }

    const deleteProjects= async (id)=>{
        const prjId= id;
        setload(true);
        const config = {
            headers: {
                'x-auth-token': token,
            }
        }

        try {

            const res = await axios.delete(`profile/projects/${prjId}`,config);
            dispatch(removeProject(prjId));
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
                <Typography variant="span" component="div">Project Details</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Project Name"
                            focused
                            fullWidth
                            onChange={(e)=>setprojectName(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Project URL"
                            focused
                            fullWidth
                            onChange={(e)=>setprojectUrl(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="Duration in months"
                            focused
                            fullWidth
                            onChange={(e)=>setduration(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="From Date"
                            type='date'
                            focused
                            fullWidth
                            onChange={(e)=>setfrom(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <TextField variant="filled" 
                            color='secondary'
                            label="To Date"
                            type="date"
                            focused
                            fullWidth
                            onChange={(e)=>setto(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}
                className={classes.Input}>
                <FormControl>
                    <FormControlLabel
                        control={
                        <Checkbox checked={current} 
                            onChange={(e)=>setcurrent(Boolean(e.target.checked))} name="current" />
                        }
                        label="Currently Working"
                        />
                </FormControl>
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
              className={classes.Projects}>
            <Grid item container sx={{alignItems:'center'}}>
                <Grid item sx={{flex:'0.4'}}>
                    { !addProject &&
                        <Button variant='outlined' 
                                color='primary'
                                sx={{width:'50%'}}
                                onClick={(e)=>setaddProject(true)}>
                            Add
                        </Button>
                    }
                </Grid>
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education Details Adding Section */}
                {
                    addProject && inputList
                }
                
            </Grid>
            <Grid item container sx={{marginBottom:'1rem'}}>
                {/* Education List */}
                {
                    projectList && projectList.map((item, i)=> (
                        <Grid key={item._id} item xs={12} sm={12} md={6} lg={6} >
                            <Card className={classes.Card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="div" >
                                            <Typography variant="span">Project Name:</Typography>
                                            <Typography variant='h6'
                                                        gutterBottom
                                                        component="div">
                                                {item.projectName}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Project URL:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom
                                                component="div">
                                                     <Link href={item.projectUrl}
                                                        underline='hover'
                                                        color='inherit'
                                                        target="_blank">
                                                  {item.projectUrl}
                                                  </Link> 
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">Duration (months):</Typography>
                                            <Typography variant='h6'
                                                gutterBottom
                                                component="div">
                                                 {item.duration}
                                            </Typography>
                                        </Typography>
                                        <Typography variant="div" >
                                            <Typography variant="span">From:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom 
                                                component="div">
                                                    {new Date(item.from).getFullYear()}
                                            </Typography>
                                        </Typography>
                                      { !item.current ?
                                      ( <Typography variant="div" >
                                            <Typography variant="span">To:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom 
                                                component="div">
                                                    {new Date(item.to).getFullYear()}
                                            </Typography>
                                        </Typography>):(
                                        <Typography variant="div" >
                                            <Typography variant="span">Current:</Typography>
                                            <Typography variant='h6'
                                                gutterBottom 
                                                component="div">
                                                    {String(item.current)}
                                            </Typography>
                                        </Typography>) 
                                        }
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button variant='outlined'
                                        color="fifth"
                                        className={classes.cardButton}
                                        onClick={
                                            ()=>deleteProjects(item._id)
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

export default Projects;

