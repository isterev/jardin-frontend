import React from "react";
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: 30,
        height: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
}));

export default function({onChange}) {
    const classes = useStyles();
    return (
        <div>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Remember any keywords?"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={onChange}
                />
                <IconButton>
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    )
}