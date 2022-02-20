import React from 'react'

import { makeStyles } from '@mui/styles';
import { Box, Button, Container, useMediaQuery, useTheme } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    Main:{
        position:'fixed',
        inset:0,
        zIndex:100,
        backgroundColor:'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ImageSection: {
        width:'100%',
        height:'100%'
    }
}))


function FullScreenImage({item, close}) {

    const classes = useStyles();
    const theme= useTheme();
    const media = useMediaQuery(theme.breakpoints.down('sm'));


  return (
      <div className={classes.Main}
            onClick={()=>close()}>
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} >
            {/* <Button color="error" onClick={()=>close()}>Close</Button> */}
            <Box sx={{height: media?'70vh' :'80vh',
                      width:media?'70vh' :'80vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
                <img src={item.image} alt={item.name}
                    className={classes.ImageSection}
                />
            </Box>
        </Container>
      </div>
  )
}

export default FullScreenImage;