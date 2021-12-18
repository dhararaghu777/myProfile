import { Grid } from '@mui/material'
import { Box, styled } from '@mui/system';
import { css } from '@emotion/react';
import React from 'react';
import {HashLoader} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

const Parent = styled('div')({
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
    position:'absolute',
    inset: 0,
    zIndex:10,
    backgroundColor:'rgba(250, 250, 250, 0.6)',
});

const Grand= styled('div')({
    // position: 'relative',
    // display: 'flex',
    // alignItems:'center',
    // justifyContent:'center',
    // width: '100%',
    // height: '100%'
})



function Spinner() {
    return (
        <Parent>
            <HashLoader color="#1D3557" css={override} />
        </Parent>
    )
}

export default Spinner;


// #4d4b5f
//#1D3557