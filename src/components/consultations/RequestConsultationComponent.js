import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {compress_summary_text} from "../util/ExpertUtils";
import staticImage from "../../images/consultations/1.png"
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        width: "1000px",
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
    image: {
        width: "420px",
        height: "240px",
    },
    textDiv: {
        width: "500px",
        height: "220px",
        paddingTop:10,
        paddingBottom:10,
        marginTop: 0,
        marginLeft: "50px",
    },
    horizontalRule: {
        marginTop: "30px",
        marginBottom: "30px",
        opacity: "30%",
        width: "950px"
    },
    heading: {
        fontFamily: "Arial",
        marginTop: 0,
        marginBottom: "5px"
    },
    textElement: {
        marginBottom: "10px",
        marginTop: "10px"
    }
}))

export default function ({title, requestId, summary, category, preferredDates, requestedOnDate, lastComponent=false}) {
    summary = compress_summary_text(summary, 100)
    const classes = useStyles()
    switch (category) {
        case 'WINTER_GARDEN':
            category = "Winter Garden"
            break
        case 'SUMMER_GARDEN':
            category = "Summer Garden"
            break
        case 'SPRING_GARDEN':
            category = "Spring Garden"
            break
        case 'AUTUMN_GARDEN':
            category = "Autumn Garden"
            break
    }
    return (
        <div>
            <Link className={classes.root} to={"my-requests/" + requestId}>
                <img src={staticImage} alt={title} className={classes.image}/>
                <div className={classes.textDiv}>
                    <h3 className={classes.heading}>{title}</h3>
                    <p className={classes.textElement}><b>Requested On:</b> {requestedOnDate}</p>
                    <p className={classes.textElement}><b>Category:</b> {category}</p>
                    <p className={classes.textElement}> {preferredDates}</p>
                    <p className={classes.textElement}>{summary}</p>
                </div>
            </Link>
            {!lastComponent && <hr className={classes.horizontalRule}/>}
        </div>
    )
}