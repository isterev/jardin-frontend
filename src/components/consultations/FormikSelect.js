import React from "react";
import {Field, ErrorMessage} from "formik";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '250px',
        '& .MuiInputLabel-shrink': {
            color: '#b56244',
            '& .Mui-focused': {
                borderBottomColor: '#b56244',
            }
        },
        '& .MuiInput-underline:after':{
            borderBottomColor: '#b56244',
        },
    }
}))

function MaterialUiSelectField({errorString, label, children, onChange, name}) {
    const classes = useStyles()
    return (
        <FormControl fullWidth className={classes.root}>
            <InputLabel>{label}</InputLabel>
            <Select onChange={onChange} name={name} >
                {children}
            </Select>
            <FormHelperText>{errorString}</FormHelperText>
        </FormControl>
    )

}
export default function FormikSelect ({menuItems, name, label, error}) {
    let classes = useStyles()
    return (
        <div className={classes.formikSelect}>
            <Field
                as={MaterialUiSelectField}
                label={label}
                errorString={error}
                name={name}>
                {
                    menuItems.map(({label, value}) => {
                        return(<MenuItem key= {value} value={value}>{label}</MenuItem>)
                    })
                }
            </Field>
        </div>
    )
}
