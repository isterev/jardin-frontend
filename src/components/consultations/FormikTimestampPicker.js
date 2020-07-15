import React from "react";
import TextField from '@material-ui/core/TextField';
import {ErrorMessage, Field} from "formik";
import {makeStyles} from "@material-ui/core/styles";
import {getEarliestTime} from "../util/ExpertUtils";



const useStyles = makeStyles(() =>({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#b56244',
        },
        '& label.Mui-focused': {
            color: '#b56244',
        }
    }
}))
export default function({label, name}) {
    const type = "datetime-local"
    const classes = useStyles()
    return (
        <div>
            <Field
                helperText={<ErrorMessage name={name}/>}
                as={TextField}
                label= {label}
                type= {type}
                defaultValue= {getEarliestTime()}
                name= {name}
                InputLabelProps={{
                    shrink: true,
                }}
                className={classes.root}
            />
        </div>
    )
}