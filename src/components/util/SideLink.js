import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Link} from "react-router-dom";

let styles = makeStyles(({
    root: {
        background: '#CFE070',
        marginBottom: "30px",
        // paddingTop: '-1px',
        // paddingLeft: '5px',
        // paddingRight: '5px',
        padding: '10px',
        cursor: "pointer",
        '&:hover': {
            background: "#8f8c85",
            opacity: .9,
            color: 'white'
        },
        borderRadius: "5px",
        textDecoration: 'none',
        color: "black",
        width: '100%',
        textAlign: "justify"
    },
    anchor: {
        textDecoration: 'none',
        color: 'black',
    },
    heading: {
        margin: '-2px',
        marginBottom: '10px'
    },
    summary: {
        margin: '-2px'
    }
}))

export default function ({href, heading, summary}) {
    const classes = styles()
    function redirect() {
        window.location = href
    }
    return (
        <div className={classes.root} onClick={redirect}>
            <h4 className={classes.heading}> {heading}</h4>
            <p className={classes.summary}>{summary}</p>
        </div>
    )
}