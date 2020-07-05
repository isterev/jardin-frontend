
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    logo: {
        height: 500,
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
            <img src="./ad_1.jpg" alt="ad1"  className={classes.logo} />
            </div>
        </Box>
    )
}