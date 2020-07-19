import React from "react";
import {ErrorMessage, Field} from "formik";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( () => ({
    root: {
        width: '100%',
        display: 'inline-block',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        height: '120%'
    }
}))
export default function({name, label, isPassword=false}) {
    let classes = useStyles()
    return (
        <Field
            required
            helperText={<ErrorMessage name={name}/>}
            className={classes.root}
            label={label}
            rows={1}
            name={name}
            variant="outlined"
            autoComplete="off"
            type={isPassword?"password":""}
        />

    )
}