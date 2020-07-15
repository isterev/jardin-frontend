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
        opacity: '90%',
        background: "#b56244",
        color: 'white',
        fontWeight: "bold",
        "&:hover": {
            opacity: "100%",
            color: 'white',
            background: '#b56244'
        },
        marginTop: '10px',
        textTransform: 'none',
        fontSize: '13px',
        height: '30%',
        width: '60%'
    },
    dialogButton: {
        opacity: '90%',
        background: "#b56244",
        color: 'white',
        marginTop: "40px",
        fontWeight: "bold",
        "&:hover": {
            opacity: "100%",
            color: 'white',
            background: '#b56244'
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
            <Button variant="outlined" onClick={handleClickOpen} disabled={disabled} className={classes.button}>
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
                    <Button onClick={handleClose} type="submit" className={classes.dialogButton}>
                        No!
                    </Button>
                    <Button onClick={handleSubmit} autoFocus  type="submit" form="requestForm" className={classes.dialogButton}>
                        Yes!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
