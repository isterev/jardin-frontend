import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    select: {
        marginLeft: "2px",
        borderRadius: "5px",
        backgroundColor: "white",
        marginBottom: "20px",
        height: '30px'
    }
}));

export default function ({menuItems, onChange}) {
    const classes = useStyles();

    return (
        <select className={classes.select} onChange={onChange}>
            {menuItems.map(item => {
                return (
                    <option>{item}</option>
                )
            })}
        </select>
    )
}