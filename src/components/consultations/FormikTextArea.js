import React from "react";
import {ErrorMessage, Field} from "formik";
import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( theme => ({
    root: {
        width: '60%',
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#b56244',
            },
        },
        '& label.Mui-focused': {
            color: '#b56244',
        }
    }
}))
export default function({name, label, rows}) {
    let classes = useStyles()
    return (
        <Field
            helperText={<ErrorMessage name={name}/>}
            as={TextField}
            className={classes.root}
            label={label}
            multiline
            rows={rows}
            defaultValue=""
            variant="outlined"
            name={name}
        />
    )
}