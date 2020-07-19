import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles( () => ({
    errorMessage: {
        display: "flex",
        justifyContent: 'center',
        marginBottom: "30px"
    }
}))
export default function () {
    const classes = useStyle()
    return (
        <div className={classes.errorMessage}>
            <p>Oops, your search does not match any results!</p>
        </div>
    )
}