
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import React from "react";

import ads from '../images/ad_1.jpg';

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 607, //TODO body height has to be set
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
        paddingTop:150,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
    },
    Box:{
        display: 'content',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeft:'1',
        overflow:'hidden',
    }
}))
export default function AdsLink() {
    const classes = useStyles();
    return (
        <Box className>
            <div >
            <img src={ads} alt="ad1" className={classes.logo} />
            </div>
        </Box>
    )
}