import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import "../util/ExpertUtils"
import {compress_summary_text} from "../util/ExpertUtils";
const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        display: "flex",
        marginBottom: "30px",
        cursor: "pointer",
        '&:hover': {
            background: "#8f8c85",
            opacity: .9,
            color: "#e8e5e1"
        },
        borderRadius: "10px",
        textDecoration: 'none',
        color: "black"
    },
    textDiv: {
        width: "80%",
        height: "220px",
        paddingTop:10,
        paddingBottom:10,
        marginLeft: "50px",
    },
    horizontalRule: {
        opacity: "30%",
        width: "100%"
    },
    heading: {
        marginBottom: "5px"
    },
    textElement: {
        // marginBottom: "05px",
        marginTop: "-5px"
    }
}))

export default function({title, body, createdAt, lastComponent}) {
    const classes = useStyles()
    return (
        <div>

            <Link className={classes.root} to={"my-requests/"}>
                <div className={classes.textDiv}>
                    <h3 className={classes.heading}>{title}</h3>
                    <p className={classes.textElement}>{createdAt}</p>
                    <p className={classes.textElement}>{compress_summary_text(body, 700)}</p>
                </div>
            </Link>
            {!lastComponent && <hr className={classes.horizontalRule}/>}
        </div>
    )
}