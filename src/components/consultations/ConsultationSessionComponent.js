import React from "react";
import {compress_summary_text} from "../util/ExpertUtils";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import staticExpert from '../../images/consultations/expert-square-2.png';

const useStyles = makeStyles(() => ({
    root: {
        width: "1000px",
        display: "flex",
        marginBottom: "30px",
        cursor: "pointer",
        borderRadius: '40px',
        color: "black",
        textDecoration: 'none',
        '&:hover': {
            background: "#8f8c85",
            opacity: .9,
            color: "#e8e5e1"
        }
    },
    textDiv: {
        width: "600px",
        height: "300px",
        paddingTop: '10px',
        paddingBottom: '10px',
        marginTop: 0,
        marginLeft: "50px",
    },
    horizontalRule: {
        marginTop: "30px",
        marginBottom: "30px",
        opacity: "30%",
        width: "950px"
    },
    image: {
        width: "280px",
        height: "280px",
        borderRadius: "60%",
        marginLeft: '10px',
        marginTop: '10px'
    }
}))

export default function({title, sessionDate, expertName, requestId, expertSummary, lastComponent, imgFileName = 'white-background-image.jpg'}) {
    let classes = useStyles()

    expertSummary = compress_summary_text(expertSummary, 350)
    return (
        <div>
            <Link className={classes.root} to={"my-consultations/" + requestId}>
                <img src={staticExpert} alt={title} className={classes.image}/>
                <div className={classes.textDiv}>
                    <h3>{title}</h3>
                    <p>During your interaction on <b>{sessionDate}</b></p>
                    <p><b>{expertName}</b> suggested you to...</p>
                    <p>{expertSummary}</p>
                </div>
            </Link>
            {!lastComponent && <hr className={classes.horizontalRule}/>}
        </div>
    )
}
