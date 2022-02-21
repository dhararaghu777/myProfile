import React from 'react'

import { makeStyles } from '@mui/styles';
import { Container, useMediaQuery, useTheme } from '@mui/material';

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

    ImageDiv:{
        maxWidth: '55vw',
        maxHeight: '90vh',
        minWidth: '35vw',
        minHeight: '85vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        
    },
    ImageSection: {
        width:'100%',
        height:'100%',
        objectFit: 'contain',
    }
}))


function FullScreenImage({item, close}) {

    const classes = useStyles();
    // const theme= useTheme();
    // const media = useMediaQuery(theme.breakpoints.down('sm'));


  return (
      <div className={classes.Main}
            onClick={()=>close()}>
        <Container sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }} >
            <div className={classes.ImageDiv}>
                <img src={item.image} alt={item.name}
                        className={classes.ImageSection}
                    />
            </div>
        </Container>
      </div>
  )
}

export default FullScreenImage;