import React, {useState, useEffect} from 'react';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import Education from '../../components/ProfileDetails/Education';
import {useDispatch, useSelector} from 'react-redux';
import {setProfile} from '../../store/userProfileSlice';
import { Grid } from '@mui/material';
import {makeStyles} from '@mui/styles';
import Spinner from '../../components/Spinner/Spinner';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Experience from '../../components/ProfileDetails/Experience';
import {useTheme, useMediaQuery} from '@mui/material';
import Projects from '../../components/ProfileDetails/Projects';
import Skills from '../../components/ProfileDetails/Skills';
import Achievements from '../../components/ProfileDetails/Achievements';
import Social from '../../components/ProfileDetails/Social';
import Mobile from '../../components/ProfileDetails/Mobile';
import ImagesSection from '../../components/ProfileDetails/ImagesSection';
import VideosSection from '../../components/ProfileDetails/VideosSection';

let useStyles = makeStyles((theme)=> ({
    profile: {
        padding: '2rem 3rem',
        position: 'relative',
        backgroundColor:'#F1FAEE',
        flexDirection:'column',
       
        
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem'
        }
    },
    Accordion: {
        flex:1,
        marginBottom: '1rem',
        borderRadius: '0.3rem',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        '&:before':{
            display:'none'
        },
        [theme.breakpoints.down('sm')]: {
            
        }
    }

}))

const componentsList =[
    {
        name: 'Education',
        component:()=>(<Education/>),
        id: 1
    },
    {
        name: 'Experience',
        component:()=>(<Experience/>),
        id: 2
    },
    {
        name: 'Projects',
        component:()=>(<Projects/>),
        id: 3
    },
    {
        name: 'Skills',
        component:()=>(<Skills/>),
        id: 4
    },
    {
        name: 'Achievements',
        component: ()=>(<Achievements/>),
        id: 5
    },
    {
        name: 'Social Media',
        component: ()=>(<Social/>),
        id: 6
    },
    {
        name: 'Contact Details',
        component: ()=>(<Mobile/>),
        id: 7
    },
    {
        name: 'Additional Images',
        component: ()=>(<ImagesSection/>),
        id: 8
    },
    {
        name: 'Additional Videos',
        component: ()=>(<VideosSection/>),
        id: 9
    },
]

function Profile() {

    const classes = useStyles();
    const theme = useTheme();
    const media = useMediaQuery(theme.breakpoints.down("sm"));
    const token = useSelector(state => state.userInfo.token);
    const [loading, setloading] = useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    

    useEffect(() => {
        setloading(true);
        setTimeout(()=>{
            setloading(prev=>false);
        },1500)
    }, [])

    return (
        <Grid container
             className={classes.profile} >
            <Grid item xs={12} sm={12} md={12} sx={{marginBottom:'1.5rem'}} >
                <ProfileInfo/>
            </Grid>
            
            {componentsList.map((comp,i)=>(
                <Grid item xs={12} sm={12} md={12} key={comp.id} >
                    <Accordion onChange={handleChange('panel'+comp.id)}
                                    expanded={expanded === 'panel'+comp.id}
                                    className={classes.Accordion} >
                        <AccordionSummary  expandIcon={<ExpandMoreIcon />}
                                aria-controls={"panel"+comp.id+"bh-content"}
                                id={"panel"+comp.id+"bh-header"} >
                            <Typography sx={{ width: '33%', 
                                                flexShrink: 0,
                                                fontWeight:'400',
                                            fontSize: media ? '1.15rem': '1.3rem' 
                                        }}
                                        variant='h5'>
                                {comp.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {comp.component()}
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            ))}
            {/* <Grid item xs={12} sm={12} md={12} >
                <Accordion onChange={handleChange('panel1')}
                                expanded={expanded === 'panel1'}
                                className={classes.Accordion} >
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header" >
                        <Typography sx={{ width: '33%', 
                                            flexShrink: 0,
                                            fontWeight:'400',
                                        fontSize: media ? '1.15rem': '1.3rem' 
                                    }}
                                    variant='h5'>
                            Education
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Education />
                    </AccordionDetails>
                </Accordion>
            </Grid>
             */}
            
           {loading && <Spinner /> }
        </Grid>
    )
}

export default Profile;




