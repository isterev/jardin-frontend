import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";


const useStyle = makeStyles(() => ({
    button: {
        marginTop: '10px',
        textTransform: 'none',
        fontSize: '13px',
        height: '30%',
        width: '70%'
    },
    Yes: {
        opacity: '90%',
        backgroundColor: "#2d6043",
        color: 'white',
        marginTop: "40px",
        fontWeight: "bold",
        "&:hover": {
            opacity: "100%",
            color: 'white',
            backgroundColor: '#2d6043'
        },
        textTransform: 'none',
        fontSize: '15px',
        width: '100px'
    },
    No: {
        opacity: '90%',
        backgroundColor: "#a6b829",
        color: 'white',
        marginTop: "40px",
        fontWeight: "bold",
        "&:hover": {
            opacity: "100%",
            color: 'white',
            backgroundColor: '#a6b829'
        },
        textTransform: 'none',
        fontSize: '15px',
        width: '100px'
    },
    text : {
        color: '#413327',
        fontSize: '15px'
    },
    dialog: {
        width:'400px'
    }
}))
export default function AlertDialog({disabled, style, text, onSubmit}) {
    const classes = useStyle()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        setOpen(false);
        onSubmit();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} disabled={disabled} color="primary" className={classes.button}>
                {text}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle><b>{"Request a consultation?"}</b></DialogTitle>
                <DialogContent className={classes.dialog}>
                    <DialogContentText className={classes.text}>
                        <p>Are you sure you wish to cancel?</p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} autoFocus  type="submit" form="requestForm" color="primary" className={classes.Yes}>
                        Yes!
                    </Button>
                    <Button onClick={handleClose}  type="submit" color="secondary" className={classes.No}>
                        No!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
