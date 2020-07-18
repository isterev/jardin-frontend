import React from "react"
import IconButton from "@material-ui/core/IconButton"
import RssFeedSharpIcon from '@material-ui/icons/RssFeedSharp';
import {makeStyles} from "@material-ui/styles";
import SideLink from "./SideLink";

let styles = makeStyles(({
    root: {
        height: '500px',
        paddingTop: '75px',
        paddingLeft:'10px',
        paddingRight:'10px'
    },
    heading: {
        display: "flex",
        marginLeft: '10%',
        marginRight: 'auto',
        fontSize: '18px'
    }
}))
export default function() {
    const classes = styles()
    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <div>
                    <h1>
                        What is trending
                    </h1>
                </div>
                <div>
                    <IconButton color="inherit">
                        <RssFeedSharpIcon fontSize="medium"/>
                    </IconButton>
                </div>
            </div>
            <SideLink href="https://www.gardendesign.com/trends/2020.html" heading="Garden Design 2020" summary="We share 9 noteworthy trends shaping the gardening world in 2020."/>
            <SideLink href="https://kidsgardening.org/" heading="Kids Gardening" summary="We create opportunities for kids to learn and grow through gardening, engaging their natural curiosity and wonder."/>
            <SideLink href="https://www.planetnatural.com/growing-indoors/" heading="Indoor and Herbs Collection" summary="City dwellers, or those without a good gardening spot in the yard, may find growing indoors especially useful."/>
        </div>
    )
}