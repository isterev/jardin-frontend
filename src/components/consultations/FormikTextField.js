import React from "react";
import {ErrorMessage, Field} from "formik";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( () => ({
    root: {
        width: '570px',
        marginBottom: '30px',
        '& label.Mui-focused': {
            color: '#b56244',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#b56244',
        },

    }
}))
export default function({name, label}) {
    let classes = useStyles()
    return (
        <Field
            helperText={<ErrorMessage name={name}/>}
            as={TextField}
            className={classes.root}
            label={label}
            rows={1}
            defaultValue=""
            name={name}
        />
    )
}