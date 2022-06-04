import { Grid, Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'


const useStyles= makeStyles((theme)=>({
    Card:{
        
    },
    CardContent:{
        paddingRight:'3rem',
        textAlign:'end',
        '& div':{
            lineHeight: 1.8,
        },
        [theme.breakpoints.down('sm')]:{
            paddingRight:'1.5rem',
            '& div':{
                lineHeight: 1.3,
            },
        }
    },
    CardImage:{
        display:'flex',
        alignItems:'center',
        paddingLeft:'3rem',
        '& div':{
            width:'8rem',
            '& img':{
                width:'100%',
                height:'100%',
                objectFit:'cover'
            }
        },
        [theme.breakpoints.down('sm')]:{
            justifyContent:'center',
            paddingLeft:'0',
            '& div':{
                width:'5rem',
            },
        }
    },
    Text1:{
        fontSize: '1.5rem !important',
        [theme.breakpoints.down('md')]:{
            fontSize:'1.3rem !important'
        },
        [theme.breakpoints.down('sm')]:{
            fontSize:'0.9rem !important'
        }
    },
    Text2:{
        fontSize: '1.2rem !important',
        [theme.breakpoints.down('md')]:{
            fontSize:'1rem !important'
        },
        [theme.breakpoints.down('sm')]:{
            fontSize:'0.8rem !important'
        }
    }
    
}))

function RightCard({card}) {

    const classes= useStyles()
    const theme= useTheme()
    const media= useMediaQuery(theme.breakpoints.down('sm'))
    

  return (
    <Grid container
        sx={{
           alignItems:'center',
           justifyContent:'center'
        }}>
        
        <Grid item xs={9} sm={7} md={7} lg={7}
                className={classes.CardContent}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    justifyContent:'center',
                    // alignItems:'center'
                }}>
            <Typography component="div"
                        variant="h6"
                        color="#1D3557"
                        className={classes.Text1}>
                    {card.content.header}
            </Typography>
            <Typography component="div"
                        variant="subtitle1"
                        color="#222831c9"
                        className={classes.Text2}>
                    {card.content.subtitle1}
            </Typography>
            <Typography component="div"
                        variant="subtitle1"
                        color="#222831c9"
                        className={classes.Text2}>
                    {card.content.subtitle2}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={5} md={5} lg={5}
              className={classes.CardImage}>
            <div>
                <img src={card.url} alt="card image"/>
            </div>
        </Grid>
    </Grid>
  )
}

export default RightCard